'use client';

import Pagination from '@components/Pagination';

const SearchPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  minPagesToShow,
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
