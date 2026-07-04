import { motion } from 'motion/react'
import { useState, useCallback, useRef, useEffect } from 'react'
import Lenis from 'lenis'

const EASE = [0.25, 1, 0.5, 1] as const
const EASE_OUT = [0.16, 1, 0.3, 1] as const

type RuntimeState = 'idle' | 'healthy' | 'warning' | 'error'

const STATE: RuntimeState = 'idle'

const STATE_CFG: Record<RuntimeState, { label: string; color: string }> = {
  idle: { label: 'Idle', color: 'rgba(255,255,255,0.3)' },
  healthy: { label: 'Healthy', color: '#22C55E' },
  warning: { label: 'Warning', color: '#F59E0B' },
  error: { label: 'Error', color: '#EF4444' },
}

const cfg = STATE_CFG[STATE]
const PANEL_W = 720

const MODULES = [
  { name: 'Media Encoder', state: 'ready' as const, desc: 'Image Understanding', ver: 'v0.1' },
  { name: 'Memory Junction', state: 'prototype' as const, desc: 'Session Intelligence', ver: '—' },
  { name: 'Chronicles', state: 'inactive' as const, desc: 'Knowledge Archive', ver: '—' },
  { name: 'Station Manager', state: 'inactive' as const, desc: 'Ecosystem Coordination', ver: '—' },
]

const MOD_STATE: Record<string, { dot: string; label: string; text: string }> = {
  ready: { dot: 'bg-green-500', label: 'Ready', text: 'text-green-400' },
  prototype: { dot: 'bg-yellow-500', label: 'Prototype', text: 'text-yellow-400' },
  inactive: { dot: 'bg-nexus-500', label: 'Coming Soon', text: 'text-nexus-500' },
}

const TIMELINE = [
  { time: '11:24', event: 'Runtime entered idle state' },
  { time: '11:22', event: 'Module loaded: Media Encoder' },
  { time: '11:20', event: 'Runtime started' },
]

const ACTIONS = [
  { id: 'encoder', icon: '▣', label: 'Open Encoder' },
  { id: 'settings', icon: '⚙', label: 'Settings' },
  { id: 'logs', icon: '≡', label: 'Logs' },
  { id: 'config', icon: '◈', label: 'Runtime Config' },
]

/* ── Stagger ── */

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE } },
}

/* ── Component ── */

