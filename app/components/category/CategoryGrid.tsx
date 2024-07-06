'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from '@components/cards/ProductCard';
import productService from '@/app/services/productService';

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

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) {
        console.log('No category ID provided');
        return;
      }
      console.log(`Fetching products for category ID: ${id}`);

      try {
        const response = await productService.getProductsByCategory(id);
        console.log('API Response:', response);
        const data: Product[] = response.data.slice(0, 6); // Get only the first 6 products

        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='my-10 px-2 md:my-20 md:px-[2%]'>
      <div
        className={`col-span-full mb-2 flex h-[45px] items-center justify-between px-3 text-white ${color}`}
      >
        <h2 className='text-sm font-medium md:text-base'>{title}</h2>
        <Link
          href={`/category/${title}?categoryId=${id}`}
          key={id}
          className='text-xs font-light md:text-base'
        >
          See All
        </Link>
      </div>
      <div className='grid justify-center gap-2 pt-5 md:grid-cols-4 lg:grid-cols-6'>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
