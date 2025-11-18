import type { ServiceRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'
import { ServicesSectionClient } from './services-section-client'

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
  return <ServicesSectionClient services={services} />
}
