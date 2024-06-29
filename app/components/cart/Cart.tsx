'use client';

import { useCart } from 'react-use-cart';

import CartItem from './CartItem';

function Cart() {
  const { isEmpty, items } = useCart();

  if (isEmpty)
    return (
      <div>
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div className='rounded-md border border-gray-100 p-3 lg:max-w-4xl'>
      {items.map((p) => (
        <CartItem key={p.id} item={p} />
      ))}
    </div>
  );
}

export default Cart;
