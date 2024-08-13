import React from 'react';

const shimmer = 'shimmer-animation';

export function MobileCategorySkeleton() {
  return (
    <div className='flex flex-wrap justify-between gap-3 p-4 pt-[60px] lg:hidden'>
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className='shimmer-animation h-56 w-[45%] rounded-md bg-gray-200'
        ></div>
      ))}
    </div>
  );
}
export function CartSummarySkeleton() {
  return (
    <div className='flex flex-wrap justify-between gap-3'>
      <div className='shimmer-animation h-[400px] w-full rounded-lg bg-gray-200'></div>
    </div>
  );
}

export function DesktopCategorySkeleton() {
  return (
    <main className='hidden pb-20 pt-[165px] lg:block lg:px-[3%] lg:pt-0'>
      <div className='shimmer-animation fixed left-0 right-0 top-[83px] z-[1000] bg-white px-[3%] py-4 lg:hidden'></div>
      <div className='shimmer-animation flex h-[40px] items-center justify-between bg-[#F4F4F4] pl-[14px] pr-[10px] lg:hidden'>
        <div className='h-4 w-1/2 rounded bg-gray-200'></div>
        <div className='flex h-[32px] w-[115px] items-center justify-between'>
          <div className='shimmer-animation h-full w-[44px] rounded bg-gray-200'></div>
          <div className='shimmer-animation h-full w-[45px] rounded bg-gray-200'></div>
        </div>
      </div>
      <div className='hidden lg:block'>
        <div className='mb-5 flex items-center justify-between'>
          <div className='shimmer-animation h-4 w-1/2 rounded bg-gray-200'></div>
          <div className='shimmer-animation h-6 w-[100px] rounded bg-gray-200'></div>
        </div>
        <div className='grid gap-5 lg:grid-cols-[20rem_3fr]'>
          <div>
            <div className='shimmer-animation mb-5 rounded-[20px] border border-[#E4E7EC] p-5'>
              <div className='shimmer-animation mx-auto h-4 w-1/3 rounded bg-gray-200'></div>
              <div className='mt-5 grid gap-3'>
                {[0, 1, 2, 3, 4].map((_, index) => (
                  <div
                    key={index}
                    className='shimmer-animation h-10 w-full rounded bg-gray-200'
                  ></div>
                ))}
              </div>
            </div>
            <div className='shimmer-animation mb-5 rounded-[20px] border border-[#E4E7EC] px-[36px] py-5'>
              <div className='shimmer-animation mx-auto h-4 w-1/3 rounded bg-gray-200'></div>
              <div className='mt-6 grid gap-5'>
                {[0, 1, 2, 3].map((_, index) => (
                  <div key={index} className='flex items-center gap-5'>
                    <div className='shimmer-animation h-5 w-5 rounded-full bg-gray-200'></div>
                    <div className='shimmer-animation h-4 w-2/3 rounded bg-gray-200'></div>
                  </div>
                ))}
              </div>
            </div>
            <div className='shimmer-animation mb-5 rounded-[20px] border border-[#E4E7EC] px-[36px] py-5'>
              <div className='shimmer-animation mx-auto h-4 w-1/3 rounded bg-gray-200'></div>
              <div className='mt-7 flex items-center justify-between'>
                <div className='shimmer-animation h-[37px] w-[110px] rounded-full bg-gray-200'></div>
                <div className='h-[1.5px] w-3 bg-black'></div>
                <div className='shimmer-animation h-[37px] w-[110px] rounded-full bg-gray-200'></div>
              </div>
            </div>
          </div>
          <div>
            <div className='grid gap-5 lg:grid-cols-3'>
              {[0, 1, 2, 3, 4, 5].map((_, index) => (
                <div
                  key={index}
                  className='shimmer-animation h-[400px] w-full rounded bg-gray-200'
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export function HomeSkeleton() {
  return (
    <main className='pt-5 lg:pt-0'>
      <div className='shimmer-animation px-[3%] mt-5 h-12 w-full rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation px-[3%] mt-5 h-[300px] rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation h-[150px] mt-5 rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation mt-5 h-[300px] rounded-2xl bg-gray-200'></div>

      <div className='shimmer-animation mt-5 h-[300px] rounded-2xl bg-gray-200'></div>

      <div className='mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4'>
        {[0, 1, 2, 3].map((_, index) => (
          <div
            key={index}
            className='shimmer-animation h-[400px] rounded-2xl bg-gray-200'
          ></div>
        ))}
      </div>
      <div className='shimmer-animation mx-[3%] mt-5 h-[200px] rounded-2xl bg-gray-200'></div>
    </main>
  );
}
