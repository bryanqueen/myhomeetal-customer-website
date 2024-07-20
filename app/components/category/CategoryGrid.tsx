'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@components/cards/ProductCard';
import productService from '@/app/services/productService';
import { MobileCategorySkeleton } from '../loader';

interface Props {
  title: string;
  color?: string;
  id?: string;
}

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  reviewsCount: number;
  rating: number;
  isProductNew: boolean;
}

type CategoryProps = {
  title: string;
  id: string;
  color?: string;
  products: Product[];
};

const Category: React.FC<CategoryProps> = ({
  title,
  color = 'bg-primary',
  id,
  products,
}) => {
  // Slice products for desktop and mobile
  const desktopProducts = products.slice(0, 5);
  const mobileProducts = products.slice(0, 4);

  return (
    <div className='my-10 px-2 md:my-20 md:px-[2%]'>
      <div
        className={`col-span-full mb-2 flex h-[50px] items-center justify-between px-3 text-white ${color}`}
      >
        <h2 className='font-clashmd text-sm md:text-base'>My {title}</h2>
        <Link
          href={`/category/${title}?categoryId=${id}`}
          key={id}
          className='text-xs md:font-clashmd md:text-base'
        >
          See All
        </Link>
      </div>
      {products ? (
        <>
          {/* Mobile view */}
          <div className='mt-10 grid grid-cols-2 justify-center gap-x-3 gap-y-7 md:hidden'>
            {mobileProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {/* Desktop view */}
          <div className='mt-10 hidden grid-cols-4 justify-center gap-x-3 gap-y-7 md:grid lg:mt-7 lg:grid-cols-5 lg:gap-5'>
            {desktopProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <MobileCategorySkeleton />
      )}
    </div>
  );
};

export default Category;
