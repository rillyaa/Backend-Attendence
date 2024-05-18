const pool = require('../../config/database');

module.exports = {
    createIzin : (data, callback) => {
        pool.query(
            `insert into izin_sakit(id_pegawai, tanggal_pengajuan, tanggal_mulai, tanggal_selesai, keterangan_sakit, bukti, status_pengajuan, tanggal_persetujuan, pesan_persetujuan) values(?,?,?,?,?,?,?,?,?)`,
            [
                data.id_pegawai,
                data.tanggal_pengajuan,
                data.tanggal_mulai,
                data.tanggal_selesai,
                data.keterangan_sakit,
                data.bukti,
                data.status_pengajuan,
                data.tanggal_persetujuan,
                data.pesan_persetujuan
            ],
            ( error, results, fields ) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },
    
    getIzinById: (id_pegawai, callback) => {
        pool.query(
            `select * from izin_sakit where id_pegawai = ?`,
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