export function AboutHero() {
  return (
    <section className='relative flex min-h-[400px] w-full flex-col items-center gap-8 px-6 py-20 md:px-12 lg:px-52'>
      <div className='z-10 flex w-full max-w-[752px] flex-col items-center gap-2.5'>
        <h1 className='text-balance text-center text-5xl font-medium leading-tight text-[#F7F6FF] md:text-6xl md:leading-[1.08]'>
          We develop visually-appealing websites loaded with lead generation and
          conversion features
        </h1>
      </div>

      <div className='showcase-gallery'>
        <div className='showcase-container'>
          <div className='showcase-card'>
            <div className='image-frame'>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/ac3209e0688c18ff1cd1f55a0893cd0bbb2fee0f?width=1576"
                alt="Portfolio showcase 1"
                className='showcase-image'
              />
            </div>
          </div>
          <div className='showcase-card showcase-card-offset'>
            <div className='image-frame'>
              <img
                src="https://api.builder.io/api/v1/image/assets/TEMP/87db368f0daa9ea1c6460cc1f5c4aa2bb51158b1?width=1598"
                alt="Portfolio showcase 2"
                className='showcase-image'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
