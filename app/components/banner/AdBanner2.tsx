'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/images/bb44.svg',
  '/images/bb1.svg',
  '/images/ban211.png',
  '/images/mobileban5.png',
  '/images/mobileban6.png',
  '/images/bb33.svg',
];

const Mobimages = [
  '/images/mobileban111.svg',
  '/images/mobileban2.svg',
  '/images/mobileban44.png',
  '/images/bb5.png',
  '/images/bb6.png',
  '/images/mobileban33.svg',
];

const AdBanner2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const nextSlide = () =>
      setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));

    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='relative mx-[3%] my-5 mt-8 hidden min-h-[370px] 2xl:min-h-[500px] 4xl overflow-hidden rounded-2xl lg:block'>
        {images.map((src, index) => (
          <Image
            key={index}
            className={`absolute w-full bottom-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
            src={src}
            alt={`Advert ${currentSlide + 1}`}
            width={1440}
            height={274}
            loading='lazy'
          />
        ))}
        <div className='absolute bottom-10 right-7 z-10 flex space-x-2 p-4'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 w-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
            ></button>
          ))}
        </div>
      </div>
      <div className='relative mx-[3%] min-h-[200px] md:min-h-[300px] lg:hidden overflow-hidden'>
        {Mobimages.map((src, index) => (
          <Image
            key={index}
            className={`absolute w-full rounded-2xl h-[150px] object-cover bottom-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
            src={src}
            alt={`Advert ${currentSlide + 1}`}
            width={500}
            height={400}
            loading='lazy'
          />
        ))}
        <div className='absolute bottom-4 right-4 z-10 flex space-x-2'>
          {Mobimages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
            ></button>
          ))}
        </div>
      </div>
    </div>

  );
};

export default AdBanner2;
