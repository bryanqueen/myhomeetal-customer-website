import { Rating } from 'react-simple-star-rating';
import { format } from 'date-fns';

const ReviewCard = ({
  review,
}: {
  review: { name: string; rating: number; comment: string; date: string };
}) => {
  const formattedDate = format(new Date(review.date), 'MMM d, yyyy');
  return (
    <div className='mb-5 flex flex-col gap-3 rounded-3xl bg-gray-100 px-5 py-7'>
      <div className='text-end'>
        <p className='shrink-0 text-xs text-myGray'>Posted {formattedDate}</p>
      </div>
      <div className='flex items-center gap-5'>
        <div className='h-16 w-16 rounded-full bg-gray-300'></div>
        <p className='max-w-[65%] text-sm text-myGray'>{review?.comment} </p>
      </div>

      <div className='flex items-center justify-end'>
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
