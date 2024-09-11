import Button from '@/app/components/Button'
import Image from 'next/image'
import React from 'react'

export default function Page() {
  return (
    <main className='pb-20'>
      <section className='grid px-[3%] pt-10 lg:pt-0 gap-2 pb-16'>
        <h1 className='font-clashmd text-[25px] lg:text-[31px]'>
          ZUMBOX TECHNOLOGIES
        </h1>
        <p className='text-sm lg:text-base'>
          We work to make your future so irresistible!
        </p>
      </section>
      <section className='grid gap-16 px-[3%]'>
        <div className='grid gap-5'>
          <div className='grid gap-1'>
            <h3 className='bodyText font-clashmd text-primary'>Call us</h3>
            <p className='text-sm lg:text-base'>
              Call out team Monday to Friday 8am - 5pm
            </p>
          </div>
          <div className='grid gap-1'>
            <a
              className='font-clashmd text-base text-black'
              href='tel:+2347085695033'
            >
              +234 (0)7085695033
            </a>
            <a
              className='font-clashmd hidden text-base text-black'
              href='tel:+2348033204203'
            >
              +234 (0)803 320 4203
            </a>
          </div>
        </div>
        <div className='grid gap-5'>
          <div className='grid gap-1'>
            <h3 className='bodyText font-clashmd text-primary'>Chat with us</h3>
            <p className='text-sm lg:text-base'>
              Speak to our team via live chat
            </p>
          </div>
          <div className='grid gap-1'>
            <a
              className='flex items-center gap-1 font-clashmd text-base text-black'
              href='mailto:info.zumboxtechnologies@gmail.com'
            >
              info.zumboxtechnologies@gmail.com{' '}
              <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
            </a>

            <a
              className='flex items-center gap-1 font-clashmd text-base text-black'
              href='https://www.instagram.com/zumboxtechnologies?igsh=OWlybzF4M3g3cmVh'
              target='_blank'
              rel='noopener noreferrer'
            >
              Message us on Instagram
              <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
            </a>
            <a
              className='hidden items-center gap-1 font-clashmd text-base text-black'
              href='https://twitter.com/yourprofile'
              target='_blank'
              rel='noopener noreferrer'
            >
              Shoot us a tweet
              <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
            </a>
          </div>
        </div>
        <Button linkType='rel' href='/' className='mt-10 shadow-none border-0 h-[50px] lg:h-[56px] font-clashmd text-white rounded-full max-w-[516px] w-full mx-auto'>Visit Our Website</Button>
      </section>
    </main>
  )
}
