const {
    createIzin,
    getIzinById,
} = require('../izin/izin_sakit.service')

module.exports = {
    createIzin : (req,res) => {
        const data = req.body;
        createIzin(data, (error, results) => {
            if(error) {
                console.error('Error Creating Permission: ', error)
                return res.status(500).json({
                    error: true,
                    message: 'Failed to create Permission'
                })
            }
            return res.status(200).json({
                error: false,
                message: 'Permisson Created Successfully',
            });
        });
    }, 

    getIzinById: (req, res) => {
        const id_pegawai = req.params.id_pegawai;
        getIzinById(id_pegawai, (error, results) => {
            if(error) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    error: true,
                    message: 'User doesnt have any Sick Permission'
                });
            }
            return res.status(200).json({
                error: false, 
                message: 'Permission Found!',
                data: results
            });
        });
    },
}