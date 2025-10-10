import Image from 'next/image'
import Link from 'next/link'

const services = [
  {
    id: 1,
    title: 'Visual Identity Design',
    description:
      'We partner with you to develop a distinctive brand identity, compelling messaging, and eye-catching visual elements that set you apart from the competition.',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/e9d384835cb0e8f33b19142bcc17d5a053e5db56?width=495',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/3aea2f8a60b8dac3d8a61a176f3b3bdb4093b3d9?width=495',
    imagePosition: 'left',
  },
  {
    id: 2,
    title: 'Mobile App',
    description:
      'We partner with you to develop a cutting-edge mobile app with intuitive design and seamless functionality that elevates your brand and engages your target audience.',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/1c42014f5095f96c6a60cdc90d347c7138f94834?width=495',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/4740875d1eb285bc4de30908c7fe6f0edbd07a8d?width=495',
    imagePosition: 'right',
  },
  {
    id: 3,
    title: 'CMS Integration',
    description:
      'We partner with you to develop a seamless CMS integration that empowers you to manage your content effortlessly and deliver personalized experiences to your audience.',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/bb107efb32489cb9e751ba74c42c6c8a32a4acaf?width=495',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/451f47036892e405dcb5fb52187b21deb280867a?width=495',
    imagePosition: 'left',
  },
  {
    id: 4,
    title: 'Website Development',
    description:
      'We partner with you to develop a high-performance website with a user-friendly interface and responsive design that drives traffic, generates leads, and boosts conversions.',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/2d8280d02a56edea3b4086665db656bc92b18bb2?width=495',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/455e254fb42cfccb9317a5c8fcebbd3238c31aa5?width=495',
    imagePosition: 'right',
  },
  {
    id: 5,
    title: 'Visual Identity Design',
    description:
      'We partner with you to develop a captivating visual identity that reflects your brand values, resonates with your audience, and leaves a lasting impression.',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/49239c52a1518f9f7dd44aa5b823f23bb6c81ec2?width=495',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/65658e18815e1586d9e6b80e8451346ecdf7a37d?width=495',
    imagePosition: 'left',
  },
  {
    id: 6,
    title: 'Brand Guideline',
    description:
      'We partner with you to develop comprehensive brand guidelines that ensure consistency across all touchpoints, maintain brand integrity, and strengthen brand recognition.',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/e263d588c83097432bb9f9d9f8cd17fc232c70c6?width=442',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/c031e7e087947b220020396506299ca975d076eb?width=442',
    imagePosition: 'right',
  },
]

export function ServicesList() {
  return (
    <section className='w-full bg-[#0a0a0a] px-6 py-16 md:px-12 lg:px-52'>
      <div className='mx-auto flex w-full max-w-5xl flex-col items-start gap-48'>
        {services.map((service) => (
          <div
            key={service.id}
            className={`flex w-full flex-col items-center gap-16 ${
              service.imagePosition === 'right'
                ? 'md:flex-row-reverse'
                : 'md:flex-row'
            }`}
          >
            <div className='relative h-60 w-full max-w-md md:w-1/2'>
              <Image
                src={service.image1}
                alt={`${service.title} preview 1`}
                width={287}
                height={205}
                className='absolute -left-10 top-2 z-20'
              />
              <Image
                src={service.image2}
                alt={`${service.title} preview 2`}
                width={307}
                height={225}
                className='absolute right-0 -top-4 z-10'
              />
            </div>

            <div className='flex w-full flex-col items-start gap-10 md:w-1/2'>
              <div className='flex flex-col items-start gap-2.5'>
                <h3 className='text-3xl font-medium leading-tight text-[#F7F6FF]'>
                  {service.title}
                </h3>
                <p className='text-lg leading-6 text-[#9BA1A6]'>
                  {service.description}
                </p>
              </div>

              <Link
                href='#pricing'
                className='flex items-center justify-center rounded-full border border-white/50 px-6 py-5 text-base font-medium text-white transition-colors hover:border-white/70 hover:bg-white/5'
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
