import Accordion from '@/app/components/Accordion';
import ReferralDashBoard2 from '@/app/components/account/ReferralDashboard2';
import Image from 'next/image';
import React from 'react';

export default function ReferralPage() {
  return (
    <main className='mx-[3%]'>
      <section>
        <ReferralDashBoard2 />
      </section>
      <section>
        <div className='mt-7'>
          <Image
            src='/images/referral.svg'
            width={1360}
            height={280}
            alt='referral'
          />
        </div>
      </section>
      <section className='mt-16'>
        <h2 className='mb-3 text-center font-clashmd text-[39px] text-myGray'>
          How it works{' '}
        </h2>
        <p className='text-center text-base leading-[19.09px] text-[#525252]'>
          Invite your friends to shop with us and earn exciting rewards <br />{' '}
          for every successful referral.
        </p>
        <div className='mt-16 grid grid-cols-4 gap-5'>
          <Image
            src='/images/ref1.svg'
            alt='referral'
            width={332}
            height={471}
          />
          <Image
            src='/images/ref2.svg'
            alt='referral'
            width={332}
            height={471}
          />
          <Image
            src='/images/ref3.svg'
            alt='referral'
            width={332}
            height={471}
          />
          <Image
            src='/images/ref4.svg'
            alt='referral'
            width={332}
            height={471}
          />
        </div>
      </section>
      <section className='mt-16'>
        <h2 className='mb-3 text-center font-clashmd text-[39px] text-myGray'>
          Frequently Asked <br /> Question
        </h2>
        <p className='text-center text-base leading-[19.09px] text-[#525252]'>
          Invite your friends to shop with us and earn exciting rewards <br />{' '}
          for every successful referral.
        </p>
        <Accordion />
      </section>
    </main>
  );
}
