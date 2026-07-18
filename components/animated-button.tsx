'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  disabled?: boolean
}

export function AnimatedButton({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
}: AnimatedButtonProps) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2'

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-primary to-accent text-background hover:shadow-lg hover:shadow-primary/50',
    secondary:
      'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    outline:
      'border border-primary/50 text-primary hover:bg-primary/10',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`}
    >
      {children}
    </motion.button>
  )
}
