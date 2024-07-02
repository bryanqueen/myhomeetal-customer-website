'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const ProductCarousel = ({ data }: any) => {
  const responsive = {
    md: {
      breakpoint: { max: 3000, min: 768 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    lsm: {
      breakpoint: { max: 768, min: 500 },
      items: 1,
      partialVisibilityGutter: 100,
    },
    sm: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
      partialVisibilityGutter: 50,
    },
  };

  return (
    <div className='my-5 lg:hidden'>
      <Carousel responsive={responsive} partialVisbile>
      {data.images?.map((image: string, index: number) => (
          <div key={index} className='px-2'>
            <Image
              className='w-full rounded-3xl border border-gray-300 object-cover'
              src={image}
              alt={`Product Image ${index + 1}`}
              width={200}
              height={400}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
