'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import { fadeUpContainerVariant, staggerChildVariant } from '@/lib/animation-variants'

export function ContactHero() {
  const { ref, isInView } = useInView<HTMLDivElement>({
    threshold: 0.2,
  })

  return (
    <section ref={ref} className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <motion.div
        className='mx-auto max-w-[1002px]'
        variants={fadeUpContainerVariant}
        initial='hidden'
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.h1
          className='text-[40px] font-medium leading-[44px] text-[var(--foreground)] md:text-[60px] md:leading-[64.8px]'
          variants={staggerChildVariant}
        >
          <span className='block'>Let&apos;s Build Something</span>
          <span className='block'>Great Together</span>
        </motion.h1>
      </motion.div>
    </section>
  )
}
