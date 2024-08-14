'use client';
import React, { useEffect, useState } from 'react';
import NoHistory from './NoHistory';
import Image from 'next/image';
import cn from 'classnames';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import { HomeSkeleton } from '../loader';

export default function PurchasingHistory() {
  const { region } = useRegion();
  const [loading, setLoading] = useState(true);
  const [productsWithStatus, setProductsWithStatus] = useState([]);

  // Sanitize and convert price to number
  const sanitizeAndConvertPrice = (price: any): number => {
    if (typeof price === 'string') {
      // Remove commas and parse to float
      const sanitizedPrice = price.replace(/,/g, '');
      const parsedPrice = parseFloat(sanitizedPrice);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    return typeof price === 'number' ? price : 0;
  };

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

          // Reverse the order to show latest orders first
          const reversedOrders = orders.reverse();

          // Extract products with statuses of 'Pending' and 'Delivered'
          const extractedProducts = reversedOrders.flatMap((order) =>
            order.orderItems
              .filter((item) =>
                order.status === 'Ongoing' || order.status === 'Delivered'
              )
              .map((item) => ({
                productId: order.orderId,
                qty: item?.qty,
                productName: item?.product?.productTitle || 'Unknown Product',
                productImage: item?.product?.images[0] || '/path/to/placeholder-image.jpg',
                price: item?.price,
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
      {productsWithStatus?.length < 1 ? (
        <div className='flex min-h-[80vh] items-center justify-center'>
          <NoHistory title='No Purchase History Yet' />
        </div>
      ) : (
        <div className='grid gap-5 lg:mt-10 pt-3 lg:pt-0'>
          {productsWithStatus.map((order, i) => (
            <div
              key={i}
              className='flex max-w-[957px] items-center gap-4 rounded-[20px] bg-[#F4F4F4]/95 px-3 py-4 lg:gap-10 lg:rounded-[28px] lg:bg-[#F4F4F4] lg:px-9 lg:py-[30px]'
            >
              <Image
                className='h-[75px] w-[75px] rounded-[15px] object-contain lg:h-[95px] lg:w-[95px] lg:rounded-3xl'
                src={order?.productImage || ''}
                alt=''
                width={95}
                height={95}
              />
              <div className='grid w-full gap-1 lg:hidden'>
                <p className='mb-1 max-w-[475px] text-xs text-black'>
                  {order?.productName|| ''}
                </p>
                <ProductPrice
                  priceInNGN={sanitizeAndConvertPrice(order.price)}
                  region={region}
                  className='font-clashmd text-xs text-black'
                />
                <div className='flex items-center justify-between'>
                  <p className='text-[10px] text-black'>
                    Order ID : #{order.productId}
                  </p>
                  <p
                    className={cn('w-fit rounded-full px-[10px] py-[5px]', {
                      'bg-[#F8BCBC] font-clashmd text-[8px] text-[#8B1A1A]':
                        order.orderStatus === 'Delivered',
                      'bg-[#BAD9F7] font-clashmd text-[8px] text-[#1673CC]':
                        order.orderStatus === 'Pending',

                      'bg-[#BAF7BA] font-clashmd text-[8px] text-[#1B691B]':
                        order.orderStatus === 'Ongoing',
                    })}
                  >
                    {order.orderStatus}
                  </p>
                </div>
              </div>
              <div className='hidden w-full justify-between lg:flex'>
                <div>
                  <p className='mb-1 max-w-[475px] text-base text-black'>
                    {order?.productName || ''}
                  </p>
                  <div className='flex items-center gap-5'>
                    <p className='text-sm text-black'>
                      Order ID : #{order.productId}
                    </p>
                    <p
                      className={cn('w-fit rounded-full px-5 py-2', {
                        'bg-[#F8BCBC] text-[10px] text-[#8B1A1A] lg:text-sm':
                          order.orderStatus === 'Delivered',
                        'bg-[#BAD9F7] text-[10px] text-[#1673CC] lg:text-sm':
                          order.orderStatus === 'Pending',

                        'bg-[#BAF7BA] text-[10px] text-[#1B691B] lg:text-sm':
                          order.orderStatus === 'Ongoing',
                      })}
                    >
                      {order.orderStatus}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <ProductPrice
                     priceInNGN={sanitizeAndConvertPrice(order.price)}
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
