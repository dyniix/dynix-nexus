import { motion } from 'motion/react'
import { useState } from 'react'

interface ModuleEntry {
  id: string
  icon: string
  label: string
  active?: boolean
}

const MODULES: ModuleEntry[] = [
  { id: 'dashboard', icon: '◇', label: 'Dashboard', active: true },
  { id: 'encoder', icon: '▣', label: 'Media Encoder' },
  { id: 'memory', icon: '◎', label: 'Memory' },
  { id: 'stations', icon: '⊕', label: 'Stations' },
  { id: 'logs', icon: '≡', label: 'Logs' },
  { id: 'settings', icon: '⚙', label: 'Settings' },
]

export default function CapsuleSidebar() {
  const [expanded, setExpanded] = useState(false)
  const [active, setActive] = useState('dashboard')

  return (
    <motion.div
      className="fixed left-4 top-1/2 -translate-y-1/2 z-30"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="dynix-glass-strong rounded-2xl py-3 flex flex-col items-center gap-1 dynix-glow"
        animate={{ width: expanded ? 200 : 56 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {MODULES.map((mod) => (
          <button
            key={mod.id}
            onClick={() => setActive(mod.id)}
            className={`
              flex items-center gap-3 w-full px-3 py-2 rounded-xl transition-colors duration-200
              ${active === mod.id
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-nexus-500 hover:text-nexus-300 hover:bg-nexus-700/50'
              }
            `}
            style={{ minHeight: 36 }}
          >
            <span className="text-base flex-shrink-0 w-5 text-center">{mod.icon}</span>
            <motion.span
              className="text-xs font-mono tracking-wide whitespace-nowrap overflow-hidden"
              animate={{
                opacity: expanded ? 1 : 0,
                width: expanded ? 'auto' : 0,
              }}
              transition={{ duration: 0.2 }}
            >
              {mod.label}
            </motion.span>
          </button>
        ))}
      </motion.div>
    </motion.div>
  )
}
