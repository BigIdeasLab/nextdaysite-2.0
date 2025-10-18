'use client'

import { Calendar, DollarSign, User } from 'lucide-react'
import type { ProjectsRow } from '@/types/models'

export function ProjectDetailsMeta({ project }: { project: ProjectsRow }) {
  return (
    <div className='w-[484px] flex flex-col gap-[15px] mb-[50px]'>
      <div className='flex items-start gap-2'>
        <Calendar className='w-6 h-6 text-[#9ba1a6]' />
        <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
          Start Date
        </span>
        <span className='text-[#f7f6ff] text-base font-light leading-[22px] ml-auto'>
          {project.start_date
            ? new Date(project.start_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '-'}
        </span>
      </div>

      <div className='flex items-center gap-2'>
        <Calendar className='w-6 h-6 text-[#9ba1a6]' />
        <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
          ETA
        </span>
        <span className='text-[#f7f6ff] text-base font-light leading-[22px] ml-auto'>
          {project.due_date
            ? new Date(project.due_date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '-'}
        </span>
      </div>

      <div className='flex items-center gap-2'>
        <DollarSign className='w-6 h-6 text-[#9ba1a6]' />
        <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
          Subscription Plan:
        </span>
        <span className='text-[#f7f6ff] text-base font-light leading-[22px] ml-auto'>
          Pro Plan (Monthly)
        </span>
      </div>

      <div className='flex items-center gap-2'>
        <div className='w-6 h-6' />
        <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
          Progress
        </span>
        <div className='flex items-center gap-2 ml-auto'>
          <div className='w-[189px] h-[10px] relative'>
            <div className='w-full h-[10px] rounded-[30px] bg-[#2f2f2f] absolute' />
            <div
              className='h-[10px] rounded-[30px] bg-white absolute'
              style={{ width: `${project.progress}%` }}
            />
          </div>
          <span className='text-[#f7f6ff] text-base font-light leading-[22px] ml-auto'>
            {project.progress}%
          </span>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <User className='w-6 h-6 text-[#9ba1a6]' />
        <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
          Assigned Developer
        </span>
        <span className='text-[#f7f6ff] text-base font-light leading-[22px] ml-auto'>
          Chris.N
        </span>
      </div>
    </div>
  )
}
