import React, { useState } from 'react';
import axios from 'axios';

const Rating = ({ bookId, initialRating }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRating = async (newRating) => {
    try {
      const response = await axios.post(`/api/books/${bookId}/rate`, { rating: newRating });
      setRating(response.data.rating);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  return (
    <div>
      <p>Current Rating: {rating.toFixed(1)}</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} onClick={() => handleRating(star)}>
            {star} Star
          </button>
        ))}
      </div>
    </div>
  );
};

export default Rating;
