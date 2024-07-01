'use client'

import { useState,useEffect } from 'react';
import AdBanner from '@components/banner/AdBanner';
import AdBanner2 from '@components/banner/AdBanner2';
import AdBanner3 from '@components/banner/AdBanner3';
import TopCategories from '@/app/components/category/TopCategories';
import Category from '@/app/components/category/CategoryGrid';
import Newsletter from '@components/Newsletter';
import CategoryList from '@components/category/CategoryList';
import productService from '../services/productService';

interface Category {
  _id: string;
  name: string;
  productCount: number;
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getTopProductCategories();
        const data: Category[] = response.data.slice(0,4);
        console.log(data)
        setCategories(data)
      } catch (error) {
        console.error('Failed to fetch product categories', error)
      } finally{
        setLoading(false)
      }
    }
    
    fetchCategories()
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <CategoryList />
      <AdBanner />
      <div className='md:my-5 lg:mx-5'>
        <TopCategories />
        {/* <Category title='Top Selling Items' color='bg-yellow-500'  /> */}
        <AdBanner2 />
        {/* <Category title='New Products' /> */}
        <AdBanner3 />
        <>
        {categories.map((category) => {
        return ( 
         <Category
            key={category._id}
            title={category.name}
            id={category._id}
          />
       )
       })}
        </>
      </div>
      <Newsletter />
    </main>
  );
}
