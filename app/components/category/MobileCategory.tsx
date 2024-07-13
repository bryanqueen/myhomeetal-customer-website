'use client';
import React, { useEffect, useState } from 'react';
import SearchPagination from '../SearchPagination';
import ProductCard from '../cards/ProductCard';
import { useNav } from '@/app/providers';
import { XMarkIcon } from '@heroicons/react/16/solid';

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

export default function MobileCategory({ products }: { products: any[] }) {
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState<string | null>('priceLowToHigh');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000000 });
  const [tempMinPrice, setTempMinPrice] = useState(20000);
  const [tempMaxPrice, setTempMaxPrice] = useState(70000);
  const [discountFilters, setDiscountFilters] = useState<number[]>([]);

  const { state, setActiveNav } = useNav();

  const isNavActive = (key: 'sort' | 'filter') => state.activeNav === key;
  const productsPerPage = 10;

  const reset = () => {
    setPriceRange({ min: 0, max: 1000000000 });
    setTempMinPrice(20000);
    setTempMaxPrice(70000);
    setDiscountFilters([]);
  };

  const handleTempPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = Number(e.target.value);
    if (type === 'min') {
      setTempMinPrice(value);
    } else {
      setTempMaxPrice(value);
    }
  };

  const handleDiscountChange = (discount: number) => {
    setDiscountFilters((prev) =>
      prev.includes(discount)
        ? prev.filter((d) => d !== discount)
        : [...prev, discount]
    );
  };

  const applyPriceRange = () => {
    setPriceRange({ min: tempMinPrice, max: tempMaxPrice });
  };

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
      {/**Mobile filter Display */}
      {isNavActive('filter') && (
        <div
          onClick={() => setActiveNav(null)}
          className='fixed bottom-0 left-0 right-0 top-0 z-[2000] flex justify-end bg-black/50 lg:hidden'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='relative h-full w-[80%] bg-white px-[3%]'
          >
            <div className='mx-auto mt-10 flex w-[90%] items-center justify-between'>
              <XMarkIcon width={20} onClick={() => setActiveNav(null)} />
              <p className='font-clashmd text-sm text-black'>Filter</p>
              <button
                onClick={reset}
                className='font-clashmd text-xs text-primary'
              >
                Reset
              </button>
            </div>

            {/** Discount and price range container */}
            <div className='mt-[30%] grid gap-7'>
              {/** Discount container */}
              <div className='rounded-[20px] border border-[#E4E7EC] p-5'>
                <p className='font-clashmd text-xs text-black'>
                  Discount Percentage:
                </p>
                <div className='mt-6 grid gap-5'>
                  <div className='flex items-center gap-5'>
                    <input
                      type='checkbox'
                      name=''
                      id=''
                      onChange={() => handleDiscountChange(50)}
                      checked={discountFilters.includes(50)}
                    />
                    <label className='text-xs text-black'>50% or more</label>
                  </div>
                  <div className='flex items-center gap-5'>
                    <input
                      type='checkbox'
                      name=''
                      id=''
                      onChange={() => handleDiscountChange(40)}
                      checked={discountFilters.includes(40)}
                    />
                    <label className='text-xs text-black'>40% or more</label>
                  </div>
                  <div className='flex items-center gap-5'>
                    <input
                      type='checkbox'
                      name=''
                      id=''
                      onChange={() => handleDiscountChange(30)}
                      checked={discountFilters.includes(30)}
                    />
                    <label className='text-xs text-black'>30% or more</label>
                  </div>
                  <div className='flex items-center gap-5'>
                    <input
                      type='checkbox'
                      name=''
                      id=''
                      onChange={() => handleDiscountChange(20)}
                      checked={discountFilters.includes(20)}
                    />
                    <label className='text-xs text-black'>20% or more</label>
                  </div>
                </div>
              </div>
              {/** Price container */}
              <div className='rounded-[20px] border border-[#E4E7EC] px-[28px] py-5'>
                <div className='flex items-center justify-between'>
                  <p className='font-clashmd text-sm text-black'>Price:</p>
                  <button
                    className='text-xs text-primary'
                    onClick={applyPriceRange}
                  >
                    Apply
                  </button>
                </div>

                <div className='mt-7 flex items-center justify-between'>
                  <input
                    value={tempMinPrice}
                    onChange={(e) => handleTempPriceChange(e, 'min')}
                    className='h-[35px] w-[89px] rounded-full border border-[#E4E7EC] text-center text-xs text-black'
                  />
                  <div className='h-[1.5px] w-3 bg-black'></div>
                  <input
                    value={tempMaxPrice}
                    onChange={(e) => handleTempPriceChange(e, 'max')}
                    className='h-[35px] w-[89px] rounded-full border border-[#E4E7EC] text-center text-xs text-black'
                  />
                </div>
              </div>
              <div className='mt-20'>
                <button
                  onClick={() => setActiveNav(null)}
                  className='h-[57px] w-full rounded-full bg-primary font-clashmd text-xs text-white'
                >
                  Show {currentPageProducts?.length} Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
