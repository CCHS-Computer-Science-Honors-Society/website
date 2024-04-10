import { getServerAuthSession } from '@/server/auth';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Mew() {
  const session = await getServerAuthSession();
  if (!session?.user.isAdmin) {
    redirect(`/api/auth/signin`)
  }

  return (
    <div className='flex flex-col h-screen justify-center items-center text-5xl'>
      🤫🧏
    </div>
  )
} 
