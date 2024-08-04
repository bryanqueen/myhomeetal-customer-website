'use client';

import cn from 'classnames';
import Button from '@components/Button';
import { getPageNumbers } from '@utils/helpers';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number | string) => void;
  minPagesToShow?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  minPagesToShow,
}: PaginationProps) => {
  const handleClick = (page: number | string) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className=''>
      <div className='flex gap-1'>
        {getPageNumbers(currentPage, totalPages, 2, minPagesToShow).map(
          (pageNumber, i) => (
            <Button
              key={i}
              className={cn(
                'h-7 w-7 max-w-fit rounded-md border-0 bg-white p-3 text-black',
                {
                  'bg-primary/70 text-white': pageNumber === currentPage,
                }
              )}
              onClick={() => handleClick(pageNumber)}
              disabled={pageNumber === '...'}
            >
              {pageNumber}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default Pagination;
