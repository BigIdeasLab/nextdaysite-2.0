'use client'

import { useMemo } from 'react'
import { useProjects, useUsers, useFiles, useActivities } from '@/hooks'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'

import { KpiGrid } from '@/components/dashboard/kpi-grid'
import { FileGallery } from '@/components/dashboard/file-gallery'
import { ActivityTimeline } from '@/components/dashboard/activity-timeline'

export function ProjectDetail({ projectId }: { projectId: string }) {
  const { data: projects = [], isLoading: projectsLoading } = useProjects()
  const { data: users = [], isLoading: usersLoading } = useUsers()
  const { data: files = [], isLoading: filesLoading } = useFiles()
  const { data: activities = [], isLoading: activitiesLoading } =
    useActivities()

  const project = useMemo(
    () => projects.find((p) => p.id === projectId),
    [projects, projectId],
  )

  const projectFiles = useMemo(
    () => files.filter((f) => f.project_id === projectId),
    [files, projectId],
  )

  const projectActivities = useMemo(
    () => activities.filter((a) => a.project_id === projectId),
    [activities, projectId],
  )

  const owner = useMemo(
    () => users.find((u) => u.id === project?.owner_id),
    [users, project],
  )

  const metrics = useMemo(() => {
    if (!project) return []
    return [
      {
        label: 'Status',
        value: project.status,
      },
      {
        label: 'Start Date',
        value: project.start_date
          ? format(new Date(project.start_date), 'MMM d, yyyy')
          : '-',
      },
      {
        label: 'Due Date',
        value: project.due_date
          ? format(new Date(project.due_date), 'MMM d, yyyy')
          : '-',
      },
      {
        label: 'Progress',
        value: `${project.progress}%`,
      },
    ]
  }, [project])

  if (projectsLoading || usersLoading || filesLoading || activitiesLoading) {
    return <div>Loading...</div>
  }

  if (!project) {
    notFound()
  }

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          {project.title}
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Owned by {owner?.full_name ?? owner?.email}
        </p>
      </header>
      <KpiGrid items={metrics} />
      <div className='grid gap-6 lg:grid-cols-[2fr_1fr]'>
        <div className='flex flex-col gap-6'>
          <h2 className='text-lg font-semibold'>Project Brief</h2>
          <p className='text-sm text-foreground/80'>{project.summary}</p>
        </div>
        <FileGallery files={projectFiles} users={users} />
      </div>
      <ActivityTimeline
        activities={projectActivities}
        projects={projects}
        users={users}
      />
    </div>
  )
}
