'use client';
import { useCart } from 'react-use-cart';
import CartItem from '../cart/CartItem';
import Button from '../Button';
import Image from 'next/image';
import ClientOnly from '../ClientOnly';
import { usePopup } from '@/app/PopupProvider';

export default function AddToCartPopup({ data }: any) {
  const { isPopupVisible, hidePopup } = usePopup();
  const { items, isEmpty } = useCart();
  const itemInCart = items.find((item) => item.id === data?._id);

  if (isEmpty) {
    return (
      <ClientOnly>
        <></>
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      {isPopupVisible && (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-30 hidden bg-[#292929]/50 lg:block'>
          <div className='relative mt-[70px] flex h-full w-full items-center justify-center'>
            <div className='relative flex h-[431px] w-[1016px] flex-col items-center justify-between rounded-[30px] bg-white px-[83px] py-[51px]'>
              <button
                onClick={hidePopup}
                className='absolute right-5 top-5 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-[#030303]'
              >
                <Image src='/icons/X.svg' width={12} height={10} alt='x-icon' />
              </button>
              <h2 className='text-center text-[25px] text-black'>
                Shopping Cart
              </h2>
              <div className=''>
                <CartItem item={itemInCart} isLast />
              </div>
              <div className='flex items-center justify-center'>
                <Button
                  href='/checkout'
                  linkType='rel'
                  className='flex h-[60px] w-[461px] items-center justify-center rounded-full border-0 font-clashmd text-base text-white shadow-none'
                >
                  Go to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </ClientOnly>
  );
}
