import { Metadata } from 'next';
import { Trash } from 'iconsax-react';

import Button from '@/app/components/Button';
import Input from '@/app/components/Input';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: 'Close Account | Myhomeetal',
};

function CloseAccountPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='mx-[3%] lg:mx-0'>
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
          Saved Items
        </p>
      </div>
      <div className='hidden flex-col items-center lg:flex'>
        <h1 className='font-clashmd text-3xl text-myGray'>Close Account</h1>
        <p className='mt-2 max-w-md py-2 text-center text-base leading-[19px] text-[#7C7C7C]'>
          Easily manage and select delivery locations to ensure your orders
          reach exactly where you want them.
        </p>
      </div>
      <div className='mx-auto mt-9 flex max-w-[439px] flex-col items-center rounded-2xl lg:gap-5 lg:border lg:border-[#F4F4F4] lg:p-5'>
        <div className='mb-4 h-[87px] w-[87px] rounded-full border-[3px] border-[#E7E7E7] bg-[#FFC5C6] lg:mb-0 lg:h-[68px] lg:w-[68px] lg:border-0' />
        <p className='mb-3 text-center font-clashmd text-sm text-myGray lg:mb-0 lg:text-2xl'>
          We hate to see you go.
        </p>
        <p className='mb-14 max-w-[318px] text-center text-xs leading-[17.22px] text-black lg:mb-0 lg:max-w-[391px] lg:text-sm lg:text-myGray'>
          Before you delete your account, we would want you to know that this
          action will delete your data across myhomeetal platforms. If
          that&apos;s what you want, please proceed with entering your password
          to confirm that it&apos;s you.
        </p>
        <form action='' className='grid w-full gap-5'>
          <Input
            type='password'
            name='password'
            placeholder='Enter Password'
            labelKey='Password'
            labelClassName='text-[#989898] hidden lg:block text-base'
            required
            inputClassName='lg:rounded-2xl text-sm lg:h-[56px] placeholder:text-xs rounded-[10px] h-[60px] bg-[#f4f4f4] placeholder:text-[#989898] lg:placeholder:text-base'
          />
          <Button className='mt-8 lg:mt-0 w-full rounded-[10px] h-[50px] border-0 px-6 py-3 font-clashmd text-base text-white shadow-none lg:rounded-[8px] lg:font-clash'>
            <span className='flex items-center gap-3 lg:gap-1'>
              <Trash variant='Bold' size={20} />
              Delete Account
            </span>
          </Button>
        </form>
      </div>
    </main>
  );
}

export default CloseAccountPage;
