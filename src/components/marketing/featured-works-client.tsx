'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioItemRow } from '@/types/models'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
} from '@/lib/animation-variants'

interface FeaturedWorksClientProps {
  projects: PortfolioItemRow[]
  fallbackImageUrl: string
}

export function FeaturedWorksClient({
  projects,
  fallbackImageUrl,
}: FeaturedWorksClientProps) {
  const { ref, isInView } = useInView({ threshold: 0.1, margin: '0px 0px -100px 0px' })

  return (
    <section
      ref={ref}
      className='w-full rounded-t-[20px] bg-[var(--dark-section)] px-5 py-[60px] md:rounded-t-[50px] md:px-12 md:py-20 lg:px-52 transition-colors duration-300'
    >
      <div className='mx-auto flex w-full max-w-[1022px] flex-col items-center gap-[60px] md:gap-[60px]'>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center text-[28px] font-medium leading-[35px] text-[var(--foreground)] md:text-[40px] md:leading-[50px]'
        >
          Our Featured Work
        </motion.h2>

        <motion.div
          ref={ref}
          className='grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12'
          variants={fadeUpContainerVariant}
          initial='hidden'
          animate={isInView ? 'visible' : 'hidden'}
        >
          {projects.map((project: PortfolioItemRow) => (
            <motion.div
              key={project.id}
              variants={staggerChildVariant}
              className={`${project.id && projects.indexOf(project) % 2 === 1 ? 'md:translate-y-30' : ''}`}
            >
              <ProjectCard project={project} fallbackImageUrl={fallbackImageUrl} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            href='/portfolio'
            className='md:mt-[150px] flex h-[48px] items-center justify-center rounded-[30px] border px-[26px] text-[20px] font-medium text-[var(--foreground)] transition-transform hover:scale-105 md:h-[54px] md:text-[23px]'
          >
            See All
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  fallbackImageUrl,
}: {
  project: PortfolioItemRow
  fallbackImageUrl: string
}) {
  const imageUrl = project.image_url ? project.image_url : fallbackImageUrl

  return (
    <div className='flex w-full flex-col items-center gap-5'>
      <div
        className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[30px] md:rounded-[50px]'
        style={{ backgroundColor: project.color ?? 'transparent' }}
      >
        <Image
          src={imageUrl}
          alt={project.title}
          width={788}
          height={591}
          className='h-auto w-full object-cover'
        />
      </div>
      <div className='flex w-full flex-col items-start gap-[10px] pt-[5px]'>
        <h3 className='text-[24px] font-medium leading-[31.471px] text-[var(--foreground)] md:text-[32px]'>
          {project.title}
        </h3>
        <p className='text-[16px] leading-[24px] text-[var(--text-secondary)] md:text-[18px]'>
          {project.description}
        </p>
      </div>
    </div>
  )
}
