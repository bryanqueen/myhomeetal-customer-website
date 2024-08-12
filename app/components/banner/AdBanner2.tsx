'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/images/bb2.svg',
  '/images/bb1.svg',
  '/images/bb33.svg',
];

const Mobimages = [
  '/images/mobileBan1.svg',
  '/images/mobileBan2.svg',
  '/images/mobileBan33.svg',
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
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='relative mx-[3%] my-5 mt-8 hidden min-h-[350px] overflow-hidden rounded-2xl md:h-72 lg:block'>
        {images.map((src, index) => (
          <Image
            key={index}
            className={`absolute bottom-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
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
      <div className='relative mx-[3%] min-h-[200px] lg:hidden overflow-hidden'>
        {Mobimages.map((src, index) => (
          <Image
            key={index}
            className={`absolute w-full object-cover bottom-0 transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
            style={{ zIndex: currentSlide === index ? 1 : 0 }}
            src={src}
            alt={`Advert ${currentSlide + 1}`}
            width={500}
            height={200}
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
