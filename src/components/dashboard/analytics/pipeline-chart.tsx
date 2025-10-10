'use client'

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const STATUS_LABELS: Record<string, string> = {
  start: 'Start',
  in_progress: 'In progress',
  review: 'Review',
  ready_to_ship: 'Ready',
  shipped: 'Shipped',
}

type PipelinePoint = {
  status: string
  count: number
}

type PipelineChartProps = {
  data: PipelinePoint[]
}

function PipelineTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: any[]
}) {
  if (!active || !payload?.length) {
    return null
  }

  const [entry] = payload
  const label = STATUS_LABELS[entry.payload.status] ?? entry.payload.status

  return (
    <div className='rounded-xl border border-foreground/10 bg-background/95 p-3 text-xs shadow-lg shadow-foreground/10'>
      <p className='font-semibold text-foreground'>{label}</p>
      <p className='text-foreground/70'>{entry.value} projects</p>
    </div>
  )
}

export function PipelineChart({ data }: PipelineChartProps) {
  return (
    <ResponsiveContainer width='100%' height={240}>
      <BarChart data={data} margin={{ top: 16, right: 16, left: 0, bottom: 8 }}>
        <CartesianGrid stroke='rgba(148, 163, 184, 0.15)' vertical={false} />
        <XAxis
          dataKey='status'
          tickFormatter={(value) => STATUS_LABELS[value] ?? value}
          stroke='rgba(148, 163, 184, 0.7)'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          allowDecimals={false}
          stroke='rgba(148, 163, 184, 0.7)'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          content={<PipelineTooltip />}
          cursor={{ fill: 'rgba(148, 163, 184, 0.08)' }}
        />
        <Bar dataKey='count' radius={[12, 12, 0, 0]} fill='var(--foreground)' />
      </BarChart>
    </ResponsiveContainer>
  )
}
