const {
    getPegawai,
    getPegawaiById
} = require('../pegawai/pegawai.controller');

const router = require('express').Router();

router.get('/pegawai', getPegawai);
router.get('/pegawai/:id_pegawai', getPegawaiById);

module.exports = router;