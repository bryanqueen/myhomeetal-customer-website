import SaveItems from '@/app/components/account/SaveItems';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { Metadata } from 'next';
import { headers } from 'next/headers';
// import NoHistory from '@/app/components/account/NoHistory';

export const metadata: Metadata = {
  title: 'Saved Items | Myhomeetal',
};

function SavedItemsPage() {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <main className='mx-[3%] lg:mx-0'>
      <div className='sticky z-50 flex items-center bg-white py-5 pl-1 lg:hidden'>
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

      <SaveItems />
    </main>
  );
}

export default SavedItemsPage;
