'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
  '/images/ad-banner.svg',
  '/images/ad-banner-2.svg',
  '/images/ad-banner-3.svg',
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
    <div className='relative mx-[3%] my-5 mt-8 h-40 overflow-hidden rounded-2xl md:h-72'>
      {images.map((src, index) => (
        <Image
          key={index}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
          style={{ zIndex: currentSlide === index ? 1 : 0 }}
          src={src}
          alt={`Advert ${currentSlide + 1}`}
          width={1500}
          height={500}
        />
      ))}
      <div className='absolute bottom-0 right-0 z-10 flex space-x-2 p-4'>
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-3 w-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/30'}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default AdBanner2;
