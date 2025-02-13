"use client";

import Image from 'next/image';
import { useState } from 'react';
import { AiFillStar } from 'react-icons/ai'; // React icons for star ratings

const FrequentlyShopped = () => {
  const allProducts = [
    {
      id: 1,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 2,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 3,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 4,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 5,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 6,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 7,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 8,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 9,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
    },
    {
      id: 10,
      name: 'EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTI TOUCH All-In-One',
      price: '₦145,600',
      reviews: '100+ Reviews',
      image: '/images/category/MSIPro16.png',
      rating: 4,
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
      <div className="flex justify-between items-center px-4 sm:px-8 bg-[#FFA500] rounded-t-lg py-3">
        <h2 className="text-base font-medium text-white">
          Frequently Shopped
        </h2>
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
            className="overflow-hidden hover:shadow-xl transition duration-300"
          >
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

export default FrequentlyShopped;
