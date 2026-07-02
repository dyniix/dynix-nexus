import { motion } from 'motion/react'
import { useState, useEffect, useRef } from 'react'

interface Stage {
  label: string
  duration: number
}

const BOOT: Stage[] = [
  { label: 'Initializing Runtime', duration: 200 },
  { label: 'Loading Core Shell', duration: 250 },
  { label: 'Preparing Workspace', duration: 200 },
  { label: 'Ready', duration: 100 },
]

/* Future modules that will hook into this pipeline:
   Media Encoder | Memory Junction | Chronicles | Station Manager
   Runtime Monitor | Plugin Registry | AI Bridge */

export default function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef<number>(0)

  useEffect(() => {
    if (phase >= BOOT.length) {
      onComplete()
      return
    }
    const d = BOOT[phase].duration
    start.current = performance.now()

    const tick = (now: number) => {
      const elapsed = now - start.current
      const pct = Math.min((elapsed / d) * 100, 100)
      setProgress(pct)
      if (elapsed < d) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setPhase((p) => p + 1)
        setProgress(0)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [phase, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-nexus-900"
      exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.25, 1, 0.5, 1] } }}
    >
      <div className="flex items-center gap-2 mb-6">
        <span className="w-1 h-1 rounded-full bg-cyan-500" />
        <motion.span
          className="text-cyan-400 text-xs font-mono tracking-[0.25em] uppercase"
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Dynix Nexus
        </motion.span>
      </div>

      <div className="relative w-[200px] h-[2px] bg-nexus-600 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute left-0 top-0 h-full bg-cyan-500 rounded-full"
          style={{ width: `${progress}%` }}
          layout
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-cyan-500/15 blur-sm" style={{ width: `${progress}%` }} />
      </div>

      <motion.div
        key={phase}
        className="text-nexus-500 text-[10px] font-mono tracking-wider"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {phase < BOOT.length ? BOOT[phase].label : ''}
      </motion.div>
    </motion.div>
  )
}
