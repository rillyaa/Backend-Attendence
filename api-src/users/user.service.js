const pool = require('../../config/database')

module.exports = {
    checkUserExists: (username, email, callback) => {
        pool.query(
            `SELECT COUNT(*) AS usernameCount, 
                    (SELECT COUNT(*) FROM users WHERE email = ?) AS emailCount 
             FROM users WHERE username = ?`,
            [email, username],
            (error, results, fields) => {
                if (error) {
                    return callback(error, null);
                }
                
                const usernameExists = results[0].usernameCount > 0;
                const emailExists = results[0].emailCount > 0;
    
                return callback(null, { usernameExists, emailExists });
            }
        );
    },

    create: (data, callback) => {
        pool.query(
            `insert into users(username, email, password, role, id_pegawai) VALUES (?,?,?,?,?)`,
            [
                data.username,
                data.email,
                data.password,
                data.role,
                data.id_pegawai
            ],
            ( error, results, fields ) => {
                if(error) {
                    return callback(error)
                }
                return callback(null, results)
            }
        );
    },

    getUserbyEmail: async (email) => {
        return new Promise((resolve, reject) => {
            pool.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                (error, results, fields) => {
                    if (error) {
                        console.error('Error in getUserbyEmail query:', error);
                        reject(error);
                    } else {
                        console.log('Results from getUserbyEmail:', results);
                        resolve(results[0]); // Assuming results is an array
                    }
                }
            );
        });
    },

    getUsers: callback => {
        pool.query(
            `select id_user, username, email from users`,
            [],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results);
            }
        );
    },
    getUserByID: (id, callback) => {
        pool.query(
            `select id_user, username, email, role, id_pegawai from users where id_user = ?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    return callback(error);
                }
                return callback(null, results[0]);
            }
        );
    },
}