'use client';
import cn from 'classnames';
import { signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect, useState } from 'react';

import SearchPagination from '../SearchPagination';
import Button from '@components/Button';
import ProductListCard from '@components/cards/ProductListCard';
import ProductGridCard from '@components/cards/ProductGridCard';

const isList = signal(false);

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  rating: any;
  isProductNew: boolean;
  discount: number;
  createdAt: string;
}

const parsePrice = (priceString) => {
  // Remove commas and convert to a number
  return parseFloat(priceString.replace(/,/g, ''));
};

const sortProducts = (products: Product[], sortOption: string) => {
  switch (sortOption) {
    case 'priceLowToHigh':
      return products.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    case 'priceHighToLow':
      return products.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    case 'newestArrivals':
      return products.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'bestSellers':
      return products.sort((a, b) => b?.rating?.length - a?.rating?.length);
    case 'AvgCustomerReview':
      return products.sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
};
const ListGridSwitch = ({
  sortOption,
  priceRange,
  discountFilters,
  products,
}: {
  sortOption?: string | null;
  priceRange: { min: number; max: number };
  discountFilters: number[];
  products: Product[];
}) => {
  useSignals();

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 42;

  useEffect(() => {
    const applyFilters = () => {
      if (products) {
        let filtered = products;

        // In the filter function
        filtered = filtered.filter(
          (product) => parsePrice(product.price) >= priceRange.min && parsePrice(product.price) <= priceRange.max
        );

        // Apply discount filter
        if (discountFilters?.length > 0) {
          filtered = filtered?.filter((product) =>
            discountFilters.some((discount) => product?.discount === discount)
          );
        }

        // Apply sorting
        filtered = sortProducts(filtered, sortOption);

        setFilteredProducts(filtered);
      }
    };

    applyFilters();
  }, [products, priceRange, discountFilters, sortOption]);

  const totalPages = Math.ceil(filteredProducts?.length / productsPerPage);

  // New useEffect to reset currentPage if it exceeds totalPages
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredProducts?.length, totalPages, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math?.min(
    startIndex + productsPerPage,
    filteredProducts?.length
  );
  const currentPageProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div>
      <div
        className={cn({
          'grid w-fit grid-cols-3 gap-4 xl:grid-cols-3': !isList.value,
        })}
      >
        {currentPageProducts?.map((product) =>
          isList.value ? (
            <ProductListCard key={product?._id} product={product} />
          ) : (
            <ProductGridCard key={product?._id} product={product} />
          )
        )}
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
  );
};

export const ListGridSwitchControls = () => {
  useSignals();

  return (
    <div
      className={cn('hidden items-center justify-end gap-2 md:flex', {
        'text-primary': isList.value === true,
        'text-gray-500': isList.value === false,
      })}
    >
      <Button
        className='text-inherit'
        variant='ghost'
        fit
        onClick={() => (isList.value = false)}
      >
        <GridIcon isActive={isList.value === false} />
      </Button>
      <Button
        className='text-inherit'
        variant='ghost'
        fit
        onClick={() => (isList.value = true)}
      >
        <ListIcon isActive={isList.value === true} />
      </Button>
    </div>
  );
};

const GridIcon = ({ isActive }: { isActive?: boolean }) => {
  const color = isActive ? 'black' : 'lightgray';

  return (
    <svg width='20' height='25' viewBox='0 0 25 25' fill='none'>
      <rect width='10' height='10' fill={color} />
      <rect x='15' width='10' height='10' fill={color} />
      <rect y='15' width='10' height='10' fill={color} />
      <rect x='15' y='15' width='10' height='10' fill={color} />
    </svg>
  );
};

const ListIcon = ({ isActive }: { isActive?: boolean }) => {
  const color = isActive ? 'black' : 'lightgray';

  return (
    <svg
      width='20'
      height='24'
      viewBox='0 0 26 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='4' height='4' fill={color} />
      <rect x='6' width='20' height='4' fill={color} />
      <rect y='10' width='4' height='4' fill={color} />
      <rect x='6' y='10' width='20' height='4' fill={color} />
      <rect y='20' width='4' height='4' fill={color} />
      <rect x='6' y='20' width='20' height='4' fill={color} />
    </svg>
  );
};

export default ListGridSwitch;
