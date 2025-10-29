import Image from 'next/image'
import Link from 'next/link'
import type { ServiceRow } from '@/types/models'
import { createClient } from '@/lib/supabase/server'

const fallbackServices: ServiceRow[] = [
  {
    id: '1',
    title: 'Visual Identity Design',
    description:
      'We partner with you to develop a distinctive brand identity, compelling messaging, and eye-catching visual elements that set you apart from the competition.',
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/8581e13fbb501284cd9ab78ac581ac2ac0150ec0?width=495',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/487c45cd3b4321445e19c37c1df2eb0bab54042d?width=495',
    slug: 'visual-identity-design',
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
    title: 'Mobile App',
    description:
      'We partner with you to develop a cutting-edge mobile app with intuitive design and seamless functionality that elevates your brand and engages your target audience.',
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/d28f9d9314e4e7b42ca7882c9311e35a5696e255?width=495',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/0950b837c8509c2ce9e42b75808adf9f4f06dc22?width=495',
    slug: 'mobile-app',
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
    title: 'CMS Integration',
    description:
      'We partner with you to develop a seamless CMS integration that empowers you to manage your content effortlessly and deliver personalized experiences to your audience.',
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/1177729887098c2bfe2a75998a51f2225e972b75?width=495',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/799336e141448e638007f16997eb5f311c119b66?width=495',
    slug: 'cms-integration',
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
    title: 'Website Development',
    description:
      'We partner with you to develop a high-performance website with a user-friendly interface and responsive design that drives traffic, generates leads, and boosts conversions.',
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/ff705befc98dc42af542a76ef5a9fc979384b9a6?width=495',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/c455bba46cf5af07c7d3da425c556a81aac5cd27?width=495',
    slug: 'website-development',
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
    description:
      'We partner with you to develop a captivating visual identity that reflects your brand values, resonates with your audience, and leaves a lasting impression.',
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/4f0cc2f1d2aea04c5f5d5dc12f1055062a0d87fd?width=495',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/c9b35b1932cdd4dd44082a3a143c937de9347aa6?width=495',
    slug: 'visual-identity-design-2',
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
    title: 'Brand Guideline',
    description:
      'We partner with you to develop comprehensive brand guidelines that ensure consistency across all touchpoints, maintain brand integrity, and strengthen brand recognition.',
    image1_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/c910cce78856c0c1efe08db95ba3e711bf6c2d8d?width=442',
    image2_url:
      'https://api.builder.io/api/v1/image/assets/TEMP/1065adaf92de708a16ccdaa00f5036ed3f822277?width=442',
    slug: 'brand-guideline',
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

export async function ServicesList() {
  const services = await getServices()
  return (
    <section className='services-list-section'>
      <div className='services-container'>
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`service-item ${
              index % 2 === 1 ? 'service-item-reverse' : ''
            }`}
          >
            <div className='image-container'>
              <img
                className='service-image service-image-back'
                src={service.image2_url!}
                alt=''
              />
              <img
                className='service-image service-image-front'
                src={service.image1_url!}
                alt=''
              />
            </div>

            <div className='service-info'>
              <div className='service-description'>
                <h3 className='service-title'>{service.title}</h3>
                <p className='service-text'>{service.description}</p>
              </div>

              <Link href='#pricing' className='service-button'>
                <span className='service-button-text'>See Pricing</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <style jsx>{`
        .services-list-section {
          width: 100%;
          padding: 2rem 1.5rem;
        }

        .services-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4rem;
          max-width: 980px;
          margin: 0 auto;
        }

        .service-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2.5rem;
          width: 100%;
        }

        .service-item-reverse {
          flex-direction: column;
        }

        .image-container {
          position: relative;
          width: 276px;
          height: 152px;
          flex-shrink: 0;
        }

        .service-image {
          position: absolute;
          width: 156px;
          height: 117px;
          border: 5px solid #393939;
          object-fit: cover;
        }

        .service-image-back {
          left: 0;
          top: 5px;
          transform: rotate(-12.233deg);
          box-shadow: 6px 4px 15px 0 rgba(0, 0, 0, 0.25);
          z-index: 1;
        }

        .service-image-front {
          left: 97px;
          top: 0;
          transform: rotate(14.114deg);
          box-shadow: 0 4px 34px 0 rgba(0, 0, 0, 0.15);
          z-index: 2;
        }

        .service-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2rem;
          width: 100%;
        }

        .service-description {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.625rem;
          width: 100%;
        }

        .service-title {
          color: #f7f6ff;
          font-size: 1.5rem;
          font-weight: 500;
          line-height: 1.4;
          margin: 0;
        }

        .service-text {
          color: #9ba1a6;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          margin: 0;
        }

        .service-button {
          display: flex;
          padding: 0.875rem 1.25rem;
          justify-content: center;
          align-items: center;
          border-radius: 1.875rem;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: transparent;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .service-button:hover {
          border-color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.05);
        }

        .service-button-text {
          color: #fff;
          text-align: center;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1.25;
        }

        @media (min-width: 768px) {
          .services-list-section {
            padding: 4rem 3rem;
          }

          .services-container {
            gap: 8rem;
          }

          .service-item {
            flex-direction: row;
            gap: 3rem;
          }

          .service-item-reverse {
            flex-direction: row-reverse;
          }

          .image-container {
            width: 350px;
            height: 193px;
          }

          .service-image {
            width: 197px;
            height: 148px;
            border: 6px solid #393939;
          }

          .service-image-back {
            left: 0;
            top: 7px;
          }

          .service-image-front {
            left: 122px;
            top: 0;
          }

          .service-info {
            width: 400px;
            gap: 2.5rem;
          }

          .service-title {
            font-size: 1.75rem;
          }

          .service-text {
            font-size: 1.063rem;
          }

          .service-button {
            padding: 1rem 1.5rem;
          }

          .service-button-text {
            font-size: 0.938rem;
          }
        }

        @media (min-width: 1024px) {
          .services-list-section {
            padding: 4rem 13rem;
          }

          .services-container {
            gap: 12.5rem;
          }

          .service-item {
            gap: 3.813rem;
          }

          .image-container {
            width: 438px;
            height: 241px;
          }

          .service-image {
            width: 247px;
            height: 185px;
            border: 8px solid #393939;
          }

          .service-image-back {
            left: 0;
            top: 8px;
          }

          .service-image-front {
            left: 153px;
            top: 0;
          }

          .service-info {
            width: 481px;
            padding-top: 5px;
            gap: 2.5rem;
          }

          .service-description {
            gap: 0.625rem;
          }

          .service-title {
            font-size: 2rem;
            line-height: 1.96;
          }

          .service-text {
            font-size: 1.125rem;
            line-height: 1.33;
          }

          .service-button {
            padding: 1.25rem 1.563rem;
            border-radius: 1.875rem;
          }

          .service-button-text {
            font-size: 1rem;
            line-height: 1.25;
          }
        }
      `}</style>
    </section>
  )
}
