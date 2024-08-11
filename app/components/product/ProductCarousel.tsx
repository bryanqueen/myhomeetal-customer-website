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
      partialVisibilityGutter: 0,
    },
  };

  const isSingleImage = data?.images?.length === 1;

  return (
    <div className='my-5 mt-16 lg:hidden'>
      <Carousel
        responsive={responsive}
        partialVisible={!isSingleImage}
        customRightArrow={<CustomRightArrow />}
        customLeftArrow={<CustomLeftArrow />}
      >
        {data?.images?.map((image: string, index: number) => (
          <div
            key={index}
            className={`pt-2 pb-5 ${isSingleImage ? 'flex items-center justify-center' : 'flex items-center justify-center'}`}
          >
            <Image
              className='object-contain h-[331px]'
              src={image}
              alt={`Product Image ${index + 1}`}
              width={331}
              height={331}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const CustomRightArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--right"
      style={{
        zIndex: 1,
        width: '40px',  // Adjust the width
        height: '40px', // Adjust the height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

    </button>
  );
};

const CustomLeftArrow = ({ onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow--left"
      style={{
        zIndex: 1,  // Set your desired z-index here
        width: '40px',  // Adjust the width
        height: '40px', // Adjust the height
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >

    </button>
  );
};

export default ProductCarousel;
