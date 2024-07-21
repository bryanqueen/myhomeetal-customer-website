import { Metadata } from 'next';

import AccountDashboard from '@/app/components/account/AccountDashboard';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { headers } from 'next/headers';
import PersonalInformationForm from '@/app/components/account/PersonalInformationForm';

export const metadata: Metadata = {
  title: 'Personal Information | Myhomeetal',
};

export default function AccountPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='px-[3%] lg:px-0'>
      <div className='sticky z-50 flex items-center bg-white py-5 pl-1 lg:hidden'>
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
      <AccountDashboard />
      <PersonalInformationForm />
    </main>
  );
}
