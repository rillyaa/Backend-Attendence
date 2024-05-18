const pool = require('../../config/database');

module.exports = {
    attendance : (data, callback) => {
        pool.query(
            `insert into absen(id_pegawai, tanggal_absen, clock_in, clock_out, image) values(?,?,?,?,?)`,
            [
                data.id_pegawai,
                data.tanggal_absen,
                data.clock_in,
                data.clock_out,
                data.image,
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