/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client"
import React from 'react'
import SVG from "public/underconstruction.svg"
import Image from 'next/image'

export default function Page() {
  return (
    <div className='flex flex-col h-screen justify-center items-center'>
      <h1 className='text-5xl font-bold py-8'>
        Sorry This Page is Still Under Construction
      </h1>
      <Image src={SVG} alt="image" />


    </div>
  )
}
