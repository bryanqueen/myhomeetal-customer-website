'use client';

import { Trash, Minus, Add } from 'iconsax-react';
import Image from 'next/image';

import CartHandler from './CartHandler';

const CartItem = ({ item, isLast }: { item: any; isLast: boolean }) => {
  return (
    <div
      className={`grid gap-3 ${!isLast ? 'border-b border-gray-100' : ''} py-5 pr-2`}
    >
      <div className='flex justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <div className='h-[95px] w-[95px]'>
            <Image
              src={item.images[0]}
              alt=''
              width={100}
              height={100}
              className='h-full w-full rounded-3xl object-contain'
            />
          </div>
          <div className='flex items-center'>
            <div className='py-1'>
              <p className='mb-3 max-w-[450px] font-bold text-myGray'>
                {item.productTitle}
              </p>
              <div className='flex items-center gap-2 text-sm text-myGray'>
                <span>Brand: </span>
                <span className='rounded-full bg-[#FFE0E0] px-6 py-2'>
                  {item.brand}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <p className='text-xl font-bold text-myGray'>${item.price}</p>
        </div>
      </div>
      <div className='mt-1 flex items-center justify-between'>
        <div>
          <CartHandler
            item={item}
            variant='REMOVE'
            className='w-auto border-0 bg-transparent text-sm text-myGray'
          >
            <Trash size={24} variant='Bold' color='#B22222' />
            Remove
          </CartHandler>
        </div>
        <div className='flex gap-3'>
          <CartHandler
            cart
            item={item}
            variant='UPDATE_MINUS'
            className='w-auto rounded-lg border-0 p-[2px]'
          >
            <Minus size={23} />
          </CartHandler>
          <span className='text-myGray'>{item.quantity}</span>
          <CartHandler
            item={item}
            variant='UPDATE_PLUS'
            className='w-auto rounded-lg border-0 p-[2px]'
          >
            <Add size={23} />
          </CartHandler>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
