const {
    createReimburse,
    getReimbursementById
} = require('./reimburse.service')

module.exports = {
    createReimburse : (req,res) => {
        const data = req.body;
        createReimburse(data, (error, results) => {
            if(error) {
                console.error('Error Creating Reimbursement: ', error)
                return res.status(500).json({
                    error: true,
                    message: 'Failed to create Reimbursement'
                })
            }
            return res.status(200).json({
                error: false,
                message: 'Reimbursement Created Successfully',
            });
        });
    }, 

    getReimbursementById: (req, res) => {
        const id_pegawai = req.params.id_pegawai;
        getReimbursementById(id_pegawai, (error, results) => {
            if(error) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    error: true,
                    message: 'User doesnt have any Reimbursement Data'
                });
            }
            return res.status(200).json({
                error: false, 
                message: 'Reimbursement Data Found!',
                data: results
            });
        });
    },
}