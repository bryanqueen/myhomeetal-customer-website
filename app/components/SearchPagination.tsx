'use client';

import Pagination from '@components/Pagination';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  minPagesToShow?: number; // Optional prop
}

const SearchPagination: React.FC<SearchPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  minPagesToShow = 1,
}) => {
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      minPagesToShow={minPagesToShow}
    />
  );
};

export default SearchPagination;
