import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdBanner from '@components/banner/AdBanner';
import AdBanner2 from '@components/banner/AdBanner2';
import AdBanner3 from '@components/banner/AdBanner3';
import TopCategories from '@/app/components/category/TopCategories';
import Category from '@/app/components/category/CategoryGrid';
import CategoryList from '@components/category/CategoryList';
import React, { Suspense } from 'react';
import SearchForm from '../../components/forms/SearchForm';
import Cookie from 'js-cookie';

function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
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
  twitter: {
    card: 'summary_large_image',
    title: 'Home | Myhomeetal',
    description: 'Discover the best deals and top categories on Myhomeetal.',
  },
};

export default async function Home() {
  let allCategories: any;
  let topCategories: any;
  const productsByCategory: any = {};

  try {
    const token = Cookie.get('AUTH_TOKEN'); // Replace with your actual token

    const [productCategoriesRes, topProductCategoriesRes] = await Promise.all([
      fetch("https://my-home-et-al.onrender.com/api/v1/user/product-categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }).then((res) => res.json())
        .catch(err => console.error('Product Categories Fetch Error:', err)),

      fetch("https://my-home-et-al.onrender.com/api/v1/product-category/top-categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }).then((res) => res.json())
        .catch(err => console.error('Top Product Categories Fetch Error:', err)),
    ]);

    console.log('Product Categories Response:', productCategoriesRes);
    console.log('Top Product Categories Response:', topProductCategoriesRes);

    allCategories = productCategoriesRes
    topCategories = topProductCategoriesRes

    // Return or process `productsByCategory` as needed
    // Fetch products for each top category using fetch
    topCategories = await Promise.all(
      topCategories?.map(async (category) => {
        try {
          console.log(`Fetching products for category ID: ${category?._id}`);
          const res = await fetch(`https://my-home-et-al.onrender.com/api/v1/product/category/${category?._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          });

          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }

          const productsData = await res.json();
          console.log('Fetched Products:', productsData);
          productsByCategory[category?._id] = productsData;

          // Return the category with its products
          return {
            ...category,
            products: productsData,
          };
        } catch (error) {
          console.error(`Error fetching products for category ${category?._id}:`, error);
          return category; // Return the category without products if there is an error
        }
      })
    );

  } catch (error) {
    console.error('Error fetching products:', error);

    if (
      error instanceof Error &&
      (error.message.includes('Network Error') || error.message.includes('timeout'))
    ) {
      console.error('Network error or timeout occurred:', error);
      return notFound();
    }

    console.error('An unexpected error occurred:', error);
    return notFound();
  }

  return (
    <main className='pt-[165px] lg:pt-0'>
      <section>
        <Suspense>
          <div className='fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden'>
            <SearchForm />
          </div>
        </Suspense>
      </section>
      <section>
        <CategoryList categories={allCategories} />
      </section>

      <AdBanner />
      <div className='md:my-5 lg:mx-5'>
        <TopCategories topCategories={topCategories} />

        {/* <Category title='Top Selling Items' color='bg-yellow-500'  /> */}
        <AdBanner2 />
        {topCategories &&
          topCategories.slice(0, 6).map((category, index) => {
            const products = category.products;
            if (!products) {
              console.warn(`No products found for category ID: ${category?._id}`);
              return null;
            }

            return (
              <React.Fragment key={category?._id}>
                <Category
                  title={category?.name}
                  id={category?._id}
                  products={products}
                />
                {index === 2 && <AdBanner3 />} {/* Insert AdBanner3 after the third category */}
              </React.Fragment>
            );
          })}

      </div>
    </main >
  );
}
