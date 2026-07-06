import { motion } from 'motion/react'

/* ── Column 2 sparkline config ── */

interface SparkConfig {
  title: string
  path: string
  stroke: string
  gradientId: string
  fromColor: string
  toColor: string
  footerLabel: string
  footerValue: string
  footerClass: string
}

const SPARKLINE_CONFIG: SparkConfig[] = [
  {
    title: 'Error Rate',
    path: 'M0,55 L12,50 L24,20 L36,50 L48,15 L60,48 L72,22 L84,50 L96,10 L108,45 L120,28 L132,55 L144,20 L156,48 L168,18 L180,52 L192,25 L204,55 L216,20 L228,50 L240,25 L252,55 L264,15 L276,45 L288,30 L300,45',
    stroke: '#F87171',
    gradientId: 'error-fill',
    fromColor: 'rgba(248,113,113,0.18)',
    toColor: 'rgba(248,113,113,0)',
    footerLabel: 'Error Rate',
    footerValue: '10%',
    footerClass: 'text-red-400',
  },
  {
    title: 'Event Throughput',
    path: 'M0,40 C6,25 12,55 18,35 C24,20 30,50 36,30 C42,15 48,45 54,25 C60,15 66,40 72,30 C78,20 84,45 90,35 C96,20 102,50 108,30 C114,15 120,45 126,25 C132,15 138,40 144,30 C150,20 156,45 162,35 C168,20 174,50 180,30 C186,15 192,45 198,25 C204,15 210,40 216,30 C222,20 228,45 234,35 C240,20 246,50 252,30 C258,15 264,45 270,25 C276,15 282,40 288,30 C294,20 300,45 300,30',
    stroke: '#818CF8',
    gradientId: 'throughput-fill',
    fromColor: 'rgba(129,140,248,0.18)',
    toColor: 'rgba(129,140,248,0)',
    footerLabel: 'Rate',
    footerValue: '350K/s',
    footerClass: 'text-indigo-400',
  },
  {
    title: 'Runtime Health',
    path: 'M0,20 C15,22 30,16 45,20 C60,38 75,15 90,18 C105,22 120,28 135,22 C150,18 165,34 180,22 C195,18 210,25 225,20 C240,30 255,18 270,22 C285,20 295,18 300,20',
    stroke: '#34D399',
    gradientId: 'health-fill',
    fromColor: 'rgba(52,211,153,0.18)',
    toColor: 'rgba(52,211,153,0)',
    footerLabel: 'Status',
    footerValue: 'Stable',
    footerClass: 'text-emerald-400',
  },
]

const ACCENT_RGB = '139,92,246'

const c = (o: number) => `rgba(${ACCENT_RGB},${o})`

const FILTERS = ['All', 'System', 'Errors', 'Warnings', 'Network']

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const EASE = [0.25, 1, 0.5, 1] as const

const itemV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
}

const LOG_STAGGER = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
}

const logLineV = {
  hidden: { opacity: 0, x: -4 },
  show: { opacity: 1, x: 0, transition: { duration: 0.2, ease: EASE } },
}

interface LogEntry {
  time: string
  tag: 'SYS' | 'DATA' | 'WARN' | 'ERR' | 'OK'
  message: string
}

const TAG_STYLE: Record<LogEntry['tag'], { color: string; glow: string }> = {
  SYS:  { color: '#22D3EE', glow: 'rgba(34,211,238,0.12)' },
  DATA: { color: '#818CF8', glow: 'rgba(129,140,248,0.12)' },
  WARN: { color: '#FBBF24', glow: 'rgba(251,191,36,0.12)' },
  ERR:  { color: '#F87171', glow: 'rgba(248,113,113,0.12)' },
  OK:   { color: '#34D399', glow: 'rgba(52,211,153,0.12)' },
}

