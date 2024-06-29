'use client'

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
  images: string;
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
    <div className='p-4 md:my-10 md:p-5'>
      <div
        className={`col-span-full mb-2 flex items-center justify-between px-5 py-4 text-white ${color}`}
      >
        <h2 className='font-medium md:text-xl'>{title}</h2>
        <Link href={`/category/${id}`}>See All</Link>
      </div>
      <div
        className={`grid grid-cols-2 justify-center gap-4 md:grid-cols-4 lg:grid-cols-6 lg:p-5`}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Category;
