import React from 'react';
import Button from '../Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { headers } from 'next/headers';

export default function Back() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <div className='hidden sticky top-20 bg-white z-20 items-center pl-4 pt-5 lg:flex'>
      <Button
        href={previousPath}
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
