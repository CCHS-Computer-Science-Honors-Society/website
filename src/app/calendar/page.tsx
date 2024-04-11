import Upcoming from '@/components/upcoming'
import { type Metadata } from 'next'
import React, { Suspense } from 'react'

export async function generateMetadata(
): Promise<Metadata> {
 
 
  return {
    title: "Calendar | Cherry Creek Computer Science Honor Society",
    description: "Upcoming events and meetings for the Cherry Creek Computer Science Honor Society.",
  }
}

export default function Page() {
  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <Suspense fallback={"loading"}>
      <Upcoming />
      </Suspense>
    </div>
  )
}
