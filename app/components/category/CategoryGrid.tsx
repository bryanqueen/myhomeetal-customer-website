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

const Category = ({ title, color = 'bg-primary', id }: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    handleResize(); // Initial check

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) {
        console.log('No category ID provided');
        return;
      }
      try {
        const response = await productService.getProductsByCategory(id);
        const data: Product[] = response.data.slice(0, isDesktop ? 5 : 4);

        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, isDesktop]);

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
      {loading ? (
        <MobileCategorySkeleton />
      ) : (
        <div className='mt-10 grid grid-cols-2 justify-center gap-x-3 gap-y-7 md:grid-cols-4 lg:mt-7 lg:grid-cols-5 lg:gap-5'>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
