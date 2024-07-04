'use client';

import CartHandler from './CartHandler';

import { useItemQuantity } from '@/app/providers';

const AddToCartButton = ({ item }: any) => {
  if (!item.id) {
    console.error("Product item missing required 'id' property");
    return null;  // Or handle the error differently
  }
  const { state } = useItemQuantity();

  return (
    <CartHandler
      className='w-full rounded-full px-10 py-5 font-semibold text-base'
      item={item}
      variant='ADD'
      quantity={state.quantity}
    >
      Add to cart
    </CartHandler>
  );
};

export default AddToCartButton;
