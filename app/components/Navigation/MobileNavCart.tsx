'use client';

import { Trash, Minus, Add } from 'iconsax-react';
import { useCart } from 'react-use-cart';
import Image from 'next/image';

import { useNav } from '../../providers';

import Button from '@components/Button';
import CartHandler from '@components/cart/CartHandler';
import { ROUTES } from '@utils/routes';

const MobileNavCart = () => {
  const { isEmpty, items } = useCart();
  const { setActiveNav } = useNav();

  if (isEmpty)
    return (
      <div>
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div className='relative h-screen p-5'>
      <p className='text-lg font-medium'>My Cart</p>
      <p>Items in cart: {items.length}</p>
      <div className='mt-10 rounded-md lg:max-w-4xl'>
        {items.map((item) => (
          <div
            key={item.id}
            className='mb-5 grid gap-3 rounded-lg border-b bg-gray-100 px-3 py-5'
          >
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
                  <p className='font-medium'>Price: ${item.price}</p>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div>
                <CartHandler
                  item={item}
                  variant='REMOVE'
                  className='w-auto border-0 bg-transparent text-black'
                >
                  <Trash variant='Bulk' className='text-gray-500' />
                  Remove
                </CartHandler>
              </div>
              <div className='flex gap-3'>
                <CartHandler
                  item={item}
                  variant='UPDATE_MINUS'
                  className='w-auto rounded-full bg-black p-0'
                >
                  <Minus />
                </CartHandler>
                <span>{item.quantity}</span>
                <CartHandler
                  item={item}
                  variant='UPDATE_PLUS'
                  className='w-auto rounded-full bg-black p-0'
                >
                  <Add />
                </CartHandler>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button
        className='my-10 w-full rounded-full p-5'
        linkType='rel'
        href={ROUTES.CHECKOUT}
        onClick={() => setActiveNav(null)}
      >
        Checkout now
      </Button>
    </div>
  );
};

export default MobileNavCart;
