import { Metadata } from 'next';

import SignupForm from '@components/forms/SignupForm';
import Link from 'next/link';
import Logo from '@/app/components/Logo';
import ClientOnly from '@/app/components/ClientOnly';

export const metadata: Metadata = {
  title: 'Create an Account | Myhomeetal',
};

export default function RegisterPage() {
  const currentYear = new Date().getFullYear();
  return (
    <ClientOnly>
      <div className='w-full'>
        <div className='mb-7 mt-10 flex items-center justify-between lg:mt-0 lg:hidden'>
          <p className='font-clashmd text-base leading-[19.68px] text-black'>
            Create a Myhomeetal <br /> Account
          </p>
          <Link href='/'>
            <Logo variant={3} />
          </Link>
        </div>
        <SignupForm />
        <div className='mt-10'>
          <p className='text-center text-[10px] text-black'>
            © Copyright {currentYear}- Myhomeetal | All Rights Reserved
          </p>
        </div>
      </div>
    </ClientOnly>
  );
}
