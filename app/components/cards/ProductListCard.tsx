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

const ProductListCard = ({ product }: ProductCardProps) => {
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
    <Link href={`/item/${product?._id}`} className='mb-5 flex h-[207px] w-[869px] items-center gap-[63px] rounded-[20px] border border-[#E4E7EC] px-[43px] py-5'>
      <div className='w-[134px]'>
        <img
          className='h-[167px] object-contain'
          src={product?.images[0]}
          alt='Product'
          width="200"
          height="200"
          loading='lazy'
          decoding="async"
        />
      </div>

      <div className='flex w-full items-center'>
        <div className='flex h-[115px] w-full flex-col justify-between'>
          <p className='text-base text-black'>{product?.productTitle}</p>
          <div className='flex items-center gap-3'>
            <p className='hidden text-sm text-black sm:block'>
              {averageRating}
              <Rating
                initialValue={averageRating}
                readonly={true}
                allowFraction={true}
                size={16}
                fillColor=''
                className='ml-2 mt-[-5px] text-primary'
                SVGclassName='inline'
              />
            </p>

            <p className='ml-2 hidden text-sm text-black sm:block'>
              {reviewCount} Reviews
            </p>
          </div>
          <div className='flex items-center justify-between'>
            <ClientOnly>
              <ProductPrice
                region={region}
                priceInNGN={priceInNGN}
                className='font-clashmd text-[26.1px] text-black'
              />
            </ClientOnly>
            <Button
              className='h-[50px] w-[205px] rounded-full border-0 font-clashmd text-base text-white shadow-none'
            >
              Buy now
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductListCard;
