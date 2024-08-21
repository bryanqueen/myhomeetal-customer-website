import { CallCalling } from 'iconsax-react'
import Image from 'next/image'
import React from 'react'

export default function DepositVerifyPage() {
  return (
    <main className='px-[3%] min-h-[100vh] lg:min-h-[70vh] flex items-center'>
      <div className='lg:max-w-[50%] mx-auto grid gap-7 lg:gap-8'>
        <Image
          src='/direct.png'
          width={76}
          height={76}
          alt='cloud'
          className='mx-auto'
        />
        <p className='max-w-[80%] lg:max-w-[326px] mx-auto text-center text-sm font-clashmd lg:text-base'>
          Please contact either of the provided numbers to confirm your payment.
        </p>
        <div className='grid grid-cols-2 gap-10 w-fit mx-auto'>
          <a href="tel:+2349060002626" className='flex items-center gap-2 text-sm font-clashmd lg:text-base'>
            <CallCalling variant='Bold' size='24' color='#ED2224' />
            09060002626
          </a>
          <a href="tel:+2349037000057" className='flex items-center gap-2 text-sm font-clashmd lg:text-base'>
            <CallCalling variant='Bold' size='24' color='#ED2224' />
            09037000057
          </a>
        </div>
        <p className='max-w-[80%] lg:max-w-[482px] mx-auto text-center text-xs lg:text-base'>
          Your transaction is currently being verified. You will receive an email once the verification
          process is complete and if the transaction is successful.
        </p>
      </div>
    </main>
  )
}
