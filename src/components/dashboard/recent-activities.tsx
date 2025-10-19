'use client'

import { useActivities } from '@/hooks/use-activities'
import type { ActivitiesRow } from '@/types/models'

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  let interval = seconds / 31536000
  if (interval > 1) {
    return Math.floor(interval) + ' years ago'
  }
  interval = seconds / 2592000
  if (interval > 1) {
    return Math.floor(interval) + ' months ago'
  }
  interval = seconds / 86400
  if (interval > 1) {
    return Math.floor(interval) + ' days ago'
  }
  interval = seconds / 3600
  if (interval > 1) {
    return Math.floor(interval) + ' hours ago'
  }
  interval = seconds / 60
  if (interval > 1) {
    return Math.floor(interval) + ' minutes ago'
  }
  return Math.floor(seconds) + ' seconds ago'
}

export function RecentActivities() {
  const { data: activities, isLoading } = useActivities()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-medium text-white'>Recent Activies</h2>
      <div className='flex flex-col gap-[15px] rounded-[15px] bg-[#131313] p-3'>
        {activities && activities.length > 0 ? (
          activities.map((activity: ActivitiesRow) => (
            <div
              key={activity.id}
              className='flex flex-col gap-[30px] rounded-xl bg-[#202020] p-[15px]'
            >
              <p className='text-lg font-medium leading-[22px] text-white'>
                {(activity.metadata as { message: string })?.message}
              </p>
              <p className='text-lg leading-[22px] text-[#9BA1A6]'>
                {formatTimeAgo(activity.created_at)}
              </p>
            </div>
          ))
        ) : (
          <p>No recent activities.</p>
        )}
      </div>
    </div>
  )
}
