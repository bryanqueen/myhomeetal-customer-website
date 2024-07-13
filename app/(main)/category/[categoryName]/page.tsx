//import { Metadata } from 'next';
'use client';
import { Suspense, useEffect, useState } from 'react';

import Button from '@components/Button';
import ListGridSwitch, {
  ListGridSwitchControls,
} from '@components/category/ListGridSwitch';
import SearchForm from '@/app/components/forms/SearchForm';
import MobileCategory from '@/app/components/category/MobileCategory';
import Image from 'next/image';
import productService from '@/app/services/productService';
import { notFound, useSearchParams } from 'next/navigation';
import { useNav } from '@/app/providers';
import { XMarkIcon } from '@heroicons/react/16/solid';

export interface PageProps {
  params?: any;
  searchParams: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const categoryName = decodeURIComponent(params.categoryName);
  const [categoryProducts, setCategoryProducts] = useState<any[]>([]);
  const [sortOption, setSortOption] = useState<string | null>('priceLowToHigh');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000000 });
  const [tempMinPrice, setTempMinPrice] = useState(20000);
  const [tempMaxPrice, setTempMaxPrice] = useState(70000);
  const [discountFilters, setDiscountFilters] = useState<number[]>([]);

  const { state, setActiveNav } = useNav();

  const isNavActive = (key: 'sort' | 'filter') => state.activeNav === key;

  const searchParams = useSearchParams();
  const id = searchParams.get('categoryId') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productService.getProductsByCategory(id);
        if (!res || !res.data) {
          console.log('Products not found');
          return notFound();
        }
        setCategoryProducts(res.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        return notFound();
      }
    };

    fetchProducts();
  }, [id]);

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

  return (
    <main className='pb-20 pt-[165px] lg:px-[3%] lg:pt-0'>
      <Suspense>
        <div className='fixed left-0 right-0 top-[83px] z-[1000] bg-white px-[3%] py-4 lg:hidden'>
          <SearchForm />
        </div>
      </Suspense>
      {/**Mobile Category Header */}
      <div className='flex h-[40px] items-center justify-between bg-[#F4F4F4] pl-[14px] pr-[10px] lg:hidden'>
        <p className='text-[8px] md:text-sm'>
          Showing results for &quot;{categoryName}&quot;
        </p>
        <div className='flex h-[32px] w-[115px] items-center justify-between'>
          <button
            onClick={() => setActiveNav('sort')}
            className='flex h-full w-[44px] items-center justify-between font-clashmd text-[10px]'
          >
            Sort
            <Image
              src='/icons/Arrowupdown.svg'
              width={15}
              height={11}
              alt='arrow icon'
            />
          </button>
          <button
            onClick={() => setActiveNav('filter')}
            className='flex h-full w-[45px] items-center justify-between font-clashmd text-[10px]'
          >
            Filter
            <Image
              src='/icons/filterbar.svg'
              width={12}
              height={11}
              alt='filter icon'
            />
          </button>
        </div>
      </div>

      <MobileCategory products={categoryProducts} />

      <div className='hidden lg:block'>
        <div className='mb-5 flex items-center justify-between'>
          <p className='text-xs md:text-sm'>
            Showing results for &quot;{categoryName}&quot;
          </p>
          <ListGridSwitchControls />
        </div>
        <div className='grid gap-5 lg:grid-cols-[20rem_3fr]'>
          {/** Sort and filter container desktop */}
          <div>
            {/** Sort container */}
            <div className='mb-5 rounded-[20px] border border-[#E4E7EC] p-5'>
              <p className='text-center font-clashmd text-sm text-black'>
                Sort by
              </p>
              <div className='mt-5 grid gap-3'>
                <Button
                  onClick={() => setSortOption('priceLowToHigh')}
                  className={
                    sortOption === 'priceLowToHigh'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Price Low to High
                </Button>
                <Button
                  onClick={() => setSortOption('newestArrivals')}
                  className={
                    sortOption === 'newestArrivals'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Newest Arrivals
                </Button>
                <Button
                  onClick={() => setSortOption('bestSellers')}
                  className={
                    sortOption === 'bestSellers'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Best Sellers
                </Button>
                <Button
                  onClick={() => setSortOption('priceHighToLow')}
                  className={
                    sortOption === 'priceHighToLow'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Price High to Low
                </Button>
                <Button
                  onClick={() => setSortOption('AvgCustomerReview')}
                  className={
                    sortOption === 'AvgCustomerReview'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Avg customer Review
                </Button>
              </div>
            </div>
            {/** Discount container */}
            <div className='mb-5 rounded-[20px] border border-[#E4E7EC] px-[36px] py-5'>
              <p className='font-clashmd text-sm text-black'>
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
                  <label className='text-sm text-black'>50% or more</label>
                </div>
                <div className='flex items-center gap-5'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    onChange={() => handleDiscountChange(40)}
                    checked={discountFilters.includes(40)}
                  />
                  <label className='text-sm text-black'>40% or more</label>
                </div>
                <div className='flex items-center gap-5'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    onChange={() => handleDiscountChange(30)}
                    checked={discountFilters.includes(30)}
                  />
                  <label className='text-sm text-black'>30% or more</label>
                </div>
                <div className='flex items-center gap-5'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    onChange={() => handleDiscountChange(20)}
                    checked={discountFilters.includes(20)}
                  />
                  <label className='text-sm text-black'>20% or more</label>
                </div>
              </div>
            </div>
            {/** Price container */}
            <div className='mb-5 rounded-[20px] border border-[#E4E7EC] px-[36px] py-5'>
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
                  className='h-[37px] w-[110px] rounded-full border border-[#E4E7EC] px-7 py-2 text-center text-sm text-black'
                />
                <div className='h-[1.5px] w-3 bg-black'></div>
                <input
                  value={tempMaxPrice}
                  onChange={(e) => handleTempPriceChange(e, 'max')}
                  className='h-[37px] w-[110px] rounded-full border border-[#E4E7EC] px-7 py-2 text-center text-sm text-black'
                />
              </div>
            </div>
          </div>
          {/** Products container */}
          <div>
            <ListGridSwitch
              products={categoryProducts}
              sortOption={sortOption}
              priceRange={priceRange}
              discountFilters={discountFilters}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
