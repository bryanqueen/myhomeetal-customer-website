'use client';

import { useCart } from 'react-use-cart';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';

const CartSummary = () => {
  const { cartTotal } = useCart();

  return (
    <div className='rounded-3xl bg-gray-100 p-3'>
      <p className='border-b border-gray-200 py-3 text-sm font-medium'>
        Cart Summary
      </p>
      <div className='flex justify-between'>
        <span>Subtotal</span>
        <div className='text-right'>
          <p className='text-2xl font-bold'>${cartTotal.toLocaleString()}</p>
          <p className='text-xs'>(Delivery fees not included yet)</p>
        </div>
      </div>
      <Button
        linkType='rel'
        href={ROUTES.CHECKOUT}
        className='mt-8 w-full rounded-full p-4'
      >
        Checkout ( ${cartTotal.toLocaleString()} )
      </Button>
    </div>
  );
};

export default CartSummary;
