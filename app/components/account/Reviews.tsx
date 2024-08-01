'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import cn from 'classnames';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import { HomeSkeleton } from '../loader';

export default function Reviews() {
  const { region } = useRegion();
  const [loading, setLoading] = useState(true);
  const [productsWithStatus, setProductsWithStatus] = useState([]);

  //list only completed orders here
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await productService.getAllOrders();

        if (!res || !res.data) {
          console.log('id not found');
          setLoading(false);
          return notFound();
        }

        if (res.status === 200) {
          const orders = res.data;
          // Extract products with their respective order statuses
          const extractedProducts = orders.flatMap((order) =>
            order.orderItems.map((item) => ({
              productId: order.orderId,
              qty: item.qty,
              price: item.price,
              orderStatus: order.status,
            }))
          );
          setProductsWithStatus(extractedProducts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }
  return (
    <div>
      {productsWithStatus.length < 1 ? (
        <div className='flex h-[70vh] items-center justify-center'>
          <div className='m-auto grid max-w-xs justify-items-center gap-3 lg:max-w-[420px] lg:gap-6'>
            <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
            <p className='text-center font-clashmd text-[25px] text-myGray lg:text-2xl'>
              You haven&rsquo;t Placed any Orders!
            </p>
            <p className='w-[80%] text-center text-xs text-myGray lg:w-full lg:text-sm'>
              It looks like you don&rsquo;t have any notifications right now.
              Check back soon for updates, alerts, and important messages!
            </p>
          </div>
        </div>
      ) : (
        <div className='grid gap-5 pt-3 lg:mt-10 lg:pt-0'>
          {productsWithStatus.map((order, i) => (
            <div
              key={i}
              className='flex max-w-[957px] items-center gap-4 rounded-[20px] bg-[#F4F4F4]/95 px-3 py-4 lg:gap-10 lg:rounded-[17px] lg:bg-[#F4F4F4] lg:px-[15px] lg:py-[15px]'
            >
              <Image
                className='h-[75px] w-[75px] rounded-[15px] object-contain lg:h-[95px] lg:w-[95px] lg:rounded-3xl'
                src='/images/product/save.png'
                alt=''
                width={95}
                height={95}
              />
              <div className='grid w-full gap-1 lg:hidden'>
                <p className='mb-1 max-w-[475px] text-xs text-black'>
                  {order.product}
                </p>
                <div className='flex items-center justify-between'>
                  <p className='text-[10px] text-black'>
                    Order ID : #{order.productId}
                  </p>
                  <button className='font-clashmd text-xs text-primary'>
                    Rate this product
                  </button>
                </div>
              </div>
              <div className='hidden w-full justify-between lg:flex'>
                <div>
                  <p className='mb-1 max-w-[475px] text-base text-black'>
                    {order.product}
                  </p>
                  <div className='flex items-center gap-5'>
                    <p className='text-sm text-black'>
                      Order ID : #{order.productId}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <button className='font-clashmd text-base text-primary'>
                    Rate this product
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
