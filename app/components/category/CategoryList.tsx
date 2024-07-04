'use client';

import Marquee from 'react-fast-marquee';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import productService from '@/app/services/productService';

interface Category {
  name: string;
  _id: string;
}

const CategoryList = ({ categories }: any) => {
  
  return (
    <div className='hidden items-center px-[3%] pb-5 md:flex'>
      <p className='pr-2 text-sm font-semibold'>Categories:</p>
      <ul className='flex overflow-hidden'>
        <Marquee pauseOnHover={true} autoFill={true}>
          {categories.map((category) => (
            <li
              key={category._id}
              className='shrink-0 p-3 text-sm font-light text-myGray'
            >
              <Link
                href={`/category/${category.name}?categoryId=${category._id}`}
                key={category._id}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </Marquee>
      </ul>
    </div>
  );
};

export default CategoryList;
