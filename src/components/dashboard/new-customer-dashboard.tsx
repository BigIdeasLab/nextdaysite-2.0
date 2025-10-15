'use client'

import { useMemo } from 'react'
import { useProjects, useInvoices, useFiles } from '@/hooks'
import { DashboardHeader } from './dashboard-header'
import { NewKpiGrid } from './new-kpi-grid'
import { ProjectSearchSection } from './project-search-section'
import { ProjectCard } from './project-card'
import { QuickActions } from './quick-actions'
import { RecentActivities } from './recent-activities'

export function NewCustomerDashboard() {
  const { data: projects = [] } = useProjects()
  const { data: invoices = [] } = useInvoices()
  const { data: files = [] } = useFiles()

  const kpiMetrics = useMemo(() => {
    const activeProjects = projects.filter((p) => p.status !== 'shipped')
    const readyToReview = projects.filter((p) => p.status === 'review')
    const openInvoices = invoices.filter((i) => i.status === 'open')
    const storageUsed = files.reduce((sum, file) => sum + file.size_bytes, 0)
    const storageGB = (storageUsed / (1024 ** 3)).toFixed(2)

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

  return (
    <div className='flex flex-col gap-8'>
      <DashboardHeader />
      
      <NewKpiGrid items={kpiMetrics} />
      
      <div className='grid gap-8 lg:grid-cols-[1fr_449px]'>
        <div className='flex flex-col gap-4'>
          <ProjectSearchSection />
          
          <div className='flex flex-col gap-4'>
            <ProjectCard
              title='EcoShop Mobile App'
              status='Status: In Progress'
              progress={75}
              lastUpdated='Mon Oct 12 2025, 10:15am'
            />
            <ProjectCard
              title='NovaHealth Mobile App'
              status='Status: In Progress'
              progress={20}
              lastUpdated='Mon Oct 12 2025, 10:15am'
            />
            <ProjectCard
              title='EcoShop Mobile App'
              status='Status: Completed'
              progress={100}
              lastUpdated='Mon Oct 12 2025, 10:15am'
              statusColor='green'
            />
          </div>
        </div>
        
        <div className='flex flex-col gap-8'>
          <QuickActions />
          <RecentActivities />
        </div>
      </div>
    </div>
  )
}
