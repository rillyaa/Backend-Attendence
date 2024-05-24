const {
    getPegawai,
    getPegawaiById,
    createPegawai
} = require('../pegawai/pegawai.controller');

const router = require('express').Router();

router.get('/pegawai', getPegawai);
router.get('/pegawai/:id_pegawai', getPegawaiById);
router.post('/pegawai/createPegawai', createPegawai);

module.exports = router;