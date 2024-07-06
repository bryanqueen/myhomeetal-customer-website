'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from 'react-use-cart';
import CartItem from './CartItem';

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
    <div className='rounded-xl border border-[#F4F4F4] p-3 lg:max-w-4xl'>
      {items.map((item, index) => (
        <div key={item._id}>
          <CartItem item={item} isLast={index === items.length - 1} />
        </div>
      ))}
    </div>
  );
}

export default Cart;
