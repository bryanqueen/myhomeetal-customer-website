'use client';

import Image from 'next/image';

const images = ['/images/ad-banner-2.svg', '/images/ad-banner-3.svg'];

const AdBanner3 = () => {
  return (
    <div className='mx-5 my-10 grid grid-cols-1 gap-5 md:grid-cols-2'>
      {images.map((src, index) => (
        <Image
          key={index}
          className='w-full rounded-2xl object-cover lg:h-72'
          src={src}
          alt='Advert'
          width='1000'
          height='200'
        />
      ))}
    </div>
  );
};

export default AdBanner3;
