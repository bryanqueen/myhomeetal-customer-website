'use client';

// import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import Button from '@components/Button';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';
import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
}

const ProductGridCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  const { region } = useRegion();

  // Sanitize and convert price to number
  const sanitizeAndConvertPrice = (price: any): number => {
    if (typeof price === 'string') {
      // Remove commas and parse to float
      const sanitizedPrice = price.replace(/,/g, '');
      const parsedPrice = parseFloat(sanitizedPrice);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    return typeof price === 'number' ? price : 0;
  };

  const priceInNGN = sanitizeAndConvertPrice(product?.price);

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

  return (
    <Link href={`/item/${product?._id}`} className='flex h-[418px] w-[279px] flex-col justify-between px-[30px] py-[20px] lg:rounded-[20px] lg:border lg:border-[#E4E7EC]'>
      <img
        className='mx-auto h-[167px] object-contain'
        src={product?.images[0]}
        alt='Product'
        width="200"
        height="167"
        loading='lazy'
        decoding="async"
      />
      <div className='flex max-h-[117px] w-full flex-col gap-3'>
        <div className='hidden items-center justify-between gap-[19px] lg:flex'>
          <div className='flex items-center text-sm text-black'>
            {averageRating}
            <Rating
              initialValue={averageRating}
              readonly={true}
              allowFraction={true}
              size={16}
              fillColor=''
              className='mb-[3px] ml-2 text-primary'
              SVGclassName='inline'
            />
          </div>

          <div>
            <p className='text-sm text-black'>
              {reviewCount} Reviews
            </p>
          </div>
        </div>
        <div className='flex h-[40px] items-center'>
          <p className='three-line-clamp text-sm leading-[19.68px] text-black md:text-base'>
            {product?.productTitle}
          </p>
        </div>
        <ClientOnly>
          <ProductPrice
            region={region}
            priceInNGN={priceInNGN}
            className='font-clashmd text-[26.1px] text-black'
          />
        </ClientOnly>
      </div>
      <div className='flex justify-center'>
        <Button
          className='h-[50px] w-[90%] rounded-full border-0 font-clashmd text-base text-white shadow-none'
        >
          Buy now
        </Button>
      </div>
    </Link>
  );
};

export default ProductGridCard;
