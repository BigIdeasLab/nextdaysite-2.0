'use client'

import { useDeliverables } from '@/hooks/use-deliverables'

export function ProjectDeliverables({ projectId }: { projectId: string }) {
  const { data: deliverables = [], isLoading } = useDeliverables(projectId)

  if (isLoading) {
    return <div>Loading...</div>
  }

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
