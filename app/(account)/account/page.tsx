import { Metadata } from 'next';

import Input from '@/app/components/Input';

export const metadata: Metadata = {
  title: 'Personal Information | Myhomeetal',
};

export default function AccountPage() {
  return (
    <main>
      <div className='rounded-xl bg-primary/10 bg-[image:url(/images/account/info-bg-sm.png)] bg-contain bg-[position:110%] bg-no-repeat px-5 py-8 md:rounded-2xl lg:bg-[image:url(/images/account/info-bg-md.png)] lg:bg-[size:initial]'>
        <h1 className='text-3xl font-medium'>Welcome, Somtochukwu</h1>
        <div className='mb-4 mt-1 hidden text-gray-500 md:block'>
          <p>Thanks for being a Myhomeetal customer 🌟</p>
          <div className='mt-5 flex max-w-fit gap-5 rounded-full border border-dotted border-gray-500 p-2 px-5 text-sm text-gray-500'>
            <span className='shrink-0'>
              Email address: test.oluwafemi@gmail.com
            </span>
            <span className='shrink-0'>Phone number: 09123456788</span>
          </div>
        </div>
        <p className='flex items-center gap-5 py-5 md:block md:py-0'>
          Wallet Balance:{' '}
          <span className='text-4xl font-bold md:text-lg md:font-normal'>
            405,300.00
          </span>
        </p>
      </div>
      <form action=''>
        <div className='my-10 rounded-3xl border p-3'>
          <div className='mb-3 flex justify-between'>
            <div className='flex items-center gap-3'>
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary/30 text-xs'>
                1
              </span>
              <p>Personal Information</p>
            </div>
            <p className='font-medium text-primary'>Edit information</p>
          </div>
          <div className='rounded-3xl bg-gray-100 p-4 px-5'>
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='firstName'
                labelKey='First Name'
                type='text'
                variant='outline'
                inputClassName='border-0'
                placeholder='Oluwafemi'
              />
              <Input
                name='lastName'
                labelKey='Last Name'
                type='text'
                variant='outline'
                inputClassName='border-0'
                placeholder='Odunayo'
              />
            </div>
            <Input
              name='email'
              labelKey='Email adress'
              type='text'
              variant='outline'
              inputClassName='border-0'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
            />
          </div>
        </div>
        <div className='my-10 mb-20 rounded-3xl border p-3'>
          <div className='mb-3 flex justify-between'>
            <div className='flex items-center gap-3'>
              <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary/30 text-xs'>
                2
              </span>
              <p>Delivery Information</p>
            </div>
            <p className='font-medium text-primary'>Edit information</p>
          </div>
          <div className='rounded-3xl bg-gray-100 p-4 px-5'>
            <Input
              name='deliveryAddress'
              labelKey='Delivery adress'
              type='text'
              variant='outline'
              inputClassName='border-0'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
            />
          </div>
        </div>
      </form>
    </main>
  );
}
