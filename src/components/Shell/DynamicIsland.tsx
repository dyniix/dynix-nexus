import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { runtime } from '../../bridge'

interface Metric {
  label: string
  value: string
  color: string
}

export default function DynamicIsland() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { label: 'STATE', value: '…', color: 'text-nexus-400' },
    { label: 'QUEUE', value: '…', color: 'text-nexus-400' },
    { label: 'GPU', value: '…', color: 'text-nexus-500' },
    { label: 'MEM', value: '…', color: 'text-nexus-500' },
  ])

  useEffect(() => {
    let mounted = true
    const poll = async () => {
      try {
        const m = await runtime.getMetrics()
        if (!mounted) return
        setMetrics([
          {
            label: 'STATE',
            value: m.state.toUpperCase(),
            color: m.state === 'idle' ? 'text-nexus-400' : m.state === 'processing' ? 'text-cyan-400' : 'text-nexus-400',
          },
          { label: 'QUEUE', value: String(m.queueLength), color: 'text-nexus-400' },
          {
            label: 'GPU',
            value: m.gpuUtilization !== null ? `${m.gpuUtilization}%` : '—',
            color: m.gpuUtilization !== null ? 'text-nexus-400' : 'text-nexus-500',
          },
          {
            label: 'MEM',
            value: m.vramUsedMb !== null ? `${m.vramUsedMb}MB` : '—',
            color: m.vramUsedMb !== null ? 'text-nexus-400' : 'text-nexus-500',
          },
        ])
      } catch {
        if (!mounted) return
      }
    }
    poll()
    const interval = setInterval(poll, 3000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: -20, opacity: 0, scale: 0.95 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="dynix-glass-strong rounded-full px-5 py-2 flex items-center gap-5 dynix-glow select-none">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-[pulse-glow_2s_ease-in-out_infinite]" />
          <span className="text-cyan-400 text-[10px] font-mono tracking-[0.15em] uppercase">
            Nexus
          </span>
        </div>

        <div className="w-px h-4 bg-nexus-500" />

        <div className="flex items-center gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono tracking-[0.1em] text-nexus-500 uppercase">
                {m.label}
              </span>
              <span className={`text-[11px] font-mono ${m.color}`}>
                {m.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
