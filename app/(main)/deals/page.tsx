import { Metadata } from 'next';
import NoHistory from '@/app/components/account/NoHistory';
import { Notification } from 'iconsax-react';

export const metadata: Metadata = {
  title: 'Daily Deals | Myhomeetal',
  description:
    'Check out the latest daily deals and offers at Myhomeetal. Stay tuned for exciting discounts and promotions.',
  openGraph: {
    title: 'Daily Deals | Myhomeetal',
    description:
      'Explore our daily deals and special offers at Myhomeetal. Don’t miss out on the best discounts and promotions.',
    url: 'https://myhomeetal.com/daily-deals',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daily Deals | Myhomeetal',
    description:
      'Explore the latest daily deals and offers at Myhomeetal. Get notified about exciting discounts and promotions.',
  },
};

export default function dealPage() {
  return (
    <main className='pt-[105px] lg:pt-0'>
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
