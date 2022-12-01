const express = require('express');
const router = express.Router();
const ucpUserRouter = require('../../../api calls/UCP/ucpUserRouter');

router.route('/registerUser').post(ucpUserRouter.registerUCPuser);
router.route('/loginUser').post(ucpUserRouter.UCPhandleLoginPassport)
router.route('/infoAboutUser').get(ucpUserRouter.infoAboutUser)
router.route('/reportPlayer').post(ucpUserRouter.reportPlayer);
module.exports = router;