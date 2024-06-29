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
      <main className='grid h-[calc(100vh-2.2rem)] items-start gap-2 p-5 md:p-5 lg:grid-cols-2 lg:justify-center'>
        <div className='my-5'>
          <div className='mx-auto mb-5 max-w-lg'>
            <Link href='/'>
              <Logo variant={3} />
            </Link>
          </div>
          {children}
        </div>
        <div className='h-full p-5'>
          <Image
            className='max-h-[calc(100vh-8rem)] min-h-full w-full rounded-3xl object-cover'
            src='/auth-image.png'
            alt=''
            width='500'
            height='500'
          />
        </div>
        <Button className='fixed bottom-4 right-4 h-14 w-14 rounded-full p-3.5'>
          <Image
            className='w-full'
            src='/icons/chat-icon.svg'
            alt=''
            width='10'
            height='10'
          />
        </Button>
      </main>
    </>
  );
}
