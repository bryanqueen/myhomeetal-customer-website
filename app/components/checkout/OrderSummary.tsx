'use client';

import { useCart } from 'react-use-cart';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';

const OrderSummary = () => {
  const { cartTotal, totalItems } = useCart();

  return (
    <div className='rounded-2xl bg-[#F4F4F4]'>
      <div className='px-4'>
        <div className='border-b border-[#DCDCDC] pb-3 pt-4 font-semibold text-myGray'>
          Order Summary
        </div>
        <div className='border-b border-[#DCDCDC] py-3 text-sm'>
          <div className='mb-3 flex items-center justify-between text-base font-medium text-myGray'>
            <span>Order total ({totalItems})</span>
            <span>${cartTotal.toLocaleString()}</span>
          </div>
          <div className='flex items-center justify-between text-base font-medium text-myGray'>
            <span>Delivery fee</span>
            <span>${cartTotal.toLocaleString()}</span>
          </div>
        </div>
        <div className='flex justify-between pb-4 pt-3 text-myGray'>
          <span className='text-base font-medium'>Total</span>
          <div className='text-right'>
            <p className='text-2xl font-bold'>${cartTotal.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className='flex justify-between border-t border-[#DCDCDC] py-3 font-medium text-myGray'>
        <span className='pl-4'>Payment method:</span>
        <span className='pr-4'>Pay on delivery</span>
      </div>
      <div className='px-4 pb-5'>
        <Button
          linkType='rel'
          href={ROUTES.ORDER_CONFIRMED}
          className='mt-8 w-full rounded-full p-4'
        >
          Checkout ( ${cartTotal.toLocaleString()} )
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
