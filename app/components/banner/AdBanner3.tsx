'use client';

// const images = ['/images/bb11.svg', '/images/bb122.svg'];
const images = ['/images/banner987.png', '/images/banner877.png'];

const AdBanner3 = () => {
  return (
    <div className='mx-[3%] my-10 grid grid-cols-1 gap-5 lg:grid-cols-2'>
      {images.map((src, index) => {
        // const targetLink = index === 1 ? '/meet-the-devs' : null;
        return (
          <div key={index}>
            <img
              src={src}
              alt='Advert'
              className='w-full rounded-xl lg:rounded-3xl'
              loading='lazy'
            />
          </div>
        );
      })}
    </div>
  );
};

export default AdBanner3;
