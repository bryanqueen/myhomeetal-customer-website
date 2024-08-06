'use client';
import Image from 'next/image';
import React from 'react';
import ClientOnly from '../ClientOnly';
import toast from 'react-hot-toast';

interface UserInfo {
  points: number;
  referralCode: string;
  referrals: [];
}

interface AccountDashboardProps {
  userInfo: UserInfo | null;
}

export default function ReferralDashBoard({ userInfo }: AccountDashboardProps) {
  const referralLink = `https://www.myhomeetal.com/register?code=${userInfo.referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(
      () => {
        toast.success('Link copied to clipboard!');
      },
      (err) => {
        toast.error('Failed to copy the link. Please try again.');
      }
    );
  };

  return (
    <div className='relative flex h-[256px] mt-3 lg:mt-0 w-full items-center overflow-hidden rounded-[10px] bg-[#FFF1F1] lg:h-[339px] lg:rounded-3xl lg:pl-[5%]'>
      <div className='z-10 w-full lg:z-0'>
        <div className='mx-auto mb-7 max-w-[224px] lg:mx-0 lg:mb-4 lg:max-w-[470px]'>
          <h1 className='mb-2 text-center font-clashmd  text-xs text-myGray lg:mb-4 lg:text-start lg:text-2xl'>
            Welcome to our referral program
          </h1>
          <p className='w-full text-[10px] leading-[12.3px] text-[#525252] lg:text-base lg:leading-[19.09px]'>
            Invite your friends to shop with us and earn exciting rewards for
            every successful referral.
          </p>
        </div>
        <ClientOnly>
          <div className='mx-auto mb-4 flex h-[50px] min-w-[300px] max-w-[300px] items-center justify-center rounded-2xl bg-white lg:mx-0 lg:h-[56px] lg:max-w-[490px] lg:justify-between lg:pl-7 lg:pr-2'>
            <p
              id='referralLink'
              className='text-[10px] text-[#989898] lg:text-xs'
            >
              {referralLink}
            </p>
            <button
              onClick={copyToClipboard}
              className='hidden h-[47px] w-[113px] rounded-2xl bg-primaryBg font-clashsm text-xs text-white lg:block'
            >
              Copy Code
            </button>
          </div>
          <div className='flex items-center justify-center lg:hidden'>
            <button
              onClick={copyToClipboard}
              className='h-[34px] w-[157px] rounded-full bg-primaryBg font-clashmd text-[10px] text-white lg:hidden'
            >
              Copy Code
            </button>
          </div>
        </ClientOnly>
      </div>
      <Image
        src='/images/referralIcon5.svg'
        width={207}
        height={211}
        alt='referral Icon'
        className='absolute bottom-0 left-0 mt-[59px] lg:hidden'
      />
      <div className='absolute right-[-10%] top-[-122px] hidden h-[553px] w-[553px] items-center rounded-full bg-[#FFE0E0]/50 pl-[33px] lg:flex'>
        <Image
          src='/images/referralIcon.svg'
          width={429.73}
          height={419.68}
          alt='referral Icon'
          className='mt-[59px] hidden lg:block'
        />
      </div>
    </div>
  );
}
