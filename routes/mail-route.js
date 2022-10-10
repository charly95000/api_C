const express = require('express');
const router = express.Router();

const mailCtrl = require('../controllers/mail-ctrl');
const { validateHuman } = require('../security/validateHuman');

router.post('/send',validateHuman,mailCtrl.send);

module.exports = router