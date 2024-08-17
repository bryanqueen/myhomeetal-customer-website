'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Cart from '@/app/components/cart/Cart';
import CartSummary from '@/app/components/cart/CartSummary';
import { useRouter } from 'next/navigation';
import MobileCartSummary from '@/app/components/cart/MobileCartSummary';

import NoHistory from '@/app/components/account/NoHistory';
import ClientOnly from '@/app/components/ClientOnly';
import { useCart } from '@/app/CartProvider';
import { useCartActions } from '@/app/utils/helpers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HomeSkeleton } from '@/app/components/loader';

export default function CartPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const { cartState } = useCart();
  const { fetchCart } = useCartActions();

  const myFetch = async () => {
    try {
      await fetchCart();
    } catch (error) {
      console.log(error);
      toast.error('An error occured. Please try again');
    } finally {
      setLoading(false)
    }
  }
  const handleBack = () => {
    router.back();
  };

  useEffect(() => {
    myFetch();
  }, []);

  if (loading) {
    return (
      <div className='px-[3%]'>
        <HomeSkeleton />
      </div>
    )
  }

  return (
    <main className='min-h-[100vh] pb-20'>
      <div className='sticky top-[90px] hidden bg-white px-[3%] py-5 pt-[90px] lg:mt-0 lg:block lg:pt-0'>
        <button
          onClick={handleBack}
          className='flex items-center text-sm text-myGray'
        >
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </button>
      </div>
      <div className='px-[3%] lg:pt-0 pt-[85px]'>
        <h1 className='my-5 text-center font-clashmd text-xs text-black lg:text-start lg:text-3xl'>
          Shopping Cart
        </h1>
        <ClientOnly>
          {cartState?.items?.length > 0 ? (
            <>
              <div className='grid lg:min-h-[100vh] items-start gap-5 lg:grid-cols-[2fr_1fr]'>
                <div>
                  <Cart />
                </div>
                <div className='lg:sticky lg:top-[120px]'>
                  <CartSummary />
                </div>
              </div>
              <div className='lg:hidden'>
                <MobileCartSummary />
              </div>
            </>
          ) : (
            <div className='flex h-[60vh] items-center justify-center'>
              <NoHistory title='Your Cart is empty!' />
            </div>
          )}
        </ClientOnly>
      </div>
    </main>
  );
}
