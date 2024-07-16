import Image from 'next/image';

const Logo = ({ variant = 1 }: { variant?: 1 | 2 | 3 | 4 }) => {
  if (variant === 1)
    return <Image src='/logo1.svg' alt='Logo' width={70} height={70} />;
  if (variant === 2)
    return <Image src='/logo2.svg' alt='Logo' width={55} height={70} />;
  if (variant === 3)
    return (
      <Image
        src='/logo3.svg'
        alt='Logo'
        width={71}
        height={70}
        className='lg:w-[71px] w-[63px] object-contain'
      />
    );
  if (variant === 4)
    return (
      <Image
        src='/logo3.svg'
        alt='Logo'
        width={74}
        height={70}
        className='w-[74px] object-contain'
      />
    );
};

export default Logo;
