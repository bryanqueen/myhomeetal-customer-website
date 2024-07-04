'use client';
import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { useCart } from 'react-use-cart';

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
      <div>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className='rounded-xl border border-[#F4F4F4] p-3 lg:max-w-4xl'>
      {items.map(item => (
        <div key={item._id}>
          <CartItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default Cart;
