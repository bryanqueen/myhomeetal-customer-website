import React from 'react';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';
import Button from '../Button';
import { useAddressBook } from '@/app/addressBookProvider';
import { useCart } from '@/app/CartProvider';

export default function MobileCartSummary() {
  const {cartState} = useCart();
  const { region } = useRegion();
  const {setFirstStageCompleted} = useAddressBook();

  const total = cartState.items.reduce((total, item) => {
    // Convert price from string to number and multiply by quantity
    const price = parseFloat(item.product.price);
    const quantity = item.qty;
    return total + (price * quantity);
  }, 0);

  const clear = () => {
    setFirstStageCompleted(false);
    //emptyCart();
  }
  return (
    <ClientOnly>
      <div>
        <div className='mt-5 flex h-[87px] items-center justify-between rounded-[10px] border border-[#f4f4f4] px-[25px] py-[26px]'>
          <div>
            <p className='text-xs text-myGray'>Subtotal:</p>
          </div>
          <div className='w-fit'>
            <ProductPrice
              priceInNGN={total}
              region={region}
              className='font-clashmd text-base text-myGray text-end'
            />
            <p className='mt-[5px] text-[10px] text-[#7C7C7C]'>
              (Delivery fees not included)
            </p>
          </div>
        </div>
        <div className='mt-10'>
          <Button
            href='/checkout'
            linkType='rel'
            className='flex h-[50px] w-full items-center justify-center rounded-[10px] border-0 bg-primary font-clashmd text-base text-white shadow-none'
          >
            Checkout now
          </Button>
          <div className='mt-4 hidden items-center justify-center '>
            <button onClick={clear} className='text-xs text-[#5E5E5E]'>Remove all</button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
