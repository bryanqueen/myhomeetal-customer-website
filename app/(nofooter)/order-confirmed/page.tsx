'use client';
import Image from 'next/image';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import ProductPrice from '@/app/components/product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';

function OrderConfirmedPage() {
  return (
    <main className='pb-20 pt-20 lg:pt-0'>
      <div className='flex flex-col items-center gap-5 px-[3%] lg:gap-10'>
        <div className='mt-20 grid justify-items-center text-center'>
          <Image
            src='/images/confetti.png'
            alt='Logo'
            width={76}
            height={76}
            loading='lazy'
          />
          <h2 className='mb-2 mt-4 text-center font-clashmd text-sm lg:text-[39px]'>
            Order Placed Successfully!
          </h2>
          <p className='text-center text-[10px] text-[#979797] lg:text-base lg:text-myGray'>
            Order ID: #1562792771583
          </p>
        </div>
        <div className='lg:mt-10 min-w-full lg:mb-10'>
          <OrderSummary />
        </div>
        <Button
          className='mb-3 min-w-full rounded-xl border-0 p-5 font-clashmd text-base shadow-none lg:min-w-[600px]'
          linkType='rel'
          href={ROUTES.HOME}
        >
          Continue Shopping
        </Button>
      </div>
    </main>
  );
}

const OrderSummary = () => {
  const { region } = useRegion();
  return (
    <div className='w-full pb-5 pt-12 lg:rounded-[20px] lg:border lg:border-[#E4E7EC] lg:px-10'>
      <div className='w-full rounded-2xl border border-[#F4F4F4] lg:border-0'>
        <div className='mb-3 flex items-center justify-center gap-2 pt-6 lg:block lg:pl-4 lg:pt-0'>
          <div className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] font-clashmd text-[8px] text-black lg:hidden'>
            1
          </div>
          <p className='font-clashmd text-xs lg:text-base lg:text-myGray'>
            Order Summary
          </p>
        </div>
        <div className='grid gap-3 border-[#F4F4F4] px-2 lg:block lg:rounded-2xl lg:border lg:p-3 lg:px-5'>
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
      </div>
      <div className='mt-5 w-full rounded-[10px] border border-[#F4F4F4] p-5 px-5 lg:rounded-2xl lg:border-[#E4E7EC]'>
        <div className='mb-4 flex items-center justify-between text-[10px] text-myGray lg:text-base'>
          <span>Amount:</span>
          <ProductPrice
            priceInNGN={24000}
            region={region}
            className='font-clashmd text-sm lg:text-base'
          />
        </div>
        <div className='flex items-center justify-between text-[10px] text-myGray lg:text-base'>
          <span>Payment method:</span>
          <span className='font-clashmd'>
            Online payment - flutterwave card payment
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderItem = () => {
  const { region } = useRegion();
  return (
    <div className='grid gap-3 rounded-[7.33px] border-[0.46px] border-[#F4F4F4] px-3 py-5 lg:border-0 lg:border-b lg:px-0 lg:last:border-b-0'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-4 lg:max-w-[583px] lg:items-start lg:gap-5'>
          <div>
            <Image
              src='/images/product/save.png'
              alt='product image'
              width={95}
              height={95}
              loading='lazy'
              className='h-[43.5px] w-[43.52px] rounded-[10px] lg:h-[95px] lg:w-[95px] lg:rounded-3xl'
            />
          </div>
          <div className='grid gap-1'>
            <p className='max-w-[194px] font-clashmd text-[10px] text-myGray lg:max-w-full lg:text-base'>
              Samsung Galaxy A14 6.6&quot; 4GB RAM/64GB ROM Android 13 - Light
              Green
            </p>
            <div className='flex items-center gap-2 text-[10px] text-myGray lg:text-sm'>
              <span>Brand: </span>
              <span className='text-[#FF0003] lg:rounded-full lg:bg-[#FFF1F1] lg:px-3 lg:py-2 lg:text-myGray'>
                Samsung
              </span>
            </div>
          </div>
        </div>
        <div className='min-w-fit'>
          <ProductPrice
            priceInNGN={3450}
            region={region}
            className='font-clashmd text-sm text-black lg:text-[20px] lg:text-[#989898]'
          />
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmedPage;
