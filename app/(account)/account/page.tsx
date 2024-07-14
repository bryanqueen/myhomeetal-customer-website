import { Metadata } from 'next';

import Input from '@/app/components/Input';
import authUtils from '@/app/utils/authUtils';
import AccountDashboard from '@/app/components/account/AccountDashboard';

export const metadata: Metadata = {
  title: 'Personal Information | Myhomeetal',
};

export default function AccountPage() {
  return (
    <main className='px-[3%] lg:px-0'>
      <AccountDashboard />

      {/**Mobile form */}
      <form action='' className='mt-4 lg:hidden'>
        <div className='rounded-[10px] bg-[#F4F4F4] px-4 py-5'>
          <div className='mx-auto flex w-fit items-center gap-3'>
            <span className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] text-[8px] text-myGray'>
              1
            </span>
            <p className='text-xs text-myGray'>Personal Information</p>
          </div>
          <div className='mt-5 grid gap-[10px]'>
            <div className='relative'>
              <Input
                name='firstName'
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
                placeholder='Oluwafemi'
              />
              <div className='absolute bottom-0 right-0 top-0 flex h-[65px] w-14 items-center justify-center text-[10px] text-primary'>
                Edit
              </div>
            </div>
            <div className='relative'>
              <Input
                name='lastName'
                placeholder='Odunayo'
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              />
              <div className='absolute bottom-0 right-0 top-0 flex h-[65px] w-14 items-center justify-center text-[10px] text-primary'>
                Edit
              </div>
            </div>
            <div className='relative'>
              <Input
                name='email'
                placeholder='Somtoochukwu@gmail.com'
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              />
              <div className='absolute bottom-0 right-0 top-0 flex h-[65px] w-14 items-center justify-center text-[10px] text-primary'>
                Edit
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 rounded-[10px] bg-[#F4F4F4] px-4 py-5'>
          <div className='mx-auto flex w-fit items-center gap-3'>
            <span className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] text-[8px] text-myGray'>
              2
            </span>
            <p className='text-xs text-myGray'>Delivery Information</p>
          </div>
          <div className='mt-5 grid gap-[10px]'>
            <Input
              name='deliveryAddress'
              type='text'
              variant='outline'
              inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
            />
            <p className='text-center font-clashmd text-[10px] text-primary'>
              Add new address
            </p>
          </div>
        </div>
      </form>

      {/**Desktop form */}
      <form action='' className='hidden lg:block'>
        <div className='my-10 rounded-2xl border border-[#F4F4F4] p-3 pb-5'>
          <div className='mb-3 flex justify-between pt-3'>
            <div className='flex items-center gap-3'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0] text-sm text-myGray'>
                1
              </span>
              <p className='text-base text-myGray'>Personal Information</p>
            </div>
            <p className='font-clashmd text-base text-primary'>
              Edit information
            </p>
          </div>
          <div className='rounded-xl bg-[#F4F4F4] p-5 py-7'>
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='firstName'
                labelKey='First Name'
                type='text'
                variant='outline'
                inputClassName='border-0 rounded-2xl placeholder:text-[#989898]'
                placeholder='Oluwafemi'
                labelClassName='text-myGray text-base'
              />
              <Input
                name='lastName'
                labelKey='Last Name'
                type='text'
                variant='outline'
                inputClassName='border-0 rounded-2xl placeholder:text-[#989898]'
                placeholder='Odunayo'
                labelClassName='text-myGray text-base'
              />
            </div>
            <Input
              name='email'
              labelKey='Email adress'
              type='text'
              variant='outline'
              inputClassName='border-0 rounded-2xl mb-3 placeholder:text-[#989898]'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
              labelClassName='text-myGray text-base'
            />
          </div>
        </div>
        <div className='my-10 mb-20 rounded-2xl border border-[#F4F4F4] p-3'>
          <div className='mb-3 mt-3 flex  justify-between'>
            <div className='flex items-center gap-3'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0] text-sm text-myGray'>
                2
              </span>
              <p className='text-base text-myGray'>Delivery Information</p>
            </div>
            <p className='font-clashmd text-base text-primary'>
              Add new address
            </p>
          </div>
          <div className='rounded-xl bg-[#f4f4f4] px-5 pt-7'>
            <Input
              name='deliveryAddress'
              labelKey='Delivery address'
              type='text'
              variant='outline'
              inputClassName='border-0 mb-6 rounded-2xl placeholder:text-[#989898]'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
              labelClassName='text-myGray text-base'
            />
          </div>
        </div>
      </form>
    </main>
  );
}
