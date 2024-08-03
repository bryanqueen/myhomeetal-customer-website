'use client';
import React from 'react';
import ClientOnly from '../ClientOnly';
import toast from 'react-hot-toast';

interface UserInfo {
  referralCode: string;
}

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
  userInfo: UserInfo;
}

const ReferralTable: React.FC<ReferralDisplayProps> = ({
  referralsInfo,
  userInfo,
}) => {
  const { referrals } = referralsInfo;
  const referralLink = `https://www.myhomeetal.com/referral?code=${userInfo?.referralCode}`;

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
    <ClientOnly>
      <div className='mt-7 pb-20'>
        <h2 className='mb-5 font-clashmd text-xs text-myGray lg:text-base'>
          Referrals
        </h2>
        <div className='overflow-x-auto rounded-[10px] border border-[#F4F4F4] bg-white lg:min-h-[427px] lg:rounded-2xl'>
          <table className='min-w-full border-collapse'>
            <thead>
              <tr className='flex'>
                <th className='basis-[40%] p-[10px] text-start text-[10px] text-myGray lg:px-6 lg:py-4 lg:font-clashmd lg:text-base'>
                  People
                </th>

                <th className='flex basis-[30%] items-center justify-center p-[10px] text-start text-[10px] text-myGray lg:px-6 lg:py-4 lg:font-clashmd lg:text-base'>
                  Stage
                </th>
                <th className='flex basis-[30%] items-center justify-end p-[10px] text-end text-[10px] text-myGray lg:px-6 lg:py-4 lg:font-clashmd lg:text-base'>
                  Earning
                </th>
              </tr>
            </thead>
            {referrals.length < 1 ? (
              <div className='mx-auto mt-32 flex h-fit w-full max-w-[262px] flex-col items-center justify-center gap-5'>
                <p className='text-center font-clashmd text-xs text-myGray lg:text-base'>
                  You don&#39;t have any referral yet share your link to earn{' '}
                </p>
                <button
                  onClick={copyToClipboard}
                  className='h-[47px] w-[113px] rounded-full bg-primaryBg font-clashsm text-xs text-white'
                >
                  Copy Code
                </button>
              </div>
            ) : (
              <tbody>
                {referrals.map((referral, index) => (
                  <tr key={index} className='flex'>
                    <td className='basis-[40%] whitespace-nowrap p-[10px] text-xs text-myGray lg:px-6 lg:py-4 lg:text-base'>
                      <span className='mr-1'>{referral.firstname}</span> {referral.lastname}
                    </td>

                    <td className='flex basis-[30%] items-center justify-center p-[10px] lg:px-6 lg:py-4'>
                      <span
                        className={`inline-block whitespace-nowrap rounded lg:px-2 lg:py-1 ${referral.status === 'signed_up' ? 'rounded-full bg-[#FFE0E0] px-2 py-1 text-[10px] text-myGray lg:px-4 lg:text-sm' : 'rounded-full bg-[#BAF7BA] px-2 py-1 text-[10px] text-myGray lg:px-4 lg:text-sm'}`}
                      >
                        {referral.status === 'signed_up'
                          ? 'Signed Up'
                          : 'Made A Purchase'}
                      </span>
                    </td>
                    <td className='grid basis-[30%] p-[10px] lg:px-6 lg:py-4'>
                      <p
                        className={`${referral.pointsContributed === 100 ? 'text-[#B22222]' : 'text-[#228B22]'} text-end font-clashmd text-xs lg:text-xl`}
                      >
                        {referral.pointsContributed}
                      </p>
                      <p className='ml-2 whitespace-nowrap text-end text-[10px] text-[#989898] lg:text-sm'>
                        {/*referral.date*/}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </ClientOnly>
  );
};

export default ReferralTable;
