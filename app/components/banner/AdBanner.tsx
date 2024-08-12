'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Banner1 } from './Banners';

const AdBanner = () => {
  const imageClass = 'w-full lg:rounded-3xl object-contain px-3 lg:px-1 lg:min-w-[700px]';

  const responsive = {
    sm: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const banners = [
    <Banner1 key="banner1" />,
    <Banner1 key="banner2" />,
    <Banner1 key="banner3" />,
  ];

  const images = [
    '/images/Banner11.png',
    '/images/Banner12.png',
    '/images/Banner13.png',
  ];
  const mobileImages = [
    '/images/mobss1.svg',
    '/images/mobss2.svg',
    '/images/mobss3.svg',
  ];

  return (
    <>
      <div className='hidden min-h-[250px] py-4 lg:block'>
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
          centerMode={true}
        >
          {banners.map((banner, index) => (
            <div key={index} className='mr-2'>
              {banner}
            </div>
          ))}
        </Carousel>
      </div>
      <div className='pt-3 min-h-[230px] lg:hidden'>
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
