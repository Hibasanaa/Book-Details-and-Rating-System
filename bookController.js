const Book = require('../models/bookModel');

// Fetch book details by ID
exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book details' });
  }
};

// Handle book rating
exports.rateBook = async (req, res) => {
  const { rating } = req.body;
  if (!rating || rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Invalid rating' });
  }

  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    book.rating = (book.ratingCount * book.rating + rating) / (book.ratingCount + 1);
    book.ratingCount += 1;

    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error rating book' });
  }
};
