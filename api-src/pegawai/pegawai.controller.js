const {
    getPegawai,
    getPegawaiById
} = require('../pegawai/pegawai.service');

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
}