import { motion } from 'motion/react'
import { useEffect } from 'react'
import {
  Brain, Activity, HardDrive, Archive, ShieldCheck,
  Route, Cpu, BookText,
  Network, Server, GitBranch, Cloud,
} from 'lucide-react'

/* ── Theme ── */

const ACCENT = '#6366F1'
const ACCENT_RGB = '99,102,241'

const c = (o: number) => `rgba(${ACCENT_RGB},${o})`

/* ── Variants ── */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const EASE = [0.25, 1, 0.5, 1] as const

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
}

/* ── Data ── */

const SYSTEM_STATS = [
  { icon: Activity, label: 'Active Stations', value: '8', unit: 'Connected' },
  { icon: HardDrive, label: 'Context Size', value: '4.2', unit: 'MB' },
  { icon: Archive, label: 'Chronicles Indexed', value: '142', unit: 'Entries' },
  { icon: ShieldCheck, label: 'Integrity', value: '100', unit: '%' },
]

const GENESIS_SECTIONS = [
  {
    title: 'Context Amnesia',
    subtitle: 'The Problem',
    body: 'Before Memory Junction, every new project was an isolated island. The AI suffered from context amnesia — each session began with a blank slate. Every new folder meant restarting the relationship, re-explaining the architecture, re-describing the CEO\'s design philosophy. The ecosystem had no memory beyond the current conversation window.',
    icon: Cloud,
  },
  {
    title: 'Persistent Intelligence',
    subtitle: 'The Solution',
    body: 'Memory Junction is the cure. A centralized, persistent source of truth that lives outside any single session. The AI reads from it before every action and writes back every decision. The Junction doesn\'t forget. It doesn\'t reset. It accumulates wisdom across every project, every chronicle, every conversation — making the ecosystem smarter with each interaction.',
    icon: Network,
  },
]

const FLOW_STEPS = [
  { step: 1, title: 'Station Connect', body: 'A local project directory links to the Junction via the Station Manager. The Junction registers its identity, architecture constraints, and context boundaries.', icon: Server },
  { step: 2, title: 'Context Sync', body: 'The AI Engine reads global directives, CEO identity, and established architectures from the Junction before any action. This ensures every generation is grounded in the ecosystem\'s memory.', icon: GitBranch },
  { step: 3, title: 'Execution', body: 'The AI operates within the specific project but thinks using the global brain. Local context merges with ecosystem memory — the best of both worlds.', icon: Cpu },
  { step: 4, title: 'Archiving', body: 'Major architectural decisions are preserved back into the Chronicles. The Memory Junction evolves continuously, learning from every decision the ecosystem makes.', icon: BookText },
]

const DIRECTIVES = [
  'Continuity over features. The ecosystem must never forget its past. Every decision, every architecture choice, every lesson learned is preserved and propagated.',
  'The architecture is independent of the AI model. The AI is replaceable; the Memory Junction is permanent. Models change; wisdom endures.',
  'Implementation must always serve the experience. No abstraction, no optimization, no architectural purity justifies degrading the human-AI interaction.',
]

const ARCH_LAYERS = [
  { label: 'Memory Core', desc: 'The source of truth — a persistent, versioned graph of every decision and directive ever recorded.', icon: Brain },
  { label: 'Station Connector', desc: 'Bridges local project directories to the Junction. Each station registers its identity, scope, and constraints.', icon: Server },
  { label: 'Context Router', desc: 'Delivers relevant context to the AI Engine. Routes queries through the Junction\'s indexed memory graph.', icon: Route },
  { label: 'Chronicle Archiver', desc: 'Preserves architectural decisions back into Chronicles. Ensures the ecosystem\'s memory grows with every session.', icon: Archive },
]

/* ── Component ── */

