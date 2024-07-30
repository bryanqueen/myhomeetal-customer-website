import { Metadata } from 'next';

import ForgotPasswordForm from '@components/forms/ForgotPasswordForm';
import Link from 'next/link';
import Logo from '@/app/components/Logo';

export const metadata: Metadata = {
  title: 'Forgot Password | Myhomeetal',
};

export default function LoginPage() {
  return (
    <main>
      <div className='mb-7 mt-10 grid lg:mt-0 lg:hidden'>
        <div className='flex items-center justify-end mb-20'>
          <Link href='/'>
            <Logo variant={3} />
          </Link>
        </div>

        <p className='font-clashmd text-base leading-[19.68px] text-black'>
          Forgot <span className='text-primary'>Password</span>
        </p>
        <p className='my-2 max-w-xs text-xs text-black lg:hidden'>
          No worries! We&apos;ll help you reset it and get back to your account.
        </p>
      </div>
      <ForgotPasswordForm />
    </main>
  );
}
