import React from 'react'

export default function ProductDetails({ dataDesc }: { dataDesc: string }) {
  return (
    <div className='rounded-[10px] lg:rounded-[20px] border border-[#E4E7EC] mb-5'>
      <div className='bg-primary h-[55px] lg:h-[80px] flex items-center px-2 lg:px-5 rounded-tl-[10px] rounded-tr-[10px] lg:rounded-tl-[20px] lg:rounded-tr-[20px]'>
        <h2 className='text-white text-xs lg:text-base font-clashmd'>PRODUCT DETAILS</h2>
      </div>
      <div className='px-2 lg:px-5 py-[38px] text-xs text-black lg:text-base'>
        <p>{dataDesc}</p>
      </div>
    </div>
  )
}
