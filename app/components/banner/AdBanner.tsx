'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AdBanner = () => {
  const imageClass = 'w-full lg:rounded-3xl object-contain px-3 lg:px-1 lg:w-[897px]';

  const responsive = {
    sm: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const images = [
    '/images/Banner11.png',
    '/images/Banner12.png',
    '/images/Banner13.png',
  ];
  const mobileImages = [
    '/images/newad.svg',
    '/images/newad.svg',
    '/images/newad.svg',
  ];

  return (
    <>
      <div className='hidden min-h-[280px] py-4 lg:block'>
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
              width={897}
              height={200}
            />
          ))}
        </Carousel>
      </div>
      <div className='pt-3 min-h-[220px] lg:hidden'>
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
