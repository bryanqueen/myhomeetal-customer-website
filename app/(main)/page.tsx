import { notFound } from 'next/navigation';

import productService from '../services/productService';
import AdBanner from '@components/banner/AdBanner';
import AdBanner2 from '@components/banner/AdBanner2';
import AdBanner3 from '@components/banner/AdBanner3';
import TopCategories from '@/app/components/category/TopCategories';
import Category from '@/app/components/category/CategoryGrid';
import Newsletter from '@components/Newsletter';
import CategoryList from '@components/category/CategoryList';
import { Suspense } from 'react';
import SearchForm from '../components/forms/SearchForm';

export default async function Home() {
  let allCategories: any;
  let topCategories: any;
  try {
    const [productCategoriesRes, topProductCategoriesRes] = await Promise.all([
      productService.getProductCategories(),
      productService.getTopProductCategories(),
    ]);

    if (!productCategoriesRes || !productCategoriesRes.data) {
      console.log('Product categories not found');
      return notFound();
    }

    if (!topProductCategoriesRes || !topProductCategoriesRes.data) {
      console.log('Top product categories not found');
      return notFound();
    }

    allCategories = productCategoriesRes.data;
    topCategories = topProductCategoriesRes.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return notFound();
  }

  return (
    <main className='pt-[165px] lg:pt-0'>
      <Suspense>
        <div className='bg-white lg:hidden fixed top-[83px] right-0 left-0 z-[1000] px-[3%] py-4'>
          <SearchForm />
        </div>
      </Suspense>
      <CategoryList categories={allCategories} />
      <AdBanner />
      <div className='md:my-5 lg:mx-5'>
        <TopCategories topCategories={topCategories} />
        {/* <Category title='Top Selling Items' color='bg-yellow-500'  /> */}
        <AdBanner2 />
        {/* <Category title='New Products' /> */}
        <AdBanner3 />
        <>
          {topCategories &&
            topCategories.slice(0, 4).map((category) => {
              return (
                <Category
                  key={category._id}
                  title={category.name}
                  id={category._id}
                />
              );
            })}
        </>
      </div>
      <Newsletter />
    </main>
  );
}
