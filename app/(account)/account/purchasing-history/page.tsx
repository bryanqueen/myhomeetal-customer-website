'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import PurchasingHistory from '@/app/components/account/PurchasingHistory';


export default function PurchasingHistoryPage() {
  const searchParams = useSearchParams();
  const [previousPath, setPreviousPath] = useState('');

  useEffect(() => {
    const referer = searchParams.get('referer');
    if (referer) {
      setPreviousPath(decodeURIComponent(referer));
    }
  }, [searchParams]);

  return (
    <main className='px-[3%] pb-10 lg:px-0'>
      <div className='sticky top-[83px] z-20 flex items-center justify-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          href={previousPath || '/'}
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
