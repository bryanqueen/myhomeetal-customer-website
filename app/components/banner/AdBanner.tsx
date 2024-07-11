'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AdBanner = () => {
  const imageClass = 'w-full object-contain px-3 lg:px-1 lg:max-w-7xl';

  const responsive = {
    sm: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const images = [
    '/images/ad-banner-2.svg',
    '/images/ad-banner.svg',
    '/images/ad-banner-3.svg',
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
              width='1000'
              height='200'
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
            />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default AdBanner;
