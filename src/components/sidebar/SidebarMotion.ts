import type { Transition, Variants } from 'motion/react'

export const SPRING_HOVER: Transition = {
  type: 'spring', stiffness: 600, damping: 32, mass: 0.5,
}

export const SPRING_PANEL: Transition = {
  type: 'spring', stiffness: 500, damping: 35, mass: 0.65,
}

export const SPRING_SELECT: Transition = {
  type: 'spring', stiffness: 500, damping: 30, mass: 0.6,
}

export const SPRING_GLOW: Transition = {
  type: 'spring', stiffness: 200, damping: 20, mass: 1,
}

export const EASE = [0.25, 1, 0.5, 1] as const

/* Panel: fade + slight scale + slide from left */
export const panelReveal: Variants = {
  hidden: { opacity: 0, scale: 0.96, x: -8 },
  visible: {
    opacity: 1, scale: 1, x: 0,
    transition: { type: 'spring', stiffness: 450, damping: 32, mass: 0.7 },
  },
  exit: {
    opacity: 0, scale: 0.96, x: -8,
    transition: { duration: 0.15, ease: EASE },
  },
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: EASE } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.025, delayChildren: 0.08 } },
}
