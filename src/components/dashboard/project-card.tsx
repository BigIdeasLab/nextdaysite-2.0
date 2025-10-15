import { MoreVertical, Clock } from 'lucide-react'

type ProjectCardProps = {
  title: string
  status: string
  progress: number
  lastUpdated: string
  statusColor?: 'orange' | 'green'
}

export function ProjectCard({
  title,
  status,
  progress,
  lastUpdated,
  statusColor = 'orange',
}: ProjectCardProps) {
  const isCompleted = statusColor === 'green'
  
  return (
    <div className='flex h-[210px] w-full flex-col rounded-xl border border-[#202020] bg-[#202020]'>
      <div className='flex items-center justify-between px-[15px] pt-[15px]'>
        <h3 className='text-lg font-medium text-white'>{title}</h3>
        <button className='text-white transition hover:text-white/80'>
          <MoreVertical className='h-6 w-6' strokeWidth={2.08333} />
        </button>
      </div>
      
      <div className='mt-6 flex flex-col gap-4 px-[15px]'>
        <div className='relative h-2.5 w-full overflow-hidden rounded-[30px] bg-[#2F2F2F]'>
          <div
            className='h-full rounded-[30px] bg-[#FF8C00]'
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className='flex items-center justify-between'>
          <div
            className={`rounded-[10px] px-2 py-[13px] ${
              isCompleted 
                ? 'bg-[#223219] text-[#82FF3A]' 
                : 'bg-[#452600] text-[#FF8C00]'
            }`}
          >
            <span className='text-[17px]'>{status}</span>
          </div>
          <span className='text-[17px] text-white'>{progress}%</span>
        </div>
      </div>
      
      <div className='mt-auto border-t border-white/10' />
      
      <div className='flex items-center gap-1 px-[15px] py-5'>
        <Clock className='h-[22px] w-[22px] text-white' strokeWidth={1.5} />
        <span className='text-base text-white'>Last Updated: {lastUpdated}</span>
      </div>
    </div>
  )
}
