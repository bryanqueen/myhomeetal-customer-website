import React, { useState } from 'react';
import Star from '../star';

 // Adjust the path according to your file structure

const StarRating = ({ totalStars = 5, onRate, width }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    onRate(ratingValue); // Pass the rating value to the parent component or handle it here
  };

  return (
    <div className='flex gap-1 items-center justify-center'>
      {Array.from({ length: totalStars }, (_, index) => (
        <Star
          key={index}
          filled={index < rating}
          onClick={() => handleClick(index + 1)}
          width={width}
        />
      ))}
    </div>
  );
};

export default StarRating;
