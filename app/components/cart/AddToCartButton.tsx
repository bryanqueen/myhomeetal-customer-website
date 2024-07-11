'use client';

import React from 'react';
import CartHandler from './CartHandler';
import { useItemQuantity } from '@/app/providers';

const AddToCartButton = ({ item }: any) => {
  const { state } = useItemQuantity();

  if (!item.id) {
    console.error("Product item missing required 'id' property");
    return null; // Or handle the error differently
  }

  return (
    <CartHandler
      className='w-full shadow-none border-0 rounded-full px-10 py-5 text-base font-clashmd'
      item={item}
      variant='ADD'
      quantity={state.quantity}
    >
      Add to cart
    </CartHandler>
  );
};

export default AddToCartButton;
