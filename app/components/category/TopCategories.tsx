'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import productService from '@/app/services/productService';

interface Category {
  _id: string;
  name: string;
  product_category_image: string;
}

const TopCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const response = await productService.getTopProductCategories();
        const data: Category[] = response.data;
        console.log(data);
        setCategories(data);
      } catch (error) {
        console.error('Error Fetching Top Product Categories', error);
      }
    };

    fetchTopCategories();
  }, []);
  return (
    <div className='p-4 md:my-10 md:px-[3%]'>
      <div className='grid grid-cols-4 justify-center gap-3 rounded-3xl py-10 md:grid-cols-5 md:p-5 lg:gap-8 lg:bg-gray-100'>
        {categories.map((category) => {
          return (
            <div
              key={category._id}
              className='mx-auto grid max-w-[80px] shrink-0 gap-2 text-center last-of-type:hidden md:last-of-type:grid lg:max-w-[150px] xl:max-w-[240px] [&:nth-child(9)]:hidden md:[&:nth-child(9)]:grid'
            >
              <Link
                href={`/category/${category.name}?categoryId=${category._id}`}
                key={category._id}
              >
                <Image
                  className='h-20 w-20 rounded-full object-cover p-2 transition md:h-36 md:w-36'
                  src={category.product_category_image}
                  alt='Top product'
                  width='550'
                  height='550'
                />
              </Link>
              <p className='text-xs font-normal text-[#222222] hover:text-primary md:text-base'>
                {category.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCategories;
