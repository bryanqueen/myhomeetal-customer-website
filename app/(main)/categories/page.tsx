import CatContainer from "./catContainer";
import FlashSales from "./FlashSales";
import FrequentlyShopped from "./FrequentlyShopped";
import OtherCategory from "./OtherCategory";


export default function CategoriesPage() {
 return (
  <>
  <CatContainer />
  <FrequentlyShopped />
  <OtherCategory title="SAMSUNG" />
  <OtherCategory title="LENONO" />
  <FlashSales />
  </>
 )
}























// 'use client';
// import CategoriesContainer from '@/app/components/category/CategoriesContainer';
// import SearchForm from '@/app/components/forms/SearchForm';
// import React, { Suspense, useEffect, useState } from 'react';
// import CategoryList from '@/app/components/category/CategoryList';
// import productService from '@/app/services/productService';

// export default function CategoriesPage() {
//   const [allCategories, setAllCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCategory = async () => {
//     setError(null);
//     try {
//       const response = await productService.getProductCategories();
//       if (response.status !== 200) {
//         throw new Error('Failed to fetch data');
//       }
//       console.log(response.data);
//       setAllCategories(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setError('Failed to fetch categories. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//   }, []);

//   return (
//     <main className="pt-[165px] pb-20 lg:pt-0 min-h-[100vh]">
//       <section className="fixed left-0 right-0 top-[83px] z-20 bg-white px-[3%] py-4 lg:hidden">
//         <Suspense>
//           <SearchForm />
//         </Suspense>
//       </section>
//       <section>
//         <Suspense>
//           <CategoryList />
//         </Suspense>
//       </section>
//       <section>
//         {loading ? (
//           <div className="flex justify-center min-h-[60vh] items-center mt-10">
//             <Spinner />
//           </div>
//         ) : error ? (
//           <p className="text-center mt-10 text-red-500">{error}</p>
//         ) : (
//           <CategoriesContainer categories={allCategories} />
//         )}
//       </section>
//     </main>
//   );
// }

// function Spinner() {
//   return (
//     <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
//   );
// }