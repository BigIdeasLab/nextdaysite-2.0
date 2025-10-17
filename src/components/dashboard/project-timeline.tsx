'use client'

import { useTimelinePhases } from '@/hooks/use-timeline-phases'
import { Check } from 'lucide-react'

export function ProjectTimeline({ projectId }: { projectId: string }) {
  const { data: timelinePhases = [], isLoading } = useTimelinePhases(projectId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

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
            {phase.start_date && phase.end_date
              ? `${formatDate(phase.start_date)} – ${formatDate(phase.end_date)}`
              : 'TBD'}
          </span>
        </div>
      ))}
    </div>
  )
}
