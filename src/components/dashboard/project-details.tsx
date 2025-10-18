'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks'
import Link from 'next/link'
import { ProjectDetailsHeader } from './project-details-header'
import { ProjectDetailsMeta } from './project-details-meta'
import { ProjectDetailsTabs } from './project-details-tabs'
import { ProjectDetailsTabContent } from './project-details-tab-content'

type TabType = 'scope' | 'deliverables' | 'timeline'

const statusConfig = {
  start: { label: 'Active', color: '#FF8C00', bgColor: '#452600' },
  in_progress: { label: 'In Progress', color: '#FFE14A', bgColor: '#483C00' },
  review: { label: 'Completed', color: '#459538', bgColor: '#1D3219' },
  ready_to_ship: {
    label: 'Ready to Ship',
    color: '#00C3FF',
    bgColor: '#00303F',
  },
  shipped: { label: 'Shipped', color: '#9D5CFF', bgColor: '#38225A' },
}

export function ProjectDetails({ projectId }: { projectId: string }) {
  const { data: projects = [] } = useProjects()
  const project = projects.find((p) => p.id === projectId)
  const [activeTab, setActiveTab] = useState<TabType>('scope')

  if (!project) {
    return <div className='projects-loading'>Project not found</div>
  }

  const status = project.status as keyof typeof statusConfig
  const config = statusConfig[status] || statusConfig.start

  return (
    <div className='bg-black text-[#f7f6ff] p-6 font-sans h-screen overflow-y-auto'>
      {/* Breadcrumbs */}
      <div className='text-[#9ba1a6] text-lg font-light leading-[22px] mb-8'>
        <Link href='/dashboard'>Homepage</Link> &gt;{' '}
        <Link href='/dashboard/projects'>Project</Link> &gt; Kanban Board &gt;{' '}
        {project.title}
      </div>

      <ProjectDetailsHeader title={project.title} />

      <div className='flex items-center gap-3 mb-10'>
        <div
          className='flex py-[15px] px-[10px] justify-center items-center gap-[10px] rounded-[10px] text-base font-normal leading-[10px]'
          style={{ background: config.bgColor }}
        >
          <span style={{ color: config.color }}>Status: {config.label}</span>
        </div>
      </div>

      <ProjectDetailsMeta project={project} />

      <ProjectDetailsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ProjectDetailsTabContent activeTab={activeTab} project={project} />
    </div>
  )
}
