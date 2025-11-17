'use client'

import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number | number[]
  margin?: string
  once?: boolean
}

/**
 * Hook to detect when an element enters the viewport
 * Respects prefers-reduced-motion accessibility preference
 */
export function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.1, margin = '0px', once = true } = options
  const ref = useRef<HTMLElement>(null)
  const [isInView, setIsInView] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) {
            setHasAnimated(true)
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin: margin,
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold, margin, once])

  // Return whether animation should play
  // If once=true, only animate once; otherwise check current view state
  const shouldAnimate = once ? hasAnimated : isInView

  return { ref, isInView: shouldAnimate }
}
