import Image from 'next/image'

const services = [
  {
    title: 'Mobile App',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/3731552d5863c43a5a2f08857cba1d69a15cb94e?width=312',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/8dff95b352e06384b2cbda0bdd8725f069cc30ad?width=312',
  },
  {
    title: 'Website Development',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/bcd0a9697d8bd367df1ac05abe35fc8a1cde216a?width=312',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/b0b73585d7a96b90c669067d21eea15c1bfa8961?width=312',
  },
  {
    title: 'Branding',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/101deed4b9cf5b74e3e01517533eee8300027235?width=312',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/fcdaa423367af7aefa4eacc6f124258faec78c22?width=312',
  },
  {
    title: 'Brand Guidelines',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/7405f57af81f2bd036a724dd4a86c7d21c28cbb4?width=312',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/f4b13c36da799c8960df0fcef21f25af1a731d02?width=312',
  },
  {
    title: 'Visual Identity Design',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/fec7d66da14c0e42280dc3161f7e3da336357a21?width=312',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/50ff04a4fd137080f7e30e85d5656eb56e913d71?width=312',
  },
  {
    title: 'CMS Integration',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/16b2c7cfd009aaad8243821ffaad2561284da536?width=312',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/bd519a768c9545511ccef3b4019d1595dc849ddc?width=312',
  },
]

export function ServicesSection() {
  return (
    <section className='bg-[#131313]'>
      <div className='w-full bg-black px-5 py-[106px] rounded-t-[20px] md:rounded-t-[50px] md:px-12 md:py-26 lg:px-52'>
        <div className='mx-auto flex w-full max-w-[1022px] flex-col items-center gap-16'>
          <h2 className='text-center font-medium text-[#F7F6FF] text-[clamp(1.75rem,5vw,2.5rem)] leading-tight'>
            Our Services
          </h2>
          <div className='w-full overflow-hidden rounded-[20px] bg-[#161616] md:rounded-[50px]'>
            <div className='grid grid-cols-1 gap-px bg-[#2A2A2A] md:grid-cols-2 lg:grid-cols-3'>
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

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className='flex flex-col items-center gap-4 bg-[#161616] px-4 py-8 sm:gap-[36px] sm:px-8 sm:py-[50px]'>
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
            src={service.image1}
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
            src={service.image2}
            alt={`${service.title} preview 2`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            objectFit='cover'
          />
        </div>
      </div>
      <h3 className='text-center font-medium leading-[24px] text-white text-[clamp(1.25rem,5vw,1.4375rem)]'>
        {service.title}
      </h3>
    </div>
  )
}
