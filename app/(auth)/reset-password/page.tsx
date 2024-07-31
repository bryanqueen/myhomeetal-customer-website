import ResetPasswordForm from '@/app/components/forms/ResetPasswordForm';
import Logo from '@/app/components/Logo';
import Link from 'next/link';
import React, { Suspense } from 'react';

export default function ResetPage() {
  return (
    <main>
      <div className='mb-7 mt-10 grid lg:mt-0 lg:hidden'>
        <div className='mb-20 flex items-center justify-end'>
          <Link href='/'>
            <Logo variant={3} />
          </Link>
        </div>

        <p className='font-clashmd text-base leading-[19.68px] text-black'>
          Change <span className='text-primary'>Password</span>
        </p>
      </div>
      <Suspense>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
