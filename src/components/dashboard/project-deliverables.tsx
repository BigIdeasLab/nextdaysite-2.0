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
    <div className='deliverables-content'>
      {deliverables.map((deliverable) => (
        <div key={deliverable.id} className='deliverable-item'>
          <div className='deliverable-bar' />
          <div className='deliverable-card'>
            <h4 className='deliverable-title'>{deliverable.title}</h4>
            <p className='deliverable-description'>{deliverable.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
