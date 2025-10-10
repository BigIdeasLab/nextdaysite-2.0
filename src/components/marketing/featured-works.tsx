import Image from 'next/image'
import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'EcoTrack',
    description:
      'Monitor and optimize environmental impact in real-time through data analytics.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/bcb8d48b109cabb767cfef3995a7ddbf14a6331a?width=1576',
    color: '#545454',
    column: 'left',
  },
  {
    id: 2,
    title: 'HomeNest',
    description:
      'Transform any space into a smart home with customizable automation options.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/d1e3b79c7882105a073f340d0c30a1a900f0c949?width=1598',
    color: '#545454',
    column: 'right',
  },
  {
    id: 3,
    title: 'FitFlex',
    description:
      'Personalized workout and nutrition plans that adapt to user progress and feedback.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/eaf534945d725f799b9272c318be0a739d9d1f45?width=1102',
    color: '#545454',
    column: 'left',
  },
  {
    id: 4,
    title: 'BlockChainEd',
    description:
      'A decentralized platform for learning and sharing blockchain technology skills.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/aad2392e0bb258e9218c5d85571b5c9bf436041b?width=992',
    color: '#545454',
    column: 'right',
  },
  {
    id: 5,
    title: 'TravelSphere',
    description:
      'Curate unique travel experiences based on user preferences and local insights.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/102f3110d5fdd2b33ff7050b860f9718c7afcadb?width=1600',
    color: '#545454',
    column: 'left',
  },
  {
    id: 6,
    title: 'BookCaddy',
    description:
      'A social platform for book lovers to share, review, and recommend their favorite reads.',
    image:
      'https://api.builder.io/api/v1/image/assets/TEMP/573c7ff44d2188cf791374291f32ab1b5507b47f?width=992',
    color: '#545454',
    column: 'right',
  },
]

export function FeaturedWorksSection() {
  const leftColumnProjects = projects.filter(
    (project) => project.column === 'left',
  )
  const rightColumnProjects = projects.filter(
    (project) => project.column === 'right',
  )

  return (
    <section className='w-full rounded-t-[20px] bg-[#131313] px-5 py-[106px] md:rounded-t-[50px] md:px-12 md:py-26 lg:px-52'>
      <div className='mx-auto flex w-full max-w-[1022px] flex-col items-center gap-[60px] md:gap-[100px]'>
        <h2 className='text-center text-[28px] font-medium leading-[35px] text-[#F7F6FF] md:text-[40px] md:leading-[50px]'>
          Our Featured Work
        </h2>

        {/* Mobile: Single column */}
        <div className='flex w-full flex-col items-stretch gap-10 md:hidden'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Desktop: Staggered two-column layout */}
        <div className='hidden w-full md:grid md:grid-cols-2 md:gap-x-5'>
          {/* Left column */}
          <div className='flex flex-col gap-[70px]'>
            {leftColumnProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Right column - offset with margin-top */}
          <div className='mt-[130px] flex flex-col gap-[70px]'>
            {rightColumnProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <Link
          href='/portfolio'
          className='flex h-[48px] items-center justify-center rounded-[30px] border border-[#3E3E3E] px-[26px] text-[20px] font-medium text-white transition-transform hover:scale-105 md:h-[54px] md:text-[23px]'
        >
          See All
        </Link>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
}: {
  project: (typeof projects)[0]
}) {
  return (
    <div className='flex flex-col items-center gap-5'>
      <div
        className='flex h-auto w-full items-center justify-center overflow-hidden rounded-[30px] md:min-h-[575px] md:rounded-[50px]'
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
      <div className='flex w-full flex-col items-start gap-[10px] pt-[5px]'>
        <h3 className='text-[24px] font-medium leading-[31.471px] text-[#F7F6FF] md:text-[32px]'>
          {project.title}
        </h3>
        <p className='text-[16px] leading-[24px] text-[#9BA1A6] md:text-[18px]'>
          {project.description}
        </p>
      </div>
    </div>
  )
}
