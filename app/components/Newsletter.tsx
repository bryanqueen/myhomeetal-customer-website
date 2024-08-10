import Image from 'next/image';
import Input from './Input';

const Newsletter = () => {
  return (
    <div className='relative flex h-[205px] w-full items-center justify-center overflow-hidden rounded-[9.72px] bg-primaryBg lg:h-[334px] lg:rounded-3xl'>
      <Image
        src='/images/Newsletter.svg'
        alt='eclipse'
        width={829}
        height={829}
        loading='lazy'
        className='hidden lg:block'
      />
      <Image
        src='/images/Newsletter2.svg'
        alt='eclipse'
        width={360}
        height={205}
        loading='lazy'
        className='lg:hidden'
      />
      <div className='absolute flex h-fit w-fit flex-col items-center justify-center'>
        <p className='mb-2 text-center text-[10px] text-white uppercase'>
        get notified when we update our catalog
        </p>
        <h2 className=' mb-8 max-w-[319px] text-center font-clashmd text-sm leading-[17.22px] text-white lg:mb-4 lg:max-w-[718px] lg:text-[39px] lg:leading-[47.97px]'>
          Sign up to newsletter and receive up to ₦1,000 discount for first
          shopping
        </h2>
        <div className='relative h-[40px] min-w-[329px] lg:h-[47px] lg:min-w-[521px]'>
          <form action=''>
            <Input
              name='emailAddress'
              placeholder='Enter email address here'
              inputClassName='bg-[#FFF1F1] w-full h-full rounded-full text-sm lg:text-base placeholder:text-myGray placeholder:text-[10px] lg:placeholder:text-sm'
            ></Input>
            <button className='absolute right-2 top-[6px] h-[36px] rounded-full border border-[#881415] bg-primary px-6 text-[10px] text-white lg:top-[5px] lg:h-[40px] lg:px-4 lg:font-clashmd lg:text-base'>
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
