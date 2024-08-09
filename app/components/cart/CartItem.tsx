'use client';

import { Trash, Minus, Add } from 'iconsax-react';
import Image from 'next/image';

import CartHandler from './CartHandler';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';
import { useCartActions } from '@/app/utils/helpers';

const CartItem = ({ item, isLast }: { item: any; isLast: boolean }) => {
  const { region } = useRegion();
  const { removeItemFromCart, addItemToCart, updateCartItem } = useCartActions();

  const handleAddToCart = () => {
    addItemToCart({ id: item?.product._id, name: item.product.productTitle, price:item.product.price, quantity: item?.qty });
  };
  const handleUpdateCart = () => {
    updateCartItem({ id: item?.product._id, name: item.product.productTitle, price:item.product.price, quantity: item?.qty });
  };

  return (
    <ClientOnly>
      <div
        className={`hidden gap-3 lg:grid lg:min-w-[851px] ${!isLast ? 'border-b border-gray-100' : ''} py-5 pr-2`}
      >
        <div className='flex justify-between gap-3'>
          <div className='flex items-center gap-2'>
            <div className='h-[95px] w-[95px]'>
              <Image
                src={item?.product.images[0]}
                alt=''
                width={100}
                height={100}
                className='h-full w-full rounded-3xl object-contain'
              />
            </div>
            <div className='h-[95px]'>
              <div className='pt-1'>
                <p className='mb-3 max-w-[450px] text-base text-myGray'>
                  {item?.product.productTitle}
                </p>
                <div className='flex items-center gap-2 text-sm text-myGray'>
                  <span>Brand: </span>
                  <span className='rounded-full bg-[#FFE0E0] px-6 py-2'>
                    {item?.product.brand}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <ProductPrice
              className='font-clashmd text-xl text-myGray'
              priceInNGN={item?.product.price}
              region={region}
            />
          </div>
        </div>
        <div className='mt-1 flex items-center justify-between'>
          <div>
            <button
              onClick={() => removeItemFromCart(item?.product._id)}
              className='flex p-2 w-auto border-0 bg-transparent text-sm text-myGray'
            >
              <span className='flex items-center gap-1'>
                {' '}
                <Trash size={24} variant='Bold' color='#B22222' />
                  Remove
              </span>
            </button>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={() => updateCartItem(item?.product._id)}
              className='w-auto bg-primary text-white rounded-lg border-0 p-[2px]'
              disabled={item?.qty < 2}
            >
              <Minus size={23} />
            </button>
            <span className='font-clashmd text-base text-myGray'>
              {item?.qty}
            </span>
            <button
              onClick={handleAddToCart}
              className='w-auto bg-primary text-white rounded-lg border-0 p-[2px]'
            >
              <Add size={23} />
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default CartItem;
