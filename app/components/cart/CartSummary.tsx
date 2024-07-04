'use client';
import { useCart } from 'react-use-cart';
import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import { useEffect, useState } from 'react';

const CartSummary = () => {
  const { cartTotal, items } = useCart();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div>
      {items.length > 0 ? (
        <div className='rounded-2xl bg-[#F4F4F4] px-4'>
      <p className='border-b border-[#DCDCDC] py-4 font-semibold text-myGray'>
        Cart Summary
      </p>
      <div className='py-4'>
        <div className='flex justify-between'>
          <span className='text-myGray'>Subtotal</span>
          <div className='text-right'>
            {isClient && cartTotal > 0 && (
              <p className='mb-1 text-3xl font-semibold text-myGray'>
                ${cartTotal.toLocaleString()}
              </p>
            )}

            <p className='text-xs text-[#7C7C7C]'>
              (Delivery fees not included yet)
            </p>
          </div>
        </div>
        {isClient && cartTotal > 0 && (
          <Button
            linkType='rel'
            href={ROUTES.CHECKOUT}
            className='mt-8 w-full rounded-full p-4 font-semibold'
          >
            Checkout ( ${cartTotal.toLocaleString()} )
          </Button>
        )}
      </div>
    </div>
      ): (
        <div></div>
      )}
    </div>
    
  );
};

export default CartSummary;
