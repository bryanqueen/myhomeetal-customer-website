import { headers } from 'next/headers';

import Navigation from '@components/Navigation';
import Button from '@components/Button';
import AccountSidebar from '@components/account/AccountSidebar';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';

  return (
    <div className='mt-20 lg:mt-0'>
      <Navigation />
      <div className='flex items-center pl-4 pt-5'>
        <Button
          href={previousPath}
          className='justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          linkType='rel'
          variant='ghost'
        >
          <ArrowLeftIcon
            width={17}
            className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'
          />
          Back
        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          Personal Info
        </p>
      </div>
      <div className='my-5 grid lg:grid-cols-[250px_1fr] lg:gap-10 lg:px-10'>
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
