type Activity = {
  description: string
  time: string
}

type RecentActivitiesProps = {
  activities?: Activity[]
}

const defaultActivities: Activity[] = [
  {
    description: 'Project "TechStart Landing Page" moved to In Progress',
    time: '2 hours ago',
  },
  {
    description: 'Project "E-Commerce Site Redesign" completed',
    time: '1 hour ago',
  },
  {
    description: 'Project "Mobile App UI Update" moved to Review',
    time: '30 minutes ago',
  },
  {
    description: 'Project "Blog Post 2023" assigned to Writer',
    time: '15 minutes ago',
  },
]

export function RecentActivities({ activities = defaultActivities }: RecentActivitiesProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-medium text-white'>Recent Activies</h2>
      <div className='flex flex-col gap-[15px] rounded-[15px] bg-[#131313] p-3'>
        {activities.map((activity, index) => (
          <div
            key={index}
            className='flex flex-col gap-[30px] rounded-xl bg-[#202020] p-[15px]'
          >
            <p className='text-lg font-medium leading-[22px] text-white'>
              {activity.description}
            </p>
            <p className='text-lg leading-[22px] text-[#9BA1A6]'>
              {activity.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
