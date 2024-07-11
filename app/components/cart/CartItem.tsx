'use client';

import { Trash, Minus, Add } from 'iconsax-react';
import Image from 'next/image';

import CartHandler from './CartHandler';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';

const CartItem = ({ item, isLast }: { item: any; isLast: boolean }) => {
  const { region } = useRegion();
  return (
    <div
      className={`hidden gap-3 lg:grid lg:min-w-[851px] ${!isLast ? 'border-b border-gray-100' : ''} py-5 pr-2`}
    >
      <div className='flex justify-between gap-3'>
        <div className='flex items-center gap-2'>
          <div className='h-[95px] w-[95px]'>
            <Image
              src={item?.images[0]}
              alt=''
              width={100}
              height={100}
              className='h-full w-full rounded-3xl object-contain'
            />
          </div>
          <div className='h-[95px]'>
            <div className='pt-1'>
              <p className='mb-3 max-w-[450px] text-base text-myGray'>
                {item?.productTitle}
              </p>
              <div className='flex items-center gap-2 text-sm text-myGray'>
                <span>Brand: </span>
                <span className='rounded-full bg-[#FFE0E0] px-6 py-2'>
                  {item?.brand}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex items-center'>
          <ProductPrice
            className='font-clashmd text-xl text-myGray'
            priceInNGN={item?.price}
            region={region}
          />
        </div>
      </div>
      <div className='mt-1 flex items-center justify-between'>
        <div>
          <CartHandler
            item={item}
            variant='REMOVE'
            className='flex w-auto border-0 bg-transparent text-sm text-myGray'
          >
            <span className='flex items-center gap-1'>
              {' '}
              <Trash size={24} variant='Bold' color='#B22222' />
              Remove
            </span>
          </CartHandler>
        </div>
        <div className='flex gap-3'>
          <CartHandler
            cart
            item={item}
            variant='UPDATE_MINUS'
            className='w-auto rounded-lg border-0 p-[2px]'
            disabled={item?.quantity < 2}
          >
            <Minus size={23} />
          </CartHandler>
          <span className='font-clashmd text-base text-myGray'>
            {item?.quantity}
          </span>
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
