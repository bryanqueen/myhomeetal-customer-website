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
      <div className='sticky top-[83px] z-20 flex items-center bg-white py-5 pl-1 lg:hidden'>
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
        <p className='mb-3 text-center font-clashmd text-xs text-black lg:text-start lg:text-base lg:text-myGray'>
          Recent transactions
        </p>
        <div>
          <RecentTransactions />
        </div>
        <div className='hidden h-full max-h-[427px] w-full rounded-2xl border border-[#F4F4F4] px-5 py-6 lg:block'>
          <div className='flex w-full items-center justify-between'>
            <p className='font-clashmd text-base text-myGray'>Items</p>
            <p className='font-clashmd text-base text-myGray'>Amount</p>
          </div>
          <div className='flex min-h-[300px] items-center justify-center'>
            <p className='font-clashmd text-base'>No New transactions</p>
          </div>
        </div>
      </div>
    </main>
  );
}
