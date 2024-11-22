'use client';
import Link from 'next/link';
import ProductCard from '@components/cards/ProductCard';
import { MobileCategorySkeleton } from '../loader';
import { memo, useEffect, useState } from 'react';
import { CategoryProps } from '@/types';

const Category: React.FC<CategoryProps> = ({
  title,
  color = 'bg-primary',
  id,
  products,
}) => {

  const [isLoading, setIsLoading] = useState(true);
  // Slice products for desktop and mobile
  const desktopProducts = products?.slice(0, 5);
  const mobileProducts = products?.slice(0, 4);

  useEffect(() => {
    // Simulate a loading delay to ensure skeleton loader is shown properly
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 30); // Adjust the duration for the loader

    return () => clearTimeout(timeout);
  }, [products]);

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
      {isLoading || (products && products.length === 0) ? (
        <MobileCategorySkeleton />
      ) : (
        <>
          {/* Mobile view */}
          <div className='mt-10 min-h-[240px] md:min-h-[240px] grid grid-cols-2 justify-center md:grid-cols-4  gap-x-3 gap-y-7 lg:hidden'>
            {mobileProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {/* Desktop view */}
          <div className='mt-10 min-h-[307px] hidden justify-center gap-x-3 gap-y-7 lg:grid lg:mt-7 lg:grid-cols-5 lg:gap-5'>
            {desktopProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default memo(Category);
