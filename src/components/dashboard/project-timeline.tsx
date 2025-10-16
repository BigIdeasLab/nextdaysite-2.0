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
    <div className='timeline-content'>
      {timelinePhases.map((phase) => (
        <div key={phase.id} className='timeline-item'>
          <div className='timeline-status'>
            {phase.status === 'completed' && (
              <div className='status-icon completed'>
                <Check className='check-icon' />
              </div>
            )}
            {phase.status === 'in_progress' && (
              <div className='status-icon in-progress'>
                <div className='status-dot' />
              </div>
            )}
            {phase.status === 'pending' && (
              <div className='status-icon pending' />
            )}
            <span className='timeline-title'>{phase.title}</span>
          </div>
          <span className='timeline-dates'>{phase.dates}</span>
        </div>
      ))}
    </div>
  )
}
