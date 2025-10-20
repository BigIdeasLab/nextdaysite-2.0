'use client'

import { useMemo } from 'react'

import {
  useActivities,
  useFiles,
  useInvoices,
  useProjects,
  useUsers,
} from '@/hooks'
import { ActivityTimeline } from '@/components/dashboard/activity-timeline'
import { FileGallery } from '@/components/dashboard/file-gallery'
import { InvoiceSummary } from '@/components/dashboard/invoice-summary'
import { KpiGrid } from '@/components/dashboard/kpi-grid'
import { ProjectBoard } from '@/components/dashboard/project-board'
import { formatCurrency } from '@/lib/utils/format'

const ONE_WEEK_MS = 1000 * 60 * 60 * 24 * 7
const BYTES_PER_GB = 1024 ** 3

export function CustomerDashboard() {
  const { data: projects = [] } = useProjects()
  const { data: invoices = [] } = useInvoices()
  const { data: files = [] } = useFiles()
  const { data: activities = [] } = useActivities()
  const { data: users = [] } = useUsers()

  const metrics = useMemo(() => {
    const activeProjects = projects.filter(
      (project) => project.status !== 'completed',
    )
    const inReview = projects.filter((project) => project.status === 'review')
    const openInvoices = invoices.filter((invoice) => invoice.status === 'open')
    const openInvoiceTotal = openInvoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0,
    )
    const storageUsed = files.reduce((sum, file) => sum + file.size_bytes, 0)
    const storageUsedGb = storageUsed / BYTES_PER_GB

    const recentUpdates = activities.filter((activity) => {
      const createdAt = new Date(activity.created_at).getTime()
      return Date.now() - createdAt <= ONE_WEEK_MS
    }).length

    return [
      {
        label: 'Active projects',
        value: String(activeProjects.length),
        caption: `${projects.length} total in workspace`,
      },
      {
        label: 'Recent updates',
        value: String(recentUpdates),
        caption: 'In the last 7 days',
      },
      {
        label: 'In review',
        value: String(inReview.length),
        caption: inReview.length ? 'Awaiting approvals' : 'Everything on track',
      },
      {
        label: 'Open invoices',
        value: formatCurrency(openInvoiceTotal),
        caption: `${openInvoices.length} outstanding`,
      },
      {
        label: 'Storage usage',
        value: `${storageUsedGb < 0.1 ? (storageUsed / (1024 * 1024)).toFixed(1) + ' MB' : storageUsedGb.toFixed(2) + ' GB'}`,
        caption: `${files.length} shared files`,
      },
    ]
  }, [activities, files, invoices, projects])

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Project pulse
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Track active builds, review deliverables, and stay in sync with your
          launch team.
        </p>
      </header>
      <KpiGrid items={metrics} />
      <ProjectBoard projects={projects} users={users} />
      <div className='grid gap-6 lg:grid-cols-[2fr_1fr]'>
        <InvoiceSummary invoices={invoices} title='Billing overview' />
        <FileGallery files={files} users={users} />
      </div>
      <ActivityTimeline
        activities={activities}
        projects={projects}
        users={users}
      />
    </div>
  )
}
