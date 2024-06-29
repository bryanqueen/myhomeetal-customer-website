import { Add } from 'iconsax-react';
import { Metadata } from 'next';
import cn from 'classnames';

import Notifications from '@/app/components/account/Notifications';

export const metadata: Metadata = {
  title: 'Notifications | Myhomeetal',
};

function NotificationsPage() {
  return (
    <main>
      <h1 className='text-3xl font-medium'>My Notifications</h1>
      <div className='my-3 flex flex-col gap-3 md:flex-row md:justify-between'>
        <p className='mb-2 text-gray-500 md:mb-0'>
          Stay updated! All your alerts, updates, and important messages in one
          place.
        </p>
        <div className='flex min-w-fit items-center gap-2'>
          <span>Enable email notifications</span>
          <label
            htmlFor='toggleCheckbox'
            className='relative inline-flex cursor-pointer items-center'
          >
            <input
              type='checkbox'
              id='toggleCheckbox'
              className='peer sr-only'
            />
            {/* Custom Toggle Background */}
            <div className='peer h-6 w-11 rounded-full bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none peer-checked:bg-primary/50 peer-focus:ring-4 peer-focus:ring-primary/30 dark:peer-focus:ring-primary'></div>
            {/* Custom Toggle Circle */}
            <div className='absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition-transform duration-200 ease-in-out peer-checked:translate-x-5'></div>
          </label>
        </div>
      </div>

      <Notifications />
    </main>
  );
}

export default NotificationsPage;
