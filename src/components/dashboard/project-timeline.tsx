'use client'

import { Check } from 'lucide-react'

const timelinePhases = [
  {
    id: 1,
    title: 'Discovery & Research',
    dates: 'Oct 16 – Oct 17',
    status: 'completed',
  },
  {
    id: 2,
    title: 'UX Design & Wireframing',
    dates: 'Oct 17 – Oct 18',
    status: 'completed',
  },
  {
    id: 3,
    title: 'UI Design & Prototyping',
    dates: 'Oct 19 – Oct 20',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Development',
    dates: 'Oct 21 – Oct 22',
    status: 'in_progress',
  },
  {
    id: 5,
    title: 'Testing & Refinement',
    dates: 'Oct 23 – Oct 24',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Launch & Handoff',
    dates: 'Oct 24 – Oct 25',
    status: 'pending',
  },
]

export function ProjectTimeline() {
  return (
    <div className='flex flex-col gap-7'>
      {timelinePhases.map((phase) => (
        <div key={phase.id} className='flex justify-between items-center'>
          <div className='flex items-center gap-2.5'>
            {phase.status === 'completed' && (
              <div className='w-6 h-6 rounded-full flex items-center justify-center bg-[#ff8c00] border-none'>
                <Check className='w-4.5 h-4.5 text-white' />
              </div>
            )}
            {phase.status === 'in_progress' && (
              <div className='w-6 h-6 rounded-full flex items-center justify-center bg-black border-[1.5px] border-[#ff8c00] relative'>
                <div className='w-[10.5px] h-[10.5px] rounded-full bg-[#ff8c00]' />
              </div>
            )}
            {phase.status === 'pending' && (
              <div className='w-6 h-6 rounded-full flex items-center justify-center bg-black border-[1.5px] border-[#2d2d2d]' />
            )}
            <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
              {phase.title}
            </span>
          </div>
          <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
            {phase.dates}
          </span>
        </div>
      ))}
    </div>
  )
}