export default function DynamicIsland({ active: _active }: { active: boolean }) {
  const [expanded, setExpanded] = useState(false)
  const [everExpanded, setEverExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!expanded) return
    const el = scrollRef.current
    if (!el) return

    const lenis = new Lenis({
      wrapper: el,
      content: el.children[0] as HTMLElement,
      eventsTarget: el,
      duration: 0.5,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      autoResize: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [expanded])

  const handleClick = useCallback(() => {
    setExpanded(p => !p)
    if (!expanded) setEverExpanded(true)
    setHovered(false)
  }, [expanded])

  return (
    <>
      {/* Preload backdrop-filter shader — always compiled, GPU ready */}
      <div aria-hidden style={{ position: 'fixed', left: -9999, top: -9999, width: 1, height: 1, backdropFilter: 'blur(5px)' }} />

      {/* Backdrop blur + dim — blur pre-compiled, opacity toggles only */}
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.24, ease: EASE }}
        style={{
          background: 'rgba(0, 0, 0, 0.15)',
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
          willChange: 'backdrop-filter, opacity',
        }}
      />

      {/* ── Static ambient glow — follows island optical center ── */}
      <div
        className="fixed pointer-events-none rounded-full z-30"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: 62,
          width: PANEL_W + 40,
          height: 80,
          opacity: 0.3,
          background: `radial-gradient(ellipse at center, ${cfg.color}06 0%, transparent 65%)`,
        }}
      />

      {/* ── Island + Panel — optically centered, always in DOM ──
           pointer-events:none on wrapper so this fixed z-50 layer
           does NOT steal wheel events from workspace content below. */}
      <div
        className="fixed top-3 z-50 flex flex-col items-center pointer-events-none"
        style={{ left: '50%', transform: 'translateX(-50%)' }}
      >
        {/* ── Island Pill — static shape, no layout animation ── */}
        <motion.div
          className="dynix-glass-premium rounded-full select-none pointer-events-auto"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={handleClick}
          style={{
            cursor: 'pointer',
            minWidth: 192,
            willChange: 'transform',
            boxShadow: expanded
              ? '0 0 30px rgba(245, 158, 11, 0.16), 0 0 60px rgba(245, 158, 11, 0.09), 0 0 100px rgba(245, 158, 11, 0.04)'
              : hovered
                ? `0 0 28px ${cfg.color}22, 0 0 56px ${cfg.color}11, 0 0 80px ${cfg.color}08`
                : '0 0 12px rgba(0, 217, 255, 0.04)',
          }}
          animate={{ scale: [1, 1.012, 1] }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: EASE_OUT } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.1, ease: EASE_OUT } }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Text optically centered — dot floats absolute to the left */}
          <div className="flex items-center justify-center px-6 py-[14px]">
            <span className="relative inline-flex items-center">
              <motion.div
                className="absolute rounded-full"
                style={{
                  left: -20,
                  top: '50%',
                  translate: '0 -50%',
                  width: 8,
                  height: 8,
                  backgroundColor: cfg.color,
                }}
                animate={
                  STATE === 'idle' || STATE === 'healthy'
                    ? { opacity: [0.3, 0.9, 0.3] }
                    : { opacity: [0.5, 1, 0.5], scale: [1, 1.1, 1] }
                }
                transition={
                  STATE === 'idle'
                    ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                    : STATE === 'healthy'
                      ? { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
                      : { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
                }
              />
              <span className="text-cyan-400 text-[11px] font-mono tracking-[0.15em] uppercase leading-none">
                DYNIX NEXUS
              </span>
            </span>
          </div>
        </motion.div>

        {/* ── Runtime Panel — pre-rendered at full scale from mount ──
             First expand: only opacity animates (content already compiled).
             Subsequent collapses use scaleY. */}
        <motion.div
          className="dynix-glass-premium"
          initial={{ opacity: 0, scaleY: 1 }}
          animate={
            expanded
              ? { opacity: 1, scaleY: 1 }
              : everExpanded
                ? { opacity: 0, scaleY: 0 }
                : { opacity: 0, scaleY: 1 }
          }
          style={{
            width: PANEL_W,
            borderRadius: '16px',
            marginTop: 8,
            overflow: 'hidden',
            transformOrigin: 'top',
            pointerEvents: expanded ? 'auto' : 'none',
            willChange: 'transform, opacity',
          }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div ref={scrollRef} className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
            <motion.div
              className="p-6 pt-5 space-y-5"
              variants={containerV}
              initial="hidden"
              animate={expanded ? 'show' : 'hidden'}
            >
              {/* System Cards */}
              <motion.div className="grid grid-cols-4 gap-3" variants={itemV}>
                <SysCard label="Runtime" value="Online" sub="v0.1 Alpha" dot />
                <GpuCard />
                <MemCard />
                <QueueCard />
              </motion.div>

              {/* Module Cards */}
              <motion.div className="grid grid-cols-4 gap-3" variants={itemV}>
                {MODULES.map((mod) => {
                  const st = MOD_STATE[mod.state]
                  return (
                    <div key={mod.name} className="rounded-xl bg-nexus-800/50 border border-nexus-700/40 p-3">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${st.dot}`} />
                        <span className="text-[10px] font-mono text-nexus-300 tracking-wide">{mod.name}</span>
                      </div>
                      <div className={`text-[9px] font-mono ${st.text} mb-0.5`}>{st.label}</div>
                      <div className="text-[9px] font-mono text-nexus-500 leading-tight">{mod.desc}</div>
                    </div>
                  )
                })}
              </motion.div>

              {/* Timeline + Performance */}
              <motion.div className="grid grid-cols-2 gap-3" variants={itemV}>
                <div className="rounded-xl bg-nexus-800/50 border border-nexus-700/40 p-3.5">
                  <div className="text-[8px] font-mono text-nexus-500 tracking-[0.15em] uppercase mb-2.5">Recent Events</div>
                  <div className="space-y-0">
                    {TIMELINE.map((entry, i) => (
                      <div key={i} className="flex items-start gap-3 relative pb-2.5 last:pb-0">
                        {i < TIMELINE.length - 1 && <div className="absolute left-[5px] top-[10px] bottom-0 w-px bg-nexus-700" />}
                        <div className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 mt-0.5 ${i === 0 ? 'border-cyan-400/40 bg-cyan-400/20' : 'border-nexus-600 bg-transparent'}`} />
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-mono text-nexus-300 leading-snug">{entry.event}</div>
                          <div className="text-[9px] font-mono text-nexus-500 mt-0.5">{entry.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl bg-nexus-800/50 border border-nexus-700/40 p-3.5">
                  <div className="text-[8px] font-mono text-nexus-500 tracking-[0.15em] uppercase mb-2.5">Performance</div>
                  <div className="space-y-2.5">
                    <PerfRow label="GPU" value={81} color="bg-cyan-400/60" />
                    <PerfRow label="Memory" value={64} color="bg-cyan-400/40" />
                    <PerfRow label="CPU" value={12} color="bg-green-500/40" />
                  </div>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div className="grid grid-cols-4 gap-3" variants={itemV}>
                {ACTIONS.map((a) => (
                  <button key={a.id} className="dynix-card-utility p-2.5 flex items-center gap-2.5 cursor-pointer hover:bg-nexus-700/30 transition-colors duration-150">
                    <span className="text-sm text-nexus-400 flex-shrink-0">{a.icon}</span>
                    <span className="text-[10px] font-mono text-nexus-400 tracking-wide">{a.label}</span>
                  </button>
                ))}
              </motion.div>

              <motion.div className="text-[8px] font-mono text-nexus-600 text-center tracking-wider" variants={itemV}>
                runtime v0.1 alpha
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

/* ── Subcomponents ── */

function SysCard({ label, value, sub, dot }: { label: string; value: string; sub: string; dot?: boolean }) {
  return (
    <div className="rounded-xl bg-nexus-800/50 border border-nexus-700/40 p-3.5">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[8px] font-mono text-nexus-500 tracking-wider uppercase">{label}</span>
        {dot && <span className="w-2 h-2 rounded-full bg-green-500" />}
      </div>
      <div className="text-sm font-mono text-nexus-100">{value}</div>
      <div className="text-[9px] font-mono text-nexus-500 mt-0.5">{sub}</div>
    </div>
  )
}

function GpuCard() {
  return (
    <div className="rounded-xl bg-nexus-800/50 border border-nexus-700/40 p-3.5">
      <div className="text-[8px] font-mono text-nexus-500 tracking-wider uppercase mb-2">GPU</div>
      <div className="text-sm font-mono text-nexus-100 mb-1">RTX 3050</div>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-sm ${i < 8 ? 'bg-cyan-400/60' : 'bg-nexus-600'}`} />
        ))}
      </div>
      <div className="text-[9px] font-mono text-cyan-400/70 mt-1">81%</div>
    </div>
  )
}

function MemCard() {
  return (
    <div className="rounded-xl bg-nexus-800/50 border border-nexus-700/40 p-3.5">
      <div className="text-[8px] font-mono text-nexus-500 tracking-wider uppercase mb-2">Memory</div>
      <div className="text-sm font-mono text-nexus-100 mb-1">16 GB</div>
      <div className="flex items-center gap-[3px]">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`h-2 flex-1 rounded-sm ${i < 6 ? 'bg-cyan-400/40' : 'bg-nexus-600'}`} />
        ))}
      </div>
      <div className="text-[9px] font-mono text-nexus-400 mt-1">64%</div>
    </div>
  )
}

function QueueCard() {
  return (
    <div className="rounded-xl bg-nexus-800/50 border border-nexus-700/40 p-3.5">
      <div className="text-[8px] font-mono text-nexus-500 tracking-wider uppercase mb-2">Queue</div>
      <div className="text-sm font-mono text-nexus-100 mb-1.5">0 Tasks</div>
      <div className="flex items-center gap-1">
        <span className="text-sm text-green-500">●</span>
        <span className="text-sm text-nexus-600">●</span>
        <span className="text-sm text-nexus-600">●</span>
        <span className="text-sm text-nexus-600">●</span>
        <span className="text-sm text-nexus-600">●</span>
        <span className="text-[9px] font-mono text-nexus-500 ml-1.5">0/5</span>
      </div>
    </div>
  )
}

function PerfRow({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-mono text-nexus-400">{label}</span>
        <span className="text-[10px] font-mono text-nexus-500">{value}%</span>
      </div>
      <div className="h-[5px] rounded-full bg-nexus-700 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.25, delay: 0.15, ease: EASE_OUT }}
        />
      </div>
    </div>
  )
}
