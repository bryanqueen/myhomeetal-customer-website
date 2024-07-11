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
  const breadCrumb = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: data?.category?.name,
      link: `/category/${data?.category?.name}?categoryId=${data?.category?._id}`,
    },
    {
      title: data?.brand,
    },
  ];
  const priceStyle = 'text-black text-[25px] lg:text-5xl font-clashmd';
  const { items, isEmpty } = useCart();
  const itemInCart = items.find((item) => item.id === data?._id);
  const itemForCart = { ...data, id: data._id };
  const { region } = useRegion();
  return (
    <div className='lg:px-[3%]'>
      <div className='mb-5 hidden items-center gap-14 lg:flex'>
        <button className='flex items-center'>
          <ArrowLeft className='pr-1 ' />
          Back
        </button>
        <ul className='flex items-center gap-2'>
          {breadCrumb.map((item, i, items) => (
            <li key={i} className='flex items-center gap-2'>
              {item.link ? (
                <Link href={item.link} className='text-sm text-myGray'>
                  {item.title}{' '}
                </Link>
              ) : (
                <p className='text-sm text-myGray'>{item.title}</p>
              )}

              {i < items.length - 1 && (
                <span className='inline-block h-1 w-1 rounded-full bg-[#d9d9d9] p-[0.2rem]'></span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className='mb-24 mt-16 flex w-full flex-col items-center justify-between lg:h-[500px] lg:flex-row'>
        <div className='w-full lg:basis-[48%] lg:h-full lg:pl-10'>
          <ProductCarousel data={data} />
          <ProductGallery images={data.images} />
        </div>
        <div className='flex w-full px-5 h-full lg:basis-[48%] items-center'>
          <div className='lg:h-[320px] w-full lg:w-[537px]'>
            <div className='flex h-fit flex-col lg:w-[488px]'>
              <div className='mb-4 font-clashmd text-xs text-black lg:font-clash lg:text-sm'>
                Brand:{' '}
                <span className='ml-1 font-clash text-xs text-primary lg:font-clashmd lg:text-sm'>
                  {data.brand}
                </span>
              </div>
              <p
                className={
                  'text-base text-myGray lg:block lg:font-clashmd lg:text-2xl lg:text-black'
                }
              >
                {data.productTitle}
              </p>

              <div className='flex items-center py-3 lg:hidden'>
                <p className='mr-1 flex items-center gap-1 text-[10px] text-xs lg:text-sm lg:font-semibold'>
                  <StarIcon width={16} className='mt-[-3px] text-primary' />
                  {data.rating?.rate || 4.4}
                </p>

                <span className='text-[10px]'>
                  ({data.rating?.count || 100} Reviews)
                </span>
              </div>
              <div className='hidden items-center py-3 lg:flex'>
                <p className='text-sm text-black'>
                  Ratings{' '}
                  <span className='ml-1'>{data.rating?.rate || 4.4}</span>{' '}
                </p>
                <Rating
                  initialValue={data.rating?.rate}
                  readonly={true}
                  allowFraction={true}
                  size={16}
                  fillColor=''
                  className='ml-2 mt-[-7px] text-primary'
                  SVGclassName='inline'
                />
                <span className='px-3' />
                <span className='text-sm text-black'>
                  {data.rating?.count || 100} Reviews
                </span>
              </div>

              <ProductPrice
                priceInNGN={data.price}
                region={region}
                className={priceStyle}
              />
            </div>
            <div className='mt-16 lg:mt-10 flex items-center justify-between gap-4 lg:w-[537px]'>
              {itemInCart ? (
                <div className='flex w-[206px] items-center justify-between'>
                  <CartHandler
                    cart
                    item={itemInCart}
                    variant='UPDATE_MINUS'
                    className='h-[50px] w-[50px] rounded-lg border-0'
                  >
                    <Minus size={35} />
                  </CartHandler>
                  <span className='text-2xl text-myGray'>
                    {itemInCart.quantity}
                  </span>
                  <CartHandler
                    item={itemInCart}
                    variant='UPDATE_PLUS'
                    className='h-[50px] w-[50px] rounded-lg border-0'
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
