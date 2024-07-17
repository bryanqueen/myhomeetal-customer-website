'use client';
import { useRegion } from '@/app/RegionProvider';
import ProductPrice from '../product/ProductPrice';
import { Box } from 'iconsax-react';

export default function ReferralEarningDashboard() {
  const { region } = useRegion();
  return (
    <div className='mt-7 grid w-full max-w-[1108px] gap-4 lg:h-[195px] lg:grid-cols-2'>
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
            122
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
          <ProductPrice
            className='font-clashsm text-base lg:text-[32px] text-[#1D2739]'
            region={region}
            priceInNGN={61000}
          />
        </div>
      </div>
    </div>
  );
}