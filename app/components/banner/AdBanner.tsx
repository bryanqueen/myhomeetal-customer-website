'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AdBanner = () => {
  const imageClass = 'w-full object-contain px-3 lg:px-1 lg:w-[897px]';

  const responsive = {
    sm: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const images = [
    '/images/Banner1.png',
    '/images/Banner2.png',
    '/images/Banner3.png',
  ];
  const mobileImages = [
    '/images/newad.svg',
    '/images/newad.svg',
    '/images/newad.svg',
  ];

  return (
    <>
      <div className='hidden py-4 lg:block'>
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
          centerMode={true}
        >
          {images.map((src, index) => (
            <Image
              key={index}
              className={imageClass}
              src={src}
              alt='Advert'
              width={1000}
              height={200}
              loading='lazy'
            />
          ))}
        </Carousel>
      </div>
      <div className='pt-3 lg:hidden'>
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
        >
          {mobileImages.map((src, index) => (
            <Image
              key={index}
              className={imageClass}
              src={src}
              alt='Advert'
              width={358}
              height={200}
              loading='lazy'
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default AdBanner;
