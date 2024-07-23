import { Metadata } from 'next';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import SearchForm from '@/app/components/forms/SearchForm';
import { MobileCategorySkeleton } from '@/app/components/loader';
import MobileCategoryContainer from '@/app/components/category/MobileCategoryContainer';
import DesktopCategoryContainer from '@/app/components/category/DesktopCategoryContainer';

export interface PageProps {
  params?: any;
  searchParams: {
    q: string;
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const id = searchParams.q;

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
  return {
    /**
      <main className='min-h-[100vh] pb-20 pt-[165px] lg:px-[3%] lg:pt-0'>
        <section>
          <Suspense>
            <div className='fixed left-0 right-0 top-[83px] z-[1000] bg-white px-[3%] py-4 lg:hidden'>
              <SearchForm />
            </div>
          </Suspense>
        </section>
        <section className='lg:hidden'>
          <Suspense fallback={<MobileCategorySkeleton />}>
            <MobileCategoryContainer
              categoryName={id}
              products={productsByCategory}
            />
          </Suspense>
        </section>
        <section className='hidden lg:block'>
          <Suspense fallback={'loading...'}>
            <DesktopCategoryContainer
              categoryName={id}
              products={productsByCategory}
            />
          </Suspense>
        </section>
      </main>
      */
  };
}
