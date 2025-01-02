'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import SearchForm from '@/app/components/forms/SearchForm';
import { DesktopCategorySkeleton, MobileCategorySkeleton } from '@/app/components/loader';
import MobileCategoryContainer from '@/app/components/category/MobileCategoryContainer';
import DesktopCategoryContainer from '@/app/components/category/DesktopCategoryContainer';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [searchResult, setSearchResult] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError(null);
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
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch search results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [query]);

  return (
    <>
      <section>
        <div className='fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden'>
          <SearchForm />
        </div>
      </section>
      <section className='lg:hidden'>
        {loading ? (
          <MobileCategorySkeleton />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <MobileCategoryContainer categoryName={query} products={searchResult} />
        )}
      </section>
      <section className='hidden lg:block'>
        {loading ? (
          <DesktopCategorySkeleton />
        ) : error ? (
          <div>{error}</div>
        ) : (
          <DesktopCategoryContainer categoryName={query} products={searchResult} />
        )}
      </section>
    </>
  );
}

function SearchFallback() {
  return (
    <>
      <section>
        <div className='fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden'>
          <SearchForm />
        </div>
      </section>
      <section className='lg:hidden'>
        <MobileCategorySkeleton />
      </section>
      <section className='hidden lg:block'>
        <DesktopCategorySkeleton />
      </section>
    </>
  );
}

export default function SearchPage() {
  return (
    <main className='min-h-[100vh] pb-20 pt-[165px] lg:px-[3%] lg:pt-0'>
      <Suspense fallback={<SearchFallback />}>
        <SearchContent />
      </Suspense>
    </main>
  );
}