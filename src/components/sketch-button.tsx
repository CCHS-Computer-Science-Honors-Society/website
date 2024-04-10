
import React from 'react'

export default function SkButton({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <button className="px-4 h-[50px] py-2 rounded-md border border-black bg-white text-neutarl-700 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
      {children}
    </button>
  )
}
