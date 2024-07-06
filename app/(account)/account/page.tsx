import { Metadata } from 'next';

import Input from '@/app/components/Input';
import authUtils from '@/app/utils/authUtils';
import AccountDashboard from '@/app/components/account/AccountDashboard';

export const metadata: Metadata = {
  title: 'Personal Information | Myhomeetal',
};

export default function AccountPage() {
  return (
    <main>
      <AccountDashboard />
      <form action=''>
        <div className='my-10 rounded-2xl border border-[#F4F4F4] p-3 pb-5'>
          <div className='mb-3 flex justify-between pt-3'>
            <div className='flex items-center gap-3'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0] text-sm font-medium text-myGray'>
                1
              </span>
              <p className='font-semibold text-myGray'>Personal Information</p>
            </div>
            <p className='font-medium text-primary'>Edit information</p>
          </div>
          <div className='rounded-xl bg-[#F4F4F4] p-4 px-5'>
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='firstName'
                labelKey='First Name'
                type='text'
                variant='outline'
                inputClassName='border-0'
                placeholder='Oluwafemi'
                labelClassName='text-myGray'
              />
              <Input
                name='lastName'
                labelKey='Last Name'
                type='text'
                variant='outline'
                inputClassName='border-0'
                placeholder='Odunayo'
                labelClassName='text-myGray'
              />
            </div>
            <Input
              name='email'
              labelKey='Email adress'
              type='text'
              variant='outline'
              inputClassName='border-0'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
              labelClassName='text-myGray'
            />
          </div>
        </div>
        <div className='my-10 mb-20 rounded-2xl border border-[#F4F4F4] p-3'>
          <div className='mb-3 mt-3 flex  justify-between'>
            <div className='flex items-center gap-3'>
              <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0] text-sm font-medium text-myGray'>
                2
              </span>
              <p className='font-semibold text-myGray'>Delivery Information</p>
            </div>
            <p className='font-medium text-primary'>Edit information</p>
          </div>
          <div className='rounded-xl bg-[#f4f4f4] p-4 px-5'>
            <Input
              name='deliveryAddress'
              labelKey='Delivery address'
              type='text'
              variant='outline'
              inputClassName='border-0'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
              labelClassName='text-myGray'
            />
          </div>
        </div>
      </form>
    </main>
  );
}
