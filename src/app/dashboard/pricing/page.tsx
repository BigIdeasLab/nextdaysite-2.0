'use client'

import { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { PageHeader } from '@/components/ui/page-header'
import { Database } from '@/types/database'

type Plan = Database['public']['Tables']['plans']['Row']

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/plans')
        if (!response.ok) throw new Error('Failed to fetch plans')
        const data = await response.json()
        setPlans(data)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchPlans()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <PageHeader title='Pricing' subtitle='Plan configuration' />
      <div className='rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Monthly Price</TableHead>
              <TableHead>Summary</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className='font-mono text-xs'>{plan.id}</TableCell>
                <TableCell>{plan.name}</TableCell>
                <TableCell>${plan.monthly_price}</TableCell>
                <TableCell className='text-sm text-muted-foreground'>
                  {plan.summary}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
