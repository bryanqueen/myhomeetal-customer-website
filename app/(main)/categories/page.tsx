import CategoriesContainer from '@/app/components/category/CategoriesContainer';
import SearchForm from '@/app/components/forms/SearchForm';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react'

export default async function CategoriesPage() {
  let allCategories: any;

  try {
    const productCategoriesRes = await productService.getProductCategories()


    if (!productCategoriesRes || !productCategoriesRes?.data) {
      console.log('Product categories not found');
      return notFound();
    }

    allCategories = productCategoriesRes?.data;

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
