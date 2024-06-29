import Image from 'next/image';
import { CardAdd } from 'iconsax-react';

import Button from '@components/Button';

const AddCard = () => {
  return (
    <div className='relative isolate flex flex-col items-center justify-center overflow-hidden rounded-xl bg-primary p-5 py-16 text-center text-white'>
      <div className='absolute inset-0 -z-10'>
        <Image
          className='w-full object-cover'
          src='/images/account/add-card-bg.png'
          alt=''
          width={500}
          height={500}
        />
      </div>
      <p className='text-8xl'>💳</p>
      <p className='text-xl font-medium'>Secure Your Payment</p>
      <p className='max-w-sm text-sm'>
        Add your card details for a faster, safer, and seamless checkout
        experience.
      </p>
      <Button className='mt-5 gap-2 bg-white px-3 text-primary'>
        <CardAdd variant='Bulk' className='' />
        Add Card
      </Button>
    </div>
  );
};

export default AddCard;
