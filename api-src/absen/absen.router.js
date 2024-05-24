const express = require('express');
const router = express.Router();
const { clockIn, clockOut, getAllAttendance, getAttendanceId } = require('./absen.controller');

// Route for clocking in
router.post('/absen/clock-in', clockIn);

// Route for clocking out
router.post('/absen/clock-out', clockOut);

router.get('/absensi', getAllAttendance);
router.get('/absen/:id_pegawai', getAttendanceId );

module.exports = router;
