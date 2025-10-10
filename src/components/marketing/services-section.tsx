import Image from 'next/image'

const services = [
  {
    title: 'Mobile App',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/1fc4cf3e8dbe63c7f530ab12596418b370bd1440?width=258',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/8cd81b4f0580ad1f88bfb579b104f844f21923df?width=258',
  },
  {
    title: 'Website Development',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/a2f586af21e6847c00a22473109f29a0a18c2a8e?width=258',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/7ac3dfc3296745a18e0fd358682c44e64c525342?width=258',
  },
  {
    title: 'Branding',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/eb5991f5e5a8f4261fc3e275d221a92d84f050b8?width=258',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/9b69edc45f1d15018aa818cb039100b80821295d?width=258',
  },
  {
    title: 'Brand Guidelines',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/57f2c63e2709a34037de4b65ac806827f58c46cf?width=258',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/a8f74c8de15de7d87f041c7334785e24176d63de?width=258',
  },
  {
    title: 'Visual Identity Design',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/56fbab2ef6d690e22c583f354f5eb8a7bc9057c1?width=258',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/094472ea609833ad2227dfb81fcb066a6c0c8668?width=258',
  },
  {
    title: 'CMS Integration',
    image1:
      'https://api.builder.io/api/v1/image/assets/TEMP/80ebad8ab7e467a56ab29ec349fe793b07faa019?width=258',
    image2:
      'https://api.builder.io/api/v1/image/assets/TEMP/20d1f38a74dcf5f1bd664af738a39acfe8c592dd?width=258',
  },
]

export function ServicesSection() {
  return (
    <section className='w-full px-5 py-0 md:px-12 md:py-16 lg:px-52'>
      <div className='mx-auto w-full max-w-5xl overflow-hidden rounded-[11px] bg-[#161616] md:rounded-[50px]'>
        <div className='flex flex-col gap-0 bg-[#2A2A2A] md:grid md:grid-cols-2 md:gap-px lg:grid-cols-3'>
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`flex flex-col items-center gap-6 bg-[#161616] px-6 py-11 md:gap-8 md:p-12 ${
                index !== services.length - 1
                  ? 'border-b border-[#2A2A2A] md:border-b-0'
                  : ''
              }`}
            >
              <div className='relative flex h-[126px] w-[228px] items-center justify-center md:h-38 md:w-full'>
                <Image
                  src={service.image1}
                  alt={`${service.title} preview 1`}
                  width={129}
                  height={97}
                  className='absolute left-0 top-1 -rotate-[12deg] rounded border-[7px] border-[#393939] shadow-[5px_3px_12px_0_rgba(0,0,0,0.25)] md:border-8 md:shadow-[6px_4px_15px_0_rgba(0,0,0,0.25)]'
                />
                <Image
                  src={service.image2}
                  alt={`${service.title} preview 2`}
                  width={129}
                  height={97}
                  className='absolute right-0 top-0 rotate-[14deg] rounded border-[7px] border-[#393939] shadow-[0_3px_28px_0_rgba(0,0,0,0.15)] md:border-8 md:shadow-[0_4px_34px_0_rgba(0,0,0,0.15)]'
                />
              </div>
              <h3 className='text-center text-[19px] font-medium leading-[20px] text-white md:text-2xl'>
                {service.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
