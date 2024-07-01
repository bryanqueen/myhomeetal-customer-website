'use client';
import Button from '@/app/components/Button';
import SearchPagination from '@/app/components/SearchPagination';
import ProductListCard from '@/app/components/cards/ProductListCard';
import CategoryList from '@/app/components/category/CategoryList';
import { ListGridSwitchControls } from '@/app/components/category/ListGridSwitch';
import productService from '@/app/services/productService';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StarIcon } from "@heroicons/react/16/solid";
import { FaArrowDownUpAcrossLine, FaArrowDownUpLock, FaArrowsUpDown } from 'react-icons/fa6';

interface Product {
  _id: string;
  productTitle: string;
  price: number;
  images: string[];
  reviewsCount: number;
  rating: number;
  isProductNew: boolean;
}

export default function CategoryPage() {
  const { categoryName }: { categoryName: string } = useParams();
  const searchParams = useSearchParams();
  const id = searchParams.get('categoryId') || '';

  const decodedName =
    typeof categoryName === 'string' ? decodeURIComponent(categoryName) : '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getProductsByCategory(id);
        const data: Product[] = response.data;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch product categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <main className='pb-20'>
      <CategoryList />
      <div className='pt-8 md:pt-0'>
      <div className='bg-[#F4F4F4] md:bg-white py-3 mb-5 px-[3%] w-full flex items-center justify-between'>
        <p className='text-sm'>
          Showing 300 results for &quot;{decodedName}&quot;
        </p>
        <div>
        </div>
        <ListGridSwitchControls  />

      </div>
      </div>
      

      <div className='px-[3%] grid gap-5 lg:grid-cols-[20rem_3fr]'>
        <div className='hidden mb-5 self-start rounded-3xl md:block border border-[#E4E7EC] py-5 px-3'>
          <p className='font-semibold text-center'>Sort by</p>
          <div className='my-5 grid gap-3'>
            <Button className='w-full rounded-xl p-4'>Price Low to High</Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Newest Arrivals
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Best Sellers
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Price High to Low
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Avg customer Review
            </Button>
          </div>
        </div>
        <div>
          {products.map((product: Product) => (
            <ProductListCard key={product._id} product={product} />
          ))}
          <div className='flex justify-center py-3 lg:max-w-3xl'>
            <SearchPagination />
          </div>
        </div>
      </div>
    </main>
  );
}
