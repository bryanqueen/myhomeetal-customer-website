'use client';
import Image from 'next/image';
import React from 'react';
import { Rating } from 'react-simple-star-rating';
import ProductReviews from './ProductReviews';

const RatingProgress = ({
  star = 1,
  percent = 45,
}: {
  star?: number;
  percent?: number;
}) => (
  <div className='flex w-full items-center gap-5 lg:gap-8 py-1'>
    <div className='flex items-center justify-between text-xs text-black lg:text-base lg:text-myGray'>
      <span className='w-[50px] text-center'>{star}</span>
      <Image
        src='/icons/star.svg'
        alt='Ratings'
        width={21}
        height={21}
        className='w-[15px] lg:w-[21px]'
      />
    </div>
    <div className='h-[5px] min-w-[109px] rounded-full bg-[#DCDCDC] lg:h-1.5 lg:min-w-[151px] dark:bg-[#DCDCDC]'>
      <div
        className='h-[5px] rounded-full bg-primary lg:h-1.5'
        style={{ width: `${percent}%` }}
      ></div>
    </div>
    <div className='hidden text-base text-myGray lg:block'>({percent}%)</div>
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
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
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
    comment:
      'Could be better.hdfdh af arw rewe awria weriwerf ar arwi qwerq qr rwf q quidqw  qvd qudqv   qqquwevwq qwwu   du qud   qudvw   qwewev duqevqw eueu',
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

export const Review = () => {
  const averageRating = calculateAverageRating(reviews);
  const reviewCount = reviews.length;
  const ratingDistribution = calculateRatingDistribution(reviews);

  return (
    <div className='mb-5 py-[38px] lg:rounded-[20px] lg:border lg:border-[#E4E7EC] lg:px-10'>
      <div className='relative flex lg:justify-between gap-4 px-5 lg:h-[175px] lg:w-[759px] lg:px-0'>
        <div className='absolute left-[50%] hidden h-[100%] w-[1px] translate-x-[-50%] bg-[#989898] lg:block'></div>
        <div className='relative flex basis-[30%] flex-col justify-center items-center gap-3 lg:flex-row lg:gap-10'>
          <div className='absolute right-[-15px] top-[50%] h-[60%] w-[1px] translate-y-[-50%] bg-[#989898]/40 lg:hidden'></div>
          <div className='flex h-[65px] w-[65px] items-center justify-center rounded-full bg-primary font-clashmd text-4xl text-white lg:h-[116px] lg:w-[116px] lg:text-5xl'>
            {averageRating.toFixed(1)}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='hidden lg:block'>
              <Rating
                initialValue={averageRating}
                readonly={true}
                allowFraction={true}
                size={25}
                SVGclassName='inline'
                fillColor=''
                className=' text-primary'
              />
            </div>
            <div className='lg:hidden'>
              <Rating
                initialValue={averageRating}
                readonly={true}
                allowFraction={true}
                size={17}
                SVGclassName='inline'
                fillColor=''
                className=' text-primary'
              />
            </div>

            <span className='text-center text-[10px] text-myGray lg:text-start lg:text-base'>
              {reviewCount} reviews
            </span>
          </div>
        </div>
        <div className='flex pl-2 items-center justify-end lg:pr-10'>
          <div className='w-[100px] lg:h-[157.08px] lg:min-w-[283px]'>
            {Object.keys(ratingDistribution)
              .reverse()
              .map((star) => (
                <RatingProgress
                  key={star}
                  star={Number(star)}
                  percent={ratingDistribution[star].toFixed(1)}
                />
              ))}
          </div>
        </div>
      </div>
      <ProductReviews reviews={reviews} />
    </div>
  );
};
