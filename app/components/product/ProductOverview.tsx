'use client';

import { Add, ArrowLeft, HeartAdd, Minus } from 'iconsax-react';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';
import * as Radio from '@radix-ui/react-radio-group';

import ProductCarousel from './ProductCarousel';
import ProductGallery from './ProductGallery';
import { StarIcon } from '@heroicons/react/16/solid';
import AddToCartButton from '../cart/AddToCartButton';
import ProductPrice from './ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import { useCart } from 'react-use-cart';
import CartHandler from '../cart/CartHandler';

const ProductOverview = ({ data }: any) => {
  const priceStyle = "text-black text-5xl font-clashmd";
  const { items, isEmpty } = useCart();
  const itemInCart = items.find(item => item.id === data?._id);
  const itemForCart = { ...data, id: data._id };
  const { region } = useRegion();
  return (
    <div className='lg:px-[3%]'>
      <div className='mb-5 hidden items-center gap-5 lg:flex'>
        <button className='flex items-center'>
          <ArrowLeft className='pr-1 ' />
          Back
        </button>
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
      <div className='mt-16 grid lg:grid-cols-2 lg:gap-5 lg:pl-10 lg:px-20'>
        <div className='w-full overflow-hidden lg:pl-10'>
          <ProductCarousel data={data} />
          <ProductGallery images={data.images} />
        </div>
        <div className='flex items-center pt-3 justify-center  px-5 md:p-5 lg:pr-16'>
          <div className='h-fit w-full'>
            <div className='w-[488px] h-[220px] flex flex-col justify-between'>
              <div className='text-sm font-medium lg:font-normal lg:block'>
                Brand:{' '}
                <span className='text-sm lg:font-semibold text-[#ED2224]'>
                  {data.brand}
                </span>
              </div>
              <p className={'pt-4 text-myGray lg:text-black lg:text-2xl lg:font-clashmd lg:block'}>
                {data.productTitle}
              </p>

              <div className='flex items-center pt-3 lg:hidden'>
                <p className='mr-1 flex items-center gap-1 text-xs lg:text-sm lg:font-semibold'>
                  <StarIcon width={17} className='mt-[-3px] text-primary' />
                  {data.rating?.rate || 4.4}
                </p>

                <span className='text-xs'>
                  ({data.rating?.count || 100} Reviews)
                </span>
              </div>
              <div className='hidden items-center pt-3 lg:flex'>
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

              <ProductPrice priceInNGN={data.price} region={region} className={priceStyle} />
            </div>
            <div className='mt-10 flex gap-4 w-[537px] items-center justify-between'>
              {itemInCart ? (
                <div className='w-[206px] flex items-center justify-between'>
                  <CartHandler
                    cart
                    item={itemInCart}
                    variant='UPDATE_MINUS'
                    className='w-[50px] h-[50px] rounded-lg border-0'
                  >
                    <Minus size={35} />
                  </CartHandler>
                  <span className='text-myGray text-2xl'>{itemInCart.quantity}</span>
                  <CartHandler
                    item={itemInCart}
                    variant='UPDATE_PLUS'
                    className='w-[50px] h-[50px] rounded-lg border-0'
                  >
                    <Add size={35} />
                  </CartHandler>
                </div>
              ) : (
                <AddToCartButton item={itemForCart} />

              )}

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
