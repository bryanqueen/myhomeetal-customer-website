'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import AboutHeader from './AboutHeader';
import VoidCard from './VoidCard';
import Image from 'next/image';

export default function BlogContainer({ title }) {
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
      <AboutHeader time='5 min article' page={title} />
      <section className='mt-20'>
        <div className='relative flex items-center justify-center'>
          <Image src='https://ik.imagekit.io/krr3p3joi/tr:w-1500,h-521/image%2033.png?updatedAt=1722961177785' width={1500} height={521} alt='experience center' className='h-[600px] lg:h-[572px] rounded-[20px] w-[97%] lg:w-[90%] object-cover' />
          <div className='absolute flex items-center justify-center top-0 bottom-0 right-0 left-0'>
            <VoidCard
              title='Content coming soon.'
              bodyText='Oops! Looks like this page is on vacation, exploring fashion trends across the globe.'
              btnText='Return to Home'
              link='/'
              textColor='text-white'
            />
          </div>

        </div>

      </section>
    </div>
  );
}
