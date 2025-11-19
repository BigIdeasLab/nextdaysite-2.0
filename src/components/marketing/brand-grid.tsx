import type { LogoRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'
import { BrandGridClient } from './brand-grid-client'

const fallbackLogos: (LogoRow & { description: string | null })[] = [
  {
    id: '1',
    name: 'Frontix',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/bcb8d48b109cabb767cfef3995a7ddbf14a6331a?width=1576',
    width: 788,
    height: 591,
    created_at: null,
    updated_at: null,
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
  },
  {
    id: '2',
    name: 'Bitfirst',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/d1e3b79c7882105a073f340d0c30a1a900f0c949?width=1598',
    width: 788,
    height: 591,
    created_at: null,
    updated_at: null,
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
  },
  {
    id: '3',
    name: 'Vernacula',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/eaf534945d725f799b9272c318be0a739d9d1f45?width=1102',
    width: 788,
    height: 591,
    created_at: null,
    updated_at: null,
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
  },
  {
    id: '4',
    name: 'Easedo',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/aad2392e0bb258e9218c5d85571b5c9bf436041b?width=992',
    width: 788,
    height: 591,
    created_at: null,
    updated_at: null,
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
  },
  {
    id: '5',
    name: 'Tabitha Properties',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/102f3110d5fdd2b33ff7050b860f9718c7afcadb?width=1600',
    width: 788,
    height: 591,
    created_at: null,
    updated_at: null,
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
  },
  {
    id: '6',
    name: 'WOW',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/573c7ff44d2188cf791374291f32ab1b5507b47f?width=992',
    width: 788,
    height: 591,
    created_at: null,
    updated_at: null,
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
  },
]

async function getLogos() {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('logos')
      .select('*')
      .order('created_at', { ascending: true })

    if (error || !data) {
      return fallbackLogos
    }

    // Ensure a description field exists for rendering parity
    return data.map((item) => ({
      ...item,
      description: (item as any).description ?? null,
    })) as (LogoRow & {
      description: string | null
    })[]
  } catch {
    return fallbackLogos
  }
}

export async function BrandGrid() {
  const logos = await getLogos()

  return <BrandGridClient logos={logos} />
}
