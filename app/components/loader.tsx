import React from 'react';

const shimmer = 'shimmer-animation';

export function HomeSkeleton() {
  return (
    <main className='pt-[165px] lg:pt-0'>
      <div className='shimmer-animation fixed left-0 right-0 top-[83px] z-[1000] bg-white px-[3%] py-4 lg:hidden'></div>

      <div className='shimmer-animation mx-[3%] mt-5 h-12 w-full rounded bg-gray-200'></div>

      <div className='shimmer-animation mx-[3%] mt-5 h-[300px] rounded bg-gray-200'></div>

      <div className='md:my-5 lg:mx-5'>
        <div className='shimmer-animation h-[150px] rounded bg-gray-200'></div>

        <div className='shimmer-animation mt-5 h-[300px] rounded bg-gray-200'></div>

        <div className='shimmer-animation mt-5 h-[300px] rounded bg-gray-200'></div>

        <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
          {[0, 1, 2, 3].map((_, index) => (
            <div
              key={index}
              className='shimmer-animation h-[400px] rounded bg-gray-200'
            ></div>
          ))}
        </div>
      </div>
      <div className='shimmer-animation mx-[3%] mt-5 h-[200px] rounded bg-gray-200'></div>
    </main>
  );
}


