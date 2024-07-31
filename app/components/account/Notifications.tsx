'use client';
import { Add } from 'iconsax-react';
import cn from 'classnames';

import Button from '@/app/components/Button';
import { useEffect, useState } from 'react';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import authUtils from '@/app/utils/authUtils';
import NoHistory from './NoHistory';

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

const notifications: {
  title: string;
  message: string;
  type: 'Important' | 'Unread' | 'Warning' | 'Successful';
  duration: number;
  callToAction?: {
    text: string;
    icon: React.ReactNode;
  };
}[] = [
  {
    title: 'Order Confirmed!',
    message:
      'Thanks for shopping with us. Your order #12345 will be on its way soon.',
    type: 'Important',
    duration: 26,
  },
  {
    title: 'Shipment on the Move!',
    message:
      'Good news! Your order #12345 has been dispatched. Track its journey in real-time.',
    type: 'Unread',
    duration: 43,
  },
  {
    title: 'Introducing Premium Membership: The Gold Experience',
    message:
      'Because you deserve nothing but the best! Our new Premium Membership offers exclusive early access to sales, free express shipping, and tailor-made offers just for you. Join the Gold Experience today and elevate your shopping adventure with us.',
    type: 'Successful',
    duration: 4,
    callToAction: {
      text: 'Join Premium plan',
      icon: <Add variant='Broken' />,
    },
  },
  {
    title: 'Cart Reminder',
    message:
      "You've left some items in your cart. Hurry and check out before they're gone!",
    type: 'Warning',
    duration: 4,
  },
];

const Notifications = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [notificationss, setNotifications] = useState([]);

  /*const fetchNotification = async () => {
    try {
      const res = await productService.getUserDetails(userInfo?.id);
      if (!res || !res.data) {
        console.log('id not found');
        return notFound();
      }
      setNotifications(res.data.notification);
    } catch (error) {
      console.error('Error in ProductPage:', error);
      return notFound();
    }
  };

  useEffect(() => {
    const getUser = () => {
      const userInfo = authUtils.getUserInfo();
      if (userInfo) {
        setUserInfo(userInfo);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    fetchNotification();
  }, [userInfo]); */
  return (
    <div className='flex items-center justify-center h-[70vh]'>
      <div className='m-auto grid max-w-xs justify-items-center gap-3 lg:max-w-[420px] lg:gap-6'>
        <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
        <p className='text-center font-clashmd text-[25px] text-myGray lg:text-2xl'>
          Your notification center is <br /> empty!
        </p>
        <p className='w-[80%] text-center text-xs text-myGray lg:w-full lg:text-sm'>
          It looks like you don&rsquo;t have any notifications right now. Check
          back soon for updates, alerts, and important messages!
        </p>
      </div>
    </div>
    /*<div className='grid gap-5 lg:py-5'>
      {notifications.map((notification, i) => (
        <div
          key={i}
          className='flex min-h-[110px] items-center gap-4 rounded-[10px] border border-[#F4F4F4] p-2 lg:min-h-0 lg:w-[730px] lg:items-start lg:gap-6 lg:rounded-[8px]'
        >
          <div className=' h-14 w-14 shrink-0 rounded-[12px] bg-[#060606]/10 lg:h-16 lg:w-16 lg:rounded-[8px] lg:bg-[#D9D9D9]'></div>
          <div className='flex flex-grow justify-between'>
            <div className='max-w-[474px] basis-full'>
              <p className='mb-1 font-clashmd text-xs text-myGray lg:text-base'>
                {notification.title}
              </p>
              <p className='text-[10px] text-[#7C7C7C] lg:text-sm'>
                {notification.message}
              </p>
              {notification.callToAction && (
                <div className='pt-4'>
                  <Button className='min-w-fit border-0 shadow-none rounded-[8px] px-5 text-[10px] lg:text-base'>
                    <span className='flex items-center gap-2'>
                      {notification.callToAction.icon}
                      {notification.callToAction.text}
                    </span>
                  </Button>
                </div>
              )}
            </div>
            <div className='flex min-h-full w-fit flex-col justify-between lg:min-h-0'>
              <p className='mb-1 text-end text-[10px] text-black lg:text-sm lg:text-myGray'>
                {notification.duration}m ago
              </p>
              <p
                className={cn('rounded-full px-2 py-0.5', {
                  'bg-[#F8BCBC] text-[10px] text-[#8B1A1A] lg:text-xs':
                    notification.type === 'Important',
                  'bg-[#BAD9F7] text-[10px] text-[#1673CC] lg:text-xs':
                    notification.type === 'Unread',
                  'bg-[#F7DFBA] text-[10px] text-[#CC8400] lg:text-xs':
                    notification.type === 'Warning',
                  'bg-[#BAF7BA] text-[10px] text-[#1B691B] lg:text-xs':
                    notification.type === 'Successful',
                })}
              >
                {notification.type}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div> */
  );
};

export default Notifications;
