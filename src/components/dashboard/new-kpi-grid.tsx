import { Info, Folder, MessageCircle, FileText, HardDrive } from 'lucide-react'

type KpiMetric = {
  label: string
  value: string
  icon: 'folder' | 'message' | 'invoice' | 'storage'
}

type NewKpiGridProps = {
  items: KpiMetric[]
}

const iconMap = {
  folder: Folder,
  message: MessageCircle,
  invoice: FileText,
  storage: HardDrive,
}

export function NewKpiGrid({ items }: NewKpiGridProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {items.map((item, index) => {
        const Icon = iconMap[item.icon]
        const isFirst = index === 0
        
        return (
          <div
            key={item.label}
            className={`flex flex-col gap-[50px] rounded-2xl border p-[15px] pb-5 ${
              isFirst 
                ? 'border-[#261F1C] bg-[#261F1C]' 
                : 'border-[#131313] bg-[#131313]'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-white'>{item.label}</span>
                <Info className='h-[15px] w-[15px] text-white' strokeWidth={0.9375} />
              </div>
              <Icon className='h-6 w-6 text-white' strokeWidth={1.5} />
            </div>
            <div className='text-[32px] font-medium leading-5 text-white'>
              {item.value}
            </div>
          </div>
        )
      })}
    </div>
  )
}
