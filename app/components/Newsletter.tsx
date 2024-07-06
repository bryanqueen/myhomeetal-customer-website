import Image from 'next/image';

import Button from './Button';
import Input from './Input';

const Newsletter = () => {
  return (
    <div className='bg-black px-[3%] py-10'>
      <div className='relative isolate overflow-hidden rounded-md bg-red-600 px-4 py-10 text-center text-white md:rounded-2xl'>
        <div className='absolute inset-0 -z-10 flex items-center justify-center'>
          <Image
            className='w-4/5 max-w-3xl object-cover p-3'
            src='/images/subscribe-bg.png'
            alt=''
            width={400}
            height={400}
          />
        </div>
        <div className='mx-auto max-w-xl'>
          <p className='mb-3 text-xs uppercase'>
            Get notified when we update our catalog
          </p>
          <p className='px-10 text-xl font-medium md:text-3xl'>
            Sign up to newsletter and receive up to ₦1,000 discount for first
            shopping
          </p>
        </div>
        <form className='mx-auto max-w-md px-10 py-5'>
          <div className='grid gap-4 lg:hidden'>
            <Input
              name='newsletter'
              type='email'
              placeholder='Enter email address here'
              inputClassName='border border-white bg-transparent p-5 py-4 placeholder:text-white/80 rounded-full'
            />
            <Button className='w-full rounded-full bg-white p-5 text-primary'>
              Buy now
            </Button>
          </div>
          <div className='relative hidden lg:block'>
            <Input
              name='newsletter'
              type='email'
              placeholder='Enter email address here'
              variant='outline'
              inputClassName='px-5 py-2 rounded-full'
            />
            <Button className='absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-3 py-2'>
              Subscribe
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
