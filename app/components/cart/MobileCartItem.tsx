'use client';
import { TrashIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import React from 'react';
import { Add, Minus } from 'iconsax-react';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';
import { useCartActions } from '@/app/utils/helpers';

export default function MobileCartItem({ item }: any) {
  const { region } = useRegion();
  const { removeItemFromCart, addItemToCart, updateCartItem } = useCartActions();

  const handleAddToCart = () => {
    addItemToCart({ id: item?.product._id, name: item.product.productTitle, price: item.product.price, quantity: item?.qty });
  };
  return (
    <ClientOnly>
      <div className='relative flex h-[120px] w-full min-w-[300px] items-center rounded-[10px] bg-[#F4F4F4] px-2 py-5 lg:hidden'>
        <div className='flex h-[54px] max-w-[85%] items-center gap-4'>
          <Image
            src={item?.product?.images[0]}
            width={54}
            height={54}
            alt='product image'
            className='h-[54px] w-[54px] rounded-[12.63px] object-contain'
          />
          <div className='flex h-full flex-col justify-between'>
            <h2 className='three-line-clamp text-xs text-myGray'>
              {item?.product?.productTitle}
            </h2>
            <ProductPrice
              priceInNGN={item?.product?.price}
              region={region}
              className='font-clashmd text-xs text-myGray'
            />
          </div>
        </div>
        <div className=' absolute bottom-[20px] right-[20px] top-[20px] flex w-[74px] flex-col justify-between'>
          <div className='flex justify-end'>
            <button
              onClick={() => removeItemFromCart(item?.product?._id)}
              className='flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FF0003] text-white'
            >
              <TrashIcon width={13} />
            </button>
          </div>
          <div className='flex w-full justify-between'>
            <button
              onClick={() => updateCartItem(item?.product?._id)}
              className='flex h-[17px] w-[17px] items-center text-white justify-center rounded-full bg-[#E1E1E1]'
              disabled={item?.qty < 2}
            >
              <Minus size={15} />
            </button>
            <span className='font-clashmd text-xs text-[#656565]'>
              {item?.qty}
            </span>
            <button
              onClick={handleAddToCart}
              className='flex h-[17px] text-white w-[17px] items-center justify-center rounded-full bg-[#F8BCBC]'
            >
              <Add size={15} />
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
