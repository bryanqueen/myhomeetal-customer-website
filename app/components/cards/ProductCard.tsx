'use client';

import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';

import Button from '../Button';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';

interface Review {
  _id: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  review: Review[];
  isProductNew: boolean;
}

interface Props {
  variant?: 'default' | 'top';
  product: Product;
}

const ProductCard = ({ variant = 'default', product }: Props) => {
  const { region } = useRegion();

  const priceStyle = 'text-base font-clashmd text-black';
  const cls = cn(
    'box-border flex h-[268px] min-w-[160px] items-center justify-evenly gap-3 overflow-hidden rounded-2xl hover:border hover:border-[#F68182] lg:h-[307px] lg:w-[230px] lg:justify-center',
    {
      'md:w-full lg:font-medium': variant === 'top',
    }
  );

  const validRatings = product.review
    .map(review => {
      const rating = Number(review.rating);
      return rating;
    })
    .filter(rating => Number.isFinite(rating));

  const averageRating = validRatings.length
    ? validRatings.reduce((acc, cur) => acc + cur, 0) / validRatings.length
    : 0;

  const reviewCount = product.review.length;
  const href = `/item/${product?._id}`;

  return (
    <ClientOnly>
      <div className={cls}>
        <Link href={href} className='transition-shadow duration-300'>
          <div className='relative mb-3 flex h-[172px] w-full flex-col items-center justify-between lg:h-[158px] lg:w-full lg:justify-center'>
            <img
              className={`${variant === 'top' ? '' : 'h-[130px] w-[148px] object-contain lg:h-[158px] lg:w-[158px]'}`}
              src={product?.images[0]}
              alt='Product Card'
              style={{ transition: 'transform 0.3s' }}
            />

            {/*product?.isProductNew === true && <NewProductTag />*/}
            <div className='flex w-full items-center gap-5 lg:hidden'>
              <Rating
                initialValue={averageRating}
                readonly
                fillColor=''
                className='mt-[-6px] text-primary'
                SVGclassName='inline'
                size={16}
                allowFraction
              />

              <p className='h-fit w-fit text-[10px] text-black'>
                {reviewCount} {reviewCount < 2 ? 'review' : 'reviews'}
              </p>
            </div>
          </div>
          <div className='flex w-[150px] flex-col justify-between lg:h-[88px] lg:w-[191px]'>
            <div className='hidden w-full items-center gap-5 lg:flex'>
              <Rating
                initialValue={averageRating}
                readonly
                fillColor=''
                className='mt-[-6px] text-primary'
                SVGclassName='inline'
                size={16}
                allowFraction
              />

              <p className='h-fit w-fit text-[10px] text-black'>
                {reviewCount} {reviewCount < 2 ? 'review' : 'reviews'}
              </p>
            </div>
            <div className='min-h-[25px]'>
              <p className='three-line-clamp text-xs text-black'>
                {product?.productTitle}
              </p>
            </div>
            <ProductPrice
              priceInNGN={product?.price}
              region={region}
              className={priceStyle}
            />
          </div>
        </Link>
        {variant === 'top' && (
          <Button
            linkType='rel'
            href={href}
            variant='outline'
            className='rounded-full'
          >
            Buy now
          </Button>
        )}
      </div>
    </ClientOnly>
  );
};

const NewProductTag = () => {
  return (
    <span className='text-normal absolute right-0 top-5 select-none rounded-full bg-[rgb(255,197,198)] px-3 py-1 text-sm text-[rgba(136,20,21,1)]'>
      New Product
    </span>
  );
};

export default ProductCard;
