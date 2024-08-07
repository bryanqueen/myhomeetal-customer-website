import React from 'react';

export default function AboutHeader({ time, page }) {
  return (
    <div className='flex w-full items-center justify-center border-b-[6px] lg:border-b-[11px] border-[#C70E10] py-20 lg:py-16'>
      <div className=''>
        <p className='mb-2 text-center text-xs lg:text-base'>{time}</p>
        <h2 className='text-center mx-auto font-clashmd text-xl lg:text-[31px] max-w-[100%] lg:max-w-[731px]'>
          {page}
        </h2>
      </div>
    </div>
  );
}
