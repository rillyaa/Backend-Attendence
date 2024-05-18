const { createPool } = require('mysql');

const pool = createPool({
    //host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // password: process.env.DB_PASS,
    password: process.env.DB_PASS_GCP,
    database: process.env.DB_NAME,
    socketPath: `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`
})

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database!');
    connection.release(); // Return the connection to the pool
});

module.exports = pool;