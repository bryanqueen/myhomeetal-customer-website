'use client';
import React, { useState } from 'react';

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
    <div className='mt-7 pb-20'>
      <h2 className='mb-5 font-clashmd text-base text-myGray'>Referrals</h2>
      <div className='min-h-[427px] max-w-[1110px] overflow-x-auto rounded-2xl border border-[#F4F4F4] bg-white'>
        <table className='min-w-full border-collapse'>
          <thead>
            <tr className='flex'>
              <th className=' basis-1/2 px-6 py-4 text-start font-clashmd text-base text-myGray'>
                People
              </th>

              <th className='flex basis-1/4 items-center justify-center px-6 py-4 text-start font-clashmd text-base text-myGray'>
                Stage
              </th>
              <th className='flex basis-1/4 items-center justify-end px-6 py-4 text-end font-clashmd text-base text-myGray'>
                Earning
              </th>
            </tr>
          </thead>
          {!isReferral ? (
            <div className='mx-auto mt-32 flex h-fit w-full max-w-[262px] flex-col items-center justify-center gap-5'>
              <p className='text-center font-clashmd text-base text-myGray'>
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
                  <td className='basis-1/2 px-6 py-4 text-base text-myGray'>
                    {referral.name}
                  </td>

                  <td className='flex basis-1/4 items-center justify-center px-6 py-4'>
                    <span
                      className={`inline-block rounded px-2 py-1 text-sm ${referral.stage === 'Signed up' ? 'rounded-full bg-[#FFE0E0] px-4 py-1 text-sm text-myGray' : 'rounded-full bg-[#BAF7BA] px-4 py-1 text-sm text-myGray'}`}
                    >
                      {referral.stage}
                    </span>
                  </td>
                  <td className='grid basis-1/4 px-6 py-4'>
                    <p
                      className={`${referral.earning === 100 ? 'text-[#B22222]' : 'text-[#228B22]'} text-end font-clashmd text-xl`}
                    >
                      {referral.earning}
                    </p>
                    <p className='ml-2 text-end text-sm text-[#989898]'>
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
  );
};

export default ReferralTable;
