const pool = require('../../config/database');

module.exports = {
    getPegawai: callback => {
        pool.query(
            `select id_pegawai, nama_pegawai, jabatan, departemen, status_pegawai from pegawai`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getPegawaiById: (id_pegawai, callback) => {
        pool.query(
            `select * from pegawai where id_pegawai = ?`,
            [id_pegawai],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },

    createPegawai: (data, callback) => {
        pool.query(
            `insert into pegawai(id_pegawai, nama_pegawai, jenis_kelamin, jabatan, departemen, tanggal_mulai_kerja, nomor_telepon, alamat, foto_pegawai, sisa_cuti, status_pegawai) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,
            [
                data.id_pegawai,
                data.nama_pegawai,
                data.jenis_kelamin,
                data.jabatan,
                data.departemen,
                data.tanggal_mulai_kerja,
                data.nomor_telepon,
                data.alamat,
                data.foto_pegawai,
                data.sisa_cuti,
                data.status_pegawai
            ],
            ( error, results, fields ) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },
}