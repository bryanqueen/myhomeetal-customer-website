import { Metadata } from 'next';

import OTPForm from '@/app/components/forms/OTPForm';
import Link from 'next/link';
import Logo from '@/app/components/Logo';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Verify OTP | Myhomeetal',
};

export default function VerifyPage() {
  return (
    <div className='pt-[20px] lg:min-h-[570px] lg:min-w-[566px]'>
      <div className='mb-14 mt-10 flex items-center justify-end lg:mt-0 lg:hidden'>
        <Link href='/'>
          <Logo variant={3} />
        </Link>
      </div>
      <Suspense>
        <OTPForm redirectTo='/login' />
      </Suspense>
    </div>
  );
}
