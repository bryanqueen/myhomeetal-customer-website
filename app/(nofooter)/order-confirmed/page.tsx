import OrderConfirm from '@/app/components/checkout/OrderConfirm';
import { Suspense } from 'react';

function OrderConfirmedPage() {
  return (
    <main className='pb-20 pt-20 lg:pt-0'>
      <Suspense>
        <OrderConfirm />
      </Suspense>
    </main>
  );
}

export default OrderConfirmedPage;
