const express = require('express');
const auth = require('../security/auth');
const router = express.Router();

const userCtrl = require('../controllers/user-ctrl');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/log', auth.usersAuth,userCtrl.getUser);
router.get('/all', userCtrl.getAllUsers);
router.post('/refreshToken',auth.refreshToken);

module.exports = router;