import Upcoming from '@/components/upcoming'
import React, { Suspense } from 'react'

export default function Page() {
  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <Suspense fallback={"loading"}>
      <Upcoming />
      </Suspense>
    </div>
  )
}
