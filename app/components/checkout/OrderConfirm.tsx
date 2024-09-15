'use client';
import Image from 'next/image';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import ProductPrice from '@/app/components/product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCartActions } from '@/app/utils/helpers';

export default function OrderConfirm() {
  const searchParams = useSearchParams();
  const [orderItems, setOrderItems] = useState([]);
  const orderInfo = decodeURIComponent(searchParams.get('id') || '');
  const order = orderInfo.split('-');
  const amount = order[1] || '0'; // Default value if undefined
  const paymentMethod = order[2] ? order[2].toLowerCase() : '';
  const { fetchCart } = useCartActions();

  const myFetch = async () => {
    try {
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    myFetch();
    // Retrieve orderItems from local storage
    const storedOrderItems = localStorage.getItem('orderItems');
    if (storedOrderItems) {
      setOrderItems(JSON.parse(storedOrderItems));
    }
  }, []);
  return (
    <div>
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
          {order && (
            <p className='text-center text-[10px] text-[#979797] lg:text-base lg:text-myGray'>
              Order ID: #{order[0]}
            </p>
          )}
        </div>
        <div className='min-w-full lg:mb-10 lg:mt-10'>
          <OrderSummary
            amount={amount}
            paymentMethod={paymentMethod}
            orderItems={orderItems}
          />
        </div>
        <Button
          className='mb-3 min-w-full rounded-xl border-0 p-3 font-clashmd text-base shadow-none lg:min-w-[600px] lg:p-5'
          linkType='rel'
          href={ROUTES.HOME}
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}

const OrderSummary = ({ amount, paymentMethod, orderItems }) => {
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
        {orderItems && (
          <div className='grid gap-3 border-[#F4F4F4] p-2 lg:block lg:rounded-2xl lg:border lg:p-3 lg:px-5'>
            {orderItems.map((item: any) => (
              <OrderItem
                name={item.name}
                key={item.product}
                price={item.price}
                images={item.images}
                brand={item.brand}
              />
            ))}
          </div>
        )}
      </div>
      <div className='mt-5 w-full rounded-[10px] border border-[#F4F4F4] p-5 px-5 lg:rounded-2xl lg:border-[#E4E7EC]'>
        <div className='mb-4 flex items-center justify-between text-[10px] text-myGray lg:text-base'>
          <span>Amount:</span>
          <ProductPrice
            priceInNGN={Number(amount)}
            region={region}
            className='font-clashmd text-sm lg:text-base'
          />
        </div>
        <div className='flex items-center justify-between text-[10px] text-myGray lg:text-base'>
          <span>Payment method:</span>
          <span className='font-clashmd'>
            {paymentMethod === 'wallet'
              ? 'Wallet payment'
              : ` Online payment`}
          </span>
        </div>
      </div>
    </div>
  );
};

const OrderItem = ({ name, images, brand, price }) => {
  const { region } = useRegion();
  return (
    <div className='grid gap-3 rounded-[7.33px] border-[0.46px] border-[#F4F4F4] px-3 py-5 lg:border-0 lg:border-b lg:px-0 lg:last:border-b-0'>
      <div className='flex items-center justify-between gap-3'>
        <div className='flex items-center gap-4 lg:max-w-[583px] lg:items-start lg:gap-5'>
          <div>
            <Image
              src={images[0]}
              alt='product image'
              width={95}
              height={95}
              loading='lazy'
              className='h-[43.5px] w-[43.52px] rounded-[10px] lg:h-[95px] lg:w-[95px] lg:rounded-3xl'
            />
          </div>
          <div className='grid gap-1'>
            <p className='max-w-[194px] font-clashmd text-[10px] text-myGray lg:max-w-full lg:text-base'>
              {name}
            </p>
            <div className='flex items-center gap-2 text-[10px] text-myGray lg:text-sm'>
              <span>Brand: </span>
              <span className='text-[#FF0003] lg:rounded-full lg:bg-[#FFF1F1] lg:px-3 lg:py-2 lg:text-myGray'>
                {brand}
              </span>
            </div>
          </div>
        </div>
        <div className='min-w-fit'>
          <ProductPrice
            priceInNGN={price}
            region={region}
            className='font-clashmd text-sm text-black lg:text-[20px] lg:text-[#989898]'
          />
        </div>
      </div>
    </div>
  );
};
