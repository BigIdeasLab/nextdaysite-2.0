'use client'

import * as React from 'react'
import { DayPicker, DayPickerRangeProps, ClassNames } from 'react-day-picker'
import { cn } from '@/lib/utils'

export type CustomCalendarProps = DayPickerRangeProps & {
  className?: string
  classNames?: ClassNames
  showOutsideDays?: boolean
}

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CustomCalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('calendar-custom', className)}
      classNames={{
        months: 'flex flex-col',
        month: 'flex flex-col gap-6',
        caption: 'calendar-header',
        caption_label: 'calendar-month-label',
        nav: 'calendar-nav',
        button_previous: 'calendar-nav-button calendar-nav-prev',
        button_next: 'calendar-nav-button calendar-nav-next',
        month_grid: 'calendar-grid',
        weekdays: 'calendar-weekdays',
        weekday: 'calendar-weekday',
        week: 'calendar-week',
        day_button: cn('calendar-day'),
        day: 'calendar-date',
        selected: 'calendar-day-selected',
        today: 'calendar-day-today',
        outside: 'calendar-day-outside',
        disabled: 'calendar-day-disabled',
        range_middle: 'calendar-day-range-middle',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          const isLeft = orientation === 'left'
          return (
            <svg
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='calendar-chevron'
            >
              {isLeft ? (
                <path d='M10.1831 4.175L6.35811 8L10.1831 11.825L8.99977 13L3.99977 8L8.99977 3L10.1831 4.175Z' />
              ) : (
                <path d='M5 11.825L8.825 8L5 4.175L6.18333 3L11.1833 8L6.18333 13L5 11.825Z' />
              )}
            </svg>
          )
        },
      }}
      {...props}
    />
  )
}
CustomCalendar.displayName = 'CustomCalendar'

export { CustomCalendar }
