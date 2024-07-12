'use client';
import React, { useEffect, useState } from 'react';
import SearchPagination from '../SearchPagination';
import ProductCard from '../cards/ProductCard';

const sortProducts = (products: any[], sortOption: string) => {
  switch (sortOption) {
    case 'priceLowToHigh':
      return products.sort((a, b) => a.price - b.price);
    case 'priceHighToLow':
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
};

export default function MobileCategory({
  sortOption = 'priceLowToHigh',
  priceRange,
  discountFilters,
  products,
}: {
  sortOption?: string | null;
  priceRange: { min: number; max: number };
  discountFilters: number[];
  products: any[];
}) {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    const applyFilters = () => {
      let filtered = products;

      // Apply price filter
      filtered = filtered.filter(
        (product) =>
          product.price >= priceRange.min && product.price <= priceRange.max
      );

      // Apply discount filter
      if (discountFilters.length > 0) {
        filtered = filtered.filter((product) =>
          discountFilters.some((discount) => product.discount === discount)
        );
      }

      // Apply sorting
      filtered = sortProducts(filtered, sortOption);

      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [products, priceRange, discountFilters, sortOption]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(
    startIndex + productsPerPage,
    filteredProducts.length
  );
  const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className='px-[3%] lg:hidden'>
      <div className=''>
        <div className='mt-9 grid grid-cols-2 gap-x-3 gap-y-7'>
          {currentPageProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        <div className='flex justify-center py-3 pt-10'>
          <SearchPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            minPagesToShow={5}
          />
        </div>
      </div>
    </div>
  );
}
