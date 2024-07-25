import RecentTransactions from '@/app/components/account/wallet/RecentTransactions';
import StepsIndicator from '@/app/components/account/wallet/StepIndicator';
import WalletBalanceCard from '@/app/components/account/wallet/WalletBalanceCard';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { headers } from 'next/headers';
import React from 'react';

export default function AddFundPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='px-[3%] pb-20 lg:px-0'>
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
      <div className='mb-10 flex flex-col gap-5 pt-10 lg:pt-0 xl:flex-row'>
        <div className='hidden shrink-0 gap-3 lg:grid'>
          <h1 className='font-clashmd text-3xl text-myGray'>My Wallet</h1>
        </div>
        <StepsIndicator currentStep={3} />
      </div>
      <WalletBalanceCard />
      <div className='mt-5 pt-5 lg:mt-0 lg:pt-0'>
        <RecentTransactions />
      </div>
    </main>
  );
}
