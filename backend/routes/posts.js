const express = require('express');
const router = express.Router();

const categoryRouter = require('../api calls/categoryRouter');

router.route('/categoryList').get(categoryRouter.getAllCategories);

module.exports = router;
