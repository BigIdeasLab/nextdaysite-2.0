'use client'

const deliverables = [
  {
    id: 1,
    title: '1. Onboarding Screens',
    description:
      'A smooth, animated user introduction flow that highlights key app features and guides new users through account setup.',
  },
  {
    id: 2,
    title: '2. Home Dashboard',
    description:
      'Central hub with quick access to main features, notifications, and user stats designed for clarity and efficiency.',
  },
  {
    id: 3,
    title: '3. Services Module',
    description:
      'Dedicated section showcasing available features or services with clear categorization, icons, and intuitive navigation.',
  },
  {
    id: 4,
    title: '4. Pricing & Subscription Page',
    description:
      'Interactive pricing tiers with integrated checkout and subscription management for monthly or yearly plans.',
  },
  {
    id: 5,
    title: '5. Profile & Settings',
    description:
      'Personalized profile management allowing users to update details, adjust preferences, and manage app themes.',
  },
  {
    id: 6,
    title: '6. Notifications System',
    description:
      'Push and in-app notification framework to keep users informed about updates, offers, and project milestones.',
  },
  {
    id: 7,
    title: '7. Admin Console (Mobile)',
    description:
      'A simple contact form and support information for customer inquiries, including live chat options for immediate assistance.',
  },
]

export function ProjectDeliverables() {
  return (
    <div className='flex flex-col gap-3'>
      {deliverables.map((deliverable) => (
        <div key={deliverable.id} className='flex items-center -gap-2.5'>
          <div className='w-4 h-[91px] rounded-r-lg bg-[#ff8c00] flex-shrink-0' />
          <div className='flex-1 flex flex-col items-start gap-6 p-4 rounded-xl bg-[#131313] -ml-2.5'>
            <h4 className='text-[#f7f6ff] text-lg font-medium leading-[22px]'>
              {deliverable.title}
            </h4>
            <p className='text-[#9ba1a6] text-base font-light leading-[22px]'>
              {deliverable.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
