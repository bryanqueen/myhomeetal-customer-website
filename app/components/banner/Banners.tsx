import Image from 'next/image'
import React from 'react'

export function Banner1() {
  return (
    <div className='max-w-[897px] shadow-none h-[230px] overflow-hidden rounded-[24px] relative bg-[#C70E10]'>
      <Image
        src='/images/ban1.svg'
        width={400}
        height={274}
        alt='banner'
        className='absolute right-0' />
      <div className='absolute text-white'>
        <h2 className=' font-clashmd text-[31px]'>We're Live! 🎉</h2>
        <p className='max-w-[403px] text-sm'>
          Discover innovative products, exclusive offers, and the future of online shopping—all in one place.
        </p>
        <div className='flex items-center'>
          <button className='bg-[#FFA500]  text-base font-clashmd px-[25px] py-3'>
            Create a wallet
          </button>
        </div>
      </div>
    </div>
  )
}
export function Banner2() {
  return (
    <div className='max-w-[897px] relative h-[274px] rounded-[24px] bg-[#C1DAF5]'>
      <div className='absolute'>
        <h2 className=' font-clashmd text-[31px]'>Wallet Program!</h2>
        <p className='max-w-[403px]  leading-[19.68px]'>
          Add funds, track your balance, and enjoy seamless transactions with our new wallet program.
        </p>
        <div className='flex items-center'>
          <button className='bg-[#FFA500]  text-base font-clashmd px-[25px] py-3'>
            Create a wallet
          </button>
        </div>
      </div>
    </div>
  )
}
export function Banner3() {
  return (
    <div className='max-w-[897px] h-[274px] rounded-[24px] bg-[#C70E10]'>

    </div>
  )
}
