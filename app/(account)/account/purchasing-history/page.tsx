import PurchasingHistory from '@/app/components/account/PurchasingHistory';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Purchasing History | Myhomeetal',
};

export default function PurchasingHistoryPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='px-[3%] pb-10 lg:px-0'>
      <div className='sticky top-[83px] z-20 flex items-center justify-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          href={previousPath}
          className='absolute left-[2%] justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          linkType='rel'
          variant='ghost'
        >
          <ArrowLeftIcon
            width={17}
            className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'
          />
          Back
        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          My Orders
        </p>
      </div>
      <h1 className='hidden font-clashmd text-3xl text-myGray lg:block'>
        My Orders
      </h1>
      <PurchasingHistory />
    </main>
  );
}
