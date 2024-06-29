'use client';

import { useCart } from 'react-use-cart';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';

const OrderSummary = () => {
  const { cartTotal, totalItems } = useCart();

  return (
    <div className='rounded-3xl bg-gray-100 p-3'>
      <div className='border-b border-gray-200 py-3 text-sm font-medium'>
        Order Summary
      </div>
      <div className='border-b border-gray-200 py-3 text-sm'>
        <div className='flex items-center justify-between'>
          <span>Order total ({totalItems})</span>
          <span className='text-lg font-bold'>
            ${cartTotal.toLocaleString()}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <span>Delivery fee</span>
          <span className='text-lg'>${cartTotal.toLocaleString()}</span>
        </div>
      </div>
      <div className='flex justify-between border-b border-gray-200 py-3'>
        <span>Total</span>
        <div className='text-right'>
          <p className='text-2xl font-bold'>${cartTotal.toLocaleString()}</p>
        </div>
      </div>
      <div className='flex justify-between py-3'>
        <span>Payment method:</span>
        <span>Pay on delivery</span>
      </div>
      <Button
        linkType='rel'
        href={ROUTES.ORDER_CONFIRMED}
        className='mt-8 w-full rounded-full p-4'
      >
        Checkout ( ${cartTotal.toLocaleString()} )
      </Button>
    </div>
  );
};

export default OrderSummary;
