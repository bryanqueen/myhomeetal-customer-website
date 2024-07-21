import ReferralDashBoard from '@/app/components/account/ReferralDashBoard';
import ReferralEarningDashboard from '@/app/components/account/ReferralEarningDashboard';
import ReferralTable from '@/app/components/account/ReferralTable';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { headers } from 'next/headers';
import React from 'react';

export default function ReferralPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='mx-[3%] lg:mx-0'>
      <div className='flex sticky bg-white z-50 top-[83px] items-center py-5 pl-1 lg:hidden'>
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
          My Referrals
        </p>
      </div>
      <section>
        <ReferralDashBoard />
      </section>
      <section>
        <ReferralEarningDashboard />
      </section>
      <section>
        <ReferralTable />
      </section>
    </main>
  );
}
