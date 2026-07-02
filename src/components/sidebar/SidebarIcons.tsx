import { motion } from 'motion/react'
import type { FC, SVGProps } from 'react'
import { SPRING_HOVER } from './SidebarMotion'

interface SidebarIconProps {
  icon: FC<SVGProps<SVGSVGElement>>
  accent?: string
  isActive: boolean
  onClick: () => void
}

export default function SidebarIcon({
  icon: Icon, accent, isActive, onClick,
}: SidebarIconProps) {
  return (
    <motion.button
      className="relative flex items-center justify-center w-10 h-10 rounded-[12px] cursor-pointer outline-none border-none bg-transparent select-none group"
      onClick={onClick}
      whileHover={{ y: -1, transition: SPRING_HOVER }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Background glow ring - visible on hover or active */}
      <motion.span
        className="absolute inset-0 rounded-[12px] pointer-events-none"
        initial={false}
        animate={{
          background: isActive && accent
            ? `${accent}08`
            : 'rgba(255,255,255,0)',
          boxShadow: isActive && accent
            ? `inset 0 0 12px ${accent}14`
            : 'inset 0 0 0px transparent',
        }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Hover background */}
      <span className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{ background: 'rgba(255,255,255,0.03)' }}
      />

      {/* Icon */}
      <Icon className="w-[18px] h-[18px] relative z-[1]"
        strokeWidth={1.5}
        style={{
          color: isActive && accent
            ? accent
            : 'rgba(255,255,255,0.28)',
          filter: isActive && accent
            ? `drop-shadow(0 0 4px ${accent}40)`
            : 'none',
          transition: 'color 0.15s ease, filter 0.15s ease',
        }}
      />

      {/* Active indicator dot */}
      <motion.span
        className="absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-[4px] h-[4px] rounded-full z-[1]"
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 0.4,
          background: accent || '#00D9FF',
          boxShadow: isActive && accent ? `0 0 6px ${accent}` : '0 0 0px transparent',
        }}
        transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      />
    </motion.button>
  )
}
