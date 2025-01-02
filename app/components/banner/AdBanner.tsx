'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AdBanner = () => {
  const imageClass = 'lg:h-[210px] w-full lg:px-1 lg:object-cover rounded-3xl';

  const responsive = {
    sm: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  const images = [
    '/images/deskban11.svg',
    // '/images/deskban22.svg',
    '/images/desktopban2211.png',
    '/images/deskban33.svg',
  ];
  const mobileImages = [
    '/images/mobss22222.png',
    '/images/mobss111.svg',
    '/images/mobss333.svg',
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
            const targetLink = index === 0 ? '/account/my-wallet' : index === 2 ? '/referral-page' : null;

            return (
              <div key={index} className=''>
                {targetLink ? (
                  <a href={targetLink}>
                    <img
                      className={imageClass}
                      src={src}
                      alt='Advert'
                      width={900}
                      height={500}

                    />
                  </a>
                ) : (
                  <img
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
            const targetLink = index === 1 ? '/referral-page' : index === 2 ? '/account/my-wallet' : null;

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
                  <img
                    className="h-[217px] rounded-3xl w-full object-cover object-right"
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
