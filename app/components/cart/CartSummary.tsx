'use client';
import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import { useEffect, useState } from 'react';
import ClientOnly from '../ClientOnly';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import { useCart } from '@/app/CartProvider';

const CartSummary = () => {
  const { cartState } = useCart();
  const { region } = useRegion();
  const [isClient, setIsClient] = useState(false);

  // Sanitize and convert price to number
  const sanitizeAndConvertPrice = (price: any): number => {
    if (typeof price === 'string') {
      // Remove commas and parse to float
      const sanitizedPrice = price.replace(/,/g, '');
      const parsedPrice = parseFloat(sanitizedPrice);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    return typeof price === 'number' ? price : 0;
  };

  const total = cartState.items.reduce((total, item) => {
    // Check if item and product are valid
    if (item?.product && !isNaN(parseFloat(item.product.price))) {
      // Convert price from string to number
      const price = sanitizeAndConvertPrice(item.product.price);
      const quantity = item.qty;
      return total + (price * quantity);
    }
    // If the item is invalid or price is not a number, skip this item
    return total;
  }, 0);
  


  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='hidden lg:block'>
      <ClientOnly>
        {cartState?.items?.length > 0 ? (
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
                  {total > 0 && (
                    <>
                      <ProductPrice
                        className='font-clashmd text-3xl text-myGray'
                        priceInNGN={total}
                        region={region}
                      />
                    </>
                  )}

                  <p className='mt-3 text-xs text-[#7C7C7C]'>
                    (Delivery fees not included yet)
                  </p>
                </div>
              </div>
              {isClient && total > 0 && (
                <Button
                  linkType='rel'
                  href={ROUTES.CHECKOUT}
                  className='mt-10 w-full border-0 shadow-none rounded-full p-4 font-clashmd text-base text-white'
                >
                  Checkout{' '}
                  <ProductPrice priceInNGN={total} region={region} />
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
