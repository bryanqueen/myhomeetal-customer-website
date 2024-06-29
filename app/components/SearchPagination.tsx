'use client';

import Pagination from '@components/Pagination';

const SearchPagination = () => {
  return (
    <Pagination
      currentPage={2}
      totalPages={15}
      onPageChange={() => 3}
      minPagesToShow={5}
    />
  );
};

export default SearchPagination;
