'use client'

import { useState } from 'react'
import { useProjects } from '@/hooks'
import { Search, Filter, ChevronDown, MoreVertical } from 'lucide-react'
import Link from 'next/link'
import type { ProjectsRow } from '@/types/models'

type ProjectStatus =
  | 'start'
  | 'in_progress'
  | 'review'
  | 'ready_to_ship'
  | 'shipped'

const statusConfig: Record<
  ProjectStatus,
  { label: string; color: string; bgColor: string; barColor: string }
> = {
  start: {
    label: 'Active',
    color: '#FF8C00',
    bgColor: '#452600',
    barColor: '#FF8C00',
  },
  in_progress: {
    label: 'In Progress',
    color: '#FFE14A',
    bgColor: '#483C00',
    barColor: '#FFE14A',
  },
  review: {
    label: 'Completed',
    color: '#459538',
    bgColor: '#1D3219',
    barColor: '#459538',
  },
  ready_to_ship: {
    label: 'Ready to Ship',
    color: '#00C3FF',
    bgColor: '#00303F',
    barColor: '#00C3FF',
  },
  shipped: {
    label: 'Shipped',
    color: '#9D5CFF',
    bgColor: '#38225A',
    barColor: '#9D5CFF',
  },
}

export function ProjectsBoard() {
  const { data: projects = [], isLoading } = useProjects()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([])

  const projectsByStatus = projects.reduce(
    (acc, project) => {
      const status = project.status as ProjectStatus
      if (!acc[status]) acc[status] = []
      acc[status].push(project)
      return acc
    },
    {} as Record<ProjectStatus, ProjectsRow[]>,
  )

  const filteredStatuses: ProjectStatus[] =
    selectedStatuses.length > 0
      ? selectedStatuses
      : (Object.keys(statusConfig) as ProjectStatus[])

  if (isLoading) {
    return (
      <div className='flex min-h-[50vh] items-center justify-center text-lg text-[#9ba1a6]'>
        Loading...
      </div>
    )
  }

  return (
    <div className=' bg-black font-sans text-[#f7f6ff]'>
      {/* Breadcrumbs */}
      <div className='mb-8 text-lg font-light leading-[22px] text-[#9ba1a6]'>
        Homepage &gt; Project &gt; Kanban Board
      </div>

      {/* Header */}
      <div className='mb-8 flex items-start justify-between gap-4'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-3xl font-medium leading-[50px] text-[#f7f6ff]'>
            Project Board
          </h1>
          <p className='text-lg font-light leading-[22px] text-[#9ba1a6]'>
            Manage your projects with our Kanban board
          </p>
        </div>
        <button className='h-12 cursor-pointer rounded-full border-none bg-[#ff8c00] px-5 text-center text-base font-medium leading-5 text-[#f7f6ff] transition-opacity duration-200 hover:opacity-90'>
          New Project
        </button>
      </div>

      {/* Search and Filters */}
      <div className='mb-8 flex flex-col gap-5'>
        <div className='w-full flex items-center gap-2'>
          <div className='flex items-center gap-[5px] rounded-xl border border-[#131313] bg-[#131313] px-4 w-1/2'>
            <Search className='h-5 w-5 text-[#9ba1a6]' />
            <input
              type='text'
              placeholder='Search Anything'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='flex-1 border-none bg-transparent text-lg font-light leading-[50px] text-[#9ba1a6] outline-none placeholder:text-[#9ba1a6]'
            />
          </div>
          <button className='h-[53px] w-[53px] cursor-pointer items-center justify-center rounded-xl border border-[#131313] bg-[#131313] p-[15px_14px_14px_15px]'>
            <Filter className='h-6 w-6 text-[#9ba1a6]' />
          </button>
        </div>

        <div className='flex flex-wrap items-center gap-[10px]'>
          {(Object.keys(statusConfig) as ProjectStatus[]).map((status) => {
            const count = projectsByStatus[status]?.length || 0
            const config = statusConfig[status]
            return (
              <button
                key={status}
                className='flex cursor-pointer items-center justify-center gap-[10px] rounded-[40px] border border-[#3a3a3a] bg-transparent px-[15px] py-[13px] transition-colors duration-200 hover:bg-[rgba(58,58,58,0.3)]'
                onClick={() => {
                  setSelectedStatuses((prev) =>
                    prev.includes(status)
                      ? prev.filter((s) => s !== status)
                      : [...prev, status],
                  )
                }}
              >
                <div className='flex items-center gap-[10px]'>
                  <div className='relative flex h-[26px] w-[26px] items-center justify-center rounded-full bg-white'>
                    <span className='text-center text-[15px] font-normal leading-[22px] text-black'>
                      {count}
                    </span>
                  </div>
                  <span className='text-base font-normal leading-[22px] text-[#f7f6ff]'>
                    {config.label}
                  </span>
                </div>
                <ChevronDown className='h-5 w-5 text-white/50' />
              </button>
            )
          })}
        </div>
      </div>

      {/* Kanban Board */}
      <div className='rounded-t-[30px] bg-[#131313] p-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3'>
          {filteredStatuses.map((status) => {
            const config = statusConfig[status]
            const statusProjects = projectsByStatus[status] || []

            return (
              <div key={status} className='flex flex-col gap-5'>
                {/* Column Header */}
                <div className='relative'>
                  <div className='relative z-10 flex w-full items-center justify-center rounded-xl bg-[#202020] p-[15px]'>
                    <h3 className='text-lg font-medium leading-[22px] text-[#f7f6ff]'>
                      {config.label}
                    </h3>
                  </div>
                  <div
                    className='-mt-[10px] mx-auto h-4 w-[calc(100%-24px)] rounded-b-[10px]'
                    style={{ background: config.barColor }}
                  />
                </div>

                {/* Column Cards */}
                <div className='flex flex-col gap-[10px]'>
                  {statusProjects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/project/${project.id}`}
                      className='flex flex-col gap-[15px] rounded-xl bg-[#202020] px-3 py-[15px] no-underline transition-colors duration-200 hover:bg-[#252525]'
                    >
                      <div className='flex items-start justify-between'>
                        <div className='flex flex-col gap-[15px]'>
                          <h4 className='text-lg font-medium leading-[21px] text-[#f7f6ff]'>
                            {project.title}
                          </h4>
                          <p className='text-base font-light leading-[22px] text-[#9ba1a6]'>
                            Progress: {project.progress}%
                          </p>
                        </div>
                        <button className='h-[18px] w-[18px] cursor-pointer border-none bg-transparent p-0'>
                          <MoreVertical className='h-[18px] w-[18px] text-white' />
                        </button>
                      </div>

                      <div className='flex flex-col gap-[15px]'>
                        <div className='relative h-[10px]'>
                          <div className='absolute h-[10px] w-full rounded-full bg-[#2f2f2f]' />
                          <div
                            className='absolute h-[10px] rounded-full bg-white'
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>

                        <div
                          className='flex items-center justify-center rounded-[10px] px-2'
                          style={{ background: config.bgColor }}
                        >
                          <span
                            className='text-base font-normal leading-[40px]'
                            style={{ color: config.color }}
                          >
                            Status: {config.label}
                          </span>
                        </div>
                      </div>

                      <div className='border-t border-white/10 pt-[10px]'>
                        <p className='text-center text-[15px] font-normal leading-[22px] text-[#9ba1a6]'>
                          Updated:{' '}
                          {new Date(project.updated_at).toLocaleDateString(
                            'en-US',
                            {
                              month: '2-digit',
                              day: '2-digit',
                              year: 'numeric',
                            },
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
