import React from 'react';
import Button from './Button';

export default function VoidCard({ title, bodyText, btnText, link }) {
  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='mb-2 font-clashmd text-[20px] lg:mb-0 lg:text-[36px]'>
          {title}
        </h1>
        <p className='mb-10 max-w-[70%] text-center text-xs lg:max-w-[589px] lg:text-[20px] lg:leading-[24.6px]'>
          {bodyText}
        </p>
        <Button
          className='h-[50px] min-w-[300px] rounded-full border-0 font-clashmd text-base shadow-none lg:h-[56px] lg:min-w-[516px]'
          linkType='rel'
          href={link}
        >
          {btnText}
        </Button>
      </div>
    </div>
  );
}
