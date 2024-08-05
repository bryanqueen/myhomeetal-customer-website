'use client'
import VoidCard from '@/app/components/VoidCard';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function page() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  return (
    <main>
      <div className='bg-black flex items-center justify-center py-5 w-full relative'>
        <button
          onClick={handleBack}
          className='items-center absolute left-10 text-sm text-white lg:flex'
        >
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </button>
        <h2 className='text-white text-center font-clashmd text-lg lg:text-[31px]'>Experience Centre</h2>
      </div>
      <div className='relative'>
        <Image src='https://ik.imagekit.io/krr3p3joi/tr:w-1500,h-521/image%2031.png?updatedAt=1722887677858' width={1500} height={521} alt='experience center' />
        <div className='absolute top-0 bottom-0 right-0 left-0 bg-black/70'>

        </div>
      </div>
    </main>
  )
}
