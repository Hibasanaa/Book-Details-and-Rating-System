import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from './Rating';

const BookDetails = ({ match }) => {
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`/api/books/${match.params.id}`);
        setBook(response.data);
      } catch (err) {
        setError('Failed to load book details');
      }
    };
    fetchBookDetails();
  }, [match.params.id]);

  if (error) return <p>{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <Rating bookId={book._id} initialRating={book.rating} />
    </div>
  );
};

export default BookDetails;
