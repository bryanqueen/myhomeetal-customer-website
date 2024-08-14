import { HomeSkeleton } from '@/app/components/loader'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='px-[3%] pt-[60px] lg:pt-0'>
      <HomeSkeleton />
    </div>
  )
}
