const {
    createReimburse,
    getReimbursementById
} = require('./reimburse.controller');

const router = require('express').Router();

router.post('/createReimbursement', createReimburse);
router.get('/reimburseDetail/:id_pegawai', getReimbursementById);

module.exports = router;