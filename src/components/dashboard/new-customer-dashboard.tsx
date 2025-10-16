'use client'

import { useMemo, useState, useEffect } from 'react'
import { useProjects, useInvoices, useFiles, useActivities } from '@/hooks'
import { DashboardHeader } from './dashboard-header'
import { NewKpiGrid } from './new-kpi-grid'
import { ProjectSearchSection } from './project-search-section'
import { ProjectCard } from './project-card'
import { QuickActions } from './quick-actions'
import { RecentActivities } from './recent-activities'
import { formatDate } from '@/lib/utils/format'
import type { ProjectDetails } from '@/hooks/use-simulated-onboarding-chat'

const statusLabels: Record<string, string> = {
  start: 'Status: Kickoff',
  in_progress: 'Status: In Progress',
  review: 'Status: In Review',
  ready_to_ship: 'Status: Ready to Ship',
  shipped: 'Status: Completed',
}

export function NewCustomerDashboard() {
  const { data: projects = [] } = useProjects()
  const { data: invoices = [] } = useInvoices()
  const { data: files = [] } = useFiles()
  const { data: activities = [] } = useActivities()
  const [onboardingDetails, setOnboardingDetails] =
    useState<ProjectDetails | null>(null)

  useEffect(() => {
    const storedDetails = localStorage.getItem('onboardingProjectDetails')
    if (storedDetails) {
      try {
        const details = JSON.parse(storedDetails)
        setOnboardingDetails(details)
        localStorage.removeItem('onboardingProjectDetails')
      } catch (error) {
        console.error('Failed to parse onboarding details:', error)
        localStorage.removeItem('onboardingProjectDetails') // Clean up corrupted data
      }
    }
  }, [])

  const kpiMetrics = useMemo(() => {
    const activeProjects = projects.filter((p) => p.status !== 'shipped')
    const readyToReview = projects.filter((p) => p.status === 'review')
    const openInvoices = invoices.filter((i) => i.status === 'open')
    const storageUsed = files.reduce((sum, file) => sum + file.size_bytes, 0)
    const storageGB = (storageUsed / 1024 ** 3).toFixed(2)

    return [
      {
        label: 'Active Project',
        value: String(activeProjects.length),
        icon: 'folder' as const,
      },
      {
        label: 'Ready to Review',
        value: String(readyToReview.length),
        icon: 'message' as const,
      },
      {
        label: 'Invoices Due',
        value: String(openInvoices.length),
        icon: 'invoice' as const,
      },
      {
        label: 'Storage Used',
        value: `${storageGB}GB`,
        icon: 'storage' as const,
      },
    ]
  }, [projects, invoices, files])

  const recentActivitiesData = useMemo(() => {
    return activities.slice(0, 4).map((activity) => {
      const project = projects.find((p) => p.id === activity.project_id)
      const createdAt = new Date(activity.created_at)
      const now = new Date()
      const diffMs = now.getTime() - createdAt.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffMinutes = Math.floor(diffMs / (1000 * 60))

      let timeAgo = ''
      if (diffHours >= 1) {
        timeAgo = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
      } else if (diffMinutes >= 1) {
        timeAgo = `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
      } else {
        timeAgo = 'Just now'
      }

      return {
        description: project
          ? `Project "${project.title}" - ${activity.event_type.replace('_', ' ')}`
          : activity.event_type,
        time: timeAgo,
      }
    })
  }, [activities, projects])

  return (
    <div className='flex flex-col gap-8'>
      {onboardingDetails && (
        <div className='mb-8 rounded-lg border border-green-500 bg-gray-800 p-6 text-white shadow-lg'>
          <h2 className='mb-2 text-2xl font-bold'>Welcome to NextDaySite!</h2>
          <p className='mb-4 text-lg'>
            Let&apos;s get started on your new project. Here are the details you
            provided:
          </p>
          <ul className='mb-6 list-inside list-disc space-y-2'>
            {onboardingDetails.projectType && (
              <li>
                <strong>Project Type:</strong> {onboardingDetails.projectType}
              </li>
            )}
            {onboardingDetails.pageCount && (
              <li>
                <strong>Number of Pages:</strong> {onboardingDetails.pageCount}
              </li>
            )}
            {onboardingDetails.branding && (
              <li>
                <strong>Branding Needs:</strong> {onboardingDetails.branding}
              </li>
            )}
          </ul>
          <div className='flex gap-4'>
            <button className='rounded-lg bg-green-600 px-4 py-2 font-bold text-white transition-colors hover:bg-green-700'>
              Confirm and Start Project
            </button>
            <button
              onClick={() => setOnboardingDetails(null)}
              className='rounded-lg bg-gray-600 px-4 py-2 font-bold text-white transition-colors hover:bg-gray-700'
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      <DashboardHeader />

      <NewKpiGrid items={kpiMetrics} />

      <div className='grid gap-8 lg:grid-cols-[1fr_449px]'>
        <div className='flex flex-col gap-4'>
          <ProjectSearchSection />

          <div className='flex flex-col gap-4'>
            {projects.slice(0, 3).map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                status={statusLabels[project.status] || 'Status: Unknown'}
                progress={project.progress}
                lastUpdated={formatDate(project.updated_at, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
                statusColor={project.status === 'shipped' ? 'green' : 'orange'}
              />
            ))}
          </div>
        </div>

        <div className='flex flex-col gap-8'>
          <QuickActions />
          <RecentActivities activities={recentActivitiesData} />
        </div>
      </div>
    </div>
  )
}
