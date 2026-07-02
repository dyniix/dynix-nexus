import { motion } from 'motion/react'
import { useEffect } from 'react'

/* ── Data ── */

const RUNTIME_METRICS = [
  { label: 'Encoding Config', value: 68, status: 'working' },
  { label: 'Module Registry', value: 94, status: 'healthy' },
  { label: 'Runtime Config', value: 41, status: 'preparing' },
  { label: 'Chronicle Sync', value: 82, status: 'healthy' },
  { label: 'Station Registry', value: 18, status: 'warning' },
  { label: 'Memory Index', value: 79, status: 'healthy' },
  { label: 'Log Pipeline', value: 63, status: 'working' },
  { label: 'Cache Ready', value: 100, status: 'healthy' },
] as const

const ACTIVITY_FEED = [
  { time: '11:44', msg: 'Broker idle' },
  { time: '11:43', msg: 'Waiting for media' },
  { time: '11:42', msg: 'Runtime Ready' },
] as const

const RUNTIME_LAYERS = [
  { label: 'Hub', status: 'online' as const },
  { label: 'Broker', status: 'healthy' as const },
  { label: 'Manager', status: 'idle' as const },
  { label: 'Engines', status: 'ready' as const, count: 1 },
]

const LAYER_STATUS = {
  online: { dot: '#22C55E', desc: 'Online' },
  healthy: { dot: '#00D9FF', desc: 'Healthy' },
  idle: { dot: 'rgba(255,255,255,0.3)', desc: 'Idle' },
  ready: { dot: '#22C55E', desc: '1 Ready' },
}

const COMM_FEED = [
  { from: 'Broker', to: 'Image Engine', result: 'Completed', time: '11:29' },
  { event: 'Chronicles Updated', time: '11:27' },
  { state: 'Idle', time: '11:24' },
]

const AI_STATE = [
  { label: 'OpenCode', value: 'Online', status: 'online' as const },
  { label: 'Bridge', value: 'Connected', status: 'healthy' as const },
  { label: 'Session', value: 'Attached', status: 'healthy' as const },
  { label: 'Context', value: 'Healthy', status: 'healthy' as const },
]

const AI_STATUS_MAP = {
  online: { dot: '#22C55E' },
  healthy: { dot: '#00D9FF' },
}

const TAG_COLORS = {
  INFO: 'text-nexus-500',
  ENGINE: 'text-cyan-400',
  BROKER: 'text-emerald-400',
  SESSION: 'text-nexus-400',
}

const ARCH_LAYERS = [
  { label: 'Hub', desc: 'Entry routing' },
  { label: 'Broker', desc: 'Capability matching' },
  { label: 'Manager', desc: 'Session orchestration' },
  { label: 'Engine', desc: 'Model execution' },
]

const TERMINAL_LOG = [
  { time: '11:24', tag: 'INFO' as const, msg: 'Runtime started' },
  { time: '11:25', tag: 'ENGINE' as const, msg: 'Media Encoder ready' },
  { time: '11:27', tag: 'BROKER' as const, msg: 'Negotiation complete' },
  { time: '11:29', tag: 'SESSION' as const, msg: 'Idle' },
]

const ACTIONS = [
  { id: 'encoder', label: 'Open Encoder', sub: 'Start a perception task', shortcut: '⌘E' },
  { id: 'config', label: 'Configure Runtime', sub: 'Engine paths & GPU budget', shortcut: '⌘,' },
  { id: 'chronicles', label: 'Read Chronicles', sub: 'Session history & decisions', shortcut: '⌘H' },
  { id: 'health', label: 'System Health', sub: 'Resources & diagnostics', shortcut: '⌘S' },
]

const NOTES = [
  {
    title: 'What It Is',
    body: 'Dynix Nexus is the permanent home of the Dynix ecosystem — a modular control center for AI-assisted development. Every layer is designed for extension.',
  },
  {
    title: 'Why It Exists',
    body: 'Born from a single limitation: AI cannot perceive images directly. That constraint revealed the need for a full runtime architecture with memory, perception, and orchestration.',
  },
  {
    title: 'How It Evolved',
    body: 'Each layer emerged from a constraint. Memory limitation → Memory Junction. Communication gap → Media Encoder. Session awareness → Engine Manager. Runtime complexity → Broker.',
  },
]

