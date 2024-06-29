'use client';

import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';

const QuantityInput = () => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className='ovefrflow-hidden flex items-center justify-between rounded-full bg-gray-100'>
      <span className='px-5'>{quantity}</span>
      <div className='flex h-full flex-col px-2'>
        <button
          onClick={increment}
          className='rounded-full border-b border-gray-300 p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        >
          <FaChevronUp size='.8rem' />
        </button>
        <button
          onClick={decrement}
          className='rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        >
          <FaChevronDown size='.8rem' />
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
