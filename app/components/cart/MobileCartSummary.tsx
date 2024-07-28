import React from 'react';
import { useCart } from 'react-use-cart';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';
import Button from '../Button';
import { useAddressBook } from '@/app/addressBookProvider';

export default function MobileCartSummary() {
  const { cartTotal, emptyCart } = useCart();
  const { region } = useRegion();
  const {setFirstStageCompleted} = useAddressBook();

  const clear = () => {
    setFirstStageCompleted(false);
    emptyCart();
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
              priceInNGN={cartTotal}
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
          <div className='mt-4 flex items-center justify-center '>
            <button onClick={clear} className='text-xs text-[#5E5E5E]'>Remove all</button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
