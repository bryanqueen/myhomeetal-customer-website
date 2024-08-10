'use client';
import { useEffect, useRef, useState } from 'react';
import ReviewCard from '@components/cards/ReviewCard';
import Button from '@components/Button';
import Pagination from '@components/Pagination';
import { ArrowRightIcon } from '@heroicons/react/16/solid';
import MobileReviewCard from '../cards/MobileReviewCard';
import NoHistory from '../account/NoHistory';

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

const REVIEWS_PER_PAGE = 5;

const ProductReviews = ({ review }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [shouldScroll, setShouldScroll] = useState(false);
  const reviewSectionRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(review.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const selectedReviews = review.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE
  );

  const handleScrollToReviews = () => {
    if (reviewSectionRef.current) {
      const headerOffset = 80; // Adjust this value to match your header height
      const elementPosition =
        reviewSectionRef.current.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
      setShouldScroll(true);
    }
  };

  // Scroll to reviews section whenever the page changes, but only if shouldScroll is true
  useEffect(() => {
    if (shouldScroll) {
      handleScrollToReviews();
      setShouldScroll(false);
    }
  }, [currentPage, shouldScroll]);
  return (
    <div ref={reviewSectionRef} className='pt-10'>
      {selectedReviews.length > 0 ? (
        <div>
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
            <div className='text-[10px] lg:hidden'>
              <span className='font-clashmd text-black'>{currentPage}</span> {'/'}{' '}
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

      ) : (
        <div className='flex h-[20vh] items-center justify-center'>
          <p className='font-clashmd text-sm lg:text-lg'>No Reviews Available</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
