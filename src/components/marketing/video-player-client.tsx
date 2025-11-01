'use client'

interface VideoPlayerClientProps {
  src: string
}

export function VideoPlayerClient({ src }: VideoPlayerClientProps) {
  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      onError={(e) => console.error('Video error:', e)}
      className='w-full max-w-[1022px] h-auto rounded-[20px] md:rounded-[30px]'
    />
  )
}
