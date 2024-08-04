import Image from 'next/image';
import React from 'react';

export default function MeetTheDevPage() {
  return (
    <main className='pt-[80px] lg:pt-0 min-h-[100vh] pb-28'>
      <Image
        src='https://ik.imagekit.io/krr3p3joi/tr:w-1500,h-403/Group%20Zumbox%201.png?updatedAt=1722776656263'
        width={2000}
        height={403}
        alt='dev team with ceo myhometal'
      />
      <section className='grid gap-2 py-10 lg:py-16'>
        <h1 className='text-center font-clashmd text-[25px] lg:text-[49px]'>
          ZUMBOX TECHNOLOGIES
        </h1>
        <p className='text-center text-sm lg:text-[25px]'>
          We work to make your future so irresistible!
        </p>
      </section>
      <section className='grid gap-28 px-[3%]'>
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
              href='tel:+2348186536416'
            >
              +234 (0)818 653 6416
            </a>
            <a
              className='font-clashmd text-base text-black'
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
              href='mailto:mails@championlogistics.org.ng'
            >
              mails@championlogistics.org.ng{' '}
              <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
            </a>

            <a
              className='flex items-center gap-1 font-clashmd text-base text-black'
              href='https://twitter.com/yourprofile'
              target='_blank'
              rel='noopener noreferrer'
            >
              Message us on Instagram
              <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
            </a>
            <a
              className='flex items-center gap-1 font-clashmd text-base text-black'
              href='https://twitter.com/yourprofile'
              target='_blank'
              rel='noopener noreferrer'
            >
              Shoot us a tweet
              <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
            </a>
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
              href='https://www.google.com/maps/place/11B, Kaara Street, Off Osolo Way, Ajao Estate, Oshodi/Isolo LGA, Lagos'
            >
              11B, Kaara Street, Off Osolo Way, Ajao Estate, Oshodi/Isolo LGA,
              Lagos
              <Image src='/arrow.svg' width={20} height={20} alt='arrow' />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
