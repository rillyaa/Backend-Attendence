const {
    saveAttendance
} = require('./absen.controller');

const router = require('express').Router();

router.post('/absen', saveAttendance);

module.exports = router;