const pool = require('../../config/database');

module.exports = {
    createReimburse : (data, callback) => {
        pool.query(
            `insert into reimbursement(id_pegawai, tanggal_pengajuan, jenis_reimbursement, deskripsi, jumlah_pengeluaran, bukti, status_pengajuan, tanggal_persetujuan) values(?,?,?,?,?,?,?,?)`,
            [
                data.id_pegawai,
                data.tanggal_pengajuan,
                data.jenis_reimbursement,
                data.deskripsi,
                data.jumlah_pengeluaran,
                data.bukti,
                data.status_pengajuan,
                data.tanggal_persetujuan
            ],
            ( error, results, fields ) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },
    
    getReimbursementById: (id_pegawai, callback) => {
        pool.query(
            `select * from reimbursement where id_pegawai = ?`,
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