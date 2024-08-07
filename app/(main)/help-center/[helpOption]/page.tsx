import VoidCard from '@/app/components/VoidCard';
import { Shop } from 'iconsax-react';
import React from 'react'

type Params = {
  helpOption: string;
};

export default function HelpOptionPage({ params }: { params: Params }) {
  return (
    <main className='min-h-[100vh] pt-24 lg:pt-0'>
      <div className='w-full border-b-[7px] lg:border-b-[11px] border-[#C70E10]'>
        <div className='grid gap-2 mx-auto w-fit py-10'>
          <div className='w-[46px] mx-auto h-[46px] rounded-[10px] bg-primary flex items-center justify-center'>
            <Shop variant='Bulk' size='24' color='white' />
          </div>
          <h3 className='text-base text-center font-clashmd lg:text-xl'>{params?.helpOption}</h3>
          <p className='max-w-[90%] mx-auto lg:max-w-[367px] text-center text-sm leading-[17.22px]'>Comprehensive guide to payment processes in the help centre.</p>
        </div>
      </div>

      <div className='py-20'>
        <VoidCard
          title='Content coming soon.'
          bodyText='Oops! Looks like this page is on vacation, exploring fashion trends across the globe.'
          btnText='Return to Help Center'
          link='/help-center' />
      </div>
    </main>
  )
}
