'use client'

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

type PlanSlice = {
  name: string
  value: number
}

type PlanDistributionChartProps = {
  data: PlanSlice[]
}

const COLORS = [
  'rgb(59 130 246)',
  'rgb(251 191 36)',
  'rgb(16 185 129)',
  'rgb(244 114 182)',
  'rgb(99 102 241)',
]

export function PlanDistributionChart({ data }: PlanDistributionChartProps) {
  const total = data.reduce((sum, slice) => sum + slice.value, 0)

  function PlanTooltip({
    active,
    payload,
  }: {
    active?: boolean
    payload?: PlanSlice[]
  }) {
    if (!active || !payload?.length) {
      return null
    }

    const [entry] = payload

    return (
      <div className='rounded-xl border border-foreground/10 bg-background/95 p-3 text-xs shadow-lg shadow-foreground/10'>
        <p className='font-semibold text-foreground'>{entry.name}</p>
        <p className='text-foreground/70'>{entry.value} customers</p>
      </div>
    )
  }

  return (
    <ResponsiveContainer width='100%' height={280}>
      <PieChart>
        <Pie
          data={data}
          dataKey='value'
          nameKey='name'
          innerRadius={70}
          outerRadius={120}
          paddingAngle={4}
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={(props) => <PlanTooltip {...props} />} />
        {total > 0 ? (
          <text
            x='50%'
            y='50%'
            textAnchor='middle'
            dominantBaseline='middle'
            fill='var(--foreground)'
            fontSize={14}
          >
            {total} total
          </text>
        ) : null}
      </PieChart>
    </ResponsiveContainer>
  )
}
