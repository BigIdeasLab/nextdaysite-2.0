import Image from 'next/image'
import type { ServiceRow } from '@/types/models'

const fallbackServices: ServiceRow[] = [
  {
    id: '1',
    title: 'Mobile App',
    description: null,
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/3731552d5863c43a5a2f08857cba1d69a15cb94e?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/8dff95b352e06384b2cbda0bdd8725f069cc30ad?width=312',
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
      'https://api.builder.io/api/v1/image/assets/TEMP/bcd0a9697d8bd367df1ac05abe35fc8a1cde216a?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/b0b73585d7a96b90c669067d21eea15c1bfa8961?width=312',
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
      'https://api.builder.io/api/v1/image/assets/TEMP/101deed4b9cf5b74e3e01517533eee8300027235?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/fcdaa423367af7aefa4eacc6f124258faec78c22?width=312',
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
      'https://api.builder.io/api/v1/image/assets/TEMP/7405f57af81f2bd036a724dd4a86c7d21c28cbb4?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/f4b13c36da799c8960df0fcef21f25af1a731d02?width=312',
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
      'https://api.builder.io/api/v1/image/assets/TEMP/fec7d66da14c0e42280dc3161f7e3da336357a21?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/50ff04a4fd137080f7e30e85d5656eb56e913d71?width=312',
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
      'https://api.builder.io/api/v1/image/assets/TEMP/16b2c7cfd009aaad8243821ffaad2561284da536?width=312',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/bd519a768c9545511ccef3b4019d1595dc849ddc?width=312',
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
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/cms/services`,
      {
        cache: 'revalidate',
        next: { revalidate: 60 },
      },
    )

    if (!response.ok) {
      return fallbackServices
    }

    return await response.json()
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
          <div className='w-full overflow-hidden rounded-[20px] bg-[var(--dark-card)] md:rounded-[50px]'>
            <div className='grid grid-cols-1 gap-px bg-[var(--dark-bg)] md:grid-cols-2 lg:grid-cols-3'>
              {services.map((service) => (
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
    <div className='flex flex-col items-center gap-4 bg-[var(--dark-card)] px-4 py-8 sm:gap-[36px] sm:px-8 sm:py-[50px]'>
      <div className='relative w-full max-w-[345px] aspect-[345/190]'>
        <div
          className='absolute -rotate-[8.233deg] z-20'
          style={{
            width: '62.3%',
            height: '87.4%',
            left: '-2.9%',
            top: '-1.9%',
          }}
        >
          <Image
            src={image1Url}
            alt={`${service.title} preview 1`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            objectFit='cover'
          />
        </div>
        <div
          className='absolute rotate-[10.114deg] z-10'
          style={{
            width: '72.3%',
            height: '97.4%',
            left: '32.2%',
            top: '-5.2%',
          }}
        >
          <Image
            src={image2Url}
            alt={`${service.title} preview 2`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            objectFit='cover'
          />
        </div>
      </div>
      <h3 className='text-center font-medium leading-[24px] text-foreground text-[clamp(1.25rem,5vw,1.4375rem)]'>
        {service.title}
      </h3>
    </div>
  )
}
