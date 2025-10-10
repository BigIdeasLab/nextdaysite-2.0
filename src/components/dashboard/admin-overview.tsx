'use client'

import { useMemo } from 'react'

import {
  useActivities,
  useInvoices,
  usePlans,
  useProjects,
  useUsers,
} from '@/hooks'
import { ActivityTimeline } from '@/components/dashboard/activity-timeline'
import { KpiGrid } from '@/components/dashboard/kpi-grid'
import { PipelineChart } from '@/components/dashboard/analytics/pipeline-chart'
import { PlanDistributionChart } from '@/components/dashboard/analytics/plan-distribution-chart'
import { RevenueTrendChart } from '@/components/dashboard/analytics/revenue-trend-chart'
import { formatCurrency } from '@/lib/utils/format'

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const DAYS_IN_MS = 1000 * 60 * 60 * 24

export function AdminOverview() {
  const { data: projects = [] } = useProjects()
  const { data: invoices = [] } = useInvoices()
  const { data: users = [] } = useUsers()
  const { data: plans = [] } = usePlans()
  const { data: activities = [] } = useActivities()

  const metrics = useMemo(() => {
    const paidInvoices = invoices.filter((invoice) => invoice.status === 'paid')
    const revenueTotal = paidInvoices.reduce(
      (sum, invoice) => sum + invoice.total,
      0,
    )

    const last30Days = Date.now() - DAYS_IN_MS * 30
    const revenueLast30Days = paidInvoices
      .filter((invoice) => new Date(invoice.issued_at).getTime() >= last30Days)
      .reduce((sum, invoice) => sum + invoice.total, 0)

    const customers = users.filter((user) => user.role === 'customer')
    const currentActiveCustomers = new Set(
      projects.map((project) => project.owner_id),
    ).size

    const cycleDurations = projects
      .filter((project) => project.start_date && project.due_date)
      .map((project) => {
        const start = new Date(project.start_date!).getTime()
        const due = new Date(project.due_date!).getTime()
        return Math.max((due - start) / DAYS_IN_MS, 0)
      })
    const averageCycle = cycleDurations.length
      ? Math.round(
          cycleDurations.reduce((sum, days) => sum + days, 0) /
            cycleDurations.length,
        )
      : 0

    return [
      {
        label: 'Total revenue',
        value: formatCurrency(revenueTotal),
        caption: 'All time paid invoices',
        trend:
          revenueLast30Days > 0
            ? {
                direction: 'up' as const,
                label: `${formatCurrency(revenueLast30Days)} in last 30 days`,
              }
            : undefined,
      },
      {
        label: 'Active customers',
        value: String(currentActiveCustomers),
        caption: `${customers.length} total customers`,
      },
      {
        label: 'Pipeline load',
        value: String(projects.length),
        caption: `${projects.filter((project) => project.status !== 'shipped').length} in production`,
      },
      {
        label: 'Average cycle',
        value: averageCycle ? `${averageCycle} days` : '—',
        caption: 'Start to ready-to-ship',
      },
    ]
  }, [invoices, projects, users])

  const revenueChartData = useMemo(() => {
    const map = new Map<string, { revenue: number; forecast: number }>()

    invoices.forEach((invoice) => {
      const date = new Date(invoice.issued_at)
      const key = `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear().toString().slice(-2)}`
      if (!map.has(key)) {
        map.set(key, { revenue: 0, forecast: 0 })
      }
      const bucket = map.get(key)!
      if (invoice.status === 'paid') {
        bucket.revenue += invoice.total
      } else if (invoice.status === 'open' || invoice.status === 'draft') {
        bucket.forecast += invoice.total
      }
    })

    const months: string[] = []
    const reference = new Date()
    for (let i = 5; i >= 0; i -= 1) {
      const seed = new Date(
        reference.getFullYear(),
        reference.getMonth() - i,
        1,
      )
      months.push(
        `${MONTH_LABELS[seed.getMonth()]} ${seed.getFullYear().toString().slice(-2)}`,
      )
    }

    return months.map((month) => ({
      month,
      revenue: map.get(month)?.revenue ?? 0,
      forecast: map.get(month)?.forecast ?? 0,
    }))
  }, [invoices])

  const planDistribution = useMemo(() => {
    const counts = new Map<string, number>()
    users
      .filter((user) => user.role === 'customer' && user.plan_id)
      .forEach((user) => {
        counts.set(user.plan_id!, (counts.get(user.plan_id!) ?? 0) + 1)
      })

    return plans
      .map((plan) => ({ name: plan.name, value: counts.get(plan.id) ?? 0 }))
      .filter((slice) => slice.value > 0)
  }, [plans, users])

  const pipelineData = useMemo(() => {
    const counts = projects.reduce<Record<string, number>>((acc, project) => {
      acc[project.status] = (acc[project.status] ?? 0) + 1
      return acc
    }, {})

    return Object.entries(counts).map(([status, count]) => ({ status, count }))
  }, [projects])

  const topCustomers = useMemo(() => {
    const revenueByCustomer = invoices.reduce<Record<string, number>>(
      (acc, invoice) => {
        if (invoice.status !== 'paid') {
          return acc
        }
        acc[invoice.user_id] = (acc[invoice.user_id] ?? 0) + invoice.total
        return acc
      },
      {},
    )

    return Object.entries(revenueByCustomer)
      .map(([userId, total]) => ({
        userId,
        total,
        projects: projects.filter((project) => project.owner_id === userId)
          .length,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
  }, [invoices, projects])

  return (
    <div className='flex flex-col gap-10'>
      <header className='flex flex-col gap-2'>
        <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
          Operations overview
        </h1>
        <p className='text-sm text-foreground/70 sm:text-base'>
          Monitor revenue performance, pipeline health, and customer impact in
          real time.
        </p>
      </header>
      <KpiGrid items={metrics} />
      <div className='grid gap-6 xl:grid-cols-[2fr_1fr]'>
        <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-foreground'>
              Revenue trend
            </h2>
            <span className='text-xs text-foreground/50'>6-month view</span>
          </div>
          <div className='mt-4 h-[280px]'>
            <RevenueTrendChart data={revenueChartData} />
          </div>
        </section>
        <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-foreground'>
              Plan distribution
            </h2>
            <span className='text-xs text-foreground/50'>Active customers</span>
          </div>
          <div className='mt-4 h-[280px]'>
            <PlanDistributionChart data={planDistribution} />
          </div>
        </section>
      </div>
      <div className='grid gap-6 lg:grid-cols-[3fr_2fr]'>
        <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-foreground'>
              Project pipeline
            </h2>
            <span className='text-xs text-foreground/50'>Current workload</span>
          </div>
          <div className='mt-4 h-[240px]'>
            <PipelineChart data={pipelineData} />
          </div>
        </section>
        <section className='rounded-2xl border border-foreground/10 bg-background p-6 shadow-sm shadow-foreground/5'>
          <div className='flex items-center justify-between'>
            <h2 className='text-lg font-semibold text-foreground'>
              Top customers
            </h2>
            <span className='text-xs text-foreground/50'>By paid revenue</span>
          </div>
          <ul className='mt-4 space-y-3'>
            {topCustomers.map((record) => {
              const customer = users.find((user) => user.id === record.userId)
              return (
                <li
                  key={record.userId}
                  className='flex items-center justify-between rounded-xl bg-foreground/5 p-3 text-sm'
                >
                  <div className='flex flex-col'>
                    <span className='font-semibold text-foreground'>
                      {customer?.full_name ?? customer?.email ?? 'Unknown'}
                    </span>
                    <span className='text-xs text-foreground/60'>
                      {record.projects} active projects
                    </span>
                  </div>
                  <span className='text-sm font-semibold text-foreground'>
                    {formatCurrency(record.total)}
                  </span>
                </li>
              )
            })}
            {topCustomers.length === 0 ? (
              <li className='rounded-xl border border-dashed border-foreground/10 p-4 text-xs text-foreground/50'>
                No paid invoices yet.
              </li>
            ) : null}
          </ul>
        </section>
      </div>
      <ActivityTimeline
        activities={activities}
        projects={projects}
        users={users}
        title='Latest operations'
      />
    </div>
  )
}
