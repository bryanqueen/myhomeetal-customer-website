// pages/index.tsx
import { GetStaticProps } from 'next';
import AdBanner from '@components/banner/AdBanner';
import AdBanner2 from '@components/banner/AdBanner2';
import AdBanner3 from '@components/banner/AdBanner3';
import Category from '@components/category/CategoryGrid';
import CategoryList from '@components/category/CategoryList';

import React from 'react';
import SearchForm from '@/app/components/forms/SearchForm';
import TopCategories from '@/app/components/category/TopCategories';
import productService from '@/app/services/productService';
import TopBanner from '@/app/components/banner/TopBanner';
import Navigation from '@/app/components/Navigation';
import MainFooter from '@/app/components/MainFooter';

interface CategoryProps {
  topCategories: any[];
  allCategories: any[];
}

const Home: React.FC<CategoryProps> = ({ topCategories, allCategories }) => {
  return (
    <>
      <TopBanner />
      <Navigation />
      <main className='pt-[165px] lg:pt-0'>
        <section>
          <div className='fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden'>
            <SearchForm />
          </div>
        </section>
        <section>
          <CategoryList categories={allCategories} />
        </section>

        <AdBanner />
        <div className='lg:mx-5'>
          <TopCategories topCategories={topCategories} />

          {topCategories &&
            topCategories.slice(0, 8).map((category, index) => {
              const products = category?.products;
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
                  {index === 0 && <AdBanner2 />}
                  {index === 1 && <AdBanner3 />}
                </React.Fragment>
              );
            })}
        </div>
      </main>
      <MainFooter />
    </>

  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  let allCategories: any[] = [];
  let topCategories: any[] = [];
  const productsByCategory: any = {};

  try {
    const [productCategoriesRes, topProductCategoriesRes] = await Promise.allSettled([
      productService.getProductCategories(),
      productService.getTopProductCategories(),
    ]);

    if (productCategoriesRes.status === 'fulfilled') {
      allCategories = productCategoriesRes.value.data; // Access data directly
      shuffleArray(allCategories);
    } else {
      console.error('Product Categories Fetch Error:', productCategoriesRes.reason);
    }

    if (topProductCategoriesRes.status === 'fulfilled') {
      topCategories = topProductCategoriesRes.value.data; // Access data directly
    } else {
      console.error('Top Product Categories Fetch Error:', topProductCategoriesRes.reason);
      topCategories = [];
    }

    topCategories = Array.isArray(topCategories) ? topCategories : [];

    topCategories = await Promise.all(
      topCategories.map(async (category) => {
        try {
          const res = await productService.getProductsByCategory(category?._id);

          const productsData = res.data; // Access data directly
          productsByCategory[category?._id] = productsData;
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

    shuffleArray(topCategories);

    return {
      props: {
        topCategories,
        allCategories,
      },
      revalidate: 1800,
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      notFound: true,
    };
  }
};


function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
