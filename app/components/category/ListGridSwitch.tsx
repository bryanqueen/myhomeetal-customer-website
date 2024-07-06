'use client';
import cn from 'classnames';
import { signal } from '@preact/signals-react';
import { useSignals } from '@preact/signals-react/runtime';
import { useEffect, useState } from 'react';
import { notFound, useSearchParams } from 'next/navigation';

import SearchPagination from '../SearchPagination';
import productService from '@/app/services/productService';
import Button from '@components/Button';
import ProductListCard from '@components/cards/ProductListCard';
import ProductGridCard from '@components/cards/ProductGridCard';

const isList = signal(false);

const ListGridSwitch = ({ sortOption }: { sortOption?: string | null }) => {
  useSignals();

  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 4;

  // Calculate the range of products to display for the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = Math.min(
    startIndex + productsPerPage,
    categoryProducts.length
  ); // Ensure endIndex doesn't exceed product length
  const currentPageProducts = categoryProducts.slice(startIndex, endIndex);

  const searchParams = useSearchParams();
  const id = searchParams.get('categoryId') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await productService.getProductsByCategory(id);
        if (!res || !res.data) {
          console.log('Products not found');
          return notFound();
        }
        setCategoryProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
        return notFound();
      }
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(categoryProducts.length / productsPerPage);

  if (loading) {
    return <p>Loading...</p>;
  }

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

  const sortedProducts = sortProducts(currentPageProducts, sortOption);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <div
        className={cn({
          'grid grid-cols-2 gap-5 lg:max-w-5xl xl:grid-cols-3': !isList.value,
        })}
      >
        {sortedProducts.map((product) =>
          isList.value ? (
            <ProductListCard key={product._id} product={product} />
          ) : (
            <ProductGridCard key={product._id} product={product} />
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
