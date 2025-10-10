const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    quote:
      'NextDaySite delivered our website in 24 hours. The AI-powered design process was incredible!',
    avatar: 'pattern0_2378_470',
    bgColor: '#1A1A1A',
    borderColor: '#2B2B2B',
    textColor: '#9A9EA2',
    position: 'left-0 top-[70px] -rotate-6',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    quote:
      'The quality exceeded our expectations. Professional, fast, and exactly what we needed.',
    avatar: 'pattern0_2378_489',
    bgColor: '#8181FF',
    borderColor: '#BFBFFF',
    textColor: '#FFF',
    position: 'right-0 md:right-1/4 top-[65px] rotate-[2.2deg]',
  },
  {
    id: 3,
    name: 'Marcus Rodriguez',
    quote:
      'From concept to launch in one day. Our sales increased 40% with the new desig',
    avatar: 'pattern0_2378_508',
    bgColor: '#FF8C00',
    borderColor: '#FFC175',
    textColor: '#FFF',
    position: 'left-1/3 top-0 rotate-[2.3deg]',
  },
  {
    id: 4,
    name: 'Lisa Chen',
    quote:
      'A seamless integration of user feedback led to a 30% boost in engagement.',
    avatar: 'pattern0_2378_527',
    bgColor: '#8181FF',
    borderColor: '#BFBFFF',
    textColor: '#FFF',
    position: 'left-[19px] bottom-0 rotate-[3.32deg]',
  },
  {
    id: 5,
    name: 'Eddie Patel',
    quote:
      'Revamping our UX strategy cut down customer support queries by 25%.',
    avatar: 'pattern0_2378_546',
    bgColor: '#1A1A1A',
    borderColor: '#2B2B2B',
    textColor: '#9A9EA2',
    position: 'left-1/3 md:left-[378px] bottom-12 -rotate-[0.18deg]',
  },
  {
    id: 6,
    name: 'Sofia Gomez',
    quote:
      'Innovative features introduced last quarter have driven a 50% increase in subscriptions.',
    avatar: 'pattern0_2378_565',
    bgColor: '#00A555',
    borderColor: '#34FF9D',
    textColor: '#FFF',
    position: 'right-0 bottom-0 -rotate-[2.43deg]',
  },
]

export function TestimonialsSection() {
  return (
    <section className='relative w-full overflow-hidden rounded-t-[50px] bg-[#131313] px-6 py-16 md:px-12 lg:px-52'>
      <div className='absolute inset-0 top-[155px] rounded-t-[50px] bg-black' />
      <div className='relative mx-auto w-full max-w-5xl'>
        <h2 className='mb-16 text-center text-4xl font-medium text-white'>
          Our Outstanding Result
        </h2>

        <div className='relative mx-auto h-[900px] w-full max-w-4xl md:h-[750px]'>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`absolute flex h-[356px] w-[317px] flex-col gap-8 rounded-[28px] border-2 p-8 ${testimonial.position}`}
              style={{
                backgroundColor: testimonial.bgColor,
                borderColor: testimonial.borderColor,
              }}
            >
              <div className='flex flex-col items-center gap-4'>
                <div className='h-12 w-12 overflow-hidden rounded-full bg-gray-400' />
                <p className='text-center text-2xl font-medium text-white'>
                  {testimonial.name}
                </p>
              </div>

              <p
                className='text-center text-[22px] leading-6'
                style={{ color: testimonial.textColor }}
              >
                {testimonial.quote}
              </p>

              <div className='mt-auto flex items-center justify-center'>
                <svg
                  width='107'
                  height='27'
                  viewBox='0 0 110 39'
                  fill='none'
                  className='h-7 w-[107px]'
                >
                  <g clipPath='url(#clip0)'>
                    <path
                      d='M35.086 15.85C32.8899 16.0809 31.5292 17.1492 30.9245 18.9407L30.6205 16.586L27.2201 16.9434L29.208 35.8567L32.9594 35.4624L32.2107 28.3386C33.1833 29.6391 34.6356 30.2597 36.5791 30.0555C40.288 29.6656 42.3711 26.5961 41.9187 22.2917C41.4694 18.0164 38.7949 15.4602 35.086 15.85Z'
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
