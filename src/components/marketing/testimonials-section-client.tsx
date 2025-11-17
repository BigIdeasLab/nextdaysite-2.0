'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { TestimonialRow } from '@/types/models'
import { useInView } from '@/hooks/use-in-view'
import {
  fadeUpContainerVariant,
  staggerChildVariant,
} from '@/lib/animation-variants'

interface TestimonialsSectionClientProps {
  testimonials: TestimonialRow[]
}

export function TestimonialsSectionClient({
  testimonials,
}: TestimonialsSectionClientProps) {
  const { ref, isInView } = useInView({
    threshold: 0.15,
    margin: '0px 0px -80px 0px',
  })

  return (
    <section className='bg-background transition-colors duration-300'>
      <div className='relative w-full overflow-hidden rounded-t-[20px] bg-[var(--dark-section)] px-5 py-16 md:rounded-t-[50px] md:px-12 md:py-24'>
        <div className='mx-auto w-full max-w-[1051px]'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='mb-12 text-center text-[28px] font-medium leading-[35px] text-foreground md:mb-20 md:text-[40px] md:leading-[50px]'
          >
            Our Outstanding Result
          </motion.h2>

          {/* Mobile: Stacked layout (for screens < md) */}
          <motion.div
            ref={ref}
            className='grid grid-cols-1 gap-6 md:hidden'
            variants={fadeUpContainerVariant}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
            {testimonials.map((testimonial: TestimonialRow) => (
              <motion.div key={testimonial.id} variants={staggerChildVariant}>
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>

          {/* Tablet: 2-column grid (for screens>= md and < lg) */}
          <motion.div
            ref={ref}
            className='hidden md:grid md:grid-cols-2 md:gap-8 lg:hidden md:justify-items-center'
            variants={fadeUpContainerVariant}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
            {testimonials.map((testimonial: TestimonialRow) => (
              <motion.div key={testimonial.id} variants={staggerChildVariant}>
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>

          {/* Desktop: Scattered layout (for screens >= lg) */}
          <motion.div
            ref={ref}
            className='relative mx-auto hidden h-[893px] w-full max-w-[1051px] lg:block'
            variants={fadeUpContainerVariant}
            initial='hidden'
            animate={isInView ? 'visible' : 'hidden'}
          >
            {testimonials.map((testimonial: TestimonialRow) => (
              <motion.div
                key={testimonial.id}
                className={`absolute ${testimonial.position_class} ${testimonial.rotate_class}`}
                variants={staggerChildVariant}
              >
                <TestimonialCard testimonial={testimonial} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({ testimonial }: { testimonial: TestimonialRow }) {
  const avatarUrl = testimonial.avatar_url

  return (
    <div
      className='flex h-auto w-full flex-col items-center gap-6 rounded-[20px] border-[1.2px] p-6 md:h-[356px] md:w-[317px] md:rounded-[28.462px] md:border-[1.779px] md:p-8'
      style={{
        backgroundColor: testimonial.bg_color ?? 'transparent',
        borderColor: testimonial.border_color ?? 'transparent',
      }}
    >
      <div className='flex flex-col items-center gap-[15px]'>
        <div
          className='h-[49px] w-[49px] overflow-hidden rounded-full bg-gray-400'
          style={{
            backgroundImage: `url(${avatarUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <p className='text-center text-[18px] font-medium leading-[24.904px] text-white md:text-[22.236px]'>
          {testimonial.name}
        </p>
      </div>

      <p
        className='text-center text-[18px] leading-[22px] md:text-[22.236px] md:leading-[24.904px]'
        style={{ color: testimonial.text_color ?? 'inherit' }}
      >
        {testimonial.quote}
      </p>

      <div className='mt-auto flex items-center justify-center'>
        {testimonial.logo_url && (
          <Image
            src={testimonial.logo_url}
            alt={`${testimonial.name} logo`}
            width={107}
            height={27}
            className='h-[20px] w-[80px] md:h-[27px] md:w-[107px] object-contain'
          />
        )}
      </div>
    </div>
  )
}
