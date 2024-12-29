import { Metadata } from 'next';
import { Suspense } from 'react';

import SearchForm from '@/app/components/forms/SearchForm';

import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import MobileCategoryContainer from '@/app/components/category/MobileCategoryContainer';
import DesktopCategoryContainer from '@/app/components/category/DesktopCategoryContainer';
import { DesktopCategorySkeleton, MobileCategorySkeleton } from '@/app/components/loader';

export interface PageProps {
  params?: any;
  searchParams: {
    categoryId: string;
  };
}

// Function to generate metadata dynamically
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const categoryName = decodeURIComponent(params.categoryName);
  return {
    title: `${categoryName} | Myhomeetal`,
    description: `Explore products in the ${categoryName} category.`,
    // Add more metadata as needed
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

    // Check if the error is a network error or a timeout
    if (
      error instanceof Error &&
      (error.message.includes('Network Error') ||
        error.message.includes('timeout'))
    ) {
      console.error('Network error or timeout occurred:', error);
      // Optionally, return a custom error page or message
      return notFound(); // You might want to handle it differently based on your application's needs
    }

    // Handle other types of errors
    console.error('An unexpected error occurred:', error);
    // Optionally, return a custom error page or message
    return notFound(); // Again, adjust based on your needs
  }

  return (
    <>
      <main className='min-h-[100vh] pb-20 pt-[155px] lg:px-[3%] lg:pt-0'>
        <section>
          <Suspense>
            <div className='fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden'>
              <SearchForm />
            </div>
          </Suspense>
        </section>
        <section className='lg:hidden'>
          <Suspense fallback={<MobileCategorySkeleton />}>
            <MobileCategoryContainer
              categoryName={categoryName}
              products={productsByCategory}
            />
          </Suspense>
        </section>
        <section className='hidden lg:block'>
          <Suspense fallback={<DesktopCategorySkeleton />}>
            <DesktopCategoryContainer
              categoryName={categoryName}
              products={productsByCategory}
            />
          </Suspense>
        </section>
      </main>
    </>
  );
}
