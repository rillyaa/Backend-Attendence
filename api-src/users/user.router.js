const { checkToken } = require('../../middleware/authentication');
const {
    createUser,
    login,
    getUserByID,
    getUsers,
} = require('../users/user.controller');

const router = require('express').Router();

router.post('/createuser', createUser);
router.post('/login', login);

router.get('/users', getUsers);
router.get('/users/:id', getUserByID);

module.exports = router;