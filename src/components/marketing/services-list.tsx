import Image from 'next/image'
import Link from 'next/link'
import type { ServiceRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'

const fallbackServices: ServiceRow[] = [
  {
    id: '1',
    title: 'Mobile App',
    description:
      'We partner with you to develop a cutting-edge mobile app with intuitive design and seamless functionality that elevates your brand and engages your target audience.',
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
    description:
      'We partner with you to develop a high-performance website with a user-friendly interface and responsive design that drives traffic, generates leads, and boosts conversions.',
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
    description:
      'We partner with you to develop a distinctive brand identity, compelling messaging, and eye-catching visual elements that set you apart from the competition.',
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

export async function ServicesList() {
  const services = await getServices()
  return (
    <section className='w-full px-6 py-16 md:px-12 lg:px-52'>
      <div className='mx-auto flex w-full max-w-5xl flex-col items-start gap-48'>
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`flex w-full flex-col items-center gap-16 ${
              index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
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
                  src={service.image1_url!}
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
                  src={service.image2_url!}
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
                href='#pricing'
                className='flex items-center justify-center rounded-full border border-foreground/50 px-6 py-5 text-base font-medium text-foreground transition-colors hover:border-foreground/70 hover:bg-foreground/5'
              >
                See Pricing
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
