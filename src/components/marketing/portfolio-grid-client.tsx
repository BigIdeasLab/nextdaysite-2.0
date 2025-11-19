'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { PortfolioItemRow } from '@/types/models'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
} from '@/lib/animation-variants'

interface PortfolioGridClientProps {
  projects: PortfolioItemRow[]
}

function ProjectCard({ project }: { project: PortfolioItemRow }) {
  const imageUrl = project.image_url

  return (
    <div className='flex w-full flex-col items-center gap-5'>
      <div
        className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[30px] md:rounded-[50px]'
        style={{ backgroundColor: project.color ?? 'var(--placeholder-gray)' }}
      >
        <Image
          src={imageUrl}
          alt={project.title}
          width={788}
          height={591}
          className='h-auto w-full object-cover'
        />
      </div>
      <div className='flex w-full flex-col items-start gap-2.5 pt-1'>
        <h3 className='text-3xl font-medium leading-tight text-[var(--foreground)]'>
          {project.title}
        </h3>
        <p className='text-lg leading-6 text-[var(--text-secondary)]'>
          {project.description}
        </p>
      </div>
    </div>
  )
}

export function PortfolioGridClient({ projects }: PortfolioGridClientProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    margin: '0px 0px -100px 0px',
  })

  return (
    <section ref={ref} className='w-full px-6 pt-16 pb-50 md:px-12 lg:px-52'>
      <motion.div
        className='mx-auto grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-5 md:gap-y-12'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={staggerChildVariant}
            className={`${index % 2 === 1 ? 'md:translate-y-30' : ''}`}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
