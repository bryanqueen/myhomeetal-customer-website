'use client';

import CartHandler from './CartHandler';

import { useItemQuantity } from '@/app/providers';

const AddToCartButton = ({ item }: any) => {
  const { state } = useItemQuantity();

  return (
    <CartHandler
      className='w-full rounded-full p-5'
      item={item}
      variant='ADD'
      quantity={state.quantity}
    >
      Add to cart
    </CartHandler>
  );
};

export default AddToCartButton;
