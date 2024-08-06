'use client';
import { format, parseISO } from 'date-fns';
import { Rating } from 'react-simple-star-rating';

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

export default function MobileReviewCard(
  { review }: { review: ReviewType }) {
  const formattedDate = review?.date ? format(parseISO(review.date), 'MMM dd') : 'Invalid date';
  return (
    <div className='mb-5 flex h-[95.8px] flex-col justify-between rounded-[10px] bg-[#F4F4F4] px-[10px] py-[15px]'>
      <div className='flex h-[39px] items-center gap-5'>
        <div className='h-[39px] w-[39px] rounded-full bg-gray-300'></div>
        <p className='w-[90%] truncate text-sm text-myGray'>
          {review?.comment}
        </p>
      </div>
      <div className='flex h-[10.8px] items-center justify-end'>
        <div className='flex h-[10.8px] w-fit gap-2 items-center justify-between'>
          <Rating
            initialValue={review?.rating}
            readonly={true}
            allowFraction={true}
            size={11}
            SVGclassName='inline'
            fillColor='#ED2224'
            className='mb-1'
          />
          <p className='text-[8px] text-[#786D6D]'>Posted {formattedDate}</p>
        </div>
      </div>
    </div>
  );
}
