'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import Button from '@components/Button';

const ProductListCard = () => {
  return (
    <div className='mb-5 flex gap-5 rounded-3xl border p-5 lg:max-w-3xl'>
      <Image
        className='h-32 w-24 object-cover'
        src='/images/product/samsung-galaxy.png'
        alt='Product'
        width='200'
        height='200'
      />
      <div className='w-full'>
        <div className='mb-3 grid items-center gap-2'>
          <p>
            Samsung Galaxy A14 6.6 4GB RAM/64GB ROM Android 13 - Light Green
          </p>
          <div className='flex items-center'>
            <div className='hidden font-medium sm:block'>4.4</div>
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
            <span className='hidden text-xs sm:block'>100+ Reviews</span>
          </div>
          <p className='flex items-center gap-5 text-xl sm:text-2xl'>
            <span className='font-bold'>₦145,600</span>
            <span className='text-sm text-gray-500 line-through sm:text-lg'>
              ₦145,600
            </span>
          </p>
        </div>
        <div className='flex justify-end'>
          <Button className='w-auto rounded-full px-10'>Buy now</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
