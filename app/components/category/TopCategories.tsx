'use client';

import { useCartActions } from '@/app/utils/helpers';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

const TopCategories = ({ topCategories }: any) => {
  const { fetchCart } = useCartActions();

  const myFetch = async () => {
    try {
      await fetchCart();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    myFetch();
  }, []);
  return (
    <div className='p-[3%] lg:py-0 my-8'>
      <div className='grid grid-cols-4 h-[223px] gap-x-5 gap-y-1 lg:gap-x-20 lg:gap-y-10 rounded-3xl lg:py-[46px] lg:px-[90px] lg:h-[492px] lg:grid-cols-5 lg:bg-[#f4f4f4]'>
        {topCategories &&
          topCategories.map((category) => {
            return (
              <div
                key={category._id}
                className='flex flex-col justify-between items-center h-[110px] w-full last-of-type:hidden lg:last-of-type:grid lg:w-[132px] lg:h-[172px] xl:max-w-[240px] [&:nth-child(9)]:hidden lg:[&:nth-child(9)]:grid'
              >
                <Link
                  href={`/category/${category.name}?categoryId=${category._id}`}
                  key={category._id}
                  className='w-fit'
                >
                  <div className='flex items-center justify-center lg:w-[132px] lg:h-[132px] rounded-full'>
                    <Image
                      className='w-[78px] h-[78px] lg:h-[132px] lg:w-[132px] rounded-full object-cover p-2 transition'
                      src={category.product_category_image || '/images/confetti.png'}
                      alt='Top product'
                      width={132}
                      height={132}
                    />

                  </div>

                  <p className='text-black text-[10px] lg:text-base text-center hover:text-primary lg:text-[#222222]'>
                    My {category.name}
                  </p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TopCategories;
