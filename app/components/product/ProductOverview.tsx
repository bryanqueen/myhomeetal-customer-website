'use client';

import { ArrowLeft } from 'iconsax-react';
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
    <div className='lg:px-5'>
      <div className='mb-5 hidden items-center lg:flex'>
        <Button variant='ghost'>
          <ArrowLeft className='pr-2' />
          Back
        </Button>
        <ul className='flex items-center gap-2'>
          {['Home', 'Wearables', 'Sneakers', 'Adidas'].map((item, i, items) => (
            <li key={i} className='flex items-center gap-2'>
              <Link href='/'>{item} </Link>
              {i < items.length - 1 && (
                <span className='inline-block h-1 w-1 rounded-full bg-gray-300 p-[0.2rem]'></span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='grid lg:grid-cols-2 lg:gap-5 2xl:px-20'>
        <div className='w-full overflow-hidden'>
          <ProductCarousel />
          <ProductGallery />
        </div>
        <div className='p-5 '>
          <div className='hidden lg:block'>
            Brand:{' '}
            <span className='inline-block rounded-full bg-primary/20 px-10 py-2'>
              Samsung
            </span>
          </div>
          <p className='hidden py-5 text-3xl font-bold lg:block'>
            {data.title}
          </p>
          <div className='flex items-center pb-5'>
            <div>Ratings {data.rating.rate}</div>
            <Rating
              initialValue={data.rating.rate}
              readonly={true}
              allowFraction={true}
              size={20}
              fillColor=''
              className='ml-2 text-primary'
              SVGclassName='inline'
            />
            <span className='px-3' />
            <span>{data.rating.count} Reviews</span>
          </div>
          <p className='pb-5 text-xl lg:hidden'>{data.title}</p>
          <p className='hidden lg:block'>{data.description}</p>
          <Radio.Root className='flex gap-1 py-3' defaultValue='black'>
            <ColorRadioItem id='color1' value='black' />
            <ColorRadioItem id='color2' value='yellow' color='yellow' />
            <ColorRadioItem id='color3' value='green' color='green' />
          </Radio.Root>
          <div className='flex justify-between pb-5'>
            <p className='lg:hidden'>Price: ${data.price} </p>
            <p className='hidden items-center gap-5 pb-7 pt-10 text-5xl lg:flex'>
              <span className='font-bold'>${data.price}</span>
              <span className='text-2xl text-gray-500 line-through'>
                ₦145,600
              </span>
            </p>
            <div className='lg:hidden'>
              <QuantityInput variant='2' />
            </div>
          </div>
          <div className='grid-cols-[100px_1fr] gap-3 lg:grid'>
            <div className='hidden lg:block'>
              <span>Quantity</span>
              <QuantityInput />
            </div>
            <div>
              <AddToCartButton item={data} />
              <Button
                variant='ghost'
                className='hidden w-full rounded-full p-5 text-primary lg:block'
              >
                Save item
              </Button>
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
