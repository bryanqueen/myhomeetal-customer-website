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
  <div className='flex w-full items-center gap-5 py-1 lg:gap-8'>
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

type UserType = {
  _id: string;
  firstname: string;
};

type ReviewType = {
  _id: string;
  user: UserType;
  product: string;
  rating: number;
  comment: string;
  date: string;
  __v: number;
};

type Props = {
  review: ReviewType[];
};

export const Review = ({ review }: Props) => {
  const calculateAverageRating = (review: ReviewType[]) => {
    const total = review.reduce((sum, rev) => sum + rev.rating, 0);
    return review.length ? total / review.length : 0;
  };

  const calculateRatingDistribution = (review: ReviewType[]) => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    review.forEach((rev) => {
      distribution[rev.rating] += 1;
    });

    const reviewCount = review.length;

    if (reviewCount > 0) {
      for (const star in distribution) {
        distribution[star] = ((distribution[star] / reviewCount) * 100).toFixed(1);
      }
    } else {
      // Ensure all percentages are 0.0% if there are no reviews
      for (const star in distribution) {
        distribution[star] = (0).toFixed(1);
      }
    }

    return distribution;
  };


  const averageRating = calculateAverageRating(review);
  const reviewCount = review.length;
  const ratingDistribution = calculateRatingDistribution(review);

  return (
    <div className='mb-5 py-[38px] lg:rounded-[20px] lg:border lg:border-[#E4E7EC] lg:px-10'>
      <div className='relative flex gap-4 px-5 lg:h-[175px] lg:w-[759px] lg:justify-between lg:px-0'>
        <div className='absolute left-[50%] hidden h-[100%] w-[1px] translate-x-[-50%] bg-[#989898] lg:block'></div>
        <div className='relative flex basis-[30%] flex-col items-center justify-center gap-3 lg:flex-row lg:gap-10'>
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
              {reviewCount} {reviewCount < 2 ? 'review' : 'reviews'}
            </span>
          </div>
        </div>
        <div className='flex items-center justify-end pl-2 lg:pr-10'>
          <div className='w-[100px] lg:h-[157.08px] lg:min-w-[283px]'>
            {Object.keys(ratingDistribution)
              .reverse()
              .map((star) => (
                <RatingProgress
                  key={star}
                  star={Number(star)}
                  percent={Number(ratingDistribution[star])}
                />
              ))}
          </div>
        </div>
      </div>
      <ProductReviews review={review} />
    </div>
  );
};
