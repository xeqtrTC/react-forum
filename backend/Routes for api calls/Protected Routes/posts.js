const express = require('express');
const router = express.Router();

const categoryRouter = require('../../api calls/categoryRouter');
const usersSearchRouter = require('../../api calls/usersForumRouter');
const limiter = require('../../rateLimiter');



// GETS

router.route('/categoryList').get(categoryRouter.getAllCategories);
router.route('/category/:category').get(categoryRouter.getPostPerCategory);
router.route('/title/:posttitle').get(categoryRouter.getPostPerPost);
router.route('/getPostsPerUser/').get(usersSearchRouter.searchPostsPerUser);
router.route('/getPostbyreplyid/:replyid').get(categoryRouter.getTopicbyReplyid)
router.route('/publicSearchUsersPosts/:username').get(usersSearchRouter.publicSearchPostsPerUser);
router.route('/getsubcategories/:category').get(categoryRouter.subCategories);
router.route('/isLockedPost/:title').get(categoryRouter.isLockedPost);
router.route('/subforumpercategory/:category/test/:subtitle').get(categoryRouter.getPostsPerSubCategory);
router.route('/getcategoriesandsubcategories').get(categoryRouter.getCategoriesandSubcategories)
router.route('/getsubcategories').get(categoryRouter.getSubCategories);
router.route('/themePerCategory/:category').get(categoryRouter.selectThemePerCategory);
router.route('/postsPerTheme/:category').get(categoryRouter.getPostsPerTheme);
router.route('/repliesPerTheme/:posttitle').get(categoryRouter.getPostRepliesPerTheme);
router.route('/getThemes/:category').get(categoryRouter.getThemesPerCategory);
router.route('/lastmessagesglobal').get(categoryRouter.getLastTwentyMessages);
router.route('/getpinnedthemespercategory/:subtitle').get(categoryRouter.getPinnedThemePerCategory);
router.route('/getUsersPrivateMessages').get(categoryRouter.getUsersPrivateMessages);
router.route('/getMessageRooms').get(categoryRouter.getMessageRooms);
router.route('/getMessagesByRoomId/:roomid').get(categoryRouter.getMessagesByRoomId);
router.route('/getLatestPosts').get(categoryRouter.getLatestPosts);
router.route('/getpinnedthemepercategoryreplies/:subtitle').get(categoryRouter.getPinnedThemePerCategoryReplies);
router.route('/sForumAndThemes/:category').get(categoryRouter.sForumAndThemes);


// POSTS

router.route('/postbyuser').post(limiter, categoryRouter.postPostbyUser);
router.route('/postcategory').post(limiter, categoryRouter.postTopicbyUser);
router.route('/updateReplyContent/').post(categoryRouter.updateReplyPost)
router.route('/lockTheThreadbyAdmin').post(categoryRouter.lockTheThread);
router.route('/unlockTheThreadbyAdmin').post(categoryRouter.unLockTheThread);
router.route('/movePostToAnotherCategory').post(categoryRouter.moveTopicToAnotherCategory);
router.route('/movePostToSubForum').post(categoryRouter.movePostToSubForum);
router.route('/addsubforum').post(categoryRouter.postSubForumPerCategory);
router.route('/addTheme').post(categoryRouter.addThemeForumPerCategory);
router.route('/addPostPerTheme').post(categoryRouter.addPostPerTheme);
router.route('/deleteTheme').post(categoryRouter.deleteTheme);
router.route('/deleteSubForum').post(categoryRouter.deleteSubForum);
router.route('/addpinnedthemes').post(categoryRouter.addPinnedThemesPerSubCategory);
router.route('/addalreadypinnedmessage').post(categoryRouter.addReplyInPinnedMessages);
router.route('/insertMessageRoom').post(categoryRouter.insertMessageRoom);
router.route('/deleteReplyByAdmin').post(categoryRouter.deleteReplyByAdmin)
router.route('/deletePostByAdmin').post(categoryRouter.deletePostByAdmin)
router.route('/deleteContentPerPinnedMessage').post(categoryRouter.deleteContentPerPinnedMessage);
router.route('/deletePinnedTheme').post(categoryRouter.deletePinnedTheme);
router.route('/insertPostInTheme').post(categoryRouter.insertPostInTheme);
router.route('/deleteThemeReply').post(categoryRouter.deleteThemeReply)
router.route('/updateReplyThemeContent').post(categoryRouter.updateReplyThemeContent);



module.exports = router;
