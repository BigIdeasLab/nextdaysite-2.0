'use client'

export function DashboardHeader() {
  return (
    <div className='flex items-center justify-between'>
      <h1 className='text-[25px] font-medium text-white'>Dashboard</h1>
      <button className='flex h-12 items-center justify-center gap-3 rounded-[30px] bg-[#FF8C00] px-5 text-white transition hover:bg-[#FF8C00]/90'>
        <span className='text-base font-medium'>New Project</span>
      </button>
    </div>
  )
}
