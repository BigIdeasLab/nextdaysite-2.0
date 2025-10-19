'use client'

import { ProjectDeliverables } from './project-deliverables'
import { ProjectTimeline } from './project-timeline'
import type { ProjectsRow } from '@/types/models'

type TabType = 'scope' | 'deliverables' | 'timeline'

export function ProjectDetailsTabContent({
  activeTab,
  project,
}: {
  activeTab: TabType
  project: ProjectsRow
}) {
  return (
    <div className='pt-8'>
      {activeTab === 'scope' && (
        <div className='flex flex-col gap-[50px]'>
          <div className='flex flex-col gap-[30px]'>
            <h3 className='text-[#9ba1a6] text-lg font-medium leading-[22px]'>
              Description
            </h3>
            <p className='text-[#f7f6ff] text-base font-light leading-7'>
              {project.summary ||
                'The EcoShop Mobile App project aims to create a user-friendly platform connecting consumers with sustainable products. Key features include a curated marketplace, eco-friendly product discovery, secure payment integration, and a carbon footprint tracker. The project will prioritize a seamless user experience, promote environmental awareness, and support ethical consumerism.'}
            </p>
          </div>

          <div className='flex flex-col gap-[30px]'>
            <h3 className='text-[#9ba1a6] text-lg font-medium leading-[22px]'>
              Technical Scope
            </h3>
            <div className='flex flex-col gap-[25px]'>
              <div className='flex justify-between items-center'>
                <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                  Framework:
                </span>
                <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                  Next.js + Tailwind CSS
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                  CMS
                </span>
                <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                  Strapi (headless integration)
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                  Hosting
                </span>
                <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                  Vercel
                </span>
              </div>
              <div className='flex justify-between items-center'>
                <span className='text-[#9ba1a6] text-base font-light leading-[22px]'>
                  Analytics:
                </span>
                <span className='text-[#f7f6ff] text-base font-light leading-[22px]'>
                  Google Analytics 4 + Heatmap tracking
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'deliverables' && (
        <ProjectDeliverables projectId={project.id} />
      )}
      {activeTab === 'timeline' && <ProjectTimeline projectId={project.id} />}
    </div>
  )
}
