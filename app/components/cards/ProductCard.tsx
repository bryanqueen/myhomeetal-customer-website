'use client';

import Image from 'next/image';
import cn from 'classnames';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';

import Button from '../Button';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  reviewsCount: number;
  rating: number;
  isProductNew: boolean;
}

interface Props {
  variant?: 'default' | 'top';
  product: Product;
}

const ProductCard = ({ variant = 'default', product }: Props) => {
  const priceStyle = 'text-base font-clashmd text-black';
  const cls = cn('flex items-center justify-evenly lg:justify-center min-w-[160px] h-[268px] lg:w-[230px] lg:h-[307px] overflow-hidden rounded-2xl gap-3 hover:border hover:border-[#F68182] box-border', {
    'md:w-full lg:font-medium': variant === 'top',
  });
  const { region } = useRegion();

  const href = `/item/${product._id}`;

  return (
    <div className={cls}>
      <Link
        href={href}
        className='transition-shadow duration-300'
      >
        <div className='relative mb-3 flex flex-col justify-between w-full h-[172px] lg:w-full lg:h-[158px] items-center lg:justify-center'>
          <Image
            className={`${variant === 'top' ? '' : 'w-[148px] h-[130px] lg:h-[158px] lg:w-[158px] object-contain'}`}
            src={product.images[0]}
            alt='Product Card'
            width={200}
            height={200}
            style={{ transition: 'transform 0.3s' }}
          />

          {product.isProductNew === true && <NewProductTag />}
          <div className='w-full flex items-center gap-5 lg:hidden'>
            <Rating
              initialValue={product.rating}
              readonly
              fillColor=''
              className='mt-[-6px] text-primary'
              SVGclassName='inline'
              size={16}
              allowFraction
            />

            <p className='h-fit w-fit text-[10px] text-black'>{product.reviewsCount}+ Reviews</p>
          </div>
        </div>
        <div className='w-[150px] lg:w-[191px] lg:h-[88px] flex flex-col justify-between'>
          <div className='hidden w-full lg:flex items-center gap-5'>
            <Rating
              initialValue={product.rating}
              readonly
              fillColor=''
              className='mt-[-6px] text-primary'
              SVGclassName='inline'
              size={16}
              allowFraction
            />

            <p className='h-fit w-fit text-[10px] text-black'>{product.reviewsCount}+ Reviews</p>
          </div>
          <div className='min-h-[25px]'>
            <p className='three-line-clamp text-xs text-black'>{product.productTitle}</p>
          </div>
          <ProductPrice priceInNGN={product.price} region={region} className={priceStyle} />
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
