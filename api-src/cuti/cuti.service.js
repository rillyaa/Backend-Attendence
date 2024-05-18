const pool = require('../../config/database');

module.exports = {
    createCuti : (data, callback) => {
        pool.query(
            `insert into pengajuan_cuti(id_pegawai, tanggal_pengajuan, tanggal_mulai_cuti, tanggal_selesai_cuti, jenis_cuti, keterangan_cuti, bukti, status_pengajuan, tanggal_persetujuan, pesan_persetujuan) values(?,?,?,?,?,?,?,?,?,?)`,
            [
                data.id_pegawai,
                data.tanggal_pengajuan,
                data.tanggal_mulai_cuti,
                data.tanggal_selesai_cuti,
                data.jenis_cuti,
                data.keterangan_cuti,
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
    
    getCutiById: (id_pegawai, callback) => {
        pool.query(
            `select * from pengajuan_cuti where id_pegawai = ?`,
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