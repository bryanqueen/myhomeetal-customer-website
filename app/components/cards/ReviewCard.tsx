'use client'
import { Rating } from 'react-simple-star-rating';
import { format, parseISO } from 'date-fns';

type UserType = {
  _id: string;
  firstname: string;
};

type ReviewType = {
  _id: string;
  user?: UserType;
  product: string;
  rating: number;
  comment: string;
  date: string;
  __v: number;
};

const ReviewCard = (
 {review}:{ review: ReviewType}
) => {
  const formattedDate = review?.date ? format(parseISO(review?.date), 'MMM dd, yyyy') : 'Invalid date';
  return (
    <div className='mb-5 flex flex-col lg:flex-row h-[200px] lg:w-[783px] justify-between items-center rounded-[20px] bg-[#f4f4f4] px-7'>
      <div className='flex flex-col min-h-[69px] lg:w-[563px] gap-2'>
        <p className='text-myGray font-clashmd text-sm'>{review?.user?.firstname}</p>
        <p className='text-sm truncate text-myGray'>{review?.comment}</p>
      </div>

      <div className='flex h-[141px] lg:w-[120px] flex-col items-center justify-between'>
        <p className='text-xs text-myGray'>Posted {formattedDate}</p>

        <Rating
          initialValue={review?.rating}
          readonly={true}
          allowFraction={true}
          size={24}
          SVGclassName='inline'
          fillColor='#ED2224'
        />
      </div>
    </div>
  );
};

export default ReviewCard;
