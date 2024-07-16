import Image from 'next/image';
import React from 'react';

export default function ReferralDashBoard() {
  return (
    <div className='relative flex items-center pl-[5%] h-[339px] max-w-[1110px] w-full overflow-hidden rounded-3xl bg-[#FFF1F1]'>
      <div>
        <div className='max-w-[470px] mb-4'>
          <h1 className='font-clashmd text-2xl text-myGray mb-4'>
            Welcome to our referral program
          </h1>
          <p className='w-full text-base leading-[19.09px] text-[#525252]'>
            Invite your friends to shop with us and earn exciting rewards for
            every successful referral.
          </p>
        </div>
        <div className='mb-4 flex h-[56px] max-w-[516px] pl-7 pr-2 justify-between items-center rounded-2xl bg-white'>
          <p className='text-xs text-[#989898]'>
            https://www.myhomeetal.com/referral?code=XYZ123
          </p>
          <button className='h-[47px] w-[113px] rounded-2xl bg-primaryBg font-clashsm text-xs text-white'>
            Copy Code
          </button>
        </div>
        <p className='text-[#525252] text-base'>Share on:</p>
      </div>
      <div className='absolute right-[-10%] top-[-122px] flex h-[553px] w-[553px] items-center rounded-full bg-[#FFE0E0]/50 pl-[33px]'>
        <Image
          src='/images/referralIcon.svg'
          width={429.73}
          height={419.68}
          alt='referral Icon'
          className='mt-[59px]'
        />
      </div>
    </div>
  );
}
