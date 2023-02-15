const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview } = require('../middleware');
const { isLoggedIn } = require('../middleware');
const { isReviewAuthor } = require('../middleware');
const reviews = require('../controllers/reviews')

router.post('/', validateReview, isLoggedIn, catchAsync(reviews.newReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router;