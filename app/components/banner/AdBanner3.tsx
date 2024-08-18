'use client';

import Image from 'next/image';
import Link from 'next/link'; // Import Link for linking

const images = ['/images/bb11.svg', '/images/bb122.svg'];

const AdBanner3 = () => {
  return (
    <div className='mx-[3%] my-10 grid grid-cols-1 gap-5 lg:grid-cols-2'>
      {images.map((src, index) => {
        const targetLink = index === 1 ? '/meet-the-devs' : null;

        return (
          <div key={index}>
            {targetLink ? (
              <Link href={targetLink}>
                <Image
                  src={src}
                  alt='Advert'
                  width={358}
                  height={138}
                  className='w-full'
                  loading='lazy'
                />
              </Link>
            ) : (
              <Image
                src={src}
                alt='Advert'
                width={358}
                height={138}
                className='w-full'
                loading='lazy'
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdBanner3;
