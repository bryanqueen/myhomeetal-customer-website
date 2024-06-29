// import { Metadata } from 'next';

import SearchPagination from '@components/SearchPagination';
import Button from '@components/Button';
import ListGridSwitch, {
  ListGridSwitchControls,
} from '@components/category/ListGridSwitch';

export interface PageProps {
  params?: any;
  searchParams: {
    q: string;
  };
}

export default function CategoryPage() {
  return (
    <main className='px-5 pb-20'>
      <div className='flex justify-between'>
        <p className='my-5 text-sm font-medium text-gray-700'>
          My Phones and Tablet
        </p>
        <ListGridSwitchControls />
      </div>
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
          <ListGridSwitch />
          <div className='flex justify-center py-3'>
            <SearchPagination />
          </div>
        </div>
      </div>
    </main>
  );
}
