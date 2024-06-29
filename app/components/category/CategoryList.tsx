'use client'

import Marquee from 'react-fast-marquee';
import Link from 'next/link';
import { useState, useEffect} from 'react';
import productService from '@/app/services/productService';

interface Category {
  name: string
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getProductCategories();
        const data: Category[] = response.data;
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch categories', error);
      }
    }

    fetchCategories()
  },[])
  return (
    <div className='hidden items-center px-8 md:flex'>
      <p className='border-r border-gray-100 pr-1 font-medium'>Categories:</p>
      <ul className='flex overflow-hidden'>
        <Marquee pauseOnHover={true} autoFill={true}>
          {categories.map((category, i) => (
            <li key={i} className='shrink-0 p-3 text-gray-800'>
              <Link href=''>{category.name}</Link>
            </li>
          ))}
        </Marquee>
      </ul>
    </div>
  );
};

export default CategoryList;
