import { Plus, Lightbulb, CreditCard, ArrowRight } from 'lucide-react'

export function QuickActions() {
  const actions = [
    {
      icon: Plus,
      text: 'Start New Project',
      href: '/project',
    },
    {
      icon: Lightbulb,
      text: 'Browse Vault Ideas',
      href: '/idea-vault',
    },
    {
      icon: CreditCard,
      text: 'View Billing',
      href: '/billing',
    },
  ]

  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-medium text-white'>Quick Actions</h2>
      <div className='flex flex-col gap-2.5'>
        {actions.map((action) => {
          const Icon = action.icon

          return (
            <a
              key={action.text}
              href={action.href}
              className='group flex h-[63px] items-center justify-between rounded-[10px] bg-[#131313] px-[15px] transition hover:bg-[#1a1a1a]'
            >
              <div className='flex items-center gap-[14px]'>
                <Icon className='h-6 w-6 text-[#FF8C00]' strokeWidth={1.5} />
                <span className='text-lg font-medium text-white'>
                  {action.text}
                </span>
              </div>
              <ArrowRight
                className='h-6 w-6 text-white transition group-hover:translate-x-1'
                strokeWidth={1.5}
              />
            </a>
          )
        })}
      </div>
    </div>
  )
}
