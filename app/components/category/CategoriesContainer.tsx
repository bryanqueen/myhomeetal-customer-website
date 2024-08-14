import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function CategoriesContainer({ categories }: any) {
  return (
    <div>
      <div className='grid grid-cols-3 px-[2%] gap-y-7 pt-7'>
        {categories &&
          categories.map((category) => {
            return (
              <div
                key={category._id}
                className='flex flex-col items-center justify-center'
              >
                <Link
                  href={`/category/${category.name}?categoryId=${category._id}`}
                  key={category._id}
                >
                  <div className='flex items-center justify-center lg:w-[132px] lg:h-[132px] rounded-full'>
                    <Image
                      className='w-[78px] h-[78px] lg:h-[132px] lg:w-[132px] rounded-full object-cover p-2 transition'
                      src={category?.product_category_image || '/placeholder.png'}
                      alt='Top product'
                      width={132}
                      height={132}
                    />

                  </div>

                  <p className='text-black max-w-[70px] text-[10px] lg:text-base text-center hover:text-primary lg:text-[#222222]'>
                    My {category.name}
                  </p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  )
}
