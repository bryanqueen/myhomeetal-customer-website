'use client';

import CartItem from '../cart/CartItem';
import Button from '../Button';
import Image from 'next/image';
import ClientOnly from '../ClientOnly';
import { usePopup } from '@/app/PopupProvider';
import MobileCartItem from '../cart/MobileCartItem';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/CartProvider';

export default function AddToCartPopup({ data }: { data: any }) {
  const { isPopupVisible, hidePopup } = usePopup();
  const { cartState } = useCart();
  const itemInCart = cartState.items.find((item) => item?.product?._id === data?._id);
  const router = useRouter();

  const handleGotoCheckout = () => {
    hidePopup();
    router.push('/checkout');
  }

  if (!data && !isPopupVisible) {
    return null; // Return null if data is undefined or null
  }

  return (
    <ClientOnly>
      {isPopupVisible && (
        <div className='fixed bottom-0 left-0 right-0 top-0 z-[1000] bg-[#292929]/50 lg:z-30 lg:block'>
          <div className='relative mt-[70px] flex h-full w-full items-center justify-center px-[3%] lg:px-0'>
            <div className='relative mt-[-200px] flex min-h-[300px] w-full flex-col items-center justify-between rounded-2xl bg-white px-[15px] py-[30px] lg:mt-0 lg:h-[431px] lg:w-[1016px] lg:rounded-[30px] lg:px-[83px] lg:py-[51px]'>
              <button
                onClick={hidePopup}
                className='absolute right-4 top-4 flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#030303]/20 lg:right-5 lg:top-5 lg:h-[34px] lg:w-[34px] lg:border-[#030303]'
              >
                <Image
                  src='/icons/X.svg'
                  width={12}
                  height={10}
                  alt='x-icon'
                  className='w-[7px] lg:w-[12px]'
                />
              </button>
              <h2 className='text-center text-lg text-black lg:text-[25px]'>
                Shopping Cart
              </h2>
              <div className='w-full'>
                <CartItem item={itemInCart} isLast />
                <MobileCartItem item={itemInCart} />
              </div>
              <div className='mt-3 flex items-center justify-center lg:mt-0'>
                <Button
                  onClick={handleGotoCheckout}
                  className='l:h-[60px] l:w-[461px] flex h-[50px] w-[250px] items-center justify-center rounded-full border-0 font-clashmd text-sm text-white shadow-none lg:text-base'
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
