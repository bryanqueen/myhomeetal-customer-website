import StepsIndicator from '@/app/components/account/wallet/StepIndicator';
import Button from '@/app/components/Button';
import OTPForm from '@/app/components/forms/OTPForm';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Verify OTP | Myhomeetal',
};

export default function VerificationPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='pb-20 px-[3%] lg:px-0'>
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
          My Wallet{' '}
        </p>
      </div>
      <div className='flex flex-col items-center gap-20 xl:flex-row'>
        <div className='hidden shrink-0 gap-3 lg:grid'>
          <h1 className='font-clashmd text-3xl text-myGray'>My Wallet</h1>
        </div>
        <div className='pt-10 lg:pt-0'>
          <StepsIndicator currentStep={2} />
        </div>
      </div>
      <div className='mx-auto mt-20 max-w-[566px]'>
        <Suspense>
          <OTPForm redirectTo='/addfunds' />
        </Suspense>
      </div>
    </main>
  );
}
