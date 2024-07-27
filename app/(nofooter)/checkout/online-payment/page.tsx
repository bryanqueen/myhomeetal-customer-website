'use client';
import Button from '@/app/components/Button';
import RexpayPayment from '@/app/components/checkout/RexpayPayment';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useCart } from 'react-use-cart';
import ClientOnly from '@/app/components/ClientOnly';
import ProductPrice from '@/app/components/product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';

const PayWithSpay = dynamic(
  () => import('@/app/components/checkout/SpayPayment'),
  { ssr: false }
);

export default function OnlinePaymentPage() {
  const { cartTotal } = useCart();
  const { region } = useRegion();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const [activePaymentMethod, setActivePaymentMethod] = useState<string | null>(
    null
  );

  const renderPaymentComponent = () => {
    switch (activePaymentMethod) {
      case 'spay':
        return <PayWithSpay cartTotal={cartTotal} />;
      case 'rexpay':
        return <RexpayPayment />;
    }
  };
  return (
    <main className='pb-20 pt-[100px] lg:pt-0'>
      <div className='hidden px-[3%] pt-[90px] lg:mt-0 lg:block lg:pt-0'>
        <button
          onClick={handleBack}
          className='hidden items-center text-sm text-myGray lg:flex'
        >
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </button>
      </div>
      <ClientOnly>
        <div className='mt-20 grid px-[3%] lg:grid-cols-2'>
          <div className='flex items-center'>
            <div className='w-fit'>
              <h1 className='font-clashmd text-xl text-black lg:text-[31px]'>
                Pay <ProductPrice priceInNGN={cartTotal + 60} region={region} />{' '}
                with
              </h1>
              <p className='mt-1 max-w-[80%] text-xs text-[#525252] lg:max-w-[500px] lg:text-base lg:leading-[19.68px]'>
                All transactions are safe and secure. Your financial information
                is encrypted and protected.
              </p>
              <aside className='mt-14 grid gap-5'>
                <Button
                  className={`${activePaymentMethod !== 'spay' && 'bg-[#F4F4F4F4] text-black'} h-[80px] w-full min-w-full justify-start rounded-2xl border-0 pl-8 font-clashmd text-base shadow-none lg:h-[94px] lg:min-w-[528px]`}
                  onClick={() => setActivePaymentMethod('spay')}
                >
                  Spay
                </Button>

                <Button
                  className={`${activePaymentMethod !== 'rexpay' && 'bg-[#F4F4F4F4] text-black'} h-[80px] w-full min-w-full justify-start rounded-2xl border-0 pl-8 font-clashmd text-base shadow-none lg:h-[94px] lg:min-w-[528px]`}
                  onClick={() => setActivePaymentMethod('rexpay')}
                >
                  Rexpay
                </Button>
              </aside>
            </div>
          </div>

          {activePaymentMethod && (
            <div
              onClick={() => {
                setActivePaymentMethod('');
                window.location.reload();
              }}
              className='absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50'
            >
              {renderPaymentComponent()}
            </div>
          )}
        </div>
      </ClientOnly>
    </main>
  );
}
