import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trash } from 'iconsax-react';

import Button from '@/app/components/Button';
// import NoHistory from '@/app/components/account/NoHistory';

export const metadata: Metadata = {
  title: 'Saved Items | Myhomeetal',
};

function SavedItemsPage() {
  return (
    <main>
      <h1 className='text-3xl font-medium'>Saved Items</h1>
      {/* <div className='py-32'>
        <NoHistory title='No Saved Item Yet' />
      </div> */}
      <p className='py-2 text-gray-500'>
        Our robust measures ensure your data remains protected, giving you a
        worry-free browsing and shopping experience.
      </p>
      <div className='mb-10 py-5'>
        {[0, 0, 0, 0].map((V, i) => (
          <div
            key={i}
            className='mb-5 grid max-w-3xl rounded-xl border-b border-gray-100 bg-gray-100 px-3 py-5 md:bg-white md:px-0'
          >
            <div className='flex justify-between gap-3'>
              <div className='flex gap-3'>
                <div className='shrink-0'>
                  <Image
                    className='rounded-xl'
                    src='/images/product/samsung-galaxy.png'
                    alt=''
                    width='90'
                    height='90'
                  />
                </div>
                <div className='grid gap-2'>
                  <p>
                    Samsung Galaxy A14 6.6&quot; 4GB RAM/64GB ROM Android 13 -
                    Light Green
                  </p>
                  <span className='font-bold md:hidden'>₦ 3,850</span>
                  <div className='hidden items-center gap-2 text-xs md:flex'>
                    <span>Brand: </span>
                    <span className='rounded-full bg-primary/20 px-3 py-2'>
                      Samsung
                    </span>
                  </div>
                </div>
              </div>
              <div className='flex min-w-fit flex-col items-end justify-end md:justify-between'>
                <span className='hidden font-bold md:block'>₦ 3,850</span>
              </div>
            </div>
            <div className='flex items-center justify-end gap-3 pr-5 md:pr-0'>
              <Link href='' className='text-sm text-primary'>
                See details
              </Link>
              <Button className='max-w-fit gap-2 p-0' variant='ghost'>
                <Trash className='text-primary' variant='Bulk' />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default SavedItemsPage;
