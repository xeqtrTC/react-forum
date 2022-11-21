const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersRouter = require('../../api calls/usersRouter');
const limiter = require('../../rateLimiter')

router.route('/registerHandler').post(usersRouter.handleRegisterWithVerification);
router.route('/verifyEmail/:token').get(usersRouter.verifyEmail);
router.route('/loginHandler').post(limiter, usersRouter.handleLoginPassport)

module.exports = router;