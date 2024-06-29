'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';

import ProductAccordion from './ProductAccordion';
import ProductTabs from './ProductTabs';
import SpecificationTable from './SpecificationTable';
import ProductReviews from './ProductReviews';

const ProductDetails = () => {
  return (
    <div>
      <p>
        When it comes to support, the Serta Big and Tall executive office chair
        has your back - literally. This ergonomic executive chair is designed to
        deliver maximum comfort with contoured lumbar support to ease your
        aching back. Deep layered foam cushions with signature Serta comfort
        will cradle your hips, back, neck, and head, making it the perfect chair
        for long work sessions or when you&apos;re burning the midnight oil.
      </p>
      <ul className='my-5 ml-5 list-disc md:ml-10'>
        <li>
          Luxurious and stylish, this executive chair can be used anywhere
        </li>
        <li>
          Gray bonded leather cushioned seat is easy to clean with a damp cloth
        </li>
        <li>
          Ergonomic layered body pillows and contoured lumbar section for
          superior comfort
        </li>
        <li>
          Padded fixed arms allow you to set the height for custom ergonomics
        </li>
        <li>Locking tilt with adjustable tension control for comfort</li>
        <li>Weight capacity: up to 350 lbs.</li>
        <li>Full assembly required</li>
        <li>1-year manufacturer limited warranty on cushions and components</li>
      </ul>
      <p>
        From a trusted brand committed to offering uncompromising quality,
        comfort and style, the Serta Big & Tall Executive Office Chair is not
        your average office chair. Designed to accommodate up to 350 pounds,
        this heavy-duty office chair is made with a more generous design to
        support taller and larger body types. The Big & Tall commercial-grade
        components ensure stability and durability that stands up to wear and
        tear. The layered body pillows on this ergonomic office chair provide
        cushioned comfort, to help alleviate discomfort caused by sitting
        throughout your workday. Height and tilt adjustments let you position
        this executive chair to improve body alignment, while arm controls
        provide optimal placement for your hands, wrists and forearms. The
        contoured lumbar zone is also adjustable to relieve stress on your lower
        back. Finished in Puresoft faux leather material,
      </p>
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

const ProductInformation = () => {
  return (
    <div className='my-5 px-5 lg:my-10 2xl:px-20'>
      <div className='lg:hidden'>
        <ProductAccordion
          details={<ProductDetails />}
          specifications={<ProductSpecs />}
          reviews={<ProductReviewInfo />}
        />
      </div>
      <div className='hidden lg:block'>
        <ProductTabs
          details={<ProductDetails />}
          specifications={<ProductSpecs />}
          reviews={<ProductReviewInfo />}
        />
      </div>
    </div>
  );
};

export default ProductInformation;
