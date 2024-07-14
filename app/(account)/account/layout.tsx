import { headers } from 'next/headers';

import Navigation from '@components/Navigation';
import Button from '@components/Button';
import AccountSidebar from '@components/account/AccountSidebar';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Back from '@/app/components/account/Back';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='mt-20 lg:mt-0'>
      <Navigation />
      <Back />
      <div className='my-5 grid lg:grid-cols-[250px_1fr] lg:gap-10 lg:px-10'>
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
