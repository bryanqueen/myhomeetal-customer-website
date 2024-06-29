import { ArrowLeft } from 'iconsax-react';
import { headers } from 'next/headers';

import Navigation from '@components/Navigation';
import Button from '@components/Button';
import AccountSidebar from '@components/account/AccountSidebar';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';

  return (
    <div className='mt-36 lg:mt-0'>
      <Navigation />
      <div>
        <Button href={previousPath} linkType='rel' variant='ghost'>
          <ArrowLeft className='mr-3' size={15} />
          Back
        </Button>
      </div>
      <div className='my-5 grid px-5 lg:grid-cols-[250px_1fr] lg:gap-10 lg:px-10'>
        <AccountSidebar />
        <div>{children}</div>
      </div>
    </div>
  );
}
