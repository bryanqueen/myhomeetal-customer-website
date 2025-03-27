'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '../Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

export default function Back() {
  const searchParams = useSearchParams();
  const [previousPath, setPreviousPath] = useState('');

  useEffect(() => {
    const referer = searchParams.get('referer');
    if (referer) {
      setPreviousPath(decodeURIComponent(referer));
    }
  }, [searchParams]);
  return (
    <div className='hidden sticky top-20 bg-white z-20 items-center pl-4 pt-5 lg:flex'>
      <Button
        href={previousPath || '/'}
        className='justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
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
        Personal Info
      </p>
    </div>
  );
}
