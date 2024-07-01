// import { Metadata } from 'next';
import Image from 'next/image';

import SearchPagination from '@components/SearchPagination';
import ProductListCard from '@components/cards/ProductListCard';
import Button from '@components/Button';

export interface PageProps {
  params?: any;
  searchParams: {
    q: string;
  };
}

export default function SearchPage({ searchParams }: PageProps) {
  return (
    <main className='px-5 pb-20'>
      <p className='my-5 text-sm text-gray-700'>
        Showing 300 results for &quot;{searchParams.q}&quot;
      </p>
      <div className='grid gap-5 lg:grid-cols-[20rem_3fr]'>
        <div className='mb-5 self-start rounded-3xl border p-5'>
          <p>Sort by</p>
          <div className='my-5 grid gap-3'>
            <Button className='w-full rounded-xl p-4'>Price Low to High</Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Newest Arrivals
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Best Sellers
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Price High to Low
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Avg customer Review
            </Button>
          </div>
        </div>
        <div>
          {/*[0, 0, 0, 0, 0].map((item, i) => (
            //<ProductListCard key={i} />
          ))*/}
          <div className='flex justify-center py-3 lg:max-w-3xl'>
            <SearchPagination />
          </div>
        </div>
      </div>
    </main>
  );
}
