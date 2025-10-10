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
    <section className='w-full px-5 py-0 md:px-12 md:py-16 lg:px-52'>
      <div className='mx-auto w-full max-w-[1022px] overflow-hidden rounded-[20px] bg-[#161616] md:rounded-[50px]'>
        <div className='grid grid-cols-1 gap-px bg-[#2A2A2A] md:grid-cols-3'>
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className='flex flex-col items-center gap-[36px] bg-[#161616] px-8 py-[50px]'>
      <div className='relative h-[152px] w-[276px]'>
        <Image
          src={service.image1}
          alt={`${service.title} preview 1`}
          width={156}
          height={117}
          className='absolute left-0 top-[5px] -rotate-[12.233deg] border-8 border-[#393939] shadow-[6px_4px_15px_0_rgba(0,0,0,0.25)]'
        />
        <Image
          src={service.image2}
          alt={`${service.title} preview 2`}
          width={156}
          height={117}
          className='absolute left-[97px] top-0 rotate-[14.114deg] border-8 border-[#393939] shadow-[0_4px_34px_0_rgba(0,0,0,0.15)]'
        />
      </div>
      <h3 className='text-center text-[20px] font-medium leading-[24px] text-white md:text-[23px]'>
        {service.title}
      </h3>
    </div>
  )
}