const LOG_DATA: LogEntry[] = [
  { time: '14:32:01', tag: 'SYS',  message: 'Initializing Nexus core...' },
  { time: '14:32:01', tag: 'SYS',  message: 'Kernel I/O latency above nominal...' },
  { time: '14:32:05', tag: 'WARN', message: 'Kernel I/O latency above nominal for expected time.' },
  { time: '14:32:06', tag: 'WARN', message: 'Nominal system indicators slowly removed for session time.' },
  { time: '14:32:06', tag: 'WARN', message: 'Kernel I/O mode does not react...' },
  { time: '14:32:08', tag: 'WARN', message: 'Enveloping connection agreement...' },
  { time: '14:32:10', tag: 'DATA', message: 'Successing the nature check starting.' },
  { time: '14:32:10', tag: 'ERR',  message: 'Critical component failure in segment 7 at a head threat.' },
  { time: '14:32:10', tag: 'ERR',  message: 'Checking...' },
  { time: '14:32:12', tag: 'ERR',  message: 'Critical process in segment of 1980s.' },
  { time: '14:32:13', tag: 'ERR',  message: 'Critical operation not applied...' },
  { time: '14:32:14', tag: 'ERR',  message: 'Successfully secured occurs companied.' },
  { time: '14:32:15', tag: 'OK',   message: 'Kernel I/O experience.' },
  { time: '14:32:15', tag: 'OK',   message: 'Subsystem health check passed.' },
  { time: '14:32:15', tag: 'OK',   message: 'Permanency nexus core...' },
  { time: '14:32:15', tag: 'OK',   message: 'Subsystem health check passed.' },
  { time: '14:32:15', tag: 'OK',   message: 'Subsystem health check passed.' },
]

