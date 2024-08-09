'use client'
import VoidCard from '@/app/components/VoidCard';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <main className='pt-20 lg:pt-0'>
      <div className='bg-black mt-2 lg:mt-0 flex items-center justify-center py-5 w-full relative'>
        <button
          onClick={handleBack}
          className='items-center absolute left-4 lg:left-10 text-sm text-white lg:flex'
        >
          <span className='flex items-center gap-1'>
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
          </span>
         
        </button>
        <h2 className='text-white text-center font-clashmd text-base lg:text-[31px]'>Experience Centre</h2>
      </div>
      <div className='relative max-h-[90vh] overflow-hidden'>
        <Image src='https://ik.imagekit.io/krr3p3joi/tr:w-1500,h-521/image%2031.png?updatedAt=1722887677858' width={1500} height={521} alt='experience center' className='h-[800px] object-cover' />
        <div className='absolute flex items-center justify-center top-0 bottom-0 right-0 left-0 bg-black/70'>
          <VoidCard 
            textColor='text-white'
            title='Coming soon.' 
            bodyText='Oops! Looks like this page is on vacation, exploring fashion trends across the globe.' 
            btnText='Return to Home' 
            link='/' />
        </div>
      </div>
    </main>
  )
}
