'use client';

import Button from '@/app/components/Button';
import cn from 'classnames';
import SearchPagination from '@/app/components/SearchPagination';
import ProductListCard from '@/app/components/cards/ProductListCard';
import CategoryList from '@/app/components/category/CategoryList';
import { ListGridSwitchControls } from '@/app/components/category/ListGridSwitch';
import productService from '@/app/services/productService';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  ArrowsUpDownIcon,
  Bars3BottomLeftIcon,
} from '@heroicons/react/16/solid';
import ProductCard from '@/app/components/cards/ProductCard';

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
  const [activeSort, setActiveSort] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<'lowToHigh' | 'highToLow'>(
    'lowToHigh'
  );

  const navClassName = cn('h-0 z-30 overflow-y-auto transition-all lg:hidden', {
    'h-screen': activeSort,
    'fixed inset-0 h-auto': activeSort,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getProductsByCategory(id);
        const data: Product[] = response.data;
        const sortedData = data.sort((a, b) => a.price - b.price); // Initial sort by price low to high
        setProducts(sortedData);
      } catch (error) {
        console.error('Failed to fetch product categories', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [id]);

  const handleSort = (criteria: 'lowToHigh' | 'highToLow') => {
    setSortCriteria(criteria);
    const sortedProducts = [...products].sort((a, b) => {
      if (criteria === 'lowToHigh') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setProducts(sortedProducts);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main className='pb-20'>
      <CategoryList />
      <div className='pt-5 md:pt-0'>
        <div className='mb-5 flex w-full items-center justify-between bg-[#F4F4F4] px-[3%] py-3 md:bg-white'>
          <p className='text-xs md:text-sm'>
            Showing 300 results for &quot;{decodedName}&quot;
          </p>
          <div className='flex gap-3 lg:hidden'>
            <button
              onClick={() => setActiveSort(!activeSort)}
              className='flex z-50 items-center justify-center gap-1 text-sm font-semibold'
            >
              Sort
              <ArrowsUpDownIcon width={17} />
            </button>
            <button className='flex items-center justify-center gap-1 text-sm font-semibold'>
              Filter
              <Bars3BottomLeftIcon width={17} />
            </button>
          </div>
          <ListGridSwitchControls />
        </div>
      </div>

      <div className='grid gap-5 px-[3%] lg:grid-cols-[20rem_3fr]'>
        <div className='mb-5 hidden self-start rounded-3xl border border-[#E4E7EC] px-3 py-5 md:block'>
          <p className='text-center font-semibold'>Sort by</p>
          <div className='my-5 grid gap-3'>
            <Button
              className='w-full rounded-xl p-4'
              active={sortCriteria === 'lowToHigh'}
              onClick={() => handleSort('lowToHigh')}
            >
              Price Low to High
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Newest Arrivals
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Best Sellers
            </Button>
            <Button
              className='w-full rounded-xl bg-white p-4 text-gray-500'
              active={sortCriteria === 'highToLow'}
              onClick={() => handleSort('highToLow')}
            >
              Price High to Low
            </Button>
            <Button className='w-full rounded-xl bg-white p-4 text-gray-500'>
              Avg customer Review
            </Button>
          </div>
        </div>
        <div className={navClassName}>
          {activeSort && (
            <div className='relative h-[100dvh]'>
              <div className='absolute inset-0 bg-black/30' />
              <div className='absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white p-5 font-medium shadow'>
                <p className='pb-5 pt-3'>Sort by</p>
                <ul className='grid gap-3'>
                  <li>
                    <Button
                      linkType='rel'
                      className='w-full rounded-full p-5'
                      onClick={() => handleSort('lowToHigh')}
                    >
                      Price Low to High
                    </Button>
                  </li>
                  <li>
                    <Button
                      linkType='rel'
                      className='w-full rounded-full p-5'
                      onClick={() => handleSort('highToLow')}
                    >
                      Price High to Low
                    </Button>
                  </li>
                  <li>
                    <Button linkType='rel' className='w-full rounded-full p-5'>
                      Newest Arrivals
                    </Button>
                  </li>
                  <li>
                    <Button linkType='rel' className='w-full rounded-full p-5'>
                      Best Sellers
                    </Button>
                  </li>
                  <li>
                    <Button linkType='rel' className='w-full rounded-full p-5'>
                      Avg customer Review
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        <div className='hidden lg:block'>
          {products.map((product: Product) => (
            <ProductListCard key={product._id} product={product} />
          ))}
          <div className='flex justify-center py-3 lg:max-w-3xl'>
            <SearchPagination />
          </div>
        </div>
        
        <div className='grid grid-cols-2 gap-3 md:grid-cols-3 lg:hidden'>
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          <div className='flex justify-center py-3 lg:max-w-3xl'>
            <SearchPagination />
          </div>
        </div>
      </div>
    </main>
  );
}