export default function LogsWorkspace() {
  return (
    <motion.div
      className="relative w-full flex-1 flex flex-col"
      style={{
        borderRadius: 26,
        background: 'rgba(10,10,10,0.62)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${c(0.07)}`,
        boxShadow:
          `0 0 80px ${c(0.02)}, 0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.025)`,
        overflow: 'hidden',
        minHeight: 420,
      }}
      variants={containerV}
      initial="hidden"
      animate="show"
    >
      {/* Top rim light */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 80, background: `linear-gradient(180deg, ${c(0.03)} 0%, transparent 100%)` }}
      />
      {/* Right edge ambient */}
      <div className="absolute top-[20%] right-0 pointer-events-none z-20"
        style={{ width: 100, height: '40%', background: `radial-gradient(ellipse at right center, ${c(0.02)} 0%, transparent 70%)` }}
      />
      {/* Bottom shadow dissolve */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)' }}
      />

      {/* ── Internal padded area ── */}
      <div className="flex flex-col flex-1" style={{ padding: 16 }}>

        {/* ═══ ROW 1: Header ═══ */}
        <motion.div variants={itemV} className="flex flex-col items-center flex-shrink-0" style={{ paddingTop: 20, paddingBottom: 10 }}>
          {/* Corp line */}
          <span className="text-[9px] font-mono tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.08)' }}>
            Dynix Corporation
          </span>

          {/* Title */}
          <div className="flex items-center gap-2.5 mt-1.5 mb-2.5">
            <motion.span
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <h1 className="text-[20px] font-display font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.78)' }}>
              Runtime Diagnostic Logs
            </h1>
            <motion.span
              className="w-[5px] h-[5px] rounded-full"
              style={{ background: '#22C55E', boxShadow: '0 0 6px rgba(34,197,94,0.5)' }}
              animate={{ opacity: [1, 0.25, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2">
            {FILTERS.map((f) => {
              const active = f === 'All'
              return (
                <motion.div
                  key={f}
                  style={{
                    padding: '3px 10px', borderRadius: 6,
                    background: active ? `${c(0.12)}` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${active ? c(0.3) : 'rgba(255,255,255,0.03)'}`,
                    boxShadow: active ? `0 0 8px ${c(0.08)}` : 'none',
                    cursor: 'default',
                  }}
                  whileHover={active ? {} : {
                    background: 'rgba(255,255,255,0.03)',
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  <span className="text-[8.5px] font-medium tracking-[0.04em]"
                    style={{ color: active ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)' }}
                  >
                    {f}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* ═══ ROW 2: 2-Column Content Area ═══ */}
        <div className="flex flex-1" style={{ gap: 24, minHeight: 0, paddingTop: 6 }}>

          {/* Column 1: Console Canvas (75%) */}
          <motion.div
            variants={itemV}
            className="flex flex-col"
            style={{
              flex: '75 0 0%',
              borderRadius: 14,
              background: '#050508',
              border: '1px solid rgba(255,255,255,0.03)',
              boxShadow: 'inset 0 0 30px rgba(0,0,0,0.6)',
              overflow: 'hidden',
            }}
          >
            {/* Terminal scroll area */}
            <motion.div
              className="flex-1"
              variants={LOG_STAGGER}
              initial="hidden"
              animate="show"
              style={{
                overflowY: 'auto', overflowX: 'hidden',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.03) transparent',
                padding: '20px 22px',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 4%, black 96%, transparent 100%)',
              }}
            >
              <div className="flex flex-col" style={{ gap: 0 }}>
                {LOG_DATA.map((entry, i) => {
                  const tc = TAG_STYLE[entry.tag]
                  return (
                    <motion.div
                      key={i}
                      variants={logLineV}
                      className="flex items-baseline gap-0"
                      style={{
                        minHeight: 22,
                        padding: '1px 0',
                        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                        fontSize: 12,
                        lineHeight: 1.8,
                      }}
                    >
                      {/* Timestamp */}
                      <span className="flex-shrink-0 select-none"
                        style={{
                          width: 64,
                          color: 'rgba(255,255,255,0.08)',
                        }}
                      >
                        [{entry.time}]
                      </span>

                      {/* Tag */}
                      <span className="flex-shrink-0 select-none"
                        style={{
                          width: 46,
                          color: tc.color,
                          fontWeight: 600,
                          textShadow: `0 0 6px ${tc.glow}`,
                        }}
                      >
                        [{entry.tag}]
                      </span>

                      {/* Message — wraps cleanly */}
                      <span className="flex-1"
                        style={{
                          color: 'rgba(255,255,255,0.3)',
                          paddingLeft: 4,
                        }}
                      >
                        {entry.message}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Column 2: Log Activity & Metrics (25%) */}
          <motion.div
            variants={itemV}
            className="flex flex-col group"
            style={{
              flex: '25 0 0%',
              borderRadius: 14,
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <div className="flex flex-col flex-1" style={{ padding: '18px 16px', gap: 28 }}>
              {/* Panel Header */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Log Activity
                </span>
                <div
                  className="w-[7px] h-[7px] rounded-full"
                  style={{
                    background: '#22D3EE',
                    boxShadow: '0 0 6px rgba(34,211,238,0.5)',
                  }}
                />
              </div>

              {/* Sparkline Widgets */}
              {SPARKLINE_CONFIG.map((w) => {
                const fillD = w.path + ' L300,80 L0,80 Z'
                return (
                  <div key={w.title} className="flex flex-col">
                    <span className="text-xs mb-2 font-medium" style={{ color: 'rgba(255,255,255,0.25)' }}>
                      {w.title}
                    </span>
                    <svg viewBox="0 0 300 80" className="w-full h-16" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={w.gradientId} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={w.fromColor} />
                          <stop offset="100%" stopColor={w.toColor} />
                        </linearGradient>
                      </defs>
                      {/* Fill area */}
                      <motion.path
                        d={fillD}
                        fill={`url(#${w.gradientId})`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="transition-all duration-500 group-hover:brightness-125"
                      />
                      {/* Stroke line */}
                      <motion.path
                        d={w.path}
                        fill="none"
                        stroke={w.stroke}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0, opacity: 0.4 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: 'easeInOut', delay: 0.15 }}
                        className="transition-all duration-500 group-hover:brightness-125"
                      />
                    </svg>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.12)' }}>
                        {w.footerLabel}
                      </span>
                      <span
                        className={`text-[11px] font-mono font-medium ${w.footerClass} transition-all duration-500 group-hover:brightness-125`}
                      >
                        {w.footerValue}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
