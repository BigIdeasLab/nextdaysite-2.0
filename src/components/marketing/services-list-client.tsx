'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from '@/hooks/use-in-view'
import { fadeUpContainerVariant, staggerChildVariant } from '@/lib/animation-variants'
import type { ServiceRow } from '@/types/models'

interface ServicesListClientProps {
  services: ServiceRow[]
}

export function ServicesListClient({ services }: ServicesListClientProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.1,
  })

  return (
    <section ref={ref} className='w-full px-6 py-16 md:px-12 lg:px-24'>
      <motion.div
        className='mx-auto flex w-full max-w-5xl flex-col items-center gap-48'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        {services.map((service, index) => (
          <motion.div
            id={service.title.toLowerCase().replace(/\s+/g, '-')}
            key={service.id}
            className={`flex w-full flex-col items-center gap-16 md:justify-center ${
              index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
            variants={staggerChildVariant}
          >
            <div className='relative w-[276px] h-[152px] group'>
              <div
                className='absolute overflow-hidden flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-y-5 group-hover:-translate-x-5'
                style={{
                  width: '170px',
                  height: '150px',
                  left: '14.5px',
                  top: '1px',
                  transform: 'rotate(-12.233deg)',
                  zIndex: 20,
                  border: '8px solid #393939',
                  boxShadow: '6px 4px 15px 0 rgba(0, 0, 0, 0.25)',
                }}
              >
                <Image
                  src={service.image1_url!}
                  alt={`${service.title} preview 1`}
                  width={170}
                  height={150}
                  className='rounded-sm object-cover w-[170px] h-[150px]'
                />
              </div>
              <div
                className='absolute overflow-hidden flex items-center justify-center transition-transform duration-500 ease-in-out group-hover:-translate-y-5 group-hover:translate-x-5'
                style={{
                  width: '170px',
                  height: '150px',
                  left: '111.5px',
                  top: '-4px',
                  transform: 'rotate(14.114deg)',
                  zIndex: 10,
                  border: '8px solid #393939',
                  boxShadow: '6px 4px 15px 0 rgba(0, 0, 0, 0.25)',
                }}
              >
                <Image
                  src={service.image2_url!}
                  alt={`${service.title} preview 2`}
                  width={170}
                  height={150}
                  className='rounded-sm object-cover w-[170px] h-[150px]'
                />
              </div>
            </div>

            <div className='flex w-full flex-col items-start gap-10 md:w-1/2'>
              <div className='flex flex-col items-start gap-2.5'>
                <h3 className='text-3xl font-medium leading-tight text-[var(--foreground)]'>
                  {service.title}
                </h3>
                <p className='text-lg leading-6 text-[var(--text-secondary)]'>
                  {service.description}
                </p>
              </div>

              <Link
                href='/#pricing'
                className='flex items-center justify-center rounded-full border border-foreground/50 px-6 py-3 text-base font-medium text-foreground transition-colors hover:border-foreground/70 hover:bg-foreground/5'
              >
                See Pricing
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
