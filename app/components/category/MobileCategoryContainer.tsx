'use client';
import MobileCategory from '@/app/components/category/MobileCategory';
import Image from 'next/image';
import { MobileCategorySkeleton } from '@/app/components/loader';
import { useNav } from '@/app/providers';

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  reviewsCount: number;
  rating: number;
  isProductNew: boolean;
  discount: number;
  createdAt: string;
}

type CategoryProps = {
  categoryName: string;
  products: Product[];
};

export default function MobileCategoryContainer({
  categoryName,
  products,
}: CategoryProps) {
  const { setActiveNav } = useNav();
  return (
    <div>
      {/**Mobile Category Header */}
      <div className='fixed left-0 right-0 top-[170px] z-10 flex h-[40px] items-center justify-between bg-[#F4F4F4] pl-[14px] pr-[10px] lg:hidden'>
        {products && (
          <p className='text-[8px] md:text-sm'>
            Showing over {products.length} results for &quot;My {categoryName}
            &quot;
          </p>
        )}

        <div className='flex h-[32px] w-[115px] items-center justify-between'>
          <button
            onClick={() => setActiveNav('sort')}
            className='flex h-full w-[44px] items-center justify-between font-clashmd text-[10px]'
          >
            Sort
            <Image
              src='/icons/Arrowupdown.svg'
              width={15}
              height={11}
              alt='arrow icon'
            />
          </button>
          <button
            onClick={() => setActiveNav('filter')}
            className='flex h-full w-[45px] items-center justify-between font-clashmd text-[10px]'
          >
            Filter
            <Image
              src='/icons/filterbar.svg'
              width={12}
              height={11}
              alt='filter icon'
            />
          </button>
        </div>
      </div>
      {products && products.length > 0 ? (
        <MobileCategory products={products} />
      ) : products && products.length === 0 ? (
        <div className='min-h-[70vh] flex items-center justify-center text-sm'>No products found</div>
      ) : (
        <MobileCategorySkeleton />
      )}
    </div>
  );
}
