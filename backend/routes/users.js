const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersRouter = require('../api calls/usersRouter');
const refreshToken = require('../refreshToken')

router.route('/registerHandler').post(usersRouter.handleRegister)
router.route('/loginHandler').post(usersRouter.handleLoginPassport)
router.route('/userInfo/:username').get(usersRouter.getUserInfo);
// router.route('/logoutHandler').get(usersRouter.handleLogout)

module.exports = router;
