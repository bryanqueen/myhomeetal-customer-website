import Image from 'next/image';
import Link from 'next/link';

import TopBanner from '@components/banner/TopBanner';
import Button from '@components/Button';
import Logo from '@components/Logo';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopBanner />
      <main className='lg:flex w-full lg:gap-16 px-4 py-10 lg:justify-between lg:px-0'>
        <div className='lg:ml-16'>
          <div className='mb-7 hidden lg:block'>
            <Link href='/'>
              <Logo variant={3} />
            </Link>
          </div>
          {children}
        </div>
        <div className='mr-5 hidden h-full w-fit items-end justify-end lg:flex'>
          <Image
            className='hidden rounded-3xl lg:block'
            src='/authImg.png'
            alt=''
            width={710}
            height={736}
          />
        </div>
      </main>
    </>
  );
}
