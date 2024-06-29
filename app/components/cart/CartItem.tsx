'use client';

import { Trash, Minus, Add } from 'iconsax-react';
import Image from 'next/image';

import CartHandler from './CartHandler';

const CartItem = ({ item }: any) => {
  return (
    <div className='grid gap-3 border-b border-gray-100 py-5'>
      <div className='flex justify-between gap-3'>
        <div className='flex gap-3'>
          <div>
            <Image
              src='/images/product/samsung-galaxy.png'
              alt=''
              width='70'
              height='100'
            />
          </div>
          <div className='grid gap-2'>
            <p>{item.title}</p>
            <div className='flex items-center gap-2 text-xs'>
              <span>Brand: </span>
              <span className='rounded-full bg-primary/20 p-3'>Samsung</span>
            </div>
          </div>
        </div>
        <div className='grid'>
          <span>${item.price}</span>
          <span className='text-xs'>${item.price}</span>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div>
          <CartHandler
            item={item}
            variant='REMOVE'
            className='w-auto border-0 bg-transparent text-black'
          >
            <Trash variant='Bulk' className='text-red-800' />
            Remove
          </CartHandler>
        </div>
        <div className='flex gap-3'>
          <CartHandler
            item={item}
            variant='UPDATE_MINUS'
            className='w-auto p-0'
          >
            <Minus />
          </CartHandler>
          <span>{item.quantity}</span>
          <CartHandler item={item} variant='UPDATE_PLUS' className='w-auto p-0'>
            <Add />
          </CartHandler>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
