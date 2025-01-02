// 'use client';

import Cookie from 'js-cookie';
// import { useCartActions } from '@/app/utils/helpers';
import { CategoryType } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { shuffleArray } from '@/app/utils/helpers';
// import { useEffect } from 'react';

const fetchTopCategories = async (): Promise<CategoryType[]> => {
  const token = Cookie.get('AUTH_TOKEN');
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}product-category/top-categories`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 3000 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching categories.');
  }
};

const TopCategories = async () => {
  /*  const { fetchCart } = useCartActions();
 
   const myFetch = async () => {
     try {
       await fetchCart();
     } catch (error) {
       console.log(error);
     }
   }
 
   useEffect(() => {
     myFetch();
   }, []); */

  let topCategories: CategoryType[] = [];
  try {
    topCategories = await fetchTopCategories();
    shuffleArray(topCategories);
  } catch (error) {
    // Error handling
    return (
      <div className="hidden items-center px-[3%] pb-5 md:flex">
        <p className="text-red-500">Failed to load categories. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className='p-[3%] max-md:pb-10 lg:py-0 my-8'>
      <div className='grid grid-cols-4 h-[223px] gap-x-5 gap-y-8 lg:gap-x-20 lg:gap-y-10 rounded-3xl lg:py-[46px] lg:px-[90px] lg:h-[492px] lg:grid-cols-5 lg:bg-[#f4f4f4]'>
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
                      src={category.product_category_image || '/placeholder.png'}
                      alt='Top product'
                      width={132}
                      height={132}
                    />

                  </div>

                  <p className='text-black text-xs lg:text-base text-center hover:text-primary lg:text-[#222222]'>
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
