import { Rating } from 'react-simple-star-rating';

const ReviewCard = () => {
  return (
    <div className='mb-5 flex gap-3 rounded-3xl bg-gray-100 p-3 pb-10 pt-5'>
      <div>
        <div className='h-16 w-16 rounded-full bg-gray-300'></div>
      </div>
      <div className='grid gap-2'>
        <p>User</p>
        <Rating
          initialValue={4}
          readonly={true}
          allowFraction={true}
          size={20}
          SVGclassName='inline'
        />
        <p className='max-w-lg text-sm'>
          From a trusted brand committed to offering uncompromising quality,
          comfort and style, the Serta Big & Tall Executive Office Chair is not
          your average office chair.{' '}
        </p>
      </div>
      <div>
        <p className='shrink-0 text-xs'>Posted Feb 7, 2023</p>
      </div>
    </div>
  );
};

export default ReviewCard;
