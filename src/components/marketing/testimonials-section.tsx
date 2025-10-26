const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    quote:
      '"NextDaySite delivered our website in 24 hours. The AI-powered design process was incredible!"',
    avatar:
      'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_470?width=100',
    bgColor: '#1A1A1A',
    borderColor: '#2B2B2B',
    textColor: '#9A9EA2',
    rotate: '-rotate-[6deg]',
    position: 'left-0 top-[70px]',
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    quote:
      'The quality exceeded our expectations. Professional, fast, and exactly what we needed."',
    avatar:
      'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_489?width=100',
    bgColor: '#8181FF',
    borderColor: '#BFBFFF',
    textColor: '#FFF',
    rotate: 'rotate-[2.217deg]',
    position: 'left-[705px] top-[65px]',
  },
  {
    id: 3,
    name: 'Marcus Rodriguez',
    quote:
      'From concept to launch in one day. Our sales increased 40% with the new desig',
    avatar:
      'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_508?width=100',
    bgColor: '#FF8C00',
    borderColor: '#FFC175',
    textColor: '#FFF',
    rotate: 'rotate-[2.3deg]',
    position: 'left-[355px] top-0',
  },
  {
    id: 4,
    name: 'Lisa Chen',
    quote:
      'A seamless integration of user feedback led to a 30% boost in engagement.',
    avatar:
      'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_527?width=100',
    bgColor: '#8181FF',
    borderColor: '#BFBFFF',
    textColor: '#FFF',
    rotate: 'rotate-[3.32deg]',
    position: 'left-[19px] top-[484px]',
  },
  {
    id: 5,
    name: 'Eddie Patel',
    quote:
      'Revamping our UX strategy cut down customer support queries by 25%.',
    avatar:
      'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_546?width=100',
    bgColor: '#1A1A1A',
    borderColor: '#2B2B2B',
    textColor: '#9A9EA2',
    rotate: '-rotate-[0.18deg]',
    position: 'left-[378px] top-[441px]',
  },
  {
    id: 6,
    name: 'Sofia Gomez',
    quote:
      'Innovative features introduced last quarter have driven a 50% increase in subscriptions.',
    avatar:
      'https://api.builder.io/api/v1/image/assets/TEMP/pattern0_2378_565?width=100',
    bgColor: '#00A555',
    borderColor: '#34FF9D',
    textColor: '#FFF',
    rotate: '-rotate-[2.43deg]',
    position: 'left-[719px] top-[524px]',
  },
]

