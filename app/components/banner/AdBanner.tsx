'use client';

import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const AdBanner = () => {
  const imageClass = 'h-full w-full lg:px-1 object-contain';

  const responsive = {
    sm: {
      breakpoint: { max: 3000, min: 0 },
      items: 1,
    },
  };

  /**Fallback banner mobile
   * '/images/mobss222.svg',
    '/images/mobss111.svg',
    '/images/mobss333.svg',
   */

  /**Fallback desktop banner
   * '/images/mobss222.svg',
    '/images/mobss111.svg',
    '/images/mobss333.svg',
   */

  const images = [
    'https://ik.imagekit.io/krr3p3joi/tr:w-897,h-274/deskban11.svg?updatedAt=1723577887411',
    'https://ik.imagekit.io/krr3p3joi/tr:w-897,h-274/deskban22.svg?updatedAt=1723577887491',
    'https://ik.imagekit.io/krr3p3joi/tr:w-897,h-274/deskban33.svg?updatedAt=1723577887674',
  ];
  const mobileImages = [
    'https://ik.imagekit.io/krr3p3joi/tr:w-358,h-200/mobss111.svg?updatedAt=1723579147228',
    'https://ik.imagekit.io/krr3p3joi/tr:w-358,h-200/mobss222.svg?updatedAt=1723579147365',
    'https://ik.imagekit.io/krr3p3joi/tr:w-358,h-200/mobss333.svg?updatedAt=1723579259685',
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
