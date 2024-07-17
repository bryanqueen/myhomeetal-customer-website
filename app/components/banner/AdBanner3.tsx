'use client';

import Image from 'next/image';

const images = ['/images/newad2.svg', '/images/newad3.svg'];

const AdBanner3 = () => {
  return (
    <div className='mx-[3%] my-10 grid grid-cols-1 gap-5 md:grid-cols-2'>
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt='Advert'
          width={358}
          height={138}
          className='w-full'
          loading='lazy'
        />
      ))}
    </div>
  );
};

export default AdBanner3;
