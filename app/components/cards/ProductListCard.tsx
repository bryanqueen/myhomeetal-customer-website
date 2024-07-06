'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import Button from '@components/Button';

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  reviewsCount: number;
  rating: number;
  isProductNew: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductListCard = ({ product }: ProductCardProps) => {
  return (
    <div className='mb-5 flex items-center gap-5 rounded-3xl border border-[#E4E7EC] p-5 lg:max-w-3xl'>
      <Image
        className='h-40 w-40 object-contain'
        src={product.images[0]}
        alt='Product'
        width='200'
        height='200'
      />
      <div className='flex w-full items-center'>
        <div className='grid h-fit w-full items-center gap-2'>
          <p className='text-sm font-medium'>{product.productTitle}</p>
          <div className='flex items-center'>
            <p className='hidden text-sm sm:block'>{product.rating || 4.4}</p>
            <Rating
              initialValue={product.rating}
              readonly={true}
              allowFraction={true}
              size={14}
              fillColor=''
              className='ml-2 mt-[-7px] text-primary'
              SVGclassName='inline'
            />
            <p className='ml-2 hidden text-xs sm:block'>
              {product.reviewsCount || 100} Reviews
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <p className='flex items-center gap-5 sm:text-2xl'>
              <span className='text-lg font-semibold'>{product.price}</span>
              <span className='text-sm text-gray-500 line-through sm:text-lg'>
                {product.price}
              </span>
            </p>
            <Button
              linkType='rel'
              href={`/item/${product._id}`}
              className='w-auto rounded-full px-10'
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
