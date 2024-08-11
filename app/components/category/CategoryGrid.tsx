'use client';
import Link from 'next/link';
import ProductCard from '@components/cards/ProductCard';
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
  review: any[];
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
  const desktopProducts = products?.slice(0, 5);
  const mobileProducts = products?.slice(0, 4);

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
      {(products && products.length > 0) ? (
        <>
          {/* Mobile view */}
          <div className='mt-10 min-h-[564px] grid grid-cols-2 justify-center md:grid-cols-4  gap-x-3 gap-y-7 lg:hidden'>
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
      ) : (
        <MobileCategorySkeleton />
      )}
    </div>
  );
};

export default Category;
