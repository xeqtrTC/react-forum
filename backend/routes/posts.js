const express = require('express');
const router = express.Router();

const categoryRouter = require('../api calls/categoryRouter');
const usersSearchRouter = require('../api calls/usersForumRouter');

router.route('/categoryList').get(categoryRouter.getAllCategories);
router.route('/category/:category').get(categoryRouter.getPostPerCategory);
router.route('/title/:posttitle').get(categoryRouter.getPostPerPost);
router.route('/postbyuser').post(categoryRouter.postPostbyUser);
router.route('/postcategory').post(categoryRouter.postTopicbyUser);
router.route('/getPostsPerUser/:username').get(usersSearchRouter.searchPostsPerUser);


module.exports = router;
