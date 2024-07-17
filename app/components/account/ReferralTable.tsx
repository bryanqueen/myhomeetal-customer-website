'use client';
import React, { useState } from 'react';
import ClientOnly from '../ClientOnly';

interface Referral {
  name: string;
  stage: 'Signed up' | 'Made A Purchase';
  earning: number;
  date: string;
}

const referrals: Referral[] = [
  {
    name: 'Emmanuel Amuneke',
    stage: 'Signed up',
    earning: 100,
    date: '15th Nov 2023',
  },
  {
    name: 'Justina Ogbomnaya',
    stage: 'Made A Purchase',
    earning: 500,
    date: '15th Nov 2023',
  },
  {
    name: 'Boluwatife Olusola',
    stage: 'Made A Purchase',
    earning: 500,
    date: '15th Nov 2023',
  },
  {
    name: 'Folasayo Ogunnaike',
    stage: 'Made A Purchase',
    earning: 500,
    date: '15th Nov 2023',
  },
  {
    name: 'Yussuf Ahmed',
    stage: 'Made A Purchase',
    earning: 500,
    date: '15th Nov 2023',
  },
];

const ReferralTable: React.FC = () => {
  const [isReferral, setIsReferral] = useState(true);
  return (
    <ClientOnly>
      <div className='mt-7 pb-20'>
        <h2 className='mb-5 font-clashmd text-xs text-myGray lg:text-base'>
          Referrals
        </h2>
        <div className='max-w-[1110px] overflow-x-auto rounded-[10px] border border-[#F4F4F4] bg-white lg:min-h-[427px] lg:rounded-2xl'>
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
            {!isReferral ? (
              <div className='mx-auto mt-32 flex h-fit w-full max-w-[262px] flex-col items-center justify-center gap-5'>
                <p className='text-center font-clashmd text-xs lg:text-base text-myGray'>
                  You dont have any referral yet share your link to earn{' '}
                </p>
                <button className='h-[47px] w-[113px] rounded-full bg-primaryBg font-clashsm text-xs text-white'>
                  Copy Code
                </button>
              </div>
            ) : (
              <tbody>
                {referrals.map((referral, index) => (
                  <tr key={index} className='flex'>
                    <td className='basis-[40%] whitespace-nowrap p-[10px] text-xs text-myGray lg:px-6 lg:py-4 lg:text-base'>
                      {referral.name}
                    </td>

                    <td className='flex basis-[30%] items-center justify-center p-[10px] lg:px-6 lg:py-4'>
                      <span
                        className={`inline-block whitespace-nowrap rounded lg:px-2 lg:py-1 ${referral.stage === 'Signed up' ? 'rounded-full bg-[#FFE0E0] px-2 py-1 text-[8px] text-myGray lg:px-4 lg:text-sm' : 'rounded-full bg-[#BAF7BA] px-2 py-1 text-[8px] text-myGray lg:px-4 lg:text-sm'}`}
                      >
                        {referral.stage}
                      </span>
                    </td>
                    <td className='grid basis-[30%] p-[10px] lg:px-6 lg:py-4'>
                      <p
                        className={`${referral.earning === 100 ? 'text-[#B22222]' : 'text-[#228B22]'} text-end font-clashmd text-xs lg:text-xl`}
                      >
                        {referral.earning}
                      </p>
                      <p className='ml-2 whitespace-nowrap text-end text-[10px] text-[#989898] lg:text-sm'>
                        {referral.date}
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
