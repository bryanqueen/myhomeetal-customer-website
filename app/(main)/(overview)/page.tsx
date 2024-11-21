import { Metadata } from 'next';
import AdBanner from '@components/banner/AdBanner';
import TopCategories from '@/app/components/category/TopCategories';
import CategoryList from '@components/category/CategoryList';
import { Suspense } from 'react';
import SearchForm from '../../components/forms/SearchForm';
import HomeCategoryProductList from '@/app/components/HomeCategoryProductList';
import dynamic from 'next/dynamic';

const WelcomeMessagePopup = dynamic(() => import('@/app/components/popups/WelcomeMessagePopup'), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Home | Myhomeetal',
  description:
    'Discover top categories and products at Myhomeetal. Explore our best-selling items, latest trends, and more.',
  keywords:
    'e-commerce, online shopping, top categories, best sellers, new products',
  openGraph: {
    title: 'Home | Myhomeetal',
    description:
      'Explore top categories and products at Myhomeetal. Find the best deals and latest trends in one place.',
    url: 'https://myhomeetal.com',
  },
};

export default async function Home() {
  return (
    <main className='pt-[165px] lg:pt-0'>
      <section className="fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden">
        <SearchForm />
      </section>
      <section>
        <Suspense>
          <CategoryList />
        </Suspense>
      </section>
      <section>
        <AdBanner />
      </section>
      <section className='lg:mx-5'>
        <Suspense>
          <TopCategories />
        </Suspense>
      </section>
      <section className='lg:mx-5'>
        <Suspense>
          <HomeCategoryProductList />
        </Suspense>
      </section>
      {/**Welcome Message Popup*/}
      <section>
        <WelcomeMessagePopup />
      </section>
    </main >
  );
}
