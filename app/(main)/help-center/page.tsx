import { Box, CallCalling, Messages1, Profile2User, Shop, Wallet1 } from 'iconsax-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function HelPage() {
  return (
    <main className='py-20 lg:pt-0 lg:pb-20'>
      <section className='bg-primary py-14 px-[3%] grid gap-10'>
        <div>
          <h3 className='text-white mb-2 lg:text-[25px] font-clashmd text-xl'>Help Center</h3>
          <p className='text-white max-w-[90%] lg:max-w-[762px] text-xs lg:text-base lg:leading-[19.68px]'>Find guides and find quick solutions to common questions across six categories. From payment to resolving account issues.  If you have any questions, our support team is just a click away. Let&lsquo;s make your experience exceptional!</p>
        </div>

        <div className='flex flex-col lg:flex-row lg:items-center gap-5'>
          <div>
            <a
              className='flex items-center gap-1 font-clashmd text-base text-white'
              href='mailto:support@homeetal.com'
            >
              <Messages1 variant='Bulk' color='white' size='24' />
              <p>support@homeetal.com</p>
            </a>
          </div>
          <div>
            <a
              className='font-clashmd flex items-center gap-1 text-base text-white'
              href='tel:+2349060002626'
            >
              <CallCalling variant='Bulk' color='white' size='24' />
              <p>09060002626</p>
            </a>

          </div>
          <div>
            <a
              className='font-clashmd flex items-center gap-1 text-base text-white'
              href='tel:+2349037000057'
            >
              <CallCalling variant='Bulk' color='white' size='24' />
              <p>09037000057</p>
            </a>

          </div>
        </div>
      </section>
      <section className='py-20 mx-[3%]'>
        <h3 className='text-lg lg:text-[25px] font-clashmd mb-14'>How can we Help?</h3>
        <div className='grid lg:grid-cols-3 gap-5'>
          <Link href='/help-center/Payments' className='bg-[#F4F4F4] rounded-[20px] h-[250px] p-4 relative'>
            <div className='w-[46px] h-[46px] rounded-[10px] bg-primary flex items-center justify-center'>
              <Wallet1 variant='Bulk' size='24' color='white' />
            </div>
            <div className='absolute bottom-7'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-base font-clashmd lg:text-xl'>Payments</h3>
                  <Image src='/arrow2.svg' width={20} height={20} alt='arrow' />
                </div>
                <p className='lg:max-w-[299px] max-w-[80%] text-xs lg:text-sm leading-[17.22px]'>Comprehensive guide to payment processes in the help centre.</p>
              </div>
            </div>
          </Link>
          <Link href='/help-center/Delivery' className='bg-[#F4F4F4] rounded-[20px] h-[250px] p-4 relative'>
            <div className='w-[46px] h-[46px] rounded-[10px] bg-primary flex items-center justify-center'>
              <Box variant='Bulk' size='24' color='white' />
            </div>
            <div className='absolute bottom-7'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-base font-clashmd lg:text-xl'>Delivery</h3>
                  <Image src='/arrow2.svg' width={20} height={20} alt='arrow' />
                </div>
                <p className='lg:max-w-[299px] max-w-[80%] text-xs lg:text-sm leading-[17.22px]'>Comprehensive guide to payment processes in the help centre.</p>
              </div>
            </div>
          </Link>
          <Link href='/help-center/Orders' className='bg-[#F4F4F4] rounded-[20px] h-[250px] p-4 relative'>
            <div className='w-[46px] h-[46px] rounded-[10px] bg-primary flex items-center justify-center'>
              <Wallet1 variant='Bulk' size='24' color='white' />
            </div>
            <div className='absolute bottom-7'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-base font-clashmd lg:text-xl'>Orders</h3>
                  <Image src='/arrow2.svg' width={20} height={20} alt='arrow' />
                </div>
                <p className='lg:max-w-[299px] max-w-[80%] text-xs lg:text-sm leading-[17.22px]'>Comprehensive guide to payment processes in the help centre.</p>
              </div>
            </div>
          </Link>
          <Link href='/help-center/Referrals' className='bg-[#F4F4F4] rounded-[20px] h-[250px] p-4 relative'>
            <div className='w-[46px] h-[46px] rounded-[10px] bg-primary flex items-center justify-center'>
              <Profile2User variant='Bulk' size='24' color='white' />
            </div>
            <div className='absolute bottom-7'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-base font-clashmd lg:text-xl'>Referrals</h3>
                  <Image src='/arrow2.svg' width={20} height={20} alt='arrow' />
                </div>
                <p className='lg:max-w-[299px] max-w-[80%] text-xs lg:text-sm leading-[17.22px]'>Comprehensive guide to payment processes in the help centre.</p>
              </div>
            </div>
          </Link>
          <Link href='/help-center/Account' className='bg-[#F4F4F4] rounded-[20px] h-[250px] p-4 relative'>
            <div className='w-[46px] h-[46px] rounded-[10px] bg-primary flex items-center justify-center'>
              <Wallet1 variant='Bulk' size='24' color='white' />
            </div>
            <div className='absolute bottom-7'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-base font-clashmd lg:text-xl'>Account</h3>
                  <Image src='/arrow2.svg' width={20} height={20} alt='arrow' />
                </div>
                <p className='lg:max-w-[299px] max-w-[80%] text-xs lg:text-sm leading-[17.22px]'>Comprehensive guide to payment processes in the help centre.</p>
              </div>
            </div>
          </Link>
          <Link href='/help-center/Stores' className='bg-[#F4F4F4] rounded-[20px] h-[250px] p-4 relative'>
            <div className='w-[46px] h-[46px] rounded-[10px] bg-primary flex items-center justify-center'>
              <Shop variant='Bulk' size='24' color='white' />
            </div>
            <div className='absolute bottom-7'>
              <div className='grid gap-2'>
                <div className='flex items-center gap-1'>
                  <h3 className='text-base font-clashmd lg:text-xl'>Stores</h3>
                  <Image src='/arrow2.svg' width={20} height={20} alt='arrow' />
                </div>
                <p className='lg:max-w-[299px] max-w-[80%] text-xs lg:text-sm leading-[17.22px]'>Comprehensive guide to payment processes in the help centre.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <section className='grid gap-20 px-[3%]'>
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
      </section>
    </main>
  )
}
