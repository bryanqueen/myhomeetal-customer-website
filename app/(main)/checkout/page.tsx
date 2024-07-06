import Link from 'next/link';
import CheckoutForm from '@components/checkout/CheckoutForm';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

function CheckoutPage() {
  return (
    <main className='pb-20'>
      <div className='px-5 lg:px-[3%]'>
        <Link href='/' className='flex items-center text-sm text-myGray'>
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </Link>
      </div>
      <div className='px-5 lg:px-[3%]'>
        <h1 className='mb-10 mt-5 text-3xl font-bold'>Checkout process</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}

export default CheckoutPage;
