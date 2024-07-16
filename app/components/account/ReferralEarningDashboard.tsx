'use client';
import { useRegion } from '@/app/RegionProvider';
import ProductPrice from '../product/ProductPrice';
import { Box } from 'iconsax-react';

export default function ReferralEarningDashboard() {
  const { region } = useRegion();
  return (
    <div className='mt-7 grid h-[195px] w-full max-w-[1108px] grid-cols-2 gap-4'>
      <div className='flex h-full w-full items-center rounded-xl border border-[#E4E7EC] pl-5'>
        <div className='grid min-h-[163px] gap-5'>
          <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FFF1F1]'>
              <Box size='15' color='#FF6567' />
            </div>
            <p className='font-clashmd text-sm text-[#667185]'>
              Total Referrals
            </p>
          </div>
          <p className='font-clashsm text-[32px] text-[#1D2739]'>122</p>
        </div>
      </div>
      <div className='flex h-full w-full items-center rounded-xl border border-[#E4E7EC] p-5'>
        <div className='grid min-h-[163px] gap-5'>
          <div className='flex items-center gap-3'>
            <div className='flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#FFF1F1]'>
              <Box size='15' color='#FF6567' />
            </div>
            <p className='font-clashmd text-sm text-[#667185]'>
              Total Earnings
            </p>
          </div>
          <ProductPrice
            className='font-clashsm text-[32px] text-[#1D2739]'
            region={region}
            priceInNGN={61000}
          />
        </div>
      </div>
    </div>
  );
}
