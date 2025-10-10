import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'EcoTrack',
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/b439735db9ea313b460ebbd7b76113eb3c836f34?width=1054',
    color: '#545454',
  },
  {
    id: 2,
    title: 'HomeNest',
    description:
      'Transform any space into a smart home with customizable automation options.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/c6f2885bac90f2795aa075855559eec0d67a60ef?width=1068',
    color: '#545454',
  },
  {
    id: 3,
    title: 'BlockChainEd',
    description:
      'A decentralized platform for learning and sharing blockchain technology skills.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/c074bdad7af4ea3cca542cb40a5a96bd90ab18bf?width=664',
    color: '#545454',
  },
  {
    id: 4,
    title: 'BookCaddy',
    description:
      'A social platform for book lovers to share, review, and recommend their favorite reads.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/aa4dbab25158b9124e8e802bc9bbc0f82538e568?width=663',
    color: '#545454',
  },
  {
    id: 5,
    title: 'FitFlex',
    description:
      'Personalized workout and nutrition plans that adapt to user progress and feedback.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/b6b829c8fc117eb4b4115c1513a1fc733384612a?width=737',
    color: '#545454',
  },
  {
    id: 6,
    title: 'TravelSphere',
    description:
      'Curate unique travel experiences based on user preferences and local insights.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/fd653774ec57d1d574606c3b58e2500ad4757134?width=1070',
    color: '#545454',
  },
]

export function FeaturedWorksSection() {
  return (
    <section className='w-full rounded-t-[20px] bg-[#131313] px-5 py-[106px] md:rounded-t-[50px] md:px-12 md:py-26 lg:px-52'>
      <div className='mx-auto flex w-full max-w-5xl flex-col items-center gap-10 md:gap-20'>
        <h2 className='text-center text-xl font-medium leading-[45px] text-[#F7F6FF] md:text-4xl md:leading-[1.25]'>
          Our Featured Work
        </h2>

        <div className='flex w-full max-w-[335px] flex-col items-stretch gap-10 md:max-w-none md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-12'>
          {projects.map((project) => (
            <div
              key={project.id}
              className='flex flex-col items-center gap-[13px] md:gap-5'
            >
              <div
                className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[20px]'
                style={{ backgroundColor: project.color }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  width={788}
                  height={591}
                  className='h-auto w-full object-cover'
                />
              </div>
              <div className='flex w-full flex-col items-start gap-[7px] px-[3px] pt-[3px] md:gap-2.5 md:px-1 md:pt-1'>
                <h3 className='text-[21px] font-medium leading-[21px] text-[#F7F6FF] md:text-3xl md:leading-tight'>
                  {project.title}
                </h3>
                <p className='text-xs leading-4 text-[#9BA1A6] md:text-lg md:leading-6'>
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href='/portfolio'
          className='flex h-11 items-center justify-center rounded-[30px] border border-[#3E3E3E] px-5 text-lg font-medium text-white transition-transform hover:scale-105 md:h-14 md:px-7 md:text-2xl'
        >
          See All
        </Link>
      </div>
    </section>
  )
}
