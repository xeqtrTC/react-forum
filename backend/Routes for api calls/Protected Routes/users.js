const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersRouter = require('../../api calls/usersRouter');
const refreshToken = require('../../refreshToken');


// GET
router.route('/userInfo/').get(usersRouter.getUserInfo);
router.route('/publicGetInfoAboutUser/:username').get(usersRouter.getUserInfoPublic)
router.route('/countAdminDashboard').get(usersRouter.countAdminDashboard);
router.route('/listOfAccountsToBeApproved').get(usersRouter.listOfAccountsToBeApproved);
router.route('/leaderOfHelperQuery').get(usersRouter.leaderOfHelperQuery);
router.route('/addHelperQueryListUsers').get(usersRouter.addHelperQueryListUsers);
router.route('/getOverWatchPosts').get(usersRouter.getOverWatchPosts);
router.route('/getOverWatchUsers').get(usersRouter.getOverWatchUsers);
router.route('/newsList').get(usersRouter.newsList);
router.route('/getNewsByTitle/:n_title').get(usersRouter.getNewsByTitle);
router.route('/getBannedUsersList').get(usersRouter.getBannedUsersList);
router.route('/getBannedHistoryList').get(usersRouter.getBannedHistoryList);
router.route('/whoCurrentlyGotSession').get(usersRouter.whoCurrentlyGotSession);
router.route('/verifyForgotPasswordToken/:token').get(usersRouter.verifyForgotPasswordToken);



// POST
router.route('/stateofUser/').get(usersRouter.stateofUser);
router.route('/getUsersList').get(usersRouter.getUsersList);
router.route('/getPostsList').get(usersRouter.getPostsList);
router.route('/getUserById/:id').get(usersRouter.getUserById);
router.route('/usersUpdate/updateLocationandSteamtag').post(usersRouter.updateLocationandSteamtag)
router.route('/usersUpdate/updateImage').post(usersRouter.updateImage);
router.route('/usersUpdate/updateEmailorPassword').post(usersRouter.updatePasswordorEmail);
router.route('/logout').post(usersRouter.handleLogoutwithPassport);
router.route('/addmessageglobal').post(usersRouter.insertMessage);
router.route('/verifyUserAccountByAdmin/').post(usersRouter.verifyUserAccountByAdmin);
router.route('/updateUserAccountByAdmin').post(usersRouter.updateUserAccountByAdmin);
router.route('/updateRoleForUser').post(usersRouter.updateRoleForUser);
router.route('/removeRoleForUser').post(usersRouter.removeRoleForUser);
router.route('/addHelperUser').post(usersRouter.addHelperUser);
router.route('/addNews').post(usersRouter.insertNews);
router.route('/deleteNews').post(usersRouter.deleteNews);
router.route('/banUserFunction').post(usersRouter.banUserFunction);
router.route('/unbanUserFunction').post(usersRouter.unbanUserFunction)
router.route('/forgotPassword').post(usersRouter.forgotPassword)
router.route('/updatedPasswordForgotPassword').post(usersRouter.updatedPasswordForgotPassword);



module.exports = router;
