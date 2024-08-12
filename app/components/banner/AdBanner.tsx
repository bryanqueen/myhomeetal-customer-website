'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AdBanner = () => {
  const imageClass = 'w-full px-1 lg:rounded-[20px] h-full object-contain lg:min-w-[700px]';

  const responsive = {
    sm: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const images = [
    '/images/deskban1.svg',
    '/images/deskban2.svg',
    '/images/deskban3.svg',
  ];
  const mobileImages = [
    '/images/mobss4.svg',
    '/images/mobss1.svg',
    '/images/mobss22.svg',
  ];

  return (
    <>
      <div className='hidden py-4 lg:block min-h-[270px]'>
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
          centerMode={true}
        >
          {images.map((src, index) => {
            const targetLink = index === 0 ? '/page1' : index === 2 ? '/page2' : null;

            return (
              <div key={index} className=''>
                {targetLink ? (
                  <a href={targetLink}>
                    <Image
                      className={imageClass}
                      src={src}
                      alt='Advert'
                      width={900}
                      height={500}
                    />
                  </a>
                ) : (
                  <Image
                    className={imageClass}
                    src={src}
                    alt='Advert'
                    width={900}
                    height={500}
                  />
                )}
              </div>
            );
          })}
        </Carousel>
      </div>
      <div className='pt-3 px-[3%] min-h-[230px] lg:hidden'>
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}
          autoPlay={true}
        >
          {mobileImages.map((src, index) => {
            const targetLink = index === 0 ? '/page1' : index === 2 ? '/page2' : null;

            return (
              <div key={index} className=''>
                {targetLink ? (
                  <a href={targetLink}>
                    <Image
                      className={imageClass}
                      src={src}
                      alt='Advert'
                      width={358}
                      height={200}
                    />
                  </a>
                ) : (
                  <Image
                    className={imageClass}
                    src={src}
                    alt='Advert'
                    width={358}
                    height={200}
                  />
                )}
              </div>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default AdBanner;
