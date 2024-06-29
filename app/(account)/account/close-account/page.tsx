import { Metadata } from 'next';
import { Trash } from 'iconsax-react';

import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export const metadata: Metadata = {
  title: 'Close Account | Myhomeetal',
};

function CloseAccountPage() {
  return (
    <main>
      <div className='flex flex-col items-center'>
        <h1 className='text-3xl font-medium'>Close Account</h1>
        <p className='max-w-md py-2 text-center text-gray-500'>
          Easily manage and select delivery locations to ensure your orders
          reach exactly where you want them.
        </p>
      </div>
      <div className='mx-auto my-10 flex max-w-md flex-col items-center gap-5 rounded-xl border p-5'>
        <div className='full h-20 w-20 rounded-full bg-primary/30' />
        <p className='text-2xl font-medium'>We hate to see you go.</p>
        <p className='text-center text-sm'>
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
            required
          />
          <Button className='w-full gap-2'>
            <Trash variant='Bold' />
            Delete Account
          </Button>
        </form>
      </div>
    </main>
  );
}

export default CloseAccountPage;
