const express = require('express');
const router = express.Router();

const userRouter = require('../../../api calls/UCP/ucpUserRouter')


// router.route('/registerUser').post(userRouter.registerUCPuser)
// router.route('/loginUser').post(userRouter.UCPhandleLoginPassport)
// router.route('/infoAboutUser').get(userRouter.infoAboutUser);
module.exports = router;
