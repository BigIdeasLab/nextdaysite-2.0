'use client'

import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-4', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center mb-2',
        caption_label: 'text-base font-semibold text-gray-900',
        nav: 'space-x-1 flex items-center justify-between w-full px-1',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-8 w-8 bg-white p-0 border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400',
        ),
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex gap-1 justify-between mb-2',
        head_cell:
          'text-gray-500 rounded-md w-9 h-9 font-semibold text-xs flex items-center justify-center',
        row: 'flex w-full gap-1 justify-between',
        cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
        day: cn(
          'h-9 w-9 p-0 font-normal rounded-lg transition-colors',
          'hover:bg-gray-100 hover:text-gray-900',
          'aria-selected:opacity-100',
        ),
        day_selected:
          'bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-600 focus:text-white font-semibold',
        day_today: 'bg-blue-100 text-blue-900 font-semibold border border-blue-300',
        day_outside: 'text-gray-400 opacity-60',
        day_disabled: 'text-gray-300 opacity-50 cursor-not-allowed',
        day_range_middle:
          'aria-selected:bg-blue-50 aria-selected:text-blue-900 rounded-none',
        day_hidden: 'invisible',
        ...classNames,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
