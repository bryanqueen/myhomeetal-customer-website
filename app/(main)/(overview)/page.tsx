import { notFound } from 'next/navigation';

import productService from '../../services/productService';
import AdBanner from '@components/banner/AdBanner';
import AdBanner2 from '@components/banner/AdBanner2';
import AdBanner3 from '@components/banner/AdBanner3';
import TopCategories from '@/app/components/category/TopCategories';
import Category from '@/app/components/category/CategoryGrid';
import CategoryList from '@components/category/CategoryList';
import { Suspense } from 'react';
import SearchForm from '../../components/forms/SearchForm';

export default async function Home() {
  let allCategories: any;
  let topCategories: any;
  const productsByCategory: any = {};

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

    // Fetch products for each top category
    await Promise.all(
      topCategories.map(async (category) => {
        const productsRes = await productService.getProductsByCategory(category._id);
        productsByCategory[category._id] = productsRes.data;
      })
    );
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return notFound();
  }

  return (
    <main className='pt-[165px] lg:pt-0'>
      <Suspense>
        <div className='fixed left-0 right-0 top-[83px] z-[1000] bg-white px-[3%] py-4 lg:hidden'>
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
                  products={productsByCategory[category._id]}
                />
              );
            })}
        </>
      </div>
    </main>
  );
}
