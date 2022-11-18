const express = require('express');
const logInController = require('../../controllers/logInController');
const registerController = require('../../controllers/registerController');
const router = express.Router();
const logOutController = require('../../controllers/logOutController');

router.route('/register').post(registerController.register);

router.post('/login', logInController.logIn);

router.get('/logout', logOutController.logOut);

module.exports = router;