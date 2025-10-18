'use client'

import type { Dispatch, SetStateAction } from 'react'

type TabType = 'scope' | 'deliverables' | 'timeline'

export function ProjectDetailsTabs({
  activeTab,
  setActiveTab,
}: {
  activeTab: TabType
  setActiveTab: Dispatch<SetStateAction<TabType>>
}) {
  return (
    <div className='mb-10'>
      <div className='flex items-center gap-10 mb-0'>
        <button
          className={`text-[#9ba1a6] text-base font-normal leading-[22px] bg-transparent border-none cursor-pointer pb-6 transition-colors duration-200 ${activeTab === 'scope' ? 'text-white font-medium' : ''}`}
          onClick={() => setActiveTab('scope')}
        >
          Scope
        </button>
        <button
          className={`text-[#9ba1a6] text-base font-normal leading-[22px] bg-transparent border-none cursor-pointer pb-6 transition-colors duration-200 ${activeTab === 'deliverables' ? 'text-white font-medium' : ''}`}
          onClick={() => setActiveTab('deliverables')}
        >
          Deliverables
        </button>
        <button
          className={`text-[#9ba1a6] text-base font-normal leading-[22px] bg-transparent border-none cursor-pointer pb-6 transition-colors duration-200 ${activeTab === 'timeline' ? 'text-white font-medium' : ''}`}
          onClick={() => setActiveTab('timeline')}
        >
          Timeline
        </button>
      </div>
      <div className='w-full h-px bg-white/20 relative'>
        <div
          className='w-[59px] h-0.5 bg-[#ff8c00] absolute top-0 transition-left duration-300 ease'
          style={{
            left:
              activeTab === 'scope'
                ? '0%'
                : activeTab === 'deliverables'
                  ? '9.33%'
                  : '19%',
          }}
        />
      </div>
    </div>
  )
}
