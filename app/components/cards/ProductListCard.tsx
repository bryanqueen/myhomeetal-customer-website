'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import Button from '@components/Button';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';

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
  const { region } = useRegion();
  return (
    <ClientOnly>
      <div className='mb-5 flex h-[207px] w-[869px] items-center gap-[63px] rounded-[20px] border border-[#E4E7EC] px-[43px] py-5'>
        <div className='w-[134px]'>
          <Image
            className='h-[167px] object-contain'
            src={product?.images[0]}
            alt='Product'
            width={200}
            height={200}
            loading='lazy'
          />
        </div>

        <div className='flex w-full items-center'>
          <div className='flex h-[115px] w-full flex-col justify-between'>
            <p className='text-base text-black'>{product.productTitle}</p>
            <div className='flex items-center gap-3'>
              <p className='hidden text-sm text-black sm:block'>
                {product.rating || 4.4}
                <Rating
                  initialValue={product.rating}
                  readonly={true}
                  allowFraction={true}
                  size={16}
                  fillColor=''
                  className='ml-2 mt-[-5px] text-primary'
                  SVGclassName='inline'
                />
              </p>

              <p className='ml-2 hidden text-sm text-black sm:block'>
                {product.reviewsCount || 100} Reviews
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <ProductPrice
                region={region}
                priceInNGN={product.price}
                className='font-clashmd text-[26.1px] text-black'
              />
              <Button
                linkType='rel'
                href={`/item/${product._id}`}
                className='h-[50px] border-0 shadow-none w-[205px] rounded-full font-clashmd text-base text-white'
              >
                Buy now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default ProductListCard;
