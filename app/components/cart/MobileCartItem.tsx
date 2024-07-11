import { TrashIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import React from 'react';
import CartHandler from './CartHandler';
import { Add, Minus } from 'iconsax-react';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';

export default function MobileCartItem({ item }: any) {
  const { region } = useRegion();
  return (
    <ClientOnly>
      <div className='relative flex h-[120px] w-full min-w-[300px] items-center rounded-[10px] bg-[#F4F4F4] px-2 py-5 lg:hidden'>
        <div className='flex h-[54px] max-w-[85%] items-center gap-4'>
          <Image
            src={item?.images[0]}
            width={54}
            height={54}
            alt='product image'
            className='h-[54px] w-[54px] rounded-[12.63px] object-contain'
          />
          <div className='flex h-full flex-col justify-between'>
            <h2 className='three-line-clamp text-xs text-myGray'>
              {item?.productTitle}
            </h2>
            <ProductPrice
              priceInNGN={item?.price}
              region={region}
              className='font-clashmd text-xs text-myGray'
            />
          </div>
        </div>
        <div className=' absolute bottom-[20px] right-[20px] top-[20px] flex w-[74px] flex-col justify-between'>
          <div className='flex justify-end'>
            <CartHandler
              item={item}
              variant='REMOVE'
              className='flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FF0003] text-white'
            >
              <TrashIcon width={13} />
            </CartHandler>
          </div>
          <div className='flex w-full justify-between'>
            <CartHandler
              cart
              item={item}
              variant='UPDATE_MINUS'
              className='flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#E1E1E1]'
              disabled={item?.quantity < 2}
            >
              <Minus size={15} />
            </CartHandler>
            <span className='font-clashmd text-xs text-[#656565]'>
              {item?.quantity}
            </span>
            <CartHandler
              item={item}
              variant='UPDATE_PLUS'
              className='flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#F8BCBC]'
            >
              <Add size={15} />
            </CartHandler>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
