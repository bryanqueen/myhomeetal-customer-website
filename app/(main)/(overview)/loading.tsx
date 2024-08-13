import { HomeSkeleton } from '@/app/components/loader'
import React from 'react'

export default function LoadingPage() {
  return (
    <div className='px-[3%]'>
      <HomeSkeleton />
    </div>
  )
}
