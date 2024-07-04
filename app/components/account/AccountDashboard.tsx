'use client';

import { useEffect, useState } from 'react';
import authUtils from "@/app/utils/authUtils";

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
    <div>
      <div className='rounded-xl bg-primary/10 bg-[image:url(/images/account/info-bg-sm.png)] bg-contain bg-[position:110%] bg-no-repeat px-5 py-8 md:rounded-2xl lg:bg-[image:url(/images/account/info-bg-md.png)] lg:bg-[size:initial]'>
        <h1 className='text-3xl font-medium'>Welcome, {userInfo.firstname}</h1>
        <div className='mb-4 mt-1 hidden text-gray-500 md:block'>
          <p>Thanks for being a Myhomeetal customer 🌟</p>
          <div className='mt-5 flex max-w-fit gap-5 rounded-full border border-dotted border-gray-500 p-2 px-5 text-sm text-gray-500'>
            <span className='shrink-0'>
              Email address: {userInfo.email}
            </span>
            <span className='shrink-0'>Phone number: 09123456788</span>
          </div>
        </div>
        <p className='flex items-center gap-5 py-5 md:block md:py-0'>
          Wallet Balance:{' '}
          <span className='text-4xl font-bold md:text-lg md:font-normal'>
            405,300.00
          </span>
        </p>
      </div>
    </div>
  );
}
