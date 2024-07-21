import { Metadata } from 'next';
import Button from '@/app/components/Button';

import { headers } from 'next/headers';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import AddressBook from '@/app/components/account/AddressBook';

// import NoHistory from '@/app/components/account/NoHistory';

export const metadata: Metadata = {
  title: 'Address Book | Myhomeetal',
};

function AddressBookPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='mx-[3%] pb-10 lg:mx-0'>
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
          Address Book
        </p>
      </div>
      <AddressBook />
    </main>
  );
}

export default AddressBookPage;
