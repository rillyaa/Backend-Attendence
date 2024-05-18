const express = require('express');
const app = express();

require('dotenv').config()
const bodyParser = require('body-parser');
const dbPool = require('./config/database');
const port = process.env.APP_PORT || 3000

const userRouter = require('./api-src/users/user.router');
const izinRouter = require('./api-src/izin/izin_sakit.router');
const pegawaiRouter = require('./api-src/pegawai/pegawai.router');
const cutiRouter = require('./api-src/cuti/cuti.router');
const reimburseRouter = require('./api-src/reimbursement/reimburse.router');
const absenRouter = require('./api-src/absen/absen.router');

app.use(express.json());
app.use(bodyParser.json());

app.use('/', userRouter);
app.use('/', izinRouter);
app.use('/', pegawaiRouter);
app.use('/', cutiRouter);
app.use('/', reimburseRouter);
app.use('/', absenRouter);



app.get('/' , (req , res)=>{
    res.send('hello from simple server :)');
});
 
app.listen(port , ()=> {
    console.log('> Server is up and running on port : ' + port);
})