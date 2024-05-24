const { attendance, updateClockOut, getAttendance, getAttendanceById } = require('./absen.service');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer untuk menyimpan gambar di folder tertentu
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

// Inisialisasi multer
const upload = multer({ storage: storage }).single('image');

// Fungsi untuk menangani request dan menyimpan data ke database
function clockIn(req, res) {
    // Menggunakan multer untuk mengunggah gambar
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ success: 0, message: 'Error uploading image' });
        }

        // Mendapatkan data dari request body
        const { id_pegawai } = req.body;
        
        // Mengambil lokasi file gambar atau null jika tidak ada file yang diunggah
        const image = req.file ? req.file.path : null;

        // Menyiapkan data untuk disimpan ke database
        const attendanceData = {
            id_pegawai,
            image
        };

        // Memanggil service untuk menyimpan data ke database
        attendance(attendanceData, (error, results) => {
            if (error) {
                console.error('Error saving attendance:', error);
                return res.status(500).json({ success: 0, message: 'Internal Server Error' });
            }

            // Jika berhasil, kembalikan respons berhasil
            res.status(200).json({ success: 1, message: 'Clock-in saved successfully' });
        });
    });
}

function clockOut(req, res) {
    // Mendapatkan data dari request body
    const { id_pegawai, tanggal_absen } = req.body;

    // Menyiapkan data untuk diperbarui di database
    const attendanceData = {
        id_pegawai,
        tanggal_absen
    };

    // Memanggil service untuk memperbarui data di database
    updateClockOut(attendanceData, (error, results) => {
        if (error) {
            console.error('Error updating clock-out:', error);
            return res.status(500).json({ success: 0, message: 'Internal Server Error' });
        }

        // Jika berhasil, kembalikan respons berhasil
        res.status(200).json({ success: 1, message: 'Clock-out updated successfully' });
    });
}

// Function to handle fetching all attendance data
function getAllAttendance(req, res) {
    getAttendance((error, results) => {
        if (error) {
            console.error('Error fetching attendance:', error);
            return res.status(500).json({ success: 0, message: 'Internal Server Error' });
        }
        res.status(200).json({ success: 1, data: results });
    });
}

// Function to handle fetching attendance data by ID
function getAttendanceId(req, res) {
    const id_pegawai = req.params.id_pegawai;

    // Log nilai id_pegawai yang diterima dari client
    console.log('Nilai id_pegawai yang diterima:', id_pegawai);

    getAttendanceById(id_pegawai, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(500).json({
                error: true,
                message: 'Internal Server Error'
            });
        }
        if(!results) {
            return res.status(404).json({
                error: true,
                message: 'Attendance not found'
            });
        }
        return res.status(200).json({
            error: false, 
            message: 'Attendance found!',
            dataAttendance: results
        });
    });
}

module.exports = { clockIn, clockOut, getAllAttendance, getAttendanceId };
