"use client";

import Image from 'next/image';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai'; // React icons for star ratings
import flashSalesImg from '@/public/icons/flashSales.svg';


const FlashSales:React.FC = () => {
  const allProducts = [
    {
      id: 1,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/carVacuumCleaner.png',
      rating: 4,
      new: true,
    },
    {
      id: 2,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
      new: false,
    },
    {
      id: 3,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/powerStation.png',
      rating: 4,
      new: true,
    },
    {
      id: 4,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/carVacuumCleaner.png',
      rating: 4,
      new: false,
    },
    {
      id: 5,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/rechargeableFan.png',
      rating: 4,
      new: true,
    },
    {
      id: 6,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/carVacuumCleaner.png',
      rating: 4,
      new: false,
    },
    {
      id: 7,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/powerStation.png',
      rating: 4,
      new: true,
    },
    {
      id: 8,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
      new: false,
    },
    {
      id: 9,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/powerStation.png',
      rating: 4,
      new: true,
    },
    {
      id: 10,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/carVacuumCleaner.png',
      rating: 4,
      new: false,
    },
  ];

  const [visibleProducts, setVisibleProducts] = useState(6);

  const handleSeeMore = () => {
    setVisibleProducts((prevCount) =>
      prevCount === 6 ? allProducts.length : 6
    );
  };

  return (
    <section className="p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center px-4 sm:px-8 bg-black rounded-t-lg py-3">
        <div className="text-base font-medium text-white flex items-center gap-3">
         <Image src={flashSalesImg} alt='flashSales' className='object-contain' />  Flash Sales
        </div>
        <p className='text-white'>Time Left: 23h : 08m : 17s</p>
        <div
          onClick={handleSeeMore}
          className="text-base font-medium text-white hover:underline hover:cursor-pointer"
        >
          {visibleProducts === 6 ? 'See More' : 'See Less'}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 px-4 md:px-8 lg:px-0 mt-6">
        {allProducts.slice(0, visibleProducts).map((product) => (
          <div
            key={product.id}
            className="relative overflow-hidden hover:shadow-xl transition duration-300"
          >
            {/* New Badge */}
            {product.new && (
              <span className="bg-[#FFC5C6] text-[#881415] text-xs font-normal px-2 py-1 absolute top-2 right-0 rounded-[20px] z-10">
                New product
              </span>
            )}
            {/* Product Image */}
            <div className="w-full h-48 relative">
              <Image
                src={product.image}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                // width={80}
              />
            </div>

            {/* Product Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
              {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <AiFillStar
                      key={index}
                      size={12}
                      className={`${
                        index < product.rating
                          ? 'text-[#ED2224]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
              </div>
                <span className="ml-2 font-sans text-xs">
                  {product.reviews}
                </span>
              </div>
              <h3 className="text-sm text-black w-full line-clamp-2">
                {product.name}
              </h3>
              <p className="text-base font-medium text-black mt-2">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FlashSales;
