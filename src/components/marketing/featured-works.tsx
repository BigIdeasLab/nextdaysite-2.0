import Image from 'next/image'
import Link from 'next/link'
import type { PortfolioItemRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'

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

export async function FeaturedWorksSection() {
  const projects = await getPortfolioItems()

  return (
    <section className='w-full rounded-t-[20px] bg-[var(--dark-section)] px-5 py-[60px] md:rounded-t-[50px] md:px-12 md:py-20 lg:px-52 transition-colors duration-300'>
      <div className='mx-auto flex w-full max-w-[1022px] flex-col items-center gap-[60px] md:gap-[60px]'>
        <h2 className='text-center text-[28px] font-medium leading-[35px] text-[var(--foreground)] md:text-[40px] md:leading-[50px]'>
          Our Featured Work
        </h2>

        <div className='grid w-full grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12'>
          {projects.map((project: PortfolioItemRow, index: number) => (
            <div
              key={project.id}
              className={`${index % 2 === 1 ? 'md:translate-y-30' : ''}`}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <Link
          href='/portfolio'
          className='md:mt-[150px] flex h-[48px] items-center justify-center rounded-[30px] border border-[var(--pricing-input-label)] px-[26px] text-[20px] font-medium text-white transition-transform hover:scale-105 md:h-[54px] md:text-[23px]'
        >
          See All
        </Link>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: PortfolioItemRow }) {
  const imageUrl = project.image_url
    ? project.image_url
    : fallbackProjects[0].image_url!
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
