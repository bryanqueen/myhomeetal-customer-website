'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import CloseAccountForm from '@/app/components/forms/CloseAccountForm';

function CloseAccountPage() {
  const searchParams = useSearchParams();
  const [previousPath, setPreviousPath] = useState('');

  useEffect(() => {
    const referer = searchParams.get('referer');
    if (referer) {
      setPreviousPath(decodeURIComponent(referer));
    }
  }, [searchParams]);
  return (
    <main className='mx-[3%] lg:mx-0 lg:pb-40'>
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
          Close Account
        </p>
      </div>
      <div className='hidden flex-col items-center lg:flex'>
        <h1 className='font-clashmd text-3xl text-myGray'>Close Account</h1>
        <p className='mt-2 max-w-md py-2 text-center text-base leading-[19px] text-[#7C7C7C]'>
          Easily manage and select delivery locations to ensure your orders
          reach exactly where you want them.
        </p>
      </div>
      <div className='mx-auto mt-9 flex max-w-[439px] flex-col items-center rounded-2xl lg:gap-5 lg:border lg:border-[#F4F4F4] lg:p-5'>
        <div className='mb-4 h-[87px] w-[87px] rounded-full border-[3px] border-[#E7E7E7] bg-[#FFC5C6] lg:mb-0 lg:h-[68px] lg:w-[68px] lg:border-0' />
        <p className='mb-3 text-center font-clashmd text-sm text-myGray lg:mb-0 lg:text-2xl'>
          We hate to see you go.
        </p>
        <p className='mb-14 max-w-[318px] text-center text-xs leading-[17.22px] text-black lg:mb-0 lg:max-w-[391px] lg:text-sm lg:text-myGray'>
          Before you delete your account, we would want you to know that this
          action will delete your data across myhomeetal platforms. If
          that&apos;s what you want, please proceed with entering your password
          to confirm that it&apos;s you.
        </p>
        <CloseAccountForm />
      </div>
    </main>
  );
}

export default CloseAccountPage;
