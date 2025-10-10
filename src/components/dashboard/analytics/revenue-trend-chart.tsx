'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { formatCurrency } from '@/lib/utils/format'

type RevenuePoint = {
  month: string
  revenue: number
  forecast?: number
}

type RevenueTrendChartProps = {
  data: RevenuePoint[]
}

function RevenueTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: any[]
}) {
  if (!active || !payload?.length) {
    return null
  }

  const revenueEntry = payload.find((entry) => entry.dataKey === 'revenue')
  const forecastEntry = payload.find((entry) => entry.dataKey === 'forecast')
  const label = revenueEntry?.payload?.month ?? ''

  return (
    <div className='rounded-xl border border-foreground/10 bg-background/95 p-3 text-xs shadow-lg shadow-foreground/10'>
      <p className='font-semibold text-foreground'>{label}</p>
      {revenueEntry ? (
        <p className='text-foreground/70'>
          Revenue: {formatCurrency(revenueEntry.value)}
        </p>
      ) : null}
      {forecastEntry ? (
        <p className='text-foreground/60'>
          Forecast: {formatCurrency(forecastEntry.value)}
        </p>
      ) : null}
    </div>
  )
}

export function RevenueTrendChart({ data }: RevenueTrendChartProps) {
  return (
    <ResponsiveContainer width='100%' height={280}>
      <LineChart
        data={data}
        margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
      >
        <CartesianGrid
          stroke='rgba(148, 163, 184, 0.15)'
          strokeDasharray='3 3'
        />
        <XAxis
          dataKey='month'
          stroke='rgba(148, 163, 184, 0.7)'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='rgba(148, 163, 184, 0.7)'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) =>
            formatCurrency(Number(value)).replace(/\.00$/, '')
          }
        />
        <Tooltip
          content={<RevenueTooltip />}
          cursor={{ stroke: 'rgba(148, 163, 184, 0.2)', strokeWidth: 1 }}
        />
        <Line
          type='monotone'
          dataKey='revenue'
          stroke='var(--foreground)'
          strokeWidth={2}
          dot={false}
        />
        <Line
          type='monotone'
          dataKey='forecast'
          stroke='rgba(148, 163, 184, 0.8)'
          strokeWidth={2}
          strokeDasharray='5 5'
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
