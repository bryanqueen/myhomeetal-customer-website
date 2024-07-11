import { useState } from 'react';
import ReviewCard from '@components/cards/ReviewCard';
import Button from '@components/Button';
import Pagination from '@components/Pagination';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import MobileReviewCard from '../cards/MobileReviewCard';

interface Review {
  rating: number;
  name: string;
  date: string;
  comment: string;
}

interface ProductReviewInfoProps {
  reviews: Review[];
}

const REVIEWS_PER_PAGE = 5;

const ProductReviews = ({ reviews }: ProductReviewInfoProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const selectedReviews = reviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE
  );

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  return (
    <div className='pt-10'>
      <div className='hidden lg:block'>
        {selectedReviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      <div className='lg:hidden'>
        {selectedReviews.map((review, index) => (
          <MobileReviewCard key={index} review={review} />
        ))}
      </div>

      <div className='mt-10 flex items-center justify-between'>
        <Button
          className='h-[45px] w-[97px] rounded-xl border-0 font-clashmd text-xs shadow-none'
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className='hidden lg:block'>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        <div className='lg:hidden text-[10px]'>
          <span className='text-black font-clashmd'>{currentPage}</span> {'/'}{' '}
          <span className='text-[#868686]'>{totalPages}</span>
        </div>

        <Button
          className='hidden h-[45px] w-[137px] items-center justify-center gap-2 rounded-xl border-0 font-clashmd text-xs shadow-none lg:flex'
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          iconRight={<ArrowRightIcon width={16} />}
        >
          Next
        </Button>
        <Button
          className='flex h-[45px] w-[97px] items-center justify-center gap-2 rounded-xl border-0 font-clashmd text-xs shadow-none lg:hidden'
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
