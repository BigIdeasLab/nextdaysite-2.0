const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    quote:
      '"NextDaySite delivered our website in 24 hours. The AI-powered design process was incredible!"',
    bgColor: '#1A1A1A',
    borderColor: '#2B2B2B',
    textColor: '#9A9EA2',
    rotate: '-rotate-[1.43deg]',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    quote:
      'From concept to launch in one day. Our sales increased 40% with the new desig',
    bgColor: '#FF8C00',
    borderColor: '#FFC175',
    textColor: '#FFF',
    rotate: 'rotate-[1.88deg]',
  },
  {
    id: 3,
    name: 'Lisa Chen',
    quote:
      'A seamless integration of user feedback led to a 30% boost in engagement.',
    bgColor: '#8181FF',
    borderColor: '#BFBFFF',
    textColor: '#FFF',
    rotate: 'rotate-[2.59deg]',
  },
  {
    id: 4,
    name: 'Eddie Patel',
    quote:
      'Revamping our UX strategy cut down customer support queries by 25%.',
    bgColor: '#1A1A1A',
    borderColor: '#2B2B2B',
    textColor: '#9A9EA2',
    rotate: '-rotate-[2.09deg]',
  },
  {
    id: 5,
    name: 'Sofia Gomez',
    quote:
      'Innovative features introduced last quarter have driven a 50% increase in subscriptions.',
    bgColor: '#00A555',
    borderColor: '#34FF9D',
    textColor: '#FFF',
    rotate: '-rotate-[1.05deg]',
  },
  {
    id: 6,
    name: 'Marcus Rodriguez',
    quote:
      'The quality exceeded our expectations. Professional, fast, and exactly what we needed."',
    bgColor: '#8181FF',
    borderColor: '#BFBFFF',
    textColor: '#FFF',
    rotate: 'rotate-[2.22deg]',
  },
]

export function TestimonialsSection() {
  return (
    <section className='relative w-full overflow-hidden rounded-t-[20px] bg-[#131313] px-0 py-16 md:rounded-t-[50px] md:px-12 lg:px-52'>
      <div className='mx-auto w-full max-w-5xl px-5 md:px-0'>
        <h2 className='mb-10 text-center text-xl font-medium leading-[45px] text-white md:mb-16 md:text-4xl'>
          Our Outstanding Result
        </h2>

        <div className='grid grid-cols-1 gap-6 md:relative md:mx-auto md:h-[750px] md:max-w-4xl md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`flex h-[164px] w-[146px] flex-col items-center justify-self-center rounded-[13px] border-[0.8px] p-3 md:absolute md:h-[356px] md:w-[317px] md:gap-8 md:rounded-[28px] md:border-2 md:p-8 ${testimonial.rotate} ${getPosition(index)}`}
              style={{
                backgroundColor: testimonial.bgColor,
                borderColor: testimonial.borderColor,
              }}
            >
              <div className='flex flex-col items-center gap-[7px] md:gap-4'>
                <div className='h-[22px] w-[22px] overflow-hidden rounded-full bg-gray-400 md:h-12 md:w-12' />
                <p className='text-center text-[10px] font-medium leading-[11px] text-white md:text-2xl'>
                  {testimonial.name}
                </p>
              </div>

              <p
                className='text-center text-[10px] leading-[11px] md:text-[22px] md:leading-6'
                style={{ color: testimonial.textColor }}
              >
                {testimonial.quote}
              </p>

              <div className='mt-auto flex items-center justify-center'>
                <svg
                  width='48'
                  height='12'
                  viewBox='0 0 48 12'
                  fill='none'
                  className='h-3 w-12 md:h-7 md:w-[107px]'
                >
                  <g clipPath='url(#clip0)'>
                    <path
                      d='M15.8931 4.4675C14.8909 4.4921 14.2366 4.92603 13.8982 5.71471L13.8457 4.63816L12.294 4.67624L12.5101 13.3067L14.2219 13.2647L14.1406 10.014C14.5337 10.6378 15.1685 10.9715 16.0553 10.9497C17.7478 10.9082 18.8014 9.59493 18.7522 7.63078C18.7034 5.67985 17.5855 4.42596 15.8931 4.4675Z'
                      fill='white'
                    />
                    <path
                      d='M22.433 4.30681C20.3947 4.35684 19.2407 5.72911 19.2881 7.62343C19.3355 9.5178 20.5631 10.8389 22.5952 10.789C24.6274 10.7391 25.7814 9.36081 25.7339 7.46523C25.6865 5.5697 24.4712 4.25679 22.433 4.30681Z'
                      fill='white'
                    />
                  </g>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function getPosition(index: number) {
  const positions = [
    'md:left-0 md:top-[70px]',
    'md:right-0 md:top-0 lg:right-1/4 lg:top-[65px]',
    'md:left-1/3 md:bottom-0 lg:left-[19px]',
    'md:right-0 md:bottom-12 lg:left-1/3 lg:bottom-0',
    'md:left-0 md:top-1/2 lg:right-0 lg:bottom-0',
    'md:right-0 md:top-1/2 lg:left-1/2 lg:top-1/2',
  ]
  return positions[index] || ''
}
