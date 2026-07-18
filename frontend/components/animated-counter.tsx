'use client'

import { motion, useMotionValue, useTransform, useEffect } from 'framer-motion'
import { useRef, useState } from 'react'

interface AnimatedCounterProps {
  from?: number
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  className?: string
}

export function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) =>
    Math.round(latest).toLocaleString()
  )
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          count.set(to)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [count, to, isVisible])

  useEffect(() => {
    if (isVisible) {
      const controls = count.animation
      if (controls && controls.stop) {
        controls.stop()
      }
      const animation = count.animate(to, {
        duration,
        ease: 'easeOut',
      })
      return () => animation?.stop?.()
    }
  }, [isVisible, count, to, duration])

  return (
    <motion.div ref={ref} className={className}>
      <motion.span>
        {prefix}
        {rounded}
        {suffix}
      </motion.span>
    </motion.div>
  )
}
