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
  const cls = cn('mx-auto grid max-w-[230px] gap-5', {
    'md:max-w-lg lg:font-medium': variant === 'top',
  });

  const href = `/item/${product._id}`;

  return (
    <div className={cls}>
      <div className='relative'>
        <Link
          href={href}
          className='overflow-hidden rounded-3xl transition-[shadow] hover:shadow'
        >
          <Image
            className={`${variant === 'top' ? 'w-full' : ''}`}
            src={product.images[0]}
            alt='Product Card'
            width={200}
            height={200}
          />
        </Link>
       {product.isProductNew === true && <NewProductTag />}
      </div>
      <div>
        <div className='mb-2 flex items-center justify-between'>
          <Rating
            initialValue={5}
            readonly
            fillColor=''
            className='text-primary'
            SVGclassName='inline'
            size={16}
            allowFraction
          />
          <span className='font-normal text-xs'>100+ Reviews</span>
        </div>
        <p className='three-line-clamp text-lg font-medium'>
          <Link href={href}>
            {product.productTitle}
          </Link>
        </p>
        <p className='py-2 text-xl font-semibold'>#{product.price}</p>
        {/* <p className='text-gray-500 line-through'>$499.00</p> */}
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
return  (
      <span className='text-normal absolute right-0 top-5 select-none rounded-full bg-[rgb(255,197,198)] px-3 py-1 text-sm text-[rgba(136,20,21,1)]'>
        New Product
      </span>

  )
 }


export default ProductCard;
