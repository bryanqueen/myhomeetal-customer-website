'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import CheckoutForm from '@components/checkout/CheckoutForm';
import { useCart } from 'react-use-cart';
import { useRouter } from 'next/navigation';

function CheckoutPage() {
  const router = useRouter();
  const { isEmpty } = useCart();

  const handleBack = () => {
    router.back();
  };
  return (
    <main className='pb-20'>
      <div className='px-[3%] pt-[90px] lg:mt-0 lg:pt-0'>
        <button
          onClick={handleBack}
          className='hidden items-center text-sm text-myGray lg:flex'
        >
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </button>
      </div>
      <div className='px-5 lg:px-[3%]'>
        <h1 className='mb-10 mt-5 font-clashmd text-3xl'>Checkout process</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}

export default CheckoutPage;
