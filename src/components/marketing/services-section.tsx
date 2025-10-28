import Image from 'next/image'
import type { ServiceRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'

const fallbackServices: ServiceRow[] = [
  {
    id: '1',
    title: 'Mobile App',
    description: null,
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/a98f6cafd3ce6b5bc3068700e20c12c411432a81?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/77505f56ce0db94a15cc9aa21f6a4ff80ede5bdd?width=312',
    slug: 'mobile-app',
    icon: null,
    order_index: 1,
    published: true,
    image1_id: null,
    image2_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '2',
    title: 'Website Development',
    description: null,
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/d480fb4e9cf1a6fdd3d5179a1df5922259703233?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/1f72900abd7929614b58a1b0a3d9ee3596ea6815?width=312',
    slug: 'website-development',
    icon: null,
    order_index: 2,
    published: true,
    image1_id: null,
    image2_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '3',
    title: 'Branding',
    description: null,
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/a6ad86f74380a97734e430f2c2cb4dd392bdd10a?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/0fb4b2f574ab16820601e8e473f3fbfd9112edd3?width=312',
    slug: 'branding',
    icon: null,
    order_index: 3,
    published: true,
    image1_id: null,
    image2_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '4',
    title: 'Brand Guidelines',
    description: null,
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/2047efea22850a1366c3a594ec0df5b4fbe02a90?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/de37acf8c14e11bc9e327a39d1652a8329e4b952?width=312',
    slug: 'brand-guidelines',
    icon: null,
    order_index: 4,
    published: true,
    image1_id: null,
    image2_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '5',
    title: 'Visual Identity Design',
    description: null,
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/766f283a212023af2dc3cd8fa633fd293549dfff?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/c877f82ce6ab86e2bd963b10e4ecf9ea2c5a277c?width=312',
    slug: 'visual-identity-design',
    icon: null,
    order_index: 5,
    published: true,
    image1_id: null,
    image2_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
  {
    id: '6',
    title: 'CMS Integration',
    description: null,
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/a92104699de22751082f0fd960d47894f19168c2?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/0f35b090e1f07d3df95dafddbf42178600244a5d?width=312',
    slug: 'cms-integration',
    icon: null,
    order_index: 6,
    published: true,
    image1_id: null,
    image2_id: null,
    created_at: '',
    updated_at: '',
    created_by: null,
  },
]

async function getServices() {
  const supabase = await createClient()

  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('published', true)
      .order('order_index', { ascending: true })

    if (error || !data) {
      return fallbackServices
    }

    return data
  } catch {
    return fallbackServices
  }
}

export async function ServicesSection() {
  const services = await getServices()
  return (
    <section className='bg-[var(--dark-section)] transition-colors duration-300'>
      <div className='w-full bg-background px-5 py-[106px] transition-colors duration-300 rounded-t-[20px] md:rounded-t-[50px] md:px-12 md:py-26 lg:px-52'>
        <div className='mx-auto flex w-full max-w-[1022px] flex-col items-center gap-16'>
          <h2 className='text-center font-medium text-[var(--foreground)] text-[clamp(1.75rem,5vw,2.5rem)] leading-tight'>
            Our Services
          </h2>
          <div className='w-full overflow-hidden rounded-[20px] bg-[#F5F5F5] dark:bg-[var(--dark-card)] md:rounded-[50px]'>
            <div className='grid grid-cols-1 gap-px bg-[rgba(42,42,42,0.15)] dark:bg-[var(--dark-bg)] md:grid-cols-2 lg:grid-cols-3'>
              {services.map((service: ServiceRow) => (
                <ServiceCard key={service.title} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: ServiceRow }) {
  const image1Url = service.image1_url || fallbackServices[0].image1_url || ''
  const image2Url = service.image2_url || fallbackServices[0].image2_url || ''

  return (
    <div className='flex flex-col items-center gap-9 bg-[#F5F5F5] dark:bg-[var(--dark-card)] px-8 py-[50px]'>
      <div className='relative w-[276px] h-[152px]'>
        <div
          className='absolute'
          style={{
            width: '156px',
            height: '117px',
            left: '0px',
            top: '5px',
            transform: 'rotate(-12.233deg)',
            zIndex: 20,
          }}
        >
          <Image
            src={image1Url}
            alt={`${service.title} preview 1`}
            width={156}
            height={117}
            className='rounded-sm object-cover'
            style={{
              border: '8px solid #393939',
              boxShadow: '6px 4px 15px 0 rgba(0, 0, 0, 0.25)',
            }}
          />
        </div>
        <div
          className='absolute'
          style={{
            width: '156px',
            height: '117px',
            left: '97px',
            top: '0px',
            transform: 'rotate(14.114deg)',
            zIndex: 10,
          }}
        >
          <Image
            src={image2Url}
            alt={`${service.title} preview 2`}
            width={156}
            height={117}
            className='rounded-sm object-cover'
            style={{
              border: '8px solid #393939',
              boxShadow: '0 4px 34px 0 rgba(0, 0, 0, 0.15)',
            }}
          />
        </div>
      </div>
      <h3 className='text-center font-normal text-[#000] dark:text-[var(--foreground)] text-[23px] leading-[24px]'>
        {service.title}
      </h3>
    </div>
  )
}