export default function MemoryJunctionWorkspace() {
  useEffect(() => {
    const onVisible = () => {
      if (document.hidden) return
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          void document.body.offsetHeight
        })
      })
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [])

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="py-14 space-y-20"
      style={{ maxWidth: 1300, paddingLeft: 48, paddingRight: 48 }}
    >
      {/* ── Hero ── */}
      <motion.section variants={item}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center relative"
              style={{
                width: 42, height: 42, borderRadius: 12,
                background: `linear-gradient(145deg, ${c(0.12)}, ${c(0.04)})`,
                border: `1px solid ${c(0.2)}`,
                boxShadow: `0 0 20px ${c(0.06)}`,
              }}
            >
              <Brain size={20} style={{ color: ACCENT }} />
            </div>
            <div>
              <h1 className="font-display font-semibold tracking-tight"
                style={{ fontSize: 24, color: 'rgba(255,255,255,0.88)' }}
              >
                Memory Junction
              </h1>
              <p className="text-[10.5px] font-mono tracking-wide mt-0.5" style={{ color: 'rgba(255,255,255,0.18)' }}>
                CENTRAL INTELLIGENCE &bull; CONTEXT ROUTER
              </p>
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2"
            style={{
              padding: '5px 14px', borderRadius: 20,
              background: 'rgba(34,197,94,0.06)',
              border: '1px solid rgba(34,197,94,0.12)',
              boxShadow: '0 0 12px rgba(34,197,94,0.03)',
            }}
            whileHover={{
              borderColor: 'rgba(34,197,94,0.2)',
              transition: { duration: 0.2 },
            }}
          >
            <motion.span
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: '#22C55E' }}
              animate={{ opacity: [1, 0.3, 1], boxShadow: ['0 0 6px rgba(34,197,94,0.6)', '0 0 2px rgba(34,197,94,0.2)', '0 0 6px rgba(34,197,94,0.6)'] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[9px] font-mono font-medium tracking-[0.12em]" style={{ color: 'rgba(34,197,94,0.7)' }}>
              Neural Link Active
            </span>
          </motion.div>
        </div>
        <div className="relative" style={{ maxWidth: 600 }}>
          <p className="text-[12.5px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            The permanent source of truth for the Dynix ecosystem. Every station, every chronicle, every decision — routed through a single, persistent intelligence layer that never resets, never forgets, and grows smarter with every interaction.
          </p>
        </div>
      </motion.section>

      {/* ── System Stats ── */}
      <motion.section variants={item}>
        <div className="dynix-section-header">
          <div className="dynix-section-header-left">
            <h2 className="dynix-section-title">System Status</h2>
            <p className="dynix-section-desc">Global health &amp; capacity metrics</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {SYSTEM_STATS.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="dynix-floating-panel flex flex-col relative overflow-hidden"
                style={{ padding: '18px 18px 16px' }}
                whileHover={{
                  y: -2,
                  background: 'rgba(28,28,32,0.45)',
                  transition: { type: 'spring', stiffness: 350, damping: 24 },
                }}
              >
                {/* Top accent bar */}
                <div className="absolute top-0 left-3 right-3" style={{ height: 1, background: `${c(0.15)}` }} />
                {/* Icon row */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center"
                      style={{
                        width: 24, height: 24, borderRadius: 6,
                        background: `${c(0.06)}`,
                        border: `1px solid ${c(0.1)}`,
                      }}
                    >
                      <Icon size={11} style={{ color: ACCENT }} />
                    </div>
                    <span className="text-[8px] font-mono tracking-[0.16em] uppercase" style={{ color: 'rgba(255,255,255,0.1)' }}>
                      {stat.label}
                    </span>
                  </div>
                  {/* Activity indicator */}
                  <motion.span
                    className="w-[3px] h-[3px] rounded-full"
                    style={{ background: ACCENT }}
                    animate={{ opacity: [0.2, 0.8, 0.2] }}
                    transition={{ duration: 2 + idx * 0.3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                {/* Value */}
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-semibold tracking-tight"
                    style={{ fontSize: 22, color: 'rgba(255,255,255,0.75)' }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.12)' }}>
                    {stat.unit}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* ── The Genesis ── */}
      <motion.section variants={item}>
        <div className="dynix-section-header">
          <div className="dynix-section-header-left">
            <h2 className="dynix-section-title">The Genesis</h2>
            <p className="dynix-section-desc">Why Memory Junction exists</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {GENESIS_SECTIONS.map((section) => {
            const Icon = section.icon
            return (
              <motion.div
                key={section.title}
                className="dynix-floating-panel flex flex-col relative overflow-hidden"
                style={{ padding: '22px 24px 20px' }}
                whileHover={{
                  y: -1,
                  background: 'rgba(26,26,30,0.4)',
                  transition: { type: 'spring', stiffness: 350, damping: 24 },
                }}
              >
                {/* Top rim */}
                <div className="absolute top-0 left-0 right-0" style={{ height: 1, background: `linear-gradient(90deg, transparent, ${c(0.12)}, transparent)` }} />
                {/* Icon + subtitle */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="flex items-center justify-center"
                    style={{
                      width: 26, height: 26, borderRadius: 7,
                      background: `${c(0.06)}`,
                      border: `1px solid ${c(0.1)}`,
                    }}
                  >
                    <Icon size={12} style={{ color: ACCENT }} />
                  </div>
                  <span className="text-[8px] font-mono tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.1)' }}>
                    {section.subtitle}
                  </span>
                </div>
                {/* Title */}
                <h3 className="font-display font-medium tracking-tight mb-2.5"
                  style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)' }}
                >
                  {section.title}
                </h3>
                {/* Body */}
                <p className="text-[11.5px] leading-[1.75]" style={{ color: 'rgba(255,255,255,0.22)' }}>
                  {section.body}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* ── Architecture Map ── */}
      <motion.section variants={item}>
        <div className="dynix-section-header">
          <div className="dynix-section-header-left">
            <h2 className="dynix-section-title">Architecture Map</h2>
            <p className="dynix-section-desc">Data flow across the ecosystem</p>
          </div>
        </div>
        <div className="dynix-floating-panel relative overflow-hidden"
          style={{ padding: '44px 32px', minHeight: 280 }}
        >
          {/* Ambient glow behind center */}
          <div className="absolute pointer-events-none"
            style={{
              width: '50%', height: '80%', top: '10%', left: '25%',
              background: `radial-gradient(ellipse at center, ${c(0.05)} 0%, transparent 70%)`,
            }}
          />

          {/* Flow diagram */}
          <div className="relative flex flex-col items-center">
            {/* ── Top row: 3 nodes ── */}
            <div className="flex items-center w-full justify-between relative" style={{ maxWidth: 640 }}>
              {/* Left: Stations */}
              <FlowNode label="Local Stations" sub="PROJECTS" highlighted={false} />

              {/* Connector: Stations → Junction */}
              <div className="flex-1 mx-2 relative" style={{ height: 2 }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${c(0.12)}, ${c(0.2)})` }} />
                <ParticleDot color={ACCENT} shadow={c(0.5)} duration={3} delay={0} />
                <ParticleDot color={ACCENT} shadow={c(0.5)} duration={3} delay={1.2} offset />
              </div>

              {/* Center: Memory Junction */}
              <div className="relative z-10">
                <motion.div
                  className="flex flex-col items-center justify-center text-center"
                  style={{
                    width: 190, padding: '18px 12px', borderRadius: 14,
                    background: `linear-gradient(145deg, ${c(0.08)}, ${c(0.02)})`,
                    border: `1px solid ${c(0.25)}`,
                    boxShadow: `0 0 24px ${c(0.06)}, 0 4px 16px rgba(0,0,0,0.25)`,
                  }}
                  animate={{ boxShadow: [`0 0 24px ${c(0.06)}, 0 4px 16px rgba(0,0,0,0.25)`, `0 0 32px ${c(0.1)}, 0 4px 16px rgba(0,0,0,0.25)`, `0 0 24px ${c(0.06)}, 0 4px 16px rgba(0,0,0,0.25)`] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  {/* Scanner ring */}
                  <motion.div
                    className="absolute pointer-events-none"
                    style={{
                      width: '100%', height: '100%', borderRadius: 'inherit',
                      border: `1px solid ${c(0.06)}`,
                      top: 0, left: 0,
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                  <Brain size={16} style={{ color: ACCENT, marginBottom: 6 }} />
                  <span className="text-[12px] font-mono font-semibold tracking-wide" style={{ color: 'rgba(255,255,255,0.8)' }}>
                    MEMORY JUNCTION
                  </span>
                  <span className="text-[8px] font-mono mt-1" style={{ color: 'rgba(255,255,255,0.15)' }}>
                    SOURCE OF TRUTH
                  </span>
                </motion.div>
              </div>

              {/* Connector: Engine → Junction */}
              <div className="flex-1 mx-2 relative" style={{ height: 2 }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${c(0.2)}, ${c(0.12)})` }} />
                <ParticleDot color={ACCENT} shadow={c(0.5)} duration={3} delay={0.6} />
                <ParticleDot color={ACCENT} shadow={c(0.5)} duration={3} delay={1.8} offset />
              </div>

              {/* Right: OpenCode */}
              <FlowNode label="OpenCode Engine" sub="EXECUTION" highlighted={false} />
            </div>

            {/* ── Vertical connector — center → Chronicles ── */}
            <div className="relative my-0" style={{ width: 2, height: 48 }}>
              <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, ${c(0.15)}, ${c(0.06)})`, left: 0 }} />
              <ParticleDot color={ACCENT} shadow={c(0.4)} duration={2.5} delay={0} vertical />
            </div>

            {/* ── Bottom: Chronicles ── */}
            <FlowNode label="Chronicles" sub="HISTORY ARCHIVE" highlighted={false} />
          </div>
        </div>
      </motion.section>

      {/* ── Architecture Layers ── */}
      <motion.section variants={item}>
        <div className="dynix-section-header">
          <div className="dynix-section-header-left">
            <h2 className="dynix-section-title">Architecture Layers</h2>
            <p className="dynix-section-desc">The four pillars of the Junction</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {ARCH_LAYERS.map((layer, i) => {
            const Icon = layer.icon
            return (
              <motion.div
                key={layer.label}
                className="dynix-floating-panel flex flex-col relative overflow-hidden"
                style={{ padding: '18px 16px 16px' }}
                whileHover={{
                  y: -2,
                  background: 'rgba(28,28,32,0.45)',
                  transition: { type: 'spring', stiffness: 350, damping: 24 },
                }}
              >
                {/* Indicator */}
                <div className="absolute top-0 left-3 right-3" style={{ height: 1, background: i === 0 ? `${c(0.2)}` : 'rgba(255,255,255,0.02)' }} />
                {/* Icon */}
                <div className="flex items-center justify-center mb-3"
                  style={{
                    width: 30, height: 30, borderRadius: 8,
                    background: `${c(0.06)}`,
                    border: `1px solid ${c(0.1)}`,
                  }}
                >
                  <Icon size={13} style={{ color: ACCENT }} />
                </div>
                {/* Label */}
                <span className="text-[11px] font-mono font-medium tracking-tight mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {layer.label}
                </span>
                {/* Description */}
                <p className="text-[10px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.15)' }}>
                  {layer.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </motion.section>

      {/* ── Operational Flow ── */}
      <motion.section variants={item}>
        <div className="dynix-section-header">
          <div className="dynix-section-header-left">
            <h2 className="dynix-section-title">Operational Flow</h2>
            <p className="dynix-section-desc">How context moves through the system</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.span
              className="w-[4px] h-[4px] rounded-full"
              style={{ background: ACCENT, boxShadow: `0 0 6px ${c(0.5)}` }}
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="text-[9px] font-mono tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.08)' }}>
              Sequential
            </span>
          </div>
        </div>

        {/* Pipeline stage row */}
        <div className="dynix-floating-panel relative overflow-hidden" style={{ padding: '28px 24px 20px' }}>
          {/* Stage boxes row */}
          <div className="flex items-stretch gap-0 relative mb-6">
            {FLOW_STEPS.map((step) => (
              <div key={step.step} className="flex-1 relative z-10">
                <div className="relative flex flex-col items-center text-center" style={{ padding: '0 8px' }}>
                  {/* Stage glow */}
                  <div className="absolute inset-0 rounded-lg pointer-events-none" style={{
                    background: `radial-gradient(ellipse at center, ${c(0.04)} 0%, transparent 70%)`,
                    opacity: 0,
                    transition: 'opacity 0.5s',
                  }} />
                  {/* Step number */}
                  <div className="flex items-center justify-center mb-2.5"
                    style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: `${c(0.06)}`,
                      border: `1px solid ${c(0.12)}`,
                    }}
                  >
                    <span className="text-[10px] font-mono font-semibold" style={{ color: ACCENT }}>{step.step}</span>
                  </div>
                  {/* Title */}
                  <span className="text-[11px] font-mono font-medium tracking-tight mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {step.title}
                  </span>
                  {/* Body */}
                  <p className="text-[9.5px] leading-[1.65]" style={{ color: 'rgba(255,255,255,0.12)' }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pipeline track */}
          <div className="relative w-full" style={{ height: 2 }}>
            <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 1 }} />
            {/* Progress indicator */}
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ background: `linear-gradient(90deg, ${c(0.3)}, ${c(0.1)})`, borderRadius: 1 }}
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Packet dots */}
            <motion.div
              className="absolute top-1/2"
              style={{
                width: 5, height: 5, borderRadius: '50%',
                background: ACCENT,
                boxShadow: `0 0 8px ${c(0.5)}`,
                marginTop: -2.5,
              }}
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute top-1/2"
              style={{
                width: 3, height: 3, borderRadius: '50%',
                background: ACCENT,
                opacity: 0.4,
                marginTop: -1.5,
              }}
              animate={{ left: ['0%', '100%', '0%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── Prime Directives ── */}
      <motion.section variants={item}>
        <div className="dynix-section-header">
          <div className="dynix-section-header-left">
            <h2 className="dynix-section-title">Prime Directives</h2>
            <p className="dynix-section-desc">The eternal laws governing the ecosystem</p>
          </div>
        </div>
        <motion.div
          className="relative overflow-hidden"
          style={{
            borderRadius: 16,
            background: `linear-gradient(145deg, ${c(0.05)} 0%, rgba(15,12,25,0.3) 100%)`,
            border: `1px solid ${c(0.12)}`,
            boxShadow: `0 0 40px ${c(0.02)}, 0 4px 24px rgba(0,0,0,0.35)`,
            padding: '28px 28px 24px',
          }}
          whileHover={{
            borderColor: c(0.18),
            boxShadow: `0 0 50px ${c(0.03)}, 0 4px 24px rgba(0,0,0,0.35)`,
            transition: { type: 'spring', stiffness: 300, damping: 24 },
          }}
        >
          {/* Top rim glow */}
          <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ height: 1, background: `linear-gradient(90deg, transparent, ${c(0.2)}, transparent)` }} />

          {/* Subtle ambient */}
          <div className="absolute top-[-60px] right-[-60px] pointer-events-none"
            style={{
              width: 200, height: 200,
              background: `radial-gradient(circle, ${c(0.03)} 0%, transparent 70%)`,
            }}
          />

          {DIRECTIVES.map((d, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4 relative"
              style={{ padding: '14px 0' }}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.3, ease: EASE }}
            >
              {/* Vertical connector line */}
              {i < DIRECTIVES.length - 1 && (
                <div className="absolute" style={{ left: 9.5, top: 36, bottom: 0, width: 1, background: `${c(0.06)}` }} />
              )}

              {/* Number badge */}
              <div className="flex-shrink-0 flex items-center justify-center relative z-10"
                style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: `${c(0.08)}`,
                  border: `1px solid ${c(0.2)}`,
                  fontSize: 8.5,
                  fontWeight: 600,
                  fontFamily: "'JetBrains Mono', monospace",
                  color: ACCENT,
                }}
              >
                {i + 1}
              </div>

              {/* Content */}
              <div className="flex-1" style={{ paddingTop: 2 }}>
                <span className="text-[9px] font-mono font-semibold tracking-[0.14em] uppercase block mb-1.5" style={{ color: c(0.4) }}>
                  Directive {i + 1}
                </span>
                <p className="text-[12px] leading-[1.7]" style={{ color: 'rgba(255,255,255,0.28)', maxWidth: 580 }}>
                  {d}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* ── Footer ── */}
      <motion.footer variants={item}>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.02)', paddingTop: 24, paddingBottom: 8 }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.span
                className="w-[4px] h-[4px] rounded-full"
                style={{ background: ACCENT, boxShadow: `0 0 6px ${c(0.4)}` }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
              <span className="text-[9px] font-mono tracking-wider" style={{ color: 'rgba(255,255,255,0.08)' }}>
                Memory Junction v0.1
              </span>
              <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
              <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.05)' }}>
                {ARCH_LAYERS.length} Layers &middot; {FLOW_STEPS.length} Stages &middot; {DIRECTIVES.length} Directives
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-wide" style={{ color: 'rgba(255,255,255,0.05)' }}>
              Permanent &middot; Immutable &middot; Eternal
            </span>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  )
}

/* ── Flow Node ── */

function FlowNode({ label, sub, highlighted }: { label: string; sub: string; highlighted?: boolean }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center flex-shrink-0"
      style={{
        width: 170,
        padding: '14px 8px',
        borderRadius: 12,
        background: highlighted ? `${c(0.06)}` : 'rgba(255,255,255,0.012)',
        border: `1px solid ${highlighted ? c(0.25) : 'rgba(255,255,255,0.02)'}`,
      }}
      whileHover={{
        background: highlighted ? `${c(0.08)}` : 'rgba(255,255,255,0.02)',
        borderColor: highlighted ? c(0.3) : 'rgba(255,255,255,0.04)',
        transition: { type: 'spring', stiffness: 300, damping: 24 },
      }}
    >
      <span className="text-[11px] font-mono font-semibold tracking-tight" style={{ color: highlighted ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
        {label}
      </span>
      <span className="text-[7.5px] font-mono tracking-[0.15em] mt-1.5" style={{ color: 'rgba(255,255,255,0.08)' }}>
        {sub}
      </span>
    </motion.div>
  )
}

/* ── Animated Particle Dot ── */

function ParticleDot({ color, shadow, duration, delay, offset, vertical }: {
  color: string; shadow: string; duration: number; delay: number; offset?: boolean; vertical?: boolean
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        width: 4, height: 4, borderRadius: '50%',
        background: color,
        boxShadow: `0 0 6px ${shadow}`,
        ...(vertical ? { left: -1 } : { top: -1 }),
      }}
      animate={vertical
        ? { top: ['0%', '100%', '0%'] }
        : offset
          ? { left: ['80%', '100%', '0%', '20%'] }
          : { left: ['0%', '100%', '0%'] }
      }
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    />
  )
}
