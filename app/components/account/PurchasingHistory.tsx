'use client';

import { useEffect, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import Image from 'next/image';
import Link from 'next/link';
import NoHistory from './NoHistory';
import useQueryParams from '@components/hooks/useQueryParams';
import { PageProps } from '@/app/utils/types';
import authUtils from '@/app/utils/authUtils';
import productService from '@/app/services/productService';

interface UserInfo {
  firstname: string;
  email: string;
  id: string;
}

const PurchasingHistory = ({
  searchParams,
}: {
  searchParams: PageProps['searchParams'];
}) => {
  const { handleParamChange } = useQueryParams();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  async function getUserInfo() {
    const res = await productService.getUserDetails();
    // Process response
  }

  useEffect(() => {
    const fetchedUserInfo = authUtils.getUserInfo();
    setUserInfo(fetchedUserInfo);
  }, []);

  const orders = [0, 0, 0, 0, 0, 0].map((item, i) => <PurchaseItem key={i} />);

  return (
    <Tabs.Root
      defaultValue={searchParams.tab || 'completed'}
      onValueChange={(value) => handleParamChange('tab', value)}
    >
      <Tabs.List
        className='flex flex-col items-center gap-5 md:flex-row'
        aria-label='Purchasing history'
      >
        <h1 className='text-3xl font-medium'>Purchasing History</h1>
        <div className='flex gap-2'>
          <Tabs.Trigger
            value='completed'
            className='rounded-full border p-2 px-5 focus-visible:outline-primary data-[state=active]:border-primary data-[state=active]:bg-primary/20'
          >
            Completed Orders
          </Tabs.Trigger>
          <Tabs.Trigger
            value='pending'
            className='rounded-full border p-2 px-5 focus-visible:outline-primary data-[state=active]:border-primary data-[state=active]:bg-primary/20'
          >
            Pending Orders
          </Tabs.Trigger>
        </div>
      </Tabs.List>
      <Tabs.Content value='completed' className='py-5'>
        {/* {orders} */}
        <div className='py-32'>
          <NoHistory />
        </div>
      </Tabs.Content>
      <Tabs.Content value='pending' className='py-5'>
        {orders}
      </Tabs.Content>
    </Tabs.Root>
  );
};

const PurchaseItem = () => {
  return (
    <div className='mb-5 grid max-w-4xl gap-3 rounded-xl border-b border-gray-100 bg-gray-100 px-4 py-5 md:bg-white'>
      <div className='flex justify-between gap-3'>
        <div className='flex gap-3'>
          <div className='shrink-0'>
            <Image
              className='rounded-xl'
              src='/images/product/samsung-galaxy.png'
              alt=''
              width='90'
              height='100'
            />
          </div>
          <div className='grid gap-2'>
            <p>
              Samsung Galaxy A14 6.6&quot; 4GB RAM/64GB ROM Android 13 - Light
              Green
            </p>
            <span className='font-bold md:hidden'>₦ 3,850</span>
            <div className='hidden items-center gap-2 text-xs md:flex'>
              <span>Brand: </span>
              <span className='rounded-full bg-primary/20 p-3'>Samsung</span>
            </div>
          </div>
        </div>
        <div className='flex min-w-fit flex-col items-end justify-end md:justify-between'>
          <span className='hidden font-bold md:block'>₦ 3,850</span>
          <Link href='' className='text-sm text-primary'>
            See details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PurchasingHistory;
