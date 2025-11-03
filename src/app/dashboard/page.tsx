'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'
import { DollarSign, Users as UsersIcon, FolderKanban } from 'lucide-react'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    newUsers: 0,
    activeProjects: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/metrics')
        if (!response.ok) throw new Error('Failed to fetch metrics')
        const data = await response.json()
        setMetrics(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
      } finally {
        setLoading(false)
      }
    }
    fetchMetrics()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <PageHeader title='Overview' subtitle='Key metrics at a glance' />
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        <Card className='overflow-hidden'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Total Revenue
            </CardTitle>
            <DollarSign className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-semibold'>
              ${metrics.totalRevenue.toFixed(2)}
            </div>
            <p className='text-xs text-muted-foreground mt-1'>All-time</p>
          </CardContent>
        </Card>

        <Card className='overflow-hidden'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              New Users (Month)
            </CardTitle>
            <UsersIcon className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-semibold'>{metrics.newUsers}</div>
            <p className='text-xs text-muted-foreground mt-1'>Last 30 days</p>
          </CardContent>
        </Card>

        <Card className='overflow-hidden'>
          <CardHeader className='flex flex-row items-center justify-between pb-2'>
            <CardTitle className='text-sm font-medium text-muted-foreground'>
              Active Projects
            </CardTitle>
            <FolderKanban className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-3xl font-semibold'>
              {metrics.activeProjects}
            </div>
            <p className='text-xs text-muted-foreground mt-1'>
              Currently in progress
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
