import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'iconsax-react';
import ReviewCard from '@components/cards/ReviewCard';
import Button from '@components/Button';
import Pagination from '@components/Pagination';

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
  const selectedReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  const handlePageChange = (page: number | string) => {
    if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  return (
    <div className='py-10'>
      {selectedReviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}

      <div className='mt-10 flex items-center justify-between'>
        <Button
          className='rounded-xl'
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <ArrowLeft />
          Back
        </Button>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <Button
          className='rounded-xl'
          onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default ProductReviews;
