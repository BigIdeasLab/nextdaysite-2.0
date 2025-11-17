'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { ServiceRow } from '@/types/models'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
} from '@/lib/animation-variants'

interface ServicesSectionClientProps {
  services: ServiceRow[]
}

export function ServicesSectionClient({
  services,
}: ServicesSectionClientProps) {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.15,
    margin: '0px 0px -80px 0px',
  })

  return (
    <section className='bg-[var(--dark-section)] transition-colors duration-300'>
      <div className='w-full bg-background px-5 py-[106px] transition-colors duration-300 rounded-t-[20px] md:rounded-t-[50px] md:px-12 md:py-26 lg:px-52'>
        <div className='mx-auto flex w-full max-w-[1022px] flex-col items-center gap-16'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center font-medium text-[var(--foreground)] text-[clamp(1.75rem,5vw,2.5rem)] leading-tight'
          >
            Our Services
          </motion.h2>

          <motion.div
            ref={ref}
            className='w-full overflow-hidden rounded-[20px] bg-[#F5F5F5] dark:bg-[var(--dark-card)] md:rounded-[50px]'
            variants={fadeUpContainerVariant}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className='grid grid-cols-1 gap-px bg-[rgba(42,42,42,0.15)] dark:bg-[var(--dark-bg)] md:grid-cols-2 lg:grid-cols-3'>
              {services.map((service: ServiceRow) => (
                <motion.div key={service.title} variants={staggerChildVariant}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: ServiceRow }) {
  const fallbackImage1 =
    'https://api.builder.io/api/v1/image/assets/TEMP/a98f6cafd3ce6b5bc3068700e20c12c411432a81?width=312'
  const fallbackImage2 =
    'https://api.builder.io/api/v1/image/assets/TEMP/77505f56ce0db94a15cc9aa21f6a4ff80ede5bdd?width=312'

  const image1Url = service.image1_url || fallbackImage1
  const image2Url = service.image2_url || fallbackImage2

  return (
    <div className='group flex flex-col items-center gap-9 bg-[#F5F5F5] dark:bg-[var(--dark-card)] px-8 py-[50px]'>
      <div className='relative w-[276px] h-[152px]'>
        <motion.div
          className='absolute flex overflow-hidden items-center justify-center transition-transform duration-700 ease-in-out group-hover:-translate-y-5 group-hover:-translate-x-5'
          style={{
            width: '150px',
            height: '120px',
            left: '14.5px',
            top: '1px',
            transform: 'rotate(-12.233deg)',
            zIndex: 20,
            border: '8px solid #393939',
            boxShadow: '6px 4px 15px 0 rgba(0, 0, 0, 0.25)',
          }}
          whileHover={{ y: -5, x: -5 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image1Url}
            alt={`${service.title} preview 1`}
            width={150}
            height={120}
            className='rounded-sm object-cover W-[150px] h-[120px]'
          />
        </motion.div>
        <motion.div
          className='absolute flex overflow-hidden items-center justify-center transition-transform duration-700 ease-in-out group-hover:-translate-y-5 group-hover:translate-x-5'
          style={{
            width: '150px',
            height: '120px',
            left: '111.5px',
            top: '-4px',
            transform: 'rotate(14.114deg)',
            zIndex: 10,
            border: '8px solid #393939',
            boxShadow: '0 4px 34px 0 rgba(0, 0, 0, 0.15)',
          }}
          whileHover={{ y: -5, x: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={image2Url}
            alt={`${service.title} preview 2`}
            width={150}
            height={120}
            className='rounded-sm object-cover W-[150px] h-[120px]'
          />
        </motion.div>
      </div>
      <h3 className='text-center font-normal text-[#000] dark:text-[var(--foreground)] text-[23px] leading-[24px]'>
        {service.title}
      </h3>
    </div>
  )
}
