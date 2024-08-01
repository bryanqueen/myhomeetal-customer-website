import React from 'react';

export default function Reviews() {
  return (
    <div>
      <div className='flex h-[70vh] items-center justify-center'>
        <div className='m-auto grid max-w-xs justify-items-center gap-3 lg:max-w-[420px] lg:gap-6'>
          <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
          <p className='text-center font-clashmd text-[25px] text-myGray lg:text-2xl'>
          You haven&rsquo;t Placed any Orders!
          </p>
          <p className='w-[80%] text-center text-xs text-myGray lg:w-full lg:text-sm'>
            It looks like you don&rsquo;t have any notifications right now.
            Check back soon for updates, alerts, and important messages!
          </p>
        </div>
      </div>
    </div>
  );
}
