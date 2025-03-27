'use client';

import { useEffect, useState } from 'react';
import Notifications from '@/app/components/account/Notifications';
import { useSearchParams } from 'next/navigation';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

function NotificationsPage() {
  const searchParams = useSearchParams();
  const [previousPath, setPreviousPath] = useState('');

  useEffect(() => {
    const referer = searchParams.get('referer');
    if (referer) {
      setPreviousPath(decodeURIComponent(referer));
    }
  }, [searchParams]);

  return (
    <main className='px-[3%] lg:px-0'>
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
          My Notifications
        </p>
      </div>
      <div className='hidden lg:block'>
        <h1 className='font-clashmd text-3xl text-myGray'>My Notifications</h1>
        <p className='mt-2 text-base text-[#7C7C7C]'>
          Stay updated! All your alerts, updates, and important messages in one
          place.
        </p>
      </div>

      <Notifications />
    </main>
  );
}

export default NotificationsPage;
