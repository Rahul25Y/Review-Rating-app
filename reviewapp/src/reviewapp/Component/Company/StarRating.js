// StarRating.js
import React from 'react';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= rating ? '★' : '');
  }
  
  return <span>{stars.join(' ')}</span>;
};

export default StarRating;
