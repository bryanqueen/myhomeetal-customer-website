import { CallCalling, Messages1 } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'

export default function ContactPage() {
  return (
    <main className='flex items-center lg:flex-row flex-col justify-between px-[3%] min-h-[100vh] pt-32 lg:pt-16 pb-20'>
      <div className='grid gap-5'>
        <h2 className='max-w-[599px] text-xl text-center lg:text-start lg:text-[36px] font-clashmd lg:leading-[44.28px]'>At <span className='text-primary'> Myhomeetal </span> We foster customer relationships.   ❤️</h2>
        <p className='max-w-[589px] text-xs text-center lg:text-start lg:text-xl lg:leading-[24.6px]'>We prioritize building strong, lasting relationships with our customers. Reach out to us anytime we&apos;re here to help.</p>
      </div>
      <div className='lg:pr-20 px-[2%]'>
        <div className='grid gap-10'>
          <div className='flex items-center gap-10'>
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
                  href='tel:+2349060002626'
                >
                  +234 9060002626
                </a>
                <a
                  className='font-clashmd text-base text-black'
                  href='tel:+2349037000057'
                >
                  +234 9037000057
                </a>
              </div>
            </div>
            <div className=' opacity-35 hidden lg:block'>
              <CallCalling size="103"
                variant="Bold" />
            </div>
            <div className=' opacity-35 lg:hidden'>
              <CallCalling size="50"
                variant="Bold" />
            </div>
          </div>
          <div className='flex items-center gap-10'>
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
                  href='mailto:support@homeetal.com'
                >
                  support@homeetal.com{' '}
                  <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
                </a>

                <a
                  className='flex items-center gap-1 font-clashmd text-base text-black'
                  href='https://www.instagram.com/myhomeetal?igsh=MTJmaGh4OHBvaHdOaw=='
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
            <div className='opacity-35 hidden lg:block'>
              <Messages1
                size="103"
                variant="Bulk" />
            </div>
            <div className='opacity-35 lg:hidden'>
              <Messages1
                size="50"
                variant="Bulk" />
            </div>
          </div>
          <div className='grid gap-5'>
            <div className='grid gap-2'>
              <h3 className='bodyText font-clashmd text-primary'>Visit us</h3>
              <p className='text-sm lg:text-base'>
                Chat with us in person at out Lagos HQ
              </p>
            </div>
            <div className='grid gap-1'>
              <a
                className='flex max-w-[280px] items-center gap-1 font-clashmd text-base text-black lg:max-w-[342px]'
                href='https://www.google.com/maps/place/57, Adebayo Mokuolu Street, Anthony Village Lagos.'
              >
                57, Adebayo Mokuolu Street, Anthony Village Lagos.
                <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
