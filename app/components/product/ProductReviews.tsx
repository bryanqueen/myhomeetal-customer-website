import { ArrowLeft, ArrowRight } from 'iconsax-react';

import ReviewCard from '@components/cards/ReviewCard';
import Button from '@components/Button';
import Pagination from '@components/Pagination';

const ProductReviews = () => {
  return (
    <div className='py-10'>
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <div className='mt-10 flex items-center justify-between'>
        <Button className='rounded-full'>
          <ArrowLeft />
          Back
        </Button>
        <Pagination currentPage={12} totalPages={20} onPageChange={() => 1} />
        <Button className='rounded-full'>
          Next
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
