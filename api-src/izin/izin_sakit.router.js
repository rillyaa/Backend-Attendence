const {
    createIzin,
    getIzinById
} = require('../izin/izin_sakit.controller');

const router = require('express').Router();

router.post('/createIzin', createIzin);
router.get('/getIzin/:id_pegawai', getIzinById)

module.exports = router;