export function TestimonialsSection() {
  return (
    <section className='bg-background transition-colors duration-300'>
      <div className='relative w-full overflow-hidden rounded-t-[20px] bg-[var(--dark-section)] px-5 py-16 md:rounded-t-[50px] md:px-12 md:py-24'>
        <div className='mx-auto w-full max-w-[1051px]'>
          <h2 className='mb-12 text-center text-[28px] font-medium leading-[35px] text-white md:mb-20 md:text-[40px] md:leading-[50px]'>
            Our Outstanding Result
          </h2>

          {/* Mobile: Stacked layout (for screens < md) */}
          <div className='grid grid-cols-1 gap-6 md:hidden'>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Tablet: 2-column grid (for screens>= md and < lg) */}
          <div className='hidden md:grid md:grid-cols-2 md:gap-8 lg:hidden md:justify-items-center'>
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>

          {/* Desktop: Scattered layout (for screens >= lg) */}
          <div className='relative mx-auto hidden h-[893px] w-full max-w-[1051px] lg:block'>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`absolute ${testimonial.position} ${testimonial.rotate}`}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[0]
}) {
  return (
    <div
      className='flex h-auto w-full flex-col items-center gap-6 rounded-[20px] border-[1.2px] p-6 md:h-[356px] md:w-[317px] md:rounded-[28.462px] md:border-[1.779px] md:p-8'
      style={{
        backgroundColor: testimonial.bgColor,
        borderColor: testimonial.borderColor,
      }}
    >
      <div className='flex flex-col items-center gap-[15px]'>
        <div
          className='h-[49px] w-[49px] overflow-hidden rounded-full bg-gray-400'
          style={{
            backgroundImage: `url(${testimonial.avatar})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <p className='text-center text-[18px] font-medium leading-[24.904px] text-white md:text-[22.236px]'>
          {testimonial.name}
        </p>
      </div>

      <p
        className='text-center text-[18px] leading-[22px] md:text-[22.236px] md:leading-[24.904px]'
        style={{ color: testimonial.textColor }}
      >
        {testimonial.quote}
      </p>

      <div className='mt-auto flex items-center justify-center rotate-[6deg]'>
        <ApolloLogo />
      </div>
    </div>
  )
}

function ApolloLogo() {
  return (
    <svg
      width='107'
      height='27'
      viewBox='0 0 110 39'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className='h-[20px] w-[80px] md:h-[27px] md:w-[107px]'
    >
      <g clipPath='url(#clip0_apollo)'>
        <path
          d='M35.086 15.85C32.8899 16.0809 31.5292 17.1492 30.9245 18.9407L30.6205 16.586L27.2201 16.9434L29.208 35.8567L32.9594 35.4624L32.2107 28.3386C33.1833 29.6391 34.6356 30.2597 36.5791 30.0555C40.288 29.6656 42.3711 26.5961 41.9187 22.2917C41.4694 18.0164 38.7949 15.4602 35.086 15.85ZM35.3505 26.8567C33.3192 27.0702 31.797 25.6301 31.5605 23.3804C31.3241 21.1306 32.5119 19.4911 34.5537 19.2765C36.5956 19.0619 37.8959 20.3839 38.1381 22.6891C38.3804 24.9942 37.3791 26.6435 35.3505 26.8567Z'
          fill='white'
        />
        <path
          d='M49.4171 14.3439C44.9505 14.8133 42.657 18.0303 43.0933 22.1816C43.5297 26.3331 46.4568 29.0174 50.9101 28.5493C55.3634 28.0813 57.6556 24.8511 57.2189 20.697C56.7823 16.543 53.8837 13.8744 49.4171 14.3439ZM50.5628 25.2446C48.5182 25.4595 47.0502 24.1258 46.8049 21.7915C46.5595 19.4574 47.7373 17.875 49.7658 17.6618C51.7944 17.4486 53.249 18.757 53.4941 21.0885C53.7391 23.4201 52.6073 25.0297 50.5628 25.2446Z'
          fill='white'
        />
        <path
          d='M60.8473 7.90549L57.0957 8.2998L59.1332 27.6853L62.8848 27.291L60.8473 7.90549Z'
          fill='white'
        />
        <path
          d='M65.8249 7.38206L62.0732 7.77637L64.1107 27.1619L67.8623 26.7675L65.8249 7.38206Z'
          fill='white'
        />
        <path
          d='M74.6269 11.6945C70.1604 12.1639 67.867 15.3809 68.3033 19.5322C68.7396 23.6837 71.6667 26.368 76.1199 25.8999C80.5731 25.4319 82.8629 22.2019 82.4263 18.0478C81.9897 13.8939 79.0911 11.2253 74.6269 11.6945ZM75.7726 22.5952C73.7281 22.8101 72.2571 21.4767 72.0118 19.1424C71.7665 16.8083 72.9444 15.2259 74.9756 15.0124C77.0067 14.7989 78.4589 16.1076 78.704 18.4391C78.9491 20.7706 77.817 22.3803 75.7726 22.5952Z'
          fill='white'
        />
        <path
          d='M85.8394 20.7797C84.7387 20.8954 83.8851 21.8997 84.0024 23.0154C84.1196 24.131 85.1623 24.9468 86.2652 24.8309C87.3687 24.7149 88.219 23.7002 88.1017 22.5845C87.9845 21.4689 86.9429 20.6637 85.8394 20.7797Z'
          fill='white'
        />
        <path
          d='M89.6027 4.75564C88.3721 4.88498 87.4093 5.98349 87.5377 7.20463C87.666 8.42579 88.8055 9.31669 90.0682 9.18397C91.3314 9.0512 92.2873 7.94008 92.1589 6.71892C92.0306 5.49778 90.8339 4.62623 89.6027 4.75564Z'
          fill='white'
        />
        <path
          d='M92.1056 10.387L88.3545 10.7812L89.7921 24.4591L93.5432 24.0648L92.1056 10.387Z'
          fill='white'
        />
        <path
          d='M100.459 8.97965C95.9924 9.44909 93.699 12.6661 94.1353 16.8174C94.5717 20.9688 97.4982 23.6532 101.952 23.1851C106.405 22.717 108.695 19.4871 108.258 15.333C107.822 11.179 104.922 8.51056 100.459 8.97965ZM101.605 19.8803C99.5624 20.095 98.0892 18.7618 97.8438 16.4276C97.5985 14.0935 98.7765 12.511 100.808 12.2976C102.838 12.0841 104.291 13.3928 104.536 15.7242C104.781 18.0558 103.649 19.6655 101.605 19.8803Z'
          fill='white'
        />
        <path
          d='M21.9474 13.0782L18.2598 13.4658L20.5156 16.514L21.9474 13.0782Z'
          fill='white'
        />
        <path
          d='M13.6429 10.663L2.86231 33.5903L9.84935 32.8559C10.7826 32.7578 11.6751 32.4267 12.4371 31.9013C13.2616 31.3319 13.8507 30.5687 14.2781 29.6732C14.7782 28.6259 15.2613 27.5698 15.7502 26.5185L17.0048 23.8267L14.7 20.773L13.9764 22.2516C13.1574 23.999 12.3959 25.7804 11.5401 27.5103C11.1097 28.3768 10.5153 29.218 9.54175 29.5203C9.39591 29.5649 9.24339 29.597 9.08976 29.6185C8.88587 29.6479 8.6806 29.6642 8.47588 29.6857L14.3065 16.9771L25.0088 31.3105L27.6409 31.0339L27.4047 28.7868L27.333 28.693L13.6429 10.663Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_apollo'>
          <rect width='106.731' height='26.6828' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}
