import { ArrowLeft } from 'iconsax-react';
import Link from 'next/link';

import OrderSummary from '@components/checkout/OrderSummary';
import CheckoutForm from '@components/checkout/CheckoutForm';

function CheckoutPage() {
  return (
    <main className='pb-20'>
      <div className='px-5 lg:px-10'>
        <Link href='/' className='flex'>
          <ArrowLeft />
          Back
        </Link>
      </div>
      <div className='px-5 lg:px-10'>
        <h1 className='my-5 text-2xl font-bold'>Checkout process</h1>
        <CheckoutForm />
      </div>
    </main>
  );
}

export default CheckoutPage;
