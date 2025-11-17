import type { TestimonialRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'
import { TestimonialsSectionClient } from './testimonials-section-client'

async function getTestimonials() {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (error || !data) {
      return []
    }

    return data
  } catch {
    return []
  }
}

export async function TestimonialsSection() {
  const testimonials: TestimonialRow[] = await getTestimonials()
  return <TestimonialsSectionClient testimonials={testimonials} />
}
