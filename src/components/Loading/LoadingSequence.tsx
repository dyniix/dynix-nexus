import { motion } from 'motion/react'
import { useState, useEffect } from 'react'

const LOADING_PHASES = [
  { label: 'Initializing', duration: 600 },
  { label: 'Loading modules', duration: 800 },
  { label: 'Establishing bridge', duration: 500 },
  { label: 'Runtime ready', duration: 400 },
]

export default function LoadingSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (phase >= LOADING_PHASES.length) {
      const t = setTimeout(onComplete, 400)
      return () => clearTimeout(t)
    }

    const phaseDuration = LOADING_PHASES[phase].duration
    const interval = 16
    const steps = phaseDuration / interval
    let step = 0

    const timer = setInterval(() => {
      step++
      setProgress(Math.min((step / steps) * 100, 100))
      if (step >= steps) {
        clearInterval(timer)
        setPhase((p) => p + 1)
        setProgress(0)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [phase, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-nexus-900"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
    >
      <motion.div
        className="text-cyan-400 text-xs font-mono mb-3 tracking-[0.2em] uppercase"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Dynix Nexus
      </motion.div>

      <div className="relative w-[180px] h-[2px] bg-nexus-600 rounded-full overflow-hidden mb-4">
        <motion.div
          className="absolute left-0 top-0 h-full bg-cyan-500 rounded-full"
          style={{ width: `${progress}%` }}
          layout
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-cyan-500/20 blur-sm" style={{ width: `${progress}%` }} />
      </div>

      <motion.div
        key={phase}
        className="text-nexus-400 text-xs font-mono"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        {phase < LOADING_PHASES.length ? LOADING_PHASES[phase].label : 'Starting...'}
      </motion.div>
    </motion.div>
  )
}
