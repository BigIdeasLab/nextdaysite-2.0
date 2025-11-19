import type { PortfolioItemRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'
import { PortfolioGridClient } from './portfolio-grid-client'

const fallbackProjects: PortfolioItemRow[] = [
  {
    id: '1',
    title: 'EcoTrack',
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/bcb8d48b109cabb767cfef3995a7ddbf14a6331a?width=1576',
    color: 'var(--placeholder-gray)',
    slug: 'ecotrack',
    order_index: 1,
    published: true,
    image_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '2',
    title: 'HomeNest',
    description:
      'Transform any space into a smart home with customizable automation options.',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/d1e3b79c7882105a073f340d0c30a1a900f0c949?width=1598',
    color: 'var(--placeholder-gray)',
    slug: 'homenest',
    order_index: 2,
    published: true,
    image_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '3',
    title: 'FitFlex',
    description:
      'Personalized workout and nutrition plans that adapt to user progress and feedback.',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/eaf534945d725f799b9272c318be0a739d9d1f45?width=1102',
    color: 'var(--placeholder-gray)',
    slug: 'fitflex',
    order_index: 3,
    published: true,
    image_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '4',
    title: 'BlockChainEd',
    description:
      'A decentralized platform for learning and sharing blockchain technology skills.',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/aad2392e0bb258e9218c5d85571b5c9bf436041b?width=992',
    color: 'var(--placeholder-gray)',
    slug: 'blockchained',
    order_index: 4,
    published: true,
    image_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '5',
    title: 'TravelSphere',
    description:
      'Curate unique travel experiences based on user preferences and local insights.',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/102f3110d5fdd2b33ff7050b860f9718c7afcadb?width=1600',
    color: 'var(--placeholder-gray)',
    slug: 'travelsphere',
    order_index: 5,
    published: true,
    image_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '6',
    title: 'BookCaddy',
    description:
      'A social platform for book lovers to share, review, and recommend their favorite reads.',
    image_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/573c7ff44d2188cf791374291f32ab1b5507b47f?width=992',
    color: 'var(--placeholder-gray)',
    slug: 'bookcaddy',
    order_index: 6,
    published: true,
    image_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
]

async function getPortfolioItems() {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (error || !data) {
      return fallbackProjects
    }

    return data
  } catch {
    return fallbackProjects
  }
}

export async function PortfolioGrid() {
  const projects = await getPortfolioItems()

  return (
    <PortfolioGridClient projects={projects} fallbackImageUrl='/Grid.png' />
  )
}
