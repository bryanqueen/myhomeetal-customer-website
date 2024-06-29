import Image from 'next/image';

const Logo = ({ variant = 1 }: { variant?: 1 | 2 | 3 }) => {
  if (variant === 1)
    return <Image src='/logo1.svg' alt='Logo' width={60} height={70} />;
  if (variant === 2)
    return <Image src='/logo2.svg' alt='Logo' width={60} height={70} />;
  if (variant === 3)
    return <Image src='/logo3.svg' alt='Logo' width={60} height={70} />;
};

export default Logo;
