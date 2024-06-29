import { Metadata } from 'next';
import { Location, CloseSquare } from 'iconsax-react';

import Button from '@/app/components/Button';

// import NoHistory from '@/app/components/account/NoHistory';

export const metadata: Metadata = {
  title: 'Address Book | Myhomeetal',
};

function AddressBookPage() {
  return (
    <main>
      <div className='flex flex-col items-center gap-3 md:flex-row md:justify-between'>
        <div>
          <h1 className='text-3xl font-medium'>Address Book</h1>
          <p className='py-2 text-gray-500'>
            Easily manage and select delivery locations to ensure your orders
            reach exactly where you want them.
          </p>
        </div>
        <Button className='min-w-fit gap-2 px-5 py-3'>
          <Location variant='Bold' size={20} />
          Add Address
        </Button>
      </div>
      <div className='mb-20 grid justify-center gap-5 py-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'>
        {[0, 0, 0, 0, 0, 0].map((v, i) => (
          <AddressCard key={i} />
        ))}
      </div>
    </main>
  );
}

const AddressCard = () => {
  return (
    <div className='w-full rounded-xl bg-gray-100 p-3 text-gray-500'>
      <div className='mb-10 flex justify-between'>
        <span>Address one</span>
        <Button className='p-0 text-gray-700' variant='ghost' fit>
          <CloseSquare variant='Bold' />
        </Button>
      </div>
      <p className='mb-5'>
        Easily manage and select delivery locations to ensure your orders reach
        exactly where you want them.
      </p>
      <Button className='w-full gap-2 border-0 bg-white px-5 py-3 text-primary'>
        <Location variant='Bold' size={20} />
        Edit Address
      </Button>
    </div>
  );
};

export default AddressBookPage;
