export function GridBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative w-full'>
      {/* Grid Lines */}
      <div className='pointer-events-none absolute inset-0 hidden lg:block'>
        {/* Vertical Lines */}
        <div className='absolute left-[12.5%] top-0 h-full w-px bg-[#3A3A3A]' />
        <div className='absolute right-[12.5%] top-0 h-full w-px bg-[#3A3A3A]' />
        
        {/* Horizontal Lines */}
        <div className='absolute left-0 top-[108px] h-px w-full bg-[#3A3A3A]' />
        <div className='absolute left-0 top-[566px] h-px w-full bg-[#3A3A3A]' />
      </div>

      {/* Content */}
      <div className='relative z-10'>{children}</div>
    </div>
  )
}
