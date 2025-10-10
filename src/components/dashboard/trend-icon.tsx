'use client'

import { ArrowUp, ArrowDown } from 'lucide-react'

type TrendIconProps = {
  direction: 'up' | 'down'
}

export function TrendIcon({ direction }: TrendIconProps) {
  if (direction === 'up') {
    return <ArrowUp className='h-5 w-5 text-emerald-500' />
  }

  return <ArrowDown className='h-5 w-5 text-rose-500' />
}
