'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import ProductAccordion from './ProductAccordion';
import ProductTabs from './ProductTabs';
import SpecificationTable from './SpecificationTable';
import ProductReviews from './ProductReviews';

const ProductDetails = ({ dataDesc }: { dataDesc: String }) => {
  return (
    <div>
      <p>{dataDesc}</p>
    </div>
  );
};

const ProductSpecs = () => (
  <div>
    <SpecificationTable title='DIMENSION/WEIGHTS' />
    <SpecificationTable title='DIMENSION/WEIGHTS' />
    <SpecificationTable title='DIMENSION/WEIGHTS' />
    <SpecificationTable title='DIMENSION/WEIGHTS' />
  </div>
);

const RatingProgress = ({
  star = 1,
  percent = 45,
}: {
  star?: number;
  percent?: number;
}) => (
  <div className='flex w-full items-center gap-8 py-1'>
    <div className='flex gap-1 text-gray-500'>
      {star}
      <Image src='/icons/star.svg' alt='Ratings' width={20} height={20} />
    </div>
    <div className='h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-100'>
      <div
        className='h-1.5 rounded-full bg-primary'
        style={{ width: `${percent}%` }}
      ></div>
    </div>
    <div className='text-gray-500'>({percent}%)</div>
  </div>
);

const ProductReviewInfo = () => (
  <div className='py-5 md:pr-32'>
    <div className='flex flex-col justify-center gap-10 md:flex-row'>
      <div className='flex items-center justify-center gap-5 md:flex-1'>
        <div className='flex h-28 w-28 items-center justify-center rounded-full bg-gray-300 text-4xl'>
          2.4
        </div>
        <div className='flex flex-col gap-2'>
          <Rating
            initialValue={2.4}
            readonly={true}
            allowFraction={true}
            size={25}
            SVGclassName='inline'
            fillColor=''
            className='text-primary'
          />
          <span className='text-gray-700'>57 reviews</span>
        </div>
      </div>
      <div className='flex flex-col justify-center px-16 md:flex-1 md:border-l md:border-gray-700'>
        <RatingProgress star={5} percent={75} />
        <RatingProgress star={4} percent={92} />
        <RatingProgress star={3} percent={32} />
        <RatingProgress star={2} />
        <RatingProgress />
      </div>
    </div>
    <ProductReviews />
  </div>
);

const ProductInformation = ({ data }: any) => {
  return (
    <div className='my-5 px-5 lg:my-10 2xl:px-20'>
      <div className='lg:hidden'>
        <ProductAccordion
          details={<ProductDetails dataDesc={data.description} />}
          specifications={<ProductSpecs />}
          reviews={<ProductReviewInfo />}
        />
      </div>
      <div className='hidden lg:block'>
        <ProductTabs
          details={<ProductDetails dataDesc={data.description} />}
          specifications={<ProductSpecs />}
          reviews={<ProductReviewInfo />}
        />
      </div>
    </div>
  );
};

export default ProductInformation;
