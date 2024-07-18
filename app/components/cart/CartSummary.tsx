'use client';
import { useCart } from 'react-use-cart';
import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import { useEffect, useState } from 'react';
import ClientOnly from '../ClientOnly';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';

const CartSummary = () => {
  const { cartTotal, items } = useCart();
  const { region } = useRegion();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='hidden lg:block'>
      <ClientOnly>
        {items?.length > 0 ? (
          <div className='rounded-2xl bg-[#F4F4F4] px-4'>
            <p className='border-b border-[#DCDCDC] py-4 font-clashmd text-base text-myGray'>
              Cart Summary
            </p>
            <div className='py-4'>
              <div className='flex justify-between'>
                <span className='font-clashsm text-base text-myGray'>
                  Subtotal
                </span>
                <div className='text-right'>
                  {cartTotal > 0 && (
                    <>
                      <ProductPrice
                        className='font-clashmd text-3xl text-myGray'
                        priceInNGN={cartTotal}
                        region={region}
                      />
                    </>
                  )}

                  <p className='mt-3 text-xs text-[#7C7C7C]'>
                    (Delivery fees not included yet)
                  </p>
                </div>
              </div>
              {isClient && cartTotal > 0 && (
                <Button
                  linkType='rel'
                  href={ROUTES.CHECKOUT}
                  className='mt-10 w-full border-0 shadow-none rounded-full p-4 font-clashmd text-base text-white'
                >
                  Checkout{' '}
                  <ProductPrice priceInNGN={cartTotal} region={region} />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </ClientOnly>
    </div>
  );
};

export default CartSummary;
