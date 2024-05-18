const {
    createCuti,
    getCutiById,
} = require('./cuti.service')

module.exports = {
    createCuti : (req,res) => {
        const data = req.body;
        createCuti(data, (error, results) => {
            if(error) {
                console.error('Error Creating Cuti: ', error)
                return res.status(500).json({
                    error: true,
                    message: 'Failed to create Cuti'
                })
            }
            return res.status(200).json({
                error: false,
                message: 'Cuti Created Successfully',
            });
        });
    }, 

    getCutiById: (req, res) => {
        const id_pegawai = req.params.id_pegawai;
        getCutiById(id_pegawai, (error, results) => {
            if(error) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    error: true,
                    message: 'User doesnt have any Cuti Data'
                });
            }
            return res.status(200).json({
                error: false, 
                message: 'Cuti Data Found!',
                data: results
            });
        });
    },
}