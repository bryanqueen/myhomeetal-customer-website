// import { Metadata } from 'next';
'use client';
import Button from '@components/Button';
import ListGridSwitch, {
  ListGridSwitchControls,
} from '@components/category/ListGridSwitch';
import { useState } from 'react';

export interface PageProps {
  params?: any;
  searchParams: {
    categoryId: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const categoryName = params.categoryName;
  const [sortOption, setSortOption] = useState<string | null>('priceLowToHigh');

  return (
    <main className='px-[3%] pb-20'>
      <div className='mb-5 flex items-center justify-between'>
        <p className='text-xs md:text-sm'>
          Showing results for &quot;{categoryName}&quot;
        </p>
        <ListGridSwitchControls />
      </div>
      <div className='grid gap-5 lg:grid-cols-[20rem_3fr]'>
        <div className='mb-5 self-start rounded-3xl border p-5'>
          <p>Sort by</p>
          <div className='my-5 grid gap-3'>
            <Button
              onClick={() => setSortOption('priceLowToHigh')}
              className={
                sortOption === 'priceLowToHigh'
                  ? 'w-full rounded-xl p-4'
                  : 'w-full rounded-xl bg-white p-4 text-gray-500'
              }
            >
              Price Low to High
            </Button>
            <Button
              onClick={() => setSortOption('newestArrivals')}
              className='w-full rounded-xl bg-white p-4 text-gray-500'
            >
              Newest Arrivals
            </Button>
            <Button
              onClick={() => setSortOption('bestSellers')}
              className='w-full rounded-xl bg-white p-4 text-gray-500'
            >
              Best Sellers
            </Button>
            <Button
              onClick={() => setSortOption('priceHighToLow')}
              className={
                sortOption === 'priceHighToLow'
                  ? 'w-full rounded-xl p-4'
                  : 'w-full rounded-xl bg-white p-4 text-gray-500'
              }
            >
              Price High to Low
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Avg customer Review
            </Button>
          </div>
        </div>
        <div>
          <ListGridSwitch sortOption={sortOption} />
        </div>
      </div>
    </main>
  );
}
