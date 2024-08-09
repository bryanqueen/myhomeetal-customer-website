import CategoriesContainer from '@/app/components/category/CategoriesContainer';
import SearchForm from '@/app/components/forms/SearchForm';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'
import Cookie from 'js-cookie';

export default async function CategoriesPage() {
  let allCategories: any;

  try {
    const token = Cookie.get('AUTH_TOKEN'); // Replace with your actual token

    // Fetch product categories
    const productCategoriesRes = await fetch("https://my-home-et-al.onrender.com/api/v1/user/product-categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    }).then((res) => res.json())
      .catch(err => console.error('Product Categories Fetch Error:', err));

    if (!productCategoriesRes) {
      console.log('Product categories not found');
      return notFound();
    }

    allCategories = productCategoriesRes;

  } catch (error) {
    console.error('Error fetching products:', error);

    if (
      error instanceof Error &&
      (error.message.includes('Network Error') ||
        error.message.includes('timeout'))
    ) {
      console.error('Network error or timeout occurred:', error);
      return notFound();
    }

    console.error('An unexpected error occurred:', error);
    return notFound();
  }

  return (
    <main className='pt-[165px] lg:pt-0 min-h-[100vh]'>
      <section>
        <Suspense>
          <div className='fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden'>
            <SearchForm />
          </div>
        </Suspense>
      </section>
      <section>
        <CategoriesContainer categories={allCategories} />
      </section>

    </main>
  )
}
