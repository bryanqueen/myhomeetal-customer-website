import { Metadata } from 'next';
import { Location, CloseSquare } from 'iconsax-react';

import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { headers } from 'next/headers';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

// import NoHistory from '@/app/components/account/NoHistory';

export const metadata: Metadata = {
  title: 'Address Book | Myhomeetal',
};

function AddressBookPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='mx-[3%] pb-10 lg:mx-0'>
      <div className='flex items-center py-5 pl-1 lg:hidden'>
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
      <div className='hidden lg:block'>
        <div className='flex items-center justify-between'>
          <h1 className='font-clashmd text-3xl text-myGray'>Address Book</h1>
          <Button className='min-w-fit border-0 px-6 py-3 text-base text-white shadow-none'>
            <span className='flex items-center gap-2'>
              <Location variant='Bold' size={20} />
              Add Address
            </span>
          </Button>
        </div>
        <p className='py-2 text-base text-[#7C7C7C]'>
          Easily manage and select delivery locations to ensure your orders
          reach exactly where you want them.
        </p>
      </div>

      <div className='grid gap-5 lg:mt-10 lg:w-fit lg:grid-cols-3'>
        {[0, 0, 0].map((v, i) => (
          <AddressCard key={i} />
        ))}
      </div>

      <div className='mt-14 lg:hidden'>
        <Button className='h-[50px] w-full rounded-[10px] border-0 font-clashmd text-base text-white shadow-none'>
          <span className='flex items-center gap-2'>
            <Location variant='Bold' size={20} />
            Add Address
          </span>
        </Button>
      </div>

      <div className='mt-24 hidden max-w-[582px] rounded-2xl bg-[#f4f4f4] px-5 py-10 lg:block'>
        <div className='grid max-w-[503px] gap-5'>
          <Input
            name='address'
            labelKey='Delevery Address'
            placeholder='10, Uliot street, Bariga, Lagos Nigeria'
            labelClassName='text-xs text-black'
            inputClassName='h-[56px] bg-white placeholder:text-sm placeholder:text-black'
          />
          <Input
            name='phoneNumber'
            labelKey='Phone Number'
            placeholder='+234 9073872270'
            labelClassName='text-xs text-black'
            inputClassName='h-[56px] bg-white placeholder:text-sm placeholder:text-black'
          />
        </div>
      </div>
    </main>
  );
}

const AddressCard = () => {
  return (
    <div className='flex w-full flex-col items-center rounded-2xl bg-[#F4F4F4] px-5 py-4 lg:block lg:max-w-[262px]'>
      <div className='mb-5 flex min-w-full items-end justify-between lg:mb-10'>
        <span className='text-sm text-[#7C7C7C] lg:text-base'>Address one</span>
        <Button className='p-0 text-[#525252]' variant='ghost' fit>
          <CloseSquare variant='Bold' />
        </Button>
      </div>
      <p className='mb-10 text-center text-xs text-[#7C7C7C] lg:mb-5 lg:max-w-[209px] lg:text-start lg:text-sm'>
        Easily manage and select delivery locations to ensure your orders reach
        exactly where you want them.
      </p>
      <Button className='mb-3 w-full max-w-[224px] rounded-[8px] border-0 bg-white px-6 py-3 font-clashmd text-sm text-primary shadow-none lg:w-full lg:pb-0 lg:font-clash lg:text-base'>
        <span className='flex items-center justify-center gap-3 lg:gap-2'>
          <Location variant='Bold' size={20} />
          Edit Address
        </span>
      </Button>
    </div>
  );
};

export default AddressBookPage;
