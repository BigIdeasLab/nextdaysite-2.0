'use client'

import { PenLine, Paperclip, MessageSquare, Share2 } from 'lucide-react'

export function ProjectDetailsHeader({ title }: { title: string }) {
  return (
    <div className='flex justify-between items-center mb-3 gap-4'>
      <h1 className='text-[#f7f6ff] text-3xl font-medium leading-[50px]'>
        {title}
      </h1>
      <div className='flex items-center gap-5'>
        <button className='w-[26px] h-[26px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center'>
          <PenLine className='w-[26px] h-[26px] text-white' />
        </button>
        <button className='w-[26px] h-[26px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center'>
          <Paperclip className='w-[26px] h-[26px] text-white' />
        </button>
        <button className='w-[26px] h-[26px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center'>
          <MessageSquare className='w-[26px] h-[26px] text-white' />
        </button>
        <button className='w-[26px] h-[26px] bg-transparent border-none cursor-pointer p-0 flex items-center justify-center'>
          <Share2 className='w-[26px] h-[26px] text-white' />
        </button>
      </div>
    </div>
  )
}
