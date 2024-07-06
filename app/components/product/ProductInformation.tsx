'use client';

import Image from 'next/image';
import { Rating } from 'react-simple-star-rating';
import ProductAccordion from './ProductAccordion';
import ProductTabs from './ProductTabs';
import SpecificationTable from './SpecificationTable';
import ProductReviews from './ProductReviews';

// Individual Components

const ProductDetails = ({ dataDesc }: { dataDesc: string }) => {
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

// Utility Functions

interface Review {
  rating: number;
}

interface ProductReviewInfoProps {
  reviews: Review[];
}

const calculateAverageRating = (reviews: Review[]) => {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / reviews.length;
};

const calculateRatingDistribution = (reviews: Review[]) => {
  const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  reviews.forEach((review) => {
    distribution[review.rating] += 1;
  });

  const reviewCount = reviews.length;
  for (const star in distribution) {
    distribution[star] = (distribution[star] / reviewCount) * 100;
  }
  return distribution;
};

// Main Component

const reviews = [
  {
    name: 'Alice',
    date: '2024-06-01',
    rating: 5,
    comment: 'Excellent product!',
  },
  {
    name: 'Bob',
    date: '2024-06-02',
    rating: 4,
    comment: 'Very satisfied with the quality.',
  },
  {
    name: 'Charlie',
    date: '2024-06-03',
    rating: 3,
    comment: 'Could be better.',
  },
  {
    name: 'David',
    date: '2024-06-04',
    rating: 2,
    comment: 'Not what I expected.',
  },
  {
    name: 'Eve',
    date: '2024-06-05',
    rating: 4,
    comment: 'Value for money.',
  },
  {
    name: 'Fay',
    date: '2024-06-06',
    rating: 5,
    comment: 'Highly recommend it.',
  },
  {
    name: 'Grace',
    date: '2024-06-07',
    rating: 5,
    comment: 'Will buy again.',
  },
  {
    name: 'Heidi',
    date: '2024-06-08',
    rating: 3,
    comment: 'Decent product for the price.',
  },
  {
    name: 'Ivan',
    date: '2024-06-09',
    rating: 4,
    comment: 'Great customer service.',
  },
  {
    name: 'Judy',
    date: '2024-06-10',
    rating: 5,
    comment: 'Fast delivery and good packaging.',
  },
  {
    name: 'Alice',
    date: '2024-06-11',
    rating: 4,
    comment: 'Very satisfied with the quality.',
  },
  {
    name: 'Bob',
    date: '2024-06-12',
    rating: 3,
    comment: 'Could be better.hdfdh af arw rewe awria weriwerf ar arwi qwerq qr rwf q quidqw  qvd qudqv   qqquwevwq qwwu   du qud   qudvw   qwewev duqevqw eueu',
  },
  {
    name: 'Charlie',
    date: '2024-06-13',
    rating: 2,
    comment: 'Not what I expected.',
  },
  {
    name: 'David',
    date: '2024-06-14',
    rating: 5,
    comment: 'Excellent product!',
  },
  {
    name: 'Eve',
    date: '2024-06-15',
    rating: 4,
    comment: 'Value for money.',
  },
];

const ProductReviewInfo = () => {
  const averageRating = calculateAverageRating(reviews);
  const reviewCount = reviews.length;
  const ratingDistribution = calculateRatingDistribution(reviews);

  return (
    <div className='py-5 md:pr-32'>
      <div className='flex flex-col justify-center gap-10 md:flex-row'>
        <div className='flex items-center justify-center gap-5 md:flex-1'>
          <div className='flex h-28 w-28 items-center justify-center rounded-full bg-gray-300 text-4xl'>
            {averageRating.toFixed(1)}
          </div>
          <div className='flex flex-col gap-2'>
            <Rating
              initialValue={averageRating}
              readonly={true}
              allowFraction={true}
              size={25}
              SVGclassName='inline'
              fillColor=''
              className='text-primary'
            />
            <span className='text-gray-700'>{reviewCount} reviews</span>
          </div>
        </div>
        <div className='flex flex-col justify-center px-16 md:flex-1 md:border-l md:border-gray-700'>
          {Object.keys(ratingDistribution).map((star) => (
            <RatingProgress
              key={star}
              star={Number(star)}
              percent={ratingDistribution[star].toFixed(1)}
            />
          ))}
        </div>
      </div>
      <ProductReviews reviews={reviews} />
    </div>
  );
};

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
