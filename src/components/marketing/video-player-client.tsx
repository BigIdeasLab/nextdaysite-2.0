'use client'

import { useState } from 'react'

interface VideoPlayerClientProps {
  src: string
}

export function VideoPlayerClient({ src }: VideoPlayerClientProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoSrc, setVideoSrc] = useState(src)

  const handleCanPlayThrough = () => {
    console.log('Video can play through')
    setVideoLoaded(true)
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.target as HTMLVideoElement
    console.error(
      'Video error:',
      videoElement.error?.code,
      videoElement.error?.message,
    )
    if (videoSrc !== '/Scene-1.mp4') {
      console.log('Attempting to load fallback video: /Scene-1.mp4')
      setVideoSrc('/Scene-1.mp4')
      setVideoLoaded(false) // Show loading screen again for fallback
    } else {
      setVideoLoaded(true) // To hide loading screen even on error if fallback also fails
    }
  }

  return (
    <>
      {!videoLoaded && (
        <div className='w-full max-w-[1022px] h-[550px] bg-gray-300 dark:bg-gray-700 rounded-[20px] md:rounded-[30px] animate-pulse flex items-center justify-center text-gray-500'></div>
      )}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        onCanPlayThrough={handleCanPlayThrough}
        onError={handleError}
        className={`w-full max-w-[1022px] h-auto rounded-[20px] md:rounded-[30px] ${videoLoaded ? '' : 'hidden'}`}
      />
    </>
  )
}
