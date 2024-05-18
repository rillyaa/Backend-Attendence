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
}