import NoHistory from '@/app/components/account/NoHistory';
import { Notification } from 'iconsax-react';

export default function dealPage() {
  return (
    <main className='pt-[105px]'>
      <div className='flex h-[63px] w-full items-center justify-between bg-black pr-4 lg:pr-10'>
        <div className='basis-[30%] lg:basis-0'></div>
        <div className='w-fit font-clashmd text-xs text-white lg:text-[31px]'>
          Daily Deals
        </div>
        <div className='w-fit text-[10px] text-white lg:text-base'>
          Time Left: <span className='lg:text-primary'>0h : 0m :0s</span>
        </div>
      </div>
      <div className='flex min-h-[80vh] items-center justify-center'>
        <NoHistory
          extraText='Continue Shopping'
          title='No deals Available'
          buttonText='Get Notified'
          icon={<Notification size='20' color='white' variant='Bold' />}
          bodyText='Stay tuned! Our team is constantly working to bring you the best offers and discounts. In the meantime, check out some of our top categories and find great products at everyday low prices.'
        />
      </div>
    </main>
  );
}
