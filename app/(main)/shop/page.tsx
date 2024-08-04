import VoidCard from '@/app/components/VoidCard';
import Image from 'next/image';
import React from 'react';

export default function ShopPage() {
  return (
    <main className='min-h-[100vh] pb-20'>
      <section className='relative flex w-full px-[3%] items-center bg-[#C70E10] text-white h-[600px] lg:h-[325px] lg:px-[5%]'>
        <div className='grid gap-3 lg:gap-5 max-h-fit mt-[-100px]'>
          <p className='font-clashmd text-xs lg:text-base'>Official stores</p>
          <h2 className='font-clashmd text-[31px] leading-[38.13px]'>
            Shop Our Wide Range of <br />
            Products
          </h2>
          <p className='bodyText max-w-[80%] lg:max-w-[561px]'>
            Explore the best deals across various categories. Find everything
            you need in one place.
          </p>
        </div>
        <Image
          src='/shop.svg'
          width={576.98}
          height={310.93}
          alt='shop'
          className='absolute bottom-0 right-0'
        />
      </section>
      <section className='py-16'>
        <VoidCard
          title='Shops coming soon.'
          bodyText='Oops! Looks like this page is on vacation, exploring fashion trends across the globe.'
          btnText='Return to Home'
          link='/'
        />
      </section>
    </main>
  );
}
