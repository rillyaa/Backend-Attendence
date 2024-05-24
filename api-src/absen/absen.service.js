const pool = require('../../config/database');
const moment = require('moment-timezone');

module.exports = {
    attendance: (data, callback) => {
        const currentDate = moment().tz('Asia/Jakarta');
        const date = currentDate.format('YYYY-MM-DD'); // Format as YYYY-MM-DD
        const time = currentDate.format('HH:mm:ss'); // Format as HH:MM:SS
        
        pool.query(
            `INSERT INTO absen(id_pegawai, tanggal_absen, clock_in, clock_out, image) VALUES (?, ?, ?, ?, ?)`,
            [
                data.id_pegawai,
                date, // Use server's current date
                time, // Use server's current time for clock_in
                null, // Clock-out is initially null
                data.image,
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    updateClockOut: (data, callback) => {
        const currentDate = moment().tz('Asia/Jakarta');
        const time = currentDate.format('HH:mm:ss'); // Format as HH:MM:SS
        
        pool.query(
            `UPDATE absen SET clock_out = ? WHERE id_pegawai = ? AND tanggal_absen = ?`,
            [
                time, // Use server's current time for clock_out
                data.id_pegawai,
                data.tanggal_absen // Assume tanggal_absen is passed as it was on clock-in
            ],
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },

    getAttendance: (callback) => {
        pool.query(
            `SELECT * FROM absen`,
            (error, results, fields) => {
                if (error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    
    getAttendanceById: (id_pegawai, callback) => {
        pool.query(
            `SELECT * FROM absen WHERE id_pegawai = ?`,
            [id_pegawai],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },    
};
