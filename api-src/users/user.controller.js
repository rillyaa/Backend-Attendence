const {
    checkUserExists,
    create,
    getUserbyEmail,
    getUsers,
    getUserByID
} = require('../users/user.service')

const { genSaltSync, hashSync } = require('bcrypt');
const bcrypt = require('bcrypt');

const hashPassword = (password) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
};

const { sign } = require('jsonwebtoken');

module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        checkUserExists(body.username, body.email, (err, userExists) => {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    error: true,
                    message: 'Database connection error'
                });
            } 

            if (userExists.usernameExists) {
                return res.status(400).json({
                    error: true,
                    message: 'Username already exists'
                });
            }

            if (userExists.emailExists) {
                return res.status(400).json({
                    error: true,
                    message: 'Email already registered'
                });
            }
    
            // Jika username dan email belum terdaftar, lanjutkan dengan membuat pengguna
            body.password = hashPassword(body.password);
            create(body, (err, results) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        error: true,
                        message: 'Failed to create user'
                    });
                }
    
                if (results.affectedRows > 0) {
                    return res.status(200).json({
                        error: false,
                        message: 'User Created'
                    });
                } else {
                    return res.status(500).json({
                        error: true,
                        message: 'Failed to create user'
                    });
                }
            });
        });
    },

    login: async (req, res) => {
        try {
            console.log('Request Body:', req.body);

        // Extract email and password from request body
        const { email, password } = req.body;

        // Log the extracted email and password
        console.log('Email:', email);
        console.log('Password:', password);

        // Check if email is URL-encoded and decode it
        const decodedEmail = decodeURIComponent(email);
        console.log('Decoded Email:', decodedEmail);

        // Fetch user by email
        const results = await getUserbyEmail(decodedEmail);
        
            if (!results) {
                return res.json({
                    error: true,
                    message: 'Invalid email or password'
                });
            }
    
            const passwordMatch = await bcrypt.compare(password, results.password);
    
            if (passwordMatch) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.SECRET_KEY , {
                    expiresIn: '1h'
                });
    
                return res.json({
                    error: false,
                    message: 'Login successful',
                    loginResult: {
                        userId: results.id_user,
                        name: results.username,
                        role: results.role,
                        token: jsontoken
                    }
                });
            } else {
                console.error('Password mismatch for user:', results.email);
                return res.json({
                    error: true,
                    message: 'Invalid email or password'
                });
            }
        } catch (error) {
            console.error('Error in login:', error);
            return res.json({
                error: 0,
                message: 'Internal server error'
            });
        }
    },

    getUserByID: (req, res) => {
        const id = req.params.id;
        getUserByID(id, (err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            if(!results) {
                return res.json({
                    error: true,
                    message: 'users not found'
                });
            }
            return res.json({
                error: false, 
                message: 'users found!',
                dataUser: results
            });
        });
    },

    getUsers: (req, res) => {
        getUsers((err, results) => {
            if(err) {
                console.log(err);
                return;
            }
            return res.json({
                error: false, 
                message: 'users fetched successfully',
                listUsers: results
            });
        });
    },
}