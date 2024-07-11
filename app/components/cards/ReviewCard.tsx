import { Rating } from 'react-simple-star-rating';
import { format } from 'date-fns';

const ReviewCard = ({
  review,
}: {
  review: { name: string; rating: number; comment: string; date: string };
}) => {
  const formattedDate = format(new Date(review.date), 'MMM d, yyyy');
  return (
    <div className='mb-5 flex flex-col lg:flex-row h-[200px] lg:w-[783px] items-center rounded-[20px] bg-[#f4f4f4] px-5'>
      <div className='flex h-[69px] lg:w-[563px] items-center gap-7'>
        <div className='h-[69px] w-[69px] rounded-full bg-gray-300'></div>
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
