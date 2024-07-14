'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import Button from '@components/Button';
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

interface ProductCardProps {
  product: Product;
}

const ProductGridCard: React.FC<ProductCardProps> = ({
  product,
}: ProductCardProps) => {
  const { region } = useRegion();
  return (
    <div className='flex h-[418px] w-[279px] flex-col justify-between px-[30px] py-[20px] lg:rounded-[20px] lg:border lg:border-[#E4E7EC]'>
      <Image
        className='mx-auto h-[167px] object-contain'
        src={product.images[0]}
        alt='Product'
        width={200}
        height={167}
      />
      <div className='flex max-h-[117px] w-full flex-col gap-3'>
        <div className='hidden items-center justify-between gap-[19px] lg:flex'>
          <div className='flex items-center text-sm text-black'>
            {product.rating || 4.4}
            <Rating
              initialValue={product.rating}
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
              {product.reviewsCount || 100} Reviews
            </p>
          </div>
        </div>
        <div className='flex h-[40px] items-center'>
          <p className='three-line-clamp text-sm leading-[19.68px] text-black md:text-base'>
            {product.productTitle}
          </p>
        </div>

        <ProductPrice
          region={region}
          priceInNGN={product.price}
          className='font-clashmd text-[26.1px] text-black'
        />
      </div>
      <div className='flex justify-center'>
        <Button
          className='w-[90%] rounded-full border-0 shadow-none text-base text-white font-clashmd h-[50px]'
          linkType='rel'
          href={`/item/${product._id}`}
        >
          Buy now
        </Button>
      </div>
    </div>
  );
};

export default ProductGridCard;
