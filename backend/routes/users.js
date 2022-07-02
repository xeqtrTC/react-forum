const express = require('express');
const router = express.Router();
const usersRouter = require('../api calls/usersRouter');


router.route('/registerHandler').post(usersRouter.handleRegister)
router.route('/loginHandler').post(usersRouter.handleLogin)
router.route('/logoutHandler').get(usersRouter.handleLogout)


module.exports = router;
