import { Metadata } from 'next';
import { Suspense } from 'react';

import SearchForm from '@/app/components/forms/SearchForm';

import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import MobileCategoryContainer from '@/app/components/category/MobileCategoryContainer';
import DesktopCategoryContainer from '@/app/components/category/DesktopCategoryContainer';
export interface PageProps {
  params?: any;
  searchParams: {
    categoryId: string;
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const categoryName = decodeURIComponent(params.categoryName);
  const id = searchParams.categoryId;
  let productsByCategory: any = [];

  try {
    if (id) {
      const res = await productService.getProductsByCategory(id);
      if (!res || !res.data) {
        console.log('Products not found');
        return notFound();
      }

      productsByCategory = res.data;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return notFound();
  }

  return (
    <>
      <main className='min-h-[100vh] pb-20 pt-[165px] lg:px-[3%] lg:pt-0'>
        <section>
          <Suspense>
            <div className='fixed left-0 right-0 top-[83px] z-[1000] bg-white px-[3%] py-4 lg:hidden'>
              <SearchForm />
            </div>
          </Suspense>
        </section>
        <section>
          <MobileCategoryContainer
            categoryName={categoryName}
            products={productsByCategory}
          />
        </section>
        <section>
          <DesktopCategoryContainer
            categoryName={categoryName}
            products={productsByCategory}
          />
        </section>
      </main>
    </>
  );
}
