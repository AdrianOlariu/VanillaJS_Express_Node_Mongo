const express = require('express');
const app = express();
const router = express.Router();
const refreshToken = require('../../controllers/refreshTokenController');


router.get('/', refreshToken);

module.exports = router;