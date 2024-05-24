const {
    getPegawai,
    getPegawaiById,
    createPegawai,
} = require('../pegawai/pegawai.service');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage }).single('foto_pegawai');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = {
    getPegawai: (req, res) => {
        getPegawai((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                error: false, 
                message: 'Pegawai fetched successfully',
                listUsers: results
            });
        });
    },

    getPegawaiById: (req, res) => {
        const id_pegawai = req.params.id_pegawai;
        getPegawaiById(id_pegawai, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    error: true,
                    message: 'Data Pegawai not found'
                });
            }
            return res.json({
                error: false, 
                message: 'Data Pegawai found!',
                dataPegawai: results
            });
        });
    },

    createPegawai: (req, res) => {
        upload(req, res, (err) => {
            if (err) {
                console.error(err);
                return res.status(400).json({
                    error: true,
                    message: err
                });
            }

            // Jika tidak ada file yang diupload
            if (!req.file) {
                return res.status(400).json({
                    error: true,
                    message: 'No file uploaded'
                });
            }

            const data = req.body;
            data.foto_pegawai = req.file.filename; // Set filename untuk disimpan ke database

            createPegawai(data, (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({
                        error: true,
                        message: 'Failed to create pegawai',
                    });
                }
                return res.status(201).json({
                    error: false,
                    message: 'Pegawai created successfully',
                    dataPegawai: {
                        id_pegawai: data.id_pegawai,
                        nama_pegawai: data.nama_pegawai,
                        jenis_kelamin: data.jenis_kelamin,
                        jabatan: data.jabatan,
                        departemen: data.departemen,
                        tanggal_mulai_kerja: data.tanggal_mulai_kerja,
                        nomor_telepon: data.nomor_telepon,
                        alamat: data.alamat,
                        foto_pegawai: data.foto_pegawai,
                        sisa_cuti: data.sisa_cuti,
                        status_pegawai: data.status_pegawai
                    }
                });
            });
        });
    }
}