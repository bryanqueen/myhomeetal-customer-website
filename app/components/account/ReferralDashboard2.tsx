'use client';
import { constants } from '@/app/utils/constants';
import { hasCookie } from 'cookies-next';
import Image from 'next/image';
import React from 'react';
import ClientOnly from '../ClientOnly';
import Link from 'next/link';

export default function ReferralDashBoard2() {
  return (
    <div className='relative flex h-[493px] w-full max-w-[1360px] items-center justify-between overflow-hidden rounded-3xl bg-primaryBg pl-[5%]'>
      <div>
        <div className='mb-8 max-w-[460px]'>
          <h1 className='mb-4 max-w-[352px] font-clashmd text-[39px] leading-[47.97px] text-white'>
            Welcome to our referral program
          </h1>
          <p className='w-full text-base leading-[19.09px] text-white'>
            Invite your friends to shop with us and earn exciting rewards for
            every successful referral.
          </p>
        </div>
        <ClientOnly>
          {hasCookie(constants.AUTH_TOKEN) ? (
            <div className='mb-4 flex h-[56px] w-full min-w-[516px] items-center justify-between rounded-2xl bg-white pl-7 pr-2'>
              <p className='text-xs text-[#989898]'>
                https://www.myhomeetal.com/referral?code=XYZ123
              </p>
              <button className='h-[47px] w-[113px] rounded-2xl bg-primaryBg font-clashsm text-xs text-white'>
                Copy Code
              </button>
            </div>
          ) : (
            <div className='ml-3'>
              <Link
                href='/login'
                className='rounded-full mr-4 bg-white px-6 py-4 font-clashsm text-xs text-myGray'
              >
                Login
              </Link>
              <Link
                href='/register'
                className='rounded-full bg-white px-6 py-4 font-clashsm text-xs text-myGray'
              >
                Create an Account
              </Link>
            </div>
          )}
        </ClientOnly>
      </div>
      <div className='relative'>
        <Image
          src='/images/referralIcon3.svg'
          width={553}
          height={553}
          alt='referral Icon'
          className='mr-5'
        />
        <Image
          src='/images/referralIcon2.svg'
          width={732.27}
          height={732.27}
          alt='referral Icon'
          className='absolute bottom-0 right-0 z-10'
        />
      </div>
    </div>
  );
}
