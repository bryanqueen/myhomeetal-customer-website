'use client';
import React, { useState } from 'react';
import NoHistory from './NoHistory';
import Image from 'next/image';
import cn from 'classnames';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';

/*const ordersData = [
  {
    id: '#2349201',
    product:
      'Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13 - Light Green',
    status: 'Completed',
    price: 2000, // Can be 'Pending', 'Completed', 'Cancelled', etc.
  },
  {
    id: '#2349202',
    product: 'Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13 - Light Blue',
    status: 'Pending',
    price: 2000,
  },
  {
    id: '#2349203',
    product: 'Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13 - Black',
    status: 'Completed',
    price: 2000,
  },
  {
    id: '#2349204',
    product: 'Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13 - Red',
    status: 'Ongoing',
    price: 2000,
  },
  {
    id: '#2349205',
    product: 'Samsung Galaxy A14 6.6" 4GB RAM/64GB ROM Android 13 - White',
    status: 'Completed',
    price: 2000,
  },
]; */

export default function PurchasingHistory() {
  const [orders, setOrders] = useState([]);
  const { region } = useRegion();
  return (
    <div>
      {orders.length < 1 ? (
        <div className='flex min-h-[80vh] items-center justify-center'>
          <NoHistory title='No Purchase History Yet' />
        </div>
      ) : (
        <div className='lg:mt-10 grid gap-5'>
          {orders.map((order, i) => (
            <div
              key={i}
              className='flex max-w-[957px] items-center gap-4 rounded-[20px] bg-[#F4F4F4]/95 px-3 py-4 lg:gap-10 lg:rounded-[28px] lg:bg-[#F4F4F4] lg:px-9 lg:py-[30px]'
            >
              <Image
                className='h-[75px] w-[75px] rounded-[15px] object-contain lg:h-[95px] lg:w-[95px] lg:rounded-3xl'
                src='/images/product/save.png'
                alt=''
                width={95}
                height={95}
              />
              <div className='lg:hidden grid gap-1'>
                <p className='mb-1 max-w-[475px] text-xs text-black'>
                  {order.product}
                </p>
                <ProductPrice
                  priceInNGN={order.price}
                  region={region}
                  className='font-clashmd text-xs text-black'
                />
                <div className='flex items-center justify-between'>
                  <p className='text-[10px] text-black'>
                    Order ID : {order.id}
                  </p>
                  <p
                    className={cn('w-fit rounded-full px-[10px] py-[5px]', {
                      'bg-[#F8BCBC] font-clashmd text-[8px] text-[#8B1A1A]':
                        order.status === 'Completed',
                      'bg-[#BAD9F7] font-clashmd text-[8px] text-[#1673CC]':
                        order.status === 'Pending',

                      'bg-[#BAF7BA] font-clashmd text-[8px] text-[#1B691B]':
                        order.status === 'Ongoing',
                    })}
                  >
                    {order.status}
                  </p>
                </div>
              </div>
              <div className='hidden w-full justify-between lg:flex'>
                <div>
                  <p className='mb-1 max-w-[475px] text-base text-black'>
                    {order.product}
                  </p>
                  <div className='flex items-center gap-4'>
                    <p className='text-sm text-black'>Order ID : {order.id}</p>
                    <p
                      className={cn('w-fit rounded-full px-5 py-2', {
                        'bg-[#F8BCBC] text-[10px] text-[#8B1A1A] lg:text-sm':
                          order.status === 'Completed',
                        'bg-[#BAD9F7] text-[10px] text-[#1673CC] lg:text-sm':
                          order.status === 'Pending',

                        'bg-[#BAF7BA] text-[10px] text-[#1B691B] lg:text-sm':
                          order.status === 'Ongoing',
                      })}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <ProductPrice
                    priceInNGN={order.price}
                    region={region}
                    className='font-clashmd text-xl text-black'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
