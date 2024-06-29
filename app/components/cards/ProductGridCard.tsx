'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import Button from '@components/Button';

const ProductGridCard = () => {
  return (
    <div className='grid gap-5 rounded-3xl border p-5 lg:max-w-md'>
      <Image
        className='mx-auto h-32 w-32 object-cover'
        src='/images/product/samsung-galaxy.png'
        alt='Product'
        width='200'
        height='200'
      />
      <div className='w-full'>
        <div className='mb-3 grid items-center gap-2'>
          <div className='hidden items-center md:flex'>
            <div className='font-medium'>4.4</div>
            <Rating
              initialValue={4.4}
              readonly={true}
              allowFraction={true}
              size={20}
              fillColor=''
              className='ml-2 text-primary'
              SVGclassName='inline'
            />
            <span className='px-3' />
            <span className='text-xs'>100+ Reviews</span>
          </div>
          <p className='text-sm md:text-base'>
            Samsung Galaxy A14 6.6 4GB RAM/64GB ROM Android 13 - Light Green
          </p>
          <p className='flex items-center justify-between gap-5 md:text-2xl'>
            <span className='font-bold'>₦145,600</span>
            <span className='text-xs text-gray-500 line-through md:text-lg'>
              ₦145,600
            </span>
          </p>
        </div>
        <div className='flex justify-center'>
          <Button className='w-3/4 rounded-full p-4'>Buy now</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
