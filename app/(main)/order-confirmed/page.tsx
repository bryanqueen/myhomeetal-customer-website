import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';

function OrderConfirmedPage() {
  return (
    <main className='pb-20'>
      <div className='px-5 lg:px-[3%]'>
        <Link href='/' className='flex items-center text-sm text-myGray'>
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </Link>
      </div>
      <div className='flex flex-col items-center gap-10 px-[3%]'>
        <div className='mt-20 grid max-w-md justify-items-center text-center'>
          <Image src='/images/confetti.png' alt='Logo' width={76} height={76} />
          <p className='mb-2 mt-4 text-2xl font-bold lg:text-3xl'>
            Order Placed Successfully!
          </p>
          <p className='font-light text-myGray'>Order ID: #1562792771583</p>
        </div>
        <div className='mt-10 grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[3fr_1fr]'>
          <div>
            <OrderSummary />
            <ClientInfo />
          </div>
          <div className='self-start rounded-3xl px-5 py-10 lg:sticky lg:top-20 lg:bg-gray-100 lg:py-20'>
            <Button
              className='mb-3 w-full rounded-xl p-5'
              linkType='rel'
              href={ROUTES.HOME}
            >
              Continue Shopping
            </Button>
            <Button className='w-full rounded-xl bg-white p-5 text-black'>
              Track Orders
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

const OrderSummary = () => {
  return (
    <div>
      <div className='max-w-5xl lg:rounded-2xl lg:border lg:border-[#E4E7EC] lg:p-12'>
        <div className='w-full rounded-3xl border p-3 lg:border-0'>
          <div className='mb-3 pl-4'>
            <p className='font-semibold text-myGray'>Order Summary</p>
          </div>
          <div className='rounded-2xl border border-[#E4E7EC] p-3 px-5 pr-5'>
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
            <OrderItem />
          </div>
        </div>
        <div className='mt-5 w-full rounded-3xl border p-5 px-5'>
          <div className='mb-2 flex flex-col md:flex-row md:items-center md:justify-between'>
            <span>Amount:</span>
            <span className='font-bold'>#24,000</span>
          </div>
          <div className='mb-2 flex flex-col md:flex-row md:items-center md:justify-between'>
            <span>Payment method:</span>
            <span className='font-bold'>
              Online payment - flutterwave card payment
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderItem = () => {
  return (
    <div className='grid gap-3 border-b border-gray-100 py-5'>
      <div className='flex justify-between gap-3'>
        <div className='flex gap-3'>
          <div>
            <Image
              src='/images/product/samsung-galaxy.png'
              alt=''
              width='70'
              height='100'
            />
          </div>
          <div className='grid gap-2'>
            <p>
              Samsung Galaxy A14 6.6&quot; 4GB RAM/64GB ROM Android 13 - Light
              Green
            </p>
            <div className='flex items-center gap-2 text-xs'>
              <span>Brand: </span>
              <span className='rounded-full bg-primary/10 px-3 py-2'>
                Samsung
              </span>
            </div>
          </div>
        </div>
        <div className='min-w-fit font-bold text-gray-400'>₦ 3,850</div>
      </div>
    </div>
  );
};

const ClientInfo = () => {
  return (
    <div className='mt-10 w-full max-w-4xl lg:rounded-3xl lg:border lg:p-12'>
      <div className='w-full rounded-3xl border p-3 lg:border-0'>
        <div className='mb-3 flex items-center gap-3'>
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary/30'>
            2
          </span>
          <p>Client Information</p>
        </div>
        <div className='rounded-3xl border p-3 px-5 py-3 pr-5 text-sm'>
          <InfoItem title='Fullname' value='Olamide Akintan' />
          <InfoItem
            title='Email Address'
            value='OlamideAkintan@myhomeetal.com'
          />
          <InfoItem title='Phone Number' value='+234 9046505356' />
          <InfoItem
            title='Delivery Address'
            value='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
          />
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className='flex gap-3 border-b border-gray-100 p-3'>
      <Image src='/icons/users.svg' width='20' height='20' alt='' />
      <div className='grid'>
        <span className='text-xs text-gray-500'>{title}</span>
        <span>{value}</span>
      </div>
    </div>
  );
};

export default OrderConfirmedPage;
