'use client';
import { useRegion } from '@/app/RegionProvider';
import ProductPrice from '../product/ProductPrice';
import { Box } from 'iconsax-react';

interface UserInfo {
  points: number;
  referralCode: string;
  referrals: [];
}

interface AccountDashboardProps {
  userInfo: UserInfo | null;
}


export default function ReferralEarningDashboard({ userInfo }: AccountDashboardProps) {
  const { region } = useRegion();
  return (
    <div className='mt-7 grid w-full gap-4 lg:h-[195px] lg:grid-cols-2'>
      <div className='flex h-[62px] w-full items-center justify-center rounded-xl border border-[#E4E7EC] pl-5 lg:h-full lg:justify-start'>
        <div className='flex w-[250px] items-center gap-5 lg:grid lg:min-h-[163px]'>
          <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FFF1F1]'>
              <Box size='15' color='#FF6567' />
            </div>
            <p className='font-clashmd text-xs text-[#667185] lg:text-sm'>
              Total Referrals
            </p>
          </div>
          <p className='font-clashsm text-base text-[#1D2739] lg:text-[32px]'>
            {userInfo.referrals.length}
          </p>
        </div>
      </div>
      <div className='flex h-[62px] w-full items-center justify-center rounded-xl border border-[#E4E7EC] pl-5 lg:h-full lg:justify-start'>
        <div className='flex w-[250px] items-center gap-5 lg:grid lg:min-h-[163px]'>
          <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FFF1F1]'>
              <Box size='15' color='#FF6567' />
            </div>
            <p className='font-clashmd text-xs text-[#667185] lg:text-sm'>
              Total Earnings
            </p>
          </div>
          
          <p className='font-clashsm text-base text-[#1D2739] lg:text-[32px]'>{userInfo.points} <span className='text-2xl'>pts</span></p>
        </div>
      </div>
    </div>
  );
}
