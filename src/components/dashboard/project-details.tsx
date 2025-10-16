'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks'
import {
  Calendar,
  DollarSign,
  User,
  PenLine,
  Paperclip,
  MessageSquare,
  Share2,
} from 'lucide-react'
import Link from 'next/link'
import { ProjectDeliverables } from './project-deliverables'
import { ProjectTimeline } from './project-timeline'

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
    <div className='min-h-screen bg-black text-[#f7f6ff] p-6 font-sans'>
      {/* Breadcrumbs */}
      <div className='text-[#9ba1a6] text-lg font-light leading-[22px] mb-8'>
        <Link href='/dashboard'>Homepage</Link> &gt;{' '}
        <Link href='/dashboard/projects'>Project</Link> &gt; Kanban Board &gt;{' '}
        {project.title}
      </div>

      {/* Header */}
      <div className='flex justify-between items-center mb-3 gap-4'>
        <h1 className='text-[#f7f6ff] text-3xl font-medium leading-[50px]'>
          {project.title}
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

      <div className='flex items-center gap-3 mb-10'>
        <div
          className='flex py-[15px] px-[10px] justify-center items-center gap-[10px] rounded-[10px] text-base font-normal leading-[10px]'
          style={{ background: config.bgColor }}
        >
          <span style={{ color: config.color }}>Status: {config.label}</span>
        </div>
      </div>

      {/* Project Meta */}
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

      {/* Tabs */}
      <div className='mb-10'>
        <div className='flex items-center gap-10 mb-0'>
          <button
            className={`text-[#9ba1a6] text-base font-normal leading-[22px] bg-transparent border-none cursor-pointer pb-6 transition-colors duration-200 ${activeTab === 'scope' ? 'text-white font-medium' : ''}`}
            onClick={() => setActiveTab('scope')}
          >
            Scope
          </button>
          <button
            className={`text-[#9ba1a6] text-base font-normal leading-[22px] bg-transparent border-none cursor-pointer pb-6 transition-colors duration-200 ${activeTab === 'deliverables' ? 'text-white font-medium' : ''}`}
            onClick={() => setActiveTab('deliverables')}
          >
            Deliverables
          </button>
          <button
            className={`text-[#9ba1a6] text-base font-normal leading-[22px] bg-transparent border-none cursor-pointer pb-6 transition-colors duration-200 ${activeTab === 'timeline' ? 'text-white font-medium' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            Timeline
          </button>
        </div>
        <div className='w-full h-px bg-white/20 relative'>
          <div
            className='w-[59px] h-0.5 bg-[#ff8c00] absolute top-0 transition-left duration-300 ease'
            style={{
              left:
                activeTab === 'scope'
                  ? '0%'
                  : activeTab === 'deliverables'
                    ? '9.33%'
                    : '19%',
            }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className='pt-8'>
        {activeTab === 'scope' && (
          <div className='flex flex-col gap-[50px]'>
            <div className='flex flex-col gap-[30px]'>
              <h3 className='text-[#9ba1a6] text-lg font-medium leading-[22px]'>
                Description
              </h3>
              <p className='text-[#f7f6ff] text-base font-light leading-7'>
                {project.summary ||
                  'The EcoShop Mobile App project aims to create a user-friendly platform connecting consumers with sustainable products. Key features include a curated marketplace, eco-friendly product discovery, secure payment integration, and a carbon footprint tracker. The project will prioritize a seamless user experience, promote environmental awareness, and support ethical consumerism.'}
              </p>
            </div>

            <div className='flex flex-col gap-[30px]'>
              <h3 className='text-[#9ba1a6] text-lg font-medium leading-[22px]'>
                Technical Scope
              </h3>
              <div className='flex flex-col gap-[25px]'>
                <div className='flex justify-between items-center'>
                  <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                    Framework:
                  </span>
                  <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                    Next.js + Tailwind CSS
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                    CMS
                  </span>
                  <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                    Strapi (headless integration)
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                    Hosting
                  </span>
                  <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                    Vercel
                  </span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                    Analytics:
                  </span>
                  <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                    Google Analytics 4 + Heatmap tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deliverables' && <ProjectDeliverables />}
        {activeTab === 'timeline' && <ProjectTimeline />}
      </div>
    </div>
  )
}
