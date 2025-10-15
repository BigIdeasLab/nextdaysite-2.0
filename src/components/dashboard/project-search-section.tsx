import { Search, Grid3x3, List } from 'lucide-react'

export function ProjectSearchSection() {
  return (
    <div className='flex flex-col gap-4'>
      <h2 className='text-xl font-medium text-white'>Your Project</h2>
      <div className='flex items-center gap-2.5'>
        <div className='flex h-[53px] flex-1 items-center gap-1 rounded-xl border border-[#202020] bg-[#202020] px-[15px]'>
          <Search className='h-5 w-5 text-[#9BA1A6]' strokeWidth={1.25} />
          <input
            type='text'
            placeholder='Search Anything'
            className='flex-1 bg-transparent text-lg text-[#9BA1A6] placeholder:text-[#9BA1A6] focus:outline-none'
          />
        </div>
        <button className='flex h-[53px] w-[53px] items-center justify-center rounded-xl border border-[#202020] bg-[#202020] transition hover:bg-[#2a2a2a]'>
          <Grid3x3 className='h-6 w-6 text-[#9BA1A6]' strokeWidth={1.5} />
        </button>
        <button className='flex h-[53px] w-[53px] items-center justify-center rounded-xl border border-[#202020] bg-[#202020] transition hover:bg-[#2a2a2a]'>
          <List className='h-6 w-6 text-[#9BA1A6]' strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
