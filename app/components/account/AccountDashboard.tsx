'use client';

import { useEffect, useState } from 'react';
import authUtils from '@/app/utils/authUtils';
import ClientOnly from '../ClientOnly';

interface UserInfo {
  firstname: string;
  email: string;
}

export default function AccountDashboard() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchedUserInfo = authUtils.getUserInfo();
    setUserInfo(fetchedUserInfo);
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <ClientOnly>
      <div>
        <div className='rounded-[10px] bg-[#FFF1F1] px-4 py-5 lg:rounded-2xl lg:bg-[image:url(/images/account/info-bg-md.png)] lg:bg-[size:initial] lg:bg-[position:110%] lg:bg-no-repeat lg:px-5 lg:py-8'>
          <h1 className='text-sm text-black lg:font-clashmd lg:text-4xl lg:text-myGray'>
            Welcome, {userInfo.firstname}
          </h1>
          <div className='lg:hidden'>
            <p className='text-[10px] text-[#5E5E5E]'>
              Thanks for being a Myhomeetal customer 🌟
            </p>
            <div className='flex items-end justify-between mt-7'>
              <div className='w-fit'>
                <p className='text-[10px] text-[#646363]'>
                  Wallet Balance: <br /><span className='text-base text-black font-clashmd'>405,300.00</span>
                </p>
              </div>
              <div className='max-w-[189px]'>
                <div className='border-[0.5px] text-[#525252] text-[8px] border-dotted border-black rounded-[10px] py-3 px-4'>
                  <p className='mb-1'>
                    Email address: {userInfo.email}
                  </p>
                  <p className=''>Phone number: 09123456788</p>
                </div>
              </div>
            </div>
          </div>
          <div className='mb-4 mt-1 hidden md:block'>
            <p className='text-base text-[#525252]'>
              Thanks for being a Myhomeetal customer 🌟
            </p>
            <div className='mt-5 flex max-w-fit gap-5 rounded-full border border-dotted border-[#BDBDBD] p-2 px-5 text-base text-[#525252]'>
              <span className='shrink-0'>Email address: {userInfo.email}</span>
              <span className='shrink-0'>Phone number: 09123456788</span>
            </div>
          </div>
          <p className='hidden font-clashmd text-base text-myGray lg:block'>
            Wallet Balance: <span className=''>405,300.00</span>
          </p>
        </div>
      </div>
    </ClientOnly>
  );
}
