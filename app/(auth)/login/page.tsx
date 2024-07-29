import { Metadata } from 'next';

import LoginForm from '@components/forms/LoginForm';
import Link from 'next/link';
import Logo from '@/app/components/Logo';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Login | Myhomeetal',
};

export default function LoginPage() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <div className='mb-7 mt-10 flex flex-col-reverse lg:mt-0 lg:hidden'>
        <div>
          <p className='font-clashmd text-base leading-[19.68px] text-black'>
            Sign in to <br /> <span className='text-primary'>Myhomeetal</span>
          </p>
        </div>
        <div className='flex justify-end'>
          <Link href='/'>
            <Logo variant={3} />
          </Link>
        </div>
      </div>
      <Suspense>
      <LoginForm />
      </Suspense>
      
      <div className='mt-10'>
        <p className='text-center text-[10px] text-black'>
          © Copyright {currentYear}- Myhomeetal | All Rights Reserved
        </p>
      </div>
    </div>
  );
}
