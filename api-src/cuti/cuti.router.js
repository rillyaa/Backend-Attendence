const {
    createCuti,
    getCutiById
} = require('./cuti.controller');

const router = require('express').Router();

router.post('/createCuti', createCuti);
router.get('/cutiDetail/:id_pegawai', getCutiById)

module.exports = router;