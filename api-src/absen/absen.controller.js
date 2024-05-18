const { attendance } = require('./absen.service');
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
function saveAttendance(req, res) {
    // Menggunakan multer untuk mengunggah gambar
    upload(req, res, (err) => {
        if (err) {
            console.error('Error uploading image:', err);
            return res.status(500).json({ success: 0, message: 'Error uploading image' });
        }

        // Mendapatkan data dari request body
        const { id_pegawai, tanggal_absen, clock_in, clock_out } = req.body;
        
        // Mengambil lokasi file gambar atau null jika tidak ada file yang diunggah
        const image = req.file ? req.file.path : null;

        // Menyiapkan data untuk disimpan ke database
        const attendanceData = {
            id_pegawai: id_pegawai,
            tanggal_absen: tanggal_absen,
            clock_in: clock_in,
            clock_out: clock_out,
            image: image
        };

        // Memanggil service untuk menyimpan data ke database
        attendance(attendanceData, (error, results) => {
            if (error) {
                console.error('Error saving attendance:', error);
                return res.status(500).json({ success: 0, message: 'Internal Server Error' });
            }

            // Jika berhasil, kembalikan respons berhasil
            res.status(200).json({ success: 1, message: 'Attendance saved successfully' });
        });
    });
}

module.exports = { saveAttendance };


