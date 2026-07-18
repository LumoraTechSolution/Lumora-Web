'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GradientTextProps {
  children: ReactNode
  className?: string
  animated?: boolean
}

export function GradientText({
  children,
  className = '',
  animated = false,
}: GradientTextProps) {
  return (
    <motion.span
      className={`text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary ${className}`}
      animate={animated ? {
        backgroundPosition: ['0%', '100%', '0%'],
      } : undefined}
      transition={animated ? {
        duration: 4,
        repeat: Infinity,
        ease: 'linear',
      } : undefined}
    >
      {children}
    </motion.span>
  )
}
