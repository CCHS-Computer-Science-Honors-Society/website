import { Skeleton } from '@/components/ui/skeleton';
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
;

const FallbackLoader = () => {
  return (
    <div className="container mb-32">
      <div className="mb-12">
        <Skeleton className="h-8 w-72 mb-4" />
        <Skeleton className="h-4 w-48" />
      </div>
      <div className="border border-border rounded-2xl bg-white dark:bg-[#121212] p-8 md:p-10">
        <div className="flex flex-row justify-between pb-4">
          <div className="flex">
            <Skeleton className="h-6 w-24 mr-4" />
            <Skeleton className="h-6 w-32 hidden md:block" />
          </div>
          <Skeleton className="h-8 w-32" />
        </div>
        <div className="flex flex-col md:flex-row md:space-x-16">
          <div className="w-full flex flex-col gap-3">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div className='flex flex-col items-center h-screen justify-center'>
      <Suspense fallback={<FallbackLoader />}>
        <Upcoming />
      </Suspense>
    </div>
  )
}
