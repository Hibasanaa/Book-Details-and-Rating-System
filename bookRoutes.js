const express = require('express');
const router = express.Router();
const { getBookDetails, rateBook } = require('../controllers/bookController');

// Fetch book details by ID
router.get('/:id', getBookDetails);

// Route to handle book rating
router.post('/:id/rate', rateBook);

module.exports = router;
