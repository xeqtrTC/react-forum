const express = require('express');
const router = express.Router();


const refreshToken = require('../refreshToken')
const refreshSession = require('../api calls/refreshStatePassport');

router.get('/', refreshSession.refreshStateofUserPassport)

module.exports = router;
