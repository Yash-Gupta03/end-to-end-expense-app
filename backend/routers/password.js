const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password');

router.use('/forgotpassword', passwordController.forgotPassword)

module.exports = router;