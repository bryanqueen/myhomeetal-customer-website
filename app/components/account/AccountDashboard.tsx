'use client';

import { useState } from 'react';
import ClientOnly from '../ClientOnly';

interface UserInfo {
  firstname: string;
  email: string;
  phone_number?: string;
}

interface AccountDashboardProps {
  userInfo: UserInfo | null;
}

export default function AccountDashboard({ userInfo }: AccountDashboardProps) {
  const [isWallet, setIsWallet] = useState(false);

  return (
    <ClientOnly>
      <div>
        <div className='rounded-[10px] mt-5 lg:mt-0 bg-[#FFF1F1] px-4 py-5 lg:rounded-2xl lg:bg-[image:url(/images/account/info-bg-md.png)] lg:bg-[size:initial] lg:bg-[position:110%] lg:bg-no-repeat lg:px-5 lg:py-8'>
          <h1 className='text-sm text-black lg:font-clashmd lg:text-4xl lg:text-myGray'>
            Welcome, {userInfo.firstname}
          </h1>
          <div className='lg:hidden'>
            <p className='text-[10px] text-[#5E5E5E]'>
              Thanks for being a Myhomeetal customer 🌟
            </p>
            <div className='mt-7 flex items-end justify-between'>
              {isWallet && (
                <div className='w-fit'>
                  <p className='text-[10px] text-[#646363]'>
                    Wallet Balance: <br />
                    <span className='font-clashmd text-base text-black'>
                      {' '}
                      53,633
                    </span>
                  </p>
                </div>
              )}

              <div className='max-w-fit'>
                <div className='rounded-[10px] border-[0.5px] border-dotted border-black px-4 py-3 text-[10px] text-[#525252]'>
                  <p className='mb-1'>Email address: {userInfo.email}</p>
                  {userInfo?.phone_number ? (
                    <p className=''>Phone number: {userInfo.phone_number}</p>
                  ) : (
                    <p className=''>Add Phone Number</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='mb-4 mt-1 hidden lg:block'>
            <p className='text-base text-[#525252]'>
              Thanks for being a Myhomeetal customer 🌟
            </p>
            <div className='mt-5 flex max-w-fit gap-5 rounded-full border border-dotted border-[#BDBDBD] p-2 px-5 text-base text-[#525252]'>
              <span className='shrink-0'>Email address: {userInfo.email}</span>
              {userInfo?.phone_number ? (
                <p className=''>Phone number: {userInfo.phone_number}</p>
              ) : (
                <p className=''>Add Phone Number</p>
              )}
            </div>
          </div>
          {isWallet && (
            <p className='hidden font-clashmd text-base text-myGray lg:block'>
              Wallet Balance: <span className=''>405,300.00</span>
            </p>
          )}
        </div>
      </div>
    </ClientOnly>
  );
}
