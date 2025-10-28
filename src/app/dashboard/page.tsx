'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

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
        if (!response.ok) {
          throw new Error('Failed to fetch metrics')
        }
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

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-8'>Dashboard</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-bold'>
              ${metrics.totalRevenue.toFixed(2)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Users (Month)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-bold'>{metrics.newUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <p className='text-4xl font-bold'>{metrics.activeProjects}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
