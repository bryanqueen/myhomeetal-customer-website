import Image from 'next/image';
import React from 'react';

export default function ReferralDashBoard() {
  return (
    <div className='relative flex h-[256px] w-full max-w-[1110px] items-center overflow-hidden rounded-[10px] bg-[#FFF1F1] lg:h-[339px] lg:rounded-3xl lg:pl-[5%]'>
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
        <div className='mx-auto mb-4 flex h-[50px] min-w-[300px] max-w-[300px] items-center justify-center rounded-2xl bg-white lg:mx-0 lg:h-[56px] lg:max-w-[516px] lg:justify-between lg:pl-7 lg:pr-2'>
          <p className='text-[10px] text-[#989898] lg:text-xs'>
            https://www.myhomeetal.com/referral?code=XYZ123
          </p>
          <button className='hidden h-[47px] w-[113px] rounded-2xl bg-primaryBg font-clashsm text-xs text-white lg:block'>
            Copy Code
          </button>
        </div>
        <div className='flex items-center justify-center lg:hidden'>
          <button className='h-[34px] w-[157px] rounded-full bg-primaryBg font-clashmd text-[10px] text-white lg:hidden'>
            Copy Code
          </button>
        </div>

        <p className='text-base text-[#525252]'>Share on:</p>
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
