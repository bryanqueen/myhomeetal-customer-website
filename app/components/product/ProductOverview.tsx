'use client';

import { ArrowLeft, HeartAdd, ShoppingCart } from 'iconsax-react';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';
import * as Radio from '@radix-ui/react-radio-group';

import ProductCarousel from './ProductCarousel';
import ProductGallery from './ProductGallery';

import QuantityInput from '@/app/components/cart/QuantityInput';
import Button from '@components/Button';
import AddToCartButton from '@components/cart/AddToCartButton';

const ProductOverview = ({ data }: any) => {
  return (
    <div className='lg:px-[3%]'>
      <div className='mb-5 hidden items-center gap-5 lg:flex'>
        <Button variant='ghost'>
          <ArrowLeft className='pr-1 ' />
          Back
        </Button>
        <ul className='flex items-center gap-2'>
          {['Home', 'Wearables', 'Sneakers', 'Adidas'].map((item, i, items) => (
            <li key={i} className='flex items-center gap-2'>
              <Link href='/' className='text-sm text-myGray'>
                {item}{' '}
              </Link>
              {i < items.length - 1 && (
                <span className='inline-block h-1 w-1 rounded-full bg-[#d9d9d9] p-[0.2rem]'></span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='grid lg:grid-cols-2 lg:gap-5 2xl:px-20 mt-16 pl-10'>
        <div className='w-full overflow-hidden pl-10'>
          <ProductCarousel data={data} />
          <ProductGallery images={data.images} />
        </div>
        <div className='p-5 pr-16 flex items-center justify-center'>
          <div className='w-full h-fit'>
            <div className='hidden text-sm lg:block'>
              Brand:{' '}
              <span className='text-sm font-semibold text-[#ED2224]'>
                {data.brand}
              </span>
            </div>
            <p className='hidden pt-4 text-xl font-bold lg:block'>
              {data.productTitle}
            </p>
            <div className='flex items-center pt-3'>
              <p className='text-sm'>Ratings {data.rating?.rate || 4.4}</p>
              <Rating
                initialValue={data.rating?.rate}
                readonly={true}
                allowFraction={true}
                size={15}
                fillColor=''
                className='ml-2 mt-[-7px] text-primary'
                SVGclassName='inline'
              />
              <span className='px-3' />
              <span className='text-sm'>
                {data.rating?.count || 100} Reviews
              </span>
            </div>
            <p className='pt-3 text-4xl font-semibold'>₦{data.price}</p>
            <div className='mt-10 flex items-center gap-5 w-full'>
              <button className='flex h-[60px] w-full items-center rounded-full bg-primary px-10'>
                <ShoppingCart size={24} variant='Bulk' color='white' />
                <div className='flex-grow text-center font-semibold text-white'>
                  Add to Cart
                </div>
              </button>
              <div className='flex h-[60px] min-w-[60px] items-center justify-center rounded-full bg-[#F68182]'>
                <HeartAdd size='24' color='#ffffff' variant='Bulk' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface RadioItemProps {
  id: string;
  value: string;
  color?: string;
}

const ColorRadioItem = ({ id, value, color = 'black' }: RadioItemProps) => {
  return (
    <Radio.Item
      id={id}
      className='relative flex h-10 w-10 grid-cols-1 items-center justify-center rounded-md'
      value={value}
    >
      <div
        className={`relative h-[calc(2.5rem-5px)] w-[calc(2.5rem-5px)] rounded-md bg-${color} bg-${color}-500`}
      ></div>
      <Radio.Indicator className="absolute flex h-full w-full items-center justify-center after:block after:h-full after:w-full after:rounded-lg after:border-[3px] after:border-primary/70 after:bg-transparent after:content-['']" />
    </Radio.Item>
  );
};

export default ProductOverview;
