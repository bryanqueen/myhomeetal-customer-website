'use client';
import { useState } from 'react';
import Button from '@components/Button';
import ListGridSwitch, {
  ListGridSwitchControls,
} from '@components/category/ListGridSwitch';
import { DesktopCategorySkeleton } from '../loader';

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

export default function DesktopCategoryContainer({
  categoryName,
  products,
}: CategoryProps) {
  const [sortOption, setSortOption] = useState<string | null>('newestArrivals');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000000 });
  const [tempMinPrice, setTempMinPrice] = useState(20000);
  const [tempMaxPrice, setTempMaxPrice] = useState(70000);
  const [discountFilters, setDiscountFilters] = useState<number[]>([]);
  const handleTempPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) => {
    const value = Number(e.target.value);
    if (type === 'min') {
      setTempMinPrice(value);
    } else {
      setTempMaxPrice(value);
    }
  };

  const handleDiscountChange = (discount: number) => {
    setDiscountFilters((prev) =>
      prev.includes(discount)
        ? prev.filter((d) => d !== discount)
        : [...prev, discount]
    );
  };

  const applyPriceRange = () => {
    setPriceRange({ min: tempMinPrice, max: tempMaxPrice });
  };
  return (
    <div>
      <div className='hidden lg:block'>
        <div className='sticky z-20 top-[80px] mb-5 flex items-center justify-between bg-white'>
          {products && (
            <p className='text-xs md:text-sm'>
              Showing over {products?.length} results for &quot;My {categoryName}
              &quot;
            </p>
          )}

          <ListGridSwitchControls />
        </div>
        <div className='grid gap-5 lg:grid-cols-[20rem_3fr]'>
          {/** Sort and filter container desktop */}
          <div className='sticky top-[130px] max-h-[70vh] overflow-scroll no-scrollbar'>
            {/** Sort container */}
            <div className='mb-5 rounded-[20px] border border-[#E4E7EC] p-5'>
              <p className='text-center font-clashmd text-sm text-black'>
                Sort by
              </p>
              <div className='mt-5 grid gap-3'>
                <Button
                  onClick={() => setSortOption('priceLowToHigh')}
                  className={
                    sortOption === 'priceLowToHigh'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Price Low to High
                </Button>
                <Button
                  onClick={() => setSortOption('newestArrivals')}
                  className={
                    sortOption === 'newestArrivals'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Newest Arrivals
                </Button>
                <Button
                  onClick={() => setSortOption('bestSellers')}
                  className={
                    sortOption === 'bestSellers'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Best Sellers
                </Button>
                <Button
                  onClick={() => setSortOption('priceHighToLow')}
                  className={
                    sortOption === 'priceHighToLow'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Price High to Low
                </Button>
                <Button
                  onClick={() => setSortOption('AvgCustomerReview')}
                  className={
                    sortOption === 'AvgCustomerReview'
                      ? 'w-full rounded-[5px] border-0 p-5 text-sm shadow-none'
                      : 'w-full rounded-[5px] border-[#E4E7EC] bg-white p-5 text-sm text-black'
                  }
                >
                  Avg customer Review
                </Button>
              </div>
            </div>
            {/** Discount container */}
            <div className='mb-5 rounded-[20px] border border-[#E4E7EC] px-[36px] py-5'>
              <p className='font-clashmd text-sm text-black'>
                Discount Percentage:
              </p>
              <div className='mt-6 grid gap-5'>
                <div className='flex items-center gap-5'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    onChange={() => handleDiscountChange(50)}
                    checked={discountFilters.includes(50)}
                  />
                  <label className='text-sm text-black'>50% or more</label>
                </div>
                <div className='flex items-center gap-5'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    onChange={() => handleDiscountChange(40)}
                    checked={discountFilters.includes(40)}
                  />
                  <label className='text-sm text-black'>40% or more</label>
                </div>
                <div className='flex items-center gap-5'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    onChange={() => handleDiscountChange(30)}
                    checked={discountFilters.includes(30)}
                  />
                  <label className='text-sm text-black'>30% or more</label>
                </div>
                <div className='flex items-center gap-5'>
                  <input
                    type='checkbox'
                    name=''
                    id=''
                    onChange={() => handleDiscountChange(20)}
                    checked={discountFilters.includes(20)}
                  />
                  <label className='text-sm text-black'>20% or more</label>
                </div>
              </div>
            </div>
            {/** Price container */}
            <div className='mb-5 rounded-[20px] border border-[#E4E7EC] px-[36px] py-5'>
              <div className='flex items-center justify-between'>
                <p className='font-clashmd text-sm text-black'>Price:</p>
                <button
                  className='text-xs text-primary'
                  onClick={applyPriceRange}
                >
                  Apply
                </button>
              </div>

              <div className='mt-7 flex items-center justify-between'>
                <input
                  value={tempMinPrice}
                  onChange={(e) => handleTempPriceChange(e, 'min')}
                  className='h-[37px] w-[110px] rounded-full border border-[#E4E7EC] px-7 py-2 text-center text-black'
                />
                <div className='h-[1.5px] w-3 bg-black'></div>
                <input
                  value={tempMaxPrice}
                  onChange={(e) => handleTempPriceChange(e, 'max')}
                  className='h-[37px] w-[110px] rounded-full border border-[#E4E7EC] px-7 py-2 text-center text-black'
                />
              </div>
            </div>
          </div>
          {/** Products container */}
          {products && products?.length > 0 ? (
            <ListGridSwitch
              products={products}
              sortOption={sortOption}
              priceRange={priceRange}
              discountFilters={discountFilters}
            />
          ) : products && products?.length === 0 ? (
            <div className='min-h-[70vh] flex items-center justify-center'>No products found</div>
          ) : (
            <DesktopCategorySkeleton />
          )}
        </div>
      </div>
    </div>
  );
}