/* ── Stagger variants ── */

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const EASE = [0.25, 1, 0.5, 1] as const

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
}

/* ── Component ── */

export default function Workspace({ active }: { active: boolean }) {
  /* Force layout recovery on tab switch — Chromium freezes scroll for background tabs */
  useEffect(() => {
    const onVisible = () => {
      if (document.hidden) return
      /* Chain RAFs so the browser fully stabilises layout before we touch it */
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
    <motion.div variants={container} initial="hidden" animate={active ? 'show' : 'hidden'}>

      <div className="py-14 space-y-16">

          {/* ── Hero ── */}
          <motion.section variants={item}>
            <div className="flex items-center gap-2 mb-5">
              <span className="w-[5px] h-[5px] rounded-full bg-cyan-400" />
              <span className="text-[10px] font-mono text-cyan-400 tracking-[0.25em] uppercase">
                Dynix Nexus
              </span>
            </div>
            <h1 className="text-5xl font-display font-semibold text-nexus-100 tracking-tight leading-[1.08] mb-4">
              Workspace
            </h1>
            <p className="text-sm text-nexus-400 leading-relaxed max-w-[540px] mb-8">
              The command center of the Dynix ecosystem. Manage perception, memory, stations, and
              runtime from a single desktop workspace.
            </p>
          </motion.section>

          {/* ── Today's Status ── */}
          <motion.section variants={item}>
            <div className="dynix-section-header">
              <div className="dynix-section-header-left">
                <h2 className="dynix-section-title">Today's Status</h2>
                <p className="dynix-section-desc">What is happening right now</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {/* Active Session — operational dashboard, heartbeat of the runtime */}
              <div className="dynix-floating-panel col-span-2 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nexus-500" />
                    <span className="text-[9px] font-mono text-nexus-500 tracking-wider uppercase">Session</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-nexus-500 tracking-wider uppercase">Idle</span>
                    <span className="w-[5px] h-[5px] rounded-full bg-nexus-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 px-6 pb-6 gap-10">
                  {/* Left: Runtime Summary */}
                  <div className="flex flex-col gap-2.5 w-[180px] flex-shrink-0">
                    <div className="text-[13px] font-mono text-nexus-300 leading-relaxed">
                      Ready to receive media.
                    </div>
                    <div className="text-[10px] font-mono text-nexus-500">
                      Last session: 2 min ago
                    </div>
                    <div className="mt-auto pt-4 border-t border-nexus-700/20">
                      <div className="text-[9px] font-mono text-nexus-500 tracking-wider uppercase mb-2">Queue</div>
                      <div className="text-[13px] font-mono text-nexus-300">0 Tasks</div>
                    </div>
                  </div>

                  {/* Right: Live Runtime Metrics + Activity */}
                  <div className="flex-1 flex flex-col gap-1 min-w-0">
                    {RUNTIME_METRICS.map((m) => (
                      <MetricRow key={m.label} label={m.label} value={m.value} status={m.status} />
                    ))}

                    {/* Activity Feed */}
                    <div className="mt-2.5 pt-3 border-t border-nexus-700/20">
                      <div className="text-[9px] font-mono text-nexus-500 tracking-wider uppercase mb-2">Activity</div>
                      <div className="space-y-1">
                        {[...ACTIVITY_FEED].reverse().map((entry, i) => (
                          <div key={i} className="flex items-center gap-3 text-[10px] font-mono">
                            <span className="text-nexus-600 w-10 flex-shrink-0">{entry.time}</span>
                            <span className="text-nexus-500">{entry.msg}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column: Runtime + Communication stacked */}
              <div className="flex flex-col gap-4">
                {/* Runtime State */}
                <div className="dynix-floating-panel p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nexus-500" />
                    <span className="text-[9px] font-mono text-nexus-500 tracking-wider uppercase">Runtime</span>
                  </div>
                  <div className="flex-1 space-y-2.5 mt-1">
                    {RUNTIME_LAYERS.map((layer) => {
                      const st = LAYER_STATUS[layer.status]
                      return (
                        <div key={layer.label} className="flex items-center justify-between">
                          <span className="text-[12px] font-mono text-nexus-300">{layer.label}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-nexus-500">{'count' in layer ? `${layer.count} Ready` : st.desc}</span>
                            <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: st.dot }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Communication Feed */}
                <div className="dynix-floating-panel p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nexus-500" />
                    <span className="text-[9px] font-mono text-nexus-500 tracking-wider uppercase">Communication</span>
                  </div>
                  <div className="flex-1 space-y-2.5 mt-1">
                    {COMM_FEED.map((entry, i) => (
                      <div key={i}>
                        {'from' in entry ? (
                          <div className="flex items-center gap-2 text-[11px] font-mono text-nexus-400">
                            <span className="text-nexus-300">{entry.from}</span>
                            <span className="text-nexus-600">→</span>
                            <span className="text-nexus-300">{entry.to}</span>
                          </div>
                        ) : 'event' in entry ? (
                          <div className="text-[11px] font-mono text-nexus-400">{entry.event}</div>
                        ) : (
                          <div className="text-[11px] font-mono text-nexus-500">{entry.state}</div>
                        )}
                        {'result' in entry && (
                          <div className="flex items-center gap-1.5 mt-0.5 ml-4">
                            <span className="w-[3px] h-[3px] rounded-full bg-green-500" />
                            <span className="text-[10px] font-mono text-green-400/70">{entry.result}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* AI State — separate row, full width */}
            <div className="mt-4">
              <div className="dynix-floating-panel p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-nexus-500" />
                  <span className="text-[9px] font-mono text-nexus-500 tracking-wider uppercase">AI</span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                  {AI_STATE.map((item) => {
                    const st = AI_STATUS_MAP[item.status]
                    return (
                      <div key={item.label} className="flex items-center justify-between">
                        <span className="text-[12px] font-mono text-nexus-300">{item.label}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-nexus-500">{item.value}</span>
                          <span className="w-[5px] h-[5px] rounded-full" style={{ backgroundColor: st.dot }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </motion.section>

          {/* ── Runtime Flow ── */}
          <motion.section variants={item}>
            <div className="dynix-section-header">
              <div className="dynix-section-header-left">
                <h2 className="dynix-section-title">Runtime Flow</h2>
                <p className="dynix-section-desc">Living pipeline — packet looping through architecture</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-emerald-500" />
                <span className="text-[10px] font-mono text-emerald-400/70 tracking-wider uppercase">Active</span>
              </div>
            </div>

            <div className="dynix-floating-panel p-6 relative overflow-hidden">
              {/* Stage row */}
              <div className="flex items-center gap-0 relative pt-2">
                {ARCH_LAYERS.map((layer, i) => (
                  <div key={layer.label} className="flex-1 relative z-10">
                    <div className="relative pipeline-stage text-center px-4 py-3">
                      {/* Stage glow — synchronized with packet */}
                      <div className={`pipeline-stage-glow stage-glow-${i + 1}`} />
                      <div className="text-[13px] font-mono text-nexus-200 tracking-wider relative z-10">{layer.label}</div>
                      <div className="text-[9px] font-mono text-nexus-500 mt-0.5 relative z-10">{layer.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pipeline track + animated packet */}
              <div className="pipeline-track">
                <div className="pipeline-packet" />
              </div>

              <div className="text-[10px] font-mono text-nexus-500 leading-relaxed border-t border-nexus-700/20 pt-4 text-center">
                Common Primitives — identity · confidence · provenance · hierarchy
              </div>
            </div>
          </motion.section>

          {/* ── Live Feed ── */}
          <motion.section variants={item}>
            <div className="dynix-section-header">
              <div className="dynix-section-header-left">
                <h2 className="dynix-section-title">Live Feed</h2>
                <p className="dynix-section-desc">Runtime activity log</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-[5px] h-[5px] rounded-full bg-cyan-400/60" />
                <span className="text-[10px] font-mono text-cyan-400/60 tracking-wider uppercase">Live</span>
              </div>
            </div>

            <div className="dynix-floating-panel-subtle p-5">
              {TERMINAL_LOG.map((entry, i) => (
                <div key={i} className="dynix-terminal-entry">
                  <span className="text-[10px] font-mono text-nexus-600 w-10 flex-shrink-0">{entry.time}</span>
                  <span className={`text-[10px] font-mono w-16 flex-shrink-0 ${TAG_COLORS[entry.tag]}`}>
                    [{entry.tag}]
                  </span>
                  <span className="text-[11px] font-mono text-nexus-400">{entry.msg}</span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Quick Actions ── */}
          <motion.section variants={item}>
            <div className="dynix-section-header">
              <div className="dynix-section-header-left">
                <h2 className="dynix-section-title">Quick Actions</h2>
                <p className="dynix-section-desc">Desktop shortcuts to core tools</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {ACTIONS.map((action, i) => (
                <motion.button
                  key={action.id}
                  className={`dynix-floating-panel-subtle p-5 flex flex-col items-start gap-1.5 text-left group cursor-pointer ${i === 0 ? 'col-span-2' : ''}`}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-[13px] font-mono text-nexus-200 tracking-wide group-hover:text-cyan-400 transition-colors duration-200">
                      {action.label}
                    </span>
                    <span className="text-[9px] font-mono text-nexus-600 ml-auto">{action.shortcut}</span>
                  </div>
                  <span className="text-[11px] font-sans text-nexus-500 leading-relaxed">{action.sub}</span>
                </motion.button>
              ))}
            </div>
          </motion.section>

          {/* ── Project Notes ── */}
          <motion.section variants={item}>
            <div className="dynix-section-header">
              <div className="dynix-section-header-left">
                <h2 className="dynix-section-title">Project Notes</h2>
                <p className="dynix-section-desc">The story behind Dynix Nexus</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {NOTES.map((note, i) => (
                <div key={note.title} className={`dynix-floating-panel p-5 ${i === 1 ? 'col-span-2' : ''}`}>
                  <div className="text-[12px] font-mono text-nexus-200 tracking-wide mb-2">{note.title}</div>
                  <div className="text-[12px] font-sans text-nexus-400 leading-relaxed">{note.body}</div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* ── Footer ── */}
          <motion.footer variants={item}>
            <div className="border-t border-nexus-700/20 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-[5px] h-[5px] rounded-full bg-cyan-400/60" />
                  <span className="text-[10px] font-mono text-nexus-600 tracking-wider">Dynix Nexus v0.1 Alpha</span>
                </div>
                <div className="text-[10px] font-mono text-nexus-600 tracking-wider">Built by Dynix</div>
              </div>
            </div>
          </motion.footer>

        </div>
    </motion.div>
  )
}

/* ── Status color map ── */
const METRIC_STATUS = {
  healthy:   'bg-green-500/60',
  working:   'bg-cyan-400/50',
  preparing: 'bg-yellow-500/40',
  warning:   'bg-orange-500/40',
  error:     'bg-red-500/40',
  offline:   'bg-nexus-600',
} as const

/* ── MetricRow — premium progress indicator ── */

function MetricRow({ label, value, status }: { label: string; value: number; status: keyof typeof METRIC_STATUS }) {
  const barColor = METRIC_STATUS[status] || METRIC_STATUS.healthy

  return (
    <div className="flex items-center gap-2.5 min-h-[18px]">
      <span className="text-[10px] font-mono text-nexus-400 w-[130px] flex-shrink-0 truncate">{label}</span>
      <div className="flex-1 h-[3px] rounded-full bg-nexus-700/60 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${barColor}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: value / 100 }}
          style={{ transformOrigin: 'left' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="text-[9px] font-mono text-nexus-500 w-7 text-right flex-shrink-0">{value}%</span>
    </div>
  )
}
