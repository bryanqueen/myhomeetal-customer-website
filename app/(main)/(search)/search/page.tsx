import { Metadata } from 'next';
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
  const query = searchParams.q;

  let productsByCategory: any = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}product/advanced-search?query=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    productsByCategory = await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return notFound();
  }

  return (
    <main className='min-h-[100vh] pb-20 pt-[165px] lg:px-[3%] lg:pt-0'>
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
            categoryName={query}
            products={productsByCategory}
          />
        </Suspense>
      </section>
      <section className='hidden lg:block'>
        <Suspense fallback={'loading...'}>
          <DesktopCategoryContainer
            categoryName={query}
            products={productsByCategory}
          />
        </Suspense>
      </section>
    </main>
  );
}