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

const ProductGridCard: React.FC<ProductCardProps> = ({ product }: ProductCardProps) => {
  return (
    <div className='grid gap-5 lg:rounded-3xl lg:border p-5 lg:max-w-md'>
      <Image
        className='mx-auto h-32 w-32 object-contain'
        src={product.images[0]}
        alt='Product'
        width='200'
        height='200'
      />
      <div className='w-full'>
        <div className='mb-3 grid items-center gap-2'>
          <div className='hidden items-center md:flex'>
            <div className='font-medium'>{product.rating || 4.4}</div>
            <Rating
              initialValue={product.rating}
              readonly={true}
              allowFraction={true}
              size={20}
              fillColor=''
              className='ml-2 text-primary'
              SVGclassName='inline'
            />
            <span className='px-3' />
            <span className='text-xs'>
              {product.reviewsCount || 100} Reviews
            </span>
          </div>
          <p className='text-sm md:text-base'>{product.productTitle}</p>
          <p className='flex items-center justify-between gap-5 md:text-2xl'>
            <span className='font-bold'>{product.price}</span>
            <span className='text-xs text-gray-500 line-through md:text-lg'>
              {product.price}
            </span>
          </p>
        </div>
        <div className='flex justify-center'>
          <Button
            className='w-3/4 rounded-full p-4'
            linkType='rel'
            href={`/item/${product._id}`}
          >
            Buy now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
