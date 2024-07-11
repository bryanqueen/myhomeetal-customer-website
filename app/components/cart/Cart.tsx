'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import CartItem from './CartItem';
import MobileCartItem from './MobileCartItem';

function Cart() {
  const { items, isEmpty } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // While waiting for hydration, render nothing or a loading indicator
    return <div>Loading...</div>;
  }

  if (isEmpty) {
    return (
      <div className='h-[250px]'>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className='lg:rounded-2xl lg:border lg:border-[#F4F4F4] lg:p-3 lg:max-w-4xl'>
      <div className='hidden lg:block'>
        {items?.map((item, index) => (
          <div key={item?._id}>
            <CartItem item={item} isLast={index === items?.length - 1} />
          </div>
        ))}
      </div>
      <div className='grid gap-5 lg:hidden'>
        {items?.map((item) => (
          <div key={item?._id}>
            <MobileCartItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;
