import { StarIcon } from '@heroicons/react/24/solid';
import React from 'react';

const Star = ({ filled, onClick, width }) => {
  return (
    <span
      onClick={onClick}
      style={{ cursor: 'pointer', color: filled ? '#ED2224' : '#DCDCDC' }}
    >
      <StarIcon width={width} />
    </span>
  );
};

export default Star;
