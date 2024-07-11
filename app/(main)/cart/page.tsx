'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Cart from '@/app/components/cart/Cart';
import CartSummary from '@/app/components/cart/CartSummary';
import { useRouter } from 'next/navigation';
import MobileCartSummary from '@/app/components/cart/MobileCartSummary';
import { useCart } from 'react-use-cart';
import NoHistory from '@/app/components/account/NoHistory';
import ClientOnly from '@/app/components/ClientOnly';

export default function CartPage() {
  const router = useRouter();
  const { isEmpty } = useCart();

  const handleBack = () => {
    router.back();
  };

  return (
    <ClientOnly>
      <main>
        <div className='pt-[90px] px-[3%] lg:mt-0'>
          <button
            onClick={handleBack}
            className='hidden items-center text-sm text-myGray lg:flex'
          >
            <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
            Back
          </button>
        </div>
        <div className='px-[3%]'>
          <h1 className='text-xs my-5 text-center font-clashmd text-black lg:text-start lg:text-3xl'>
            Shopping Cart
          </h1>
          {!isEmpty ? (
            <>
              <div className='grid items-start gap-5 lg:grid-cols-[2fr_1fr]'>
                <Cart />
                <CartSummary />
              </div>
              <div className='lg:hidden'>
                <MobileCartSummary />
              </div>
            </>
          ) : (
            <div className='h-[60vh] flex items-center justify-center'>
              <NoHistory title='Your Cart is empty!' />
            </div>
          )}
        </div>
      </main>
    </ClientOnly>
  );
}
