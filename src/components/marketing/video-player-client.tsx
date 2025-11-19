'use client'

import { useState, useEffect, useRef } from 'react'

interface VideoPlayerClientProps {
  src: string
}

export function VideoPlayerClient({ src }: VideoPlayerClientProps) {
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [isFallbackActive, setIsFallbackActive] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Reset when src changes
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setVideoLoaded(false)
      setIsFallbackActive(false)
    })
    return () => cancelAnimationFrame(id)
  }, [src])

  const clearVideoTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  // Timeout logic
  useEffect(() => {
    clearVideoTimeout()
    timeoutRef.current = setTimeout(() => {
      if (!videoLoaded && !isFallbackActive) {
        setIsFallbackActive(true)
        setVideoLoaded(false)
      }
    }, 1000)

    return () => clearVideoTimeout()
  }, [videoLoaded, isFallbackActive])

  const handleCanPlayThrough = () => {
    clearVideoTimeout()
    setVideoLoaded(true)
  }

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoElement = e.target as HTMLVideoElement
    clearVideoTimeout()
    if (!isFallbackActive) {
      setIsFallbackActive(true)
      setVideoLoaded(false)
    } else {
      setVideoLoaded(true)
    }
  }

  const videoToPlay = isFallbackActive ? '/Scene-1.mp4' : src

  return (
    <>
      {!videoLoaded && (
        <div className='w-full max-w-[1022px] aspect-video bg-gray-300 dark:bg-gray-700 rounded-[20px] md:rounded-[30px] animate-pulse flex items-center justify-center text-gray-500'></div>
      )}
      <video
        src={videoToPlay}
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
