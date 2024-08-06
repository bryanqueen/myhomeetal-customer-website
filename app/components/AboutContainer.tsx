'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import AboutHeader from './AboutHeader';
import VoidCard from './VoidCard';

export default function AboutContainer() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <div className='pt-20 lg:pt-0 pb-28 min-h-[100vh]'>
      <div className='hidden px-[3%] pt-[90px] lg:mt-0 lg:block lg:pt-0'>
        <button
          onClick={handleBack}
          className='hidden items-center text-sm text-myGray lg:flex'
        >
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </button>
      </div>
      <AboutHeader time='5 min article' page='About Us' />
      <section className='py-20'>
        <div className='mx-auto max-w-[80%] border border-[#F8BCBC] p-5 font-clashmd text-xs lg:max-w-[624px] lg:text-base lg:leading-[19.68px]'>
          My homeetal was formerly known as Komplete Kitchen. The company was
          incorporated March, 2012 and established with the vision to exceed the
          expectations of the most discerning and sophisticated customers who
          consistently request for high quality products.
        </div>
      </section>
      <section>
        <VoidCard
          title='Content coming soon.'
          bodyText='Oops! Looks like this page is on vacation, exploring fashion trends across the globe.'
          btnText='Return to Home'
          link='/'
        />
      </section>
    </div>
  );
}
