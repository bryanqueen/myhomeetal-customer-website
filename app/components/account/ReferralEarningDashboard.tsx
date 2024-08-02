'use client';
import { Box } from 'iconsax-react';

interface Referral {
  id: string;
  firstname: string;
  lastname: string;
  pointsContributed: number;
  status: string;
}

interface ReferralsInfo {
  referrals: Referral[];
  totalEarnings: number;
  totalReferrals: number;
}

interface ReferralDisplayProps {
  referralsInfo: ReferralsInfo;
}

const ReferralEarningDashboard: React.FC<ReferralDisplayProps> = ({
  referralsInfo,
}) => {
  const { totalEarnings, totalReferrals } = referralsInfo;
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
            {totalReferrals}
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

          <p className='font-clashsm text-base text-[#1D2739] lg:text-[32px]'>
            {totalEarnings} <span className='lg:text-2xl text-xs'>pts</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReferralEarningDashboard;
