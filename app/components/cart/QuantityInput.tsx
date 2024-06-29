'use client';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import { AddCircle, MinusCirlce } from 'iconsax-react';

import Button from '../Button';

import { useItemQuantity } from '@/app/providers';

const QuantityInput = ({ variant = '1' }: { variant?: '1' | '2' }) => {
  const { state, setQuantity } = useItemQuantity();

  const increment = () => setQuantity(state.quantity + 1);
  const decrement = () =>
    setQuantity(state.quantity > 1 ? state.quantity - 1 : 1);

  if (variant === '1')
    return (
      <div className='ovefrflow-hidden flex items-center justify-between rounded-full bg-gray-100'>
        <span className='px-5'>{state.quantity}</span>
        <div className='flex h-full flex-col px-2'>
          <button
            onClick={increment}
            className='rounded-full border-b border-gray-300 p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            aria-label='Increment Item'
          >
            <FaChevronUp size='.8rem' />
          </button>
          <button
            onClick={decrement}
            className='rounded-full p-1 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
            aria-label='Decrement Item'
          >
            <FaChevronDown size='.8rem' />
          </button>
        </div>
      </div>
    );

  if (variant === '2')
    return (
      <div className='flex items-center gap-3 lg:hidden'>
        <Button
          noPadding
          className='h-8 w-8 rounded-full'
          variant='ghost'
          onClick={increment}
          ariaLabel='Increment Item'
        >
          <AddCircle color='black' variant='Bold' />
        </Button>
        <span>{state.quantity}</span>
        <Button
          noPadding
          className='h-8 w-8 rounded-full'
          variant='ghost'
          onClick={decrement}
          ariaLabel='Decrement Item'
        >
          <MinusCirlce color='black' variant='Bold' />
        </Button>
      </div>
    );
};

export default QuantityInput;
