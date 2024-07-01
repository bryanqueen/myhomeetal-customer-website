'use client';

import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';

import Button from '../Button';

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string;
  reviewsCount: number;
  rating: number;
  isProductNew: boolean;
}

interface Props {
  variant?: 'default' | 'top';
  product: Product;
}

const ProductCard = ({ variant = 'default', product }: Props) => {
  const cls = cn('mx-auto grid w-full gap-3 py-4 px-2 md:p-3', {
    'md:w-full lg:font-medium': variant === 'top',
  });

  const href = `/item/${product._id}`;

  return (
    <div className={cls}>
      <div className='relative flex h-[130px] items-center justify-center'>
        <Link
          href={href}
          className='overflow-hidden rounded-3xl transition-[shadow] hover:shadow'
        >
          <Image
            className={`${variant === 'top' ? '' : 'h-[120px] w-[150px] object-contain'}`}
            src={product.images[0]}
            alt='Product Card'
            width={200}
            height={200}
          />
        </Link>
        {product.isProductNew === true && <NewProductTag />}
      </div>
      <div>
        <div className='mb-1 flex items-center justify-between'>
          <Rating
            initialValue={5}
            readonly
            fillColor=''
            className='text-primary mt-[-6px]'
            SVGclassName='inline'
            size={13}
            allowFraction
          />

          <p className='h-fit w-fit text-xs font-normal'>100+ Reviews</p>
        </div>
        <div className=' mb-2 min-h-[25px] font-medium'>
          <Link href={href} className='three-line-clamp text-sm'>
            {product.productTitle}
          </Link>
        </div>
        <p className='text-base font-semibold'>#{product.price}</p>
      </div>
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
