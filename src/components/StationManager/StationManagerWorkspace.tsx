import { useState, useRef, useEffect } from 'react'
import { motion } from 'motion/react'
import { Radio, Network, Terminal, Folder, Clock } from 'lucide-react'

const EASE = [0.25, 1, 0.5, 1] as const

const ACCENT = '#3B82F6'
const ACCENT_RGB = '59,130,246'

const c = (o: number) => `rgba(${ACCENT_RGB},${o})`

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const itemV = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

const COLUMNS = [
  { id: 'network',   label: 'PROJECT NETWORK',  icon: Radio,    flex: '26 0 0%' },
  { id: 'canvas',    label: 'COMMAND CANVAS',    icon: Network,  flex: '48 0 0%' },
  { id: 'telemetry', label: 'LIVE TELEMETRY',    icon: Terminal, flex: '26 0 0%' },
]

const STATIONS = [
  { title: 'A-Promise',       path: '/volumes/local/a-promise',   metric: '99/100',   status: 'active' as const },
  { title: 'Chronos Sync',    path: '/volumes/local/chronos',     metric: '94/100',   status: 'active' as const },
  { title: 'Nebula Protocol', path: '/volumes/network/nebula',    metric: 'Syncing',  status: 'syncing' as const },
  { title: 'Origin Point',    path: '/volumes/core/origin',       metric: '100/100',  status: 'active' as const },
]

const LOGS = [
  { icon: 'lock',     time: '14:32:39', tag: 'AUTH' as const, msg: "Key accepted for node 'Origin'..." },
  { icon: 'cog',      time: '14:32:39', tag: 'SYS' as const, msg: 'Initializing core...' },
  { icon: 'box',      time: '14:32:59', tag: 'DATA' as const, msg: "Syncing 'A-Promise' (55% complete)" },
  { icon: 'check',    time: '14:32:59', tag: 'OK' as const, msg: 'System status nominal.' },
  { icon: 'cog',      time: '14:32:59', tag: 'SYS' as const, msg: 'Initializing core...' },
  { icon: 'box',      time: '14:32:00', tag: 'DATA' as const, msg: 'Syncing node process...' },
  { icon: 'check',    time: '14:32:08', tag: 'OK' as const, msg: 'System status nominal.' },
  { icon: 'box',      time: '14:32:20', tag: 'DATA' as const, msg: "Syncing started node 'Origin'..." },
  { icon: 'check',    time: '14:32:29', tag: 'OK' as const, msg: 'System status nominal.' },
  { icon: 'warn',     time: '14:33:21', tag: 'WARN' as const, msg: 'High latency detected...' },
  { icon: 'warn',     time: '14:33:35', tag: 'WARN' as const, msg: 'High latency detected is...' },
  { icon: 'check',    time: '14:39:39', tag: 'OK' as const, msg: 'System status nominal.' },
  { icon: 'lock',     time: '14:33:38', tag: 'AUTH' as const, msg: "Key 1 accepted for node 'Gtngi'..." },
  { icon: 'cog',      time: '14:33:39', tag: 'SYS' as const, msg: 'Initializing core...' },
  { icon: 'box',      time: '14:32:38', tag: 'DATA' as const, msg: "Syncing 'A-Promise' (55% complete)." },
  { icon: 'check',    time: '14:32:30', tag: 'OK' as const, msg: 'System status nominal.' },
  { icon: 'warn',     time: '14:32:39', tag: 'WARN' as const, msg: 'High latency detected...' },
  { icon: 'lock',     time: '14:39:39', tag: 'AUTH' as const, msg: "Key accepted for node 'Origin'..." },
  { icon: 'check',    time: '14:39:39', tag: 'OK' as const, msg: 'System status nominal.' },
]

const TAG_STYLE: Record<string, { text: string; bg: string }> = {
  SYS:  { text: '#06B6D4', bg: 'rgba(6,182,212,0.10)' },
  AUTH: { text: '#3B82F6', bg: 'rgba(59,130,246,0.10)' },
  DATA: { text: '#8B5CF6', bg: 'rgba(139,92,246,0.10)' },
  WARN: { text: '#F59E0B', bg: 'rgba(245,158,11,0.10)' },
  OK:   { text: '#10B981', bg: 'rgba(16,185,129,0.10)' },
}

const LOG_ICONS: Record<string, string> = {
  lock:  'M7 11V7a5 5 0 0110 0v4M5 11h14v10H5z',
  cog:   'M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z',
  box:   'M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8m4-4h10l2 4H7l2-4z',
  check: 'M20 6L9 17l-5-5',
  warn:  'M12 9v4M12 17h.01M10.29 3.86l-8.4 14.57A1 1 0 002.7 20h18.6a1 1 0 00.81-1.57l-8.4-14.57a1 1 0 00-1.72 0z',
}

export default function StationManagerWorkspace() {
  return (
    <motion.div
      className="relative w-full flex flex-col"
      style={{
        minHeight: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
        borderRadius: 26,
        background: 'rgba(10,10,10,0.62)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow:
          `0 0 80px ${c(0.02)}, 0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.025)`,
        overflow: 'hidden',
      }}
      variants={containerV}
      initial="hidden"
      animate="show"
    >
      {/* Top rim light */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 120, background: `linear-gradient(180deg, ${c(0.04)} 0%, ${c(0.01)} 40%, transparent 100%)` }}
      />
      {/* Right edge ambient glow */}
      <div className="absolute top-[20%] right-0 pointer-events-none z-20"
        style={{ width: 160, height: '50%', background: `radial-gradient(ellipse at right center, ${c(0.03)} 0%, transparent 70%)` }}
      />
      {/* Left edge ambient glow */}
      <div className="absolute top-[30%] left-0 pointer-events-none z-20"
        style={{ width: 120, height: '40%', background: `radial-gradient(ellipse at left center, ${c(0.02)} 0%, transparent 70%)` }}
      />
      {/* Bottom shadow dissolve */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 160, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 30%, rgba(0,0,0,0.04) 70%, transparent 100%)' }}
      />

      {/* Internal padded area */}
      <div className="flex flex-col flex-1" style={{ padding: 24 }}>
        {/* Header */}
        <motion.div variants={itemV} className="flex items-center justify-between flex-shrink-0" style={{ height: 56 }}>
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center flex-shrink-0"
              style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}10`, boxShadow: `0 0 12px ${ACCENT}06` }}
            >
              <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke={ACCENT} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="20" r="2" /><path d="M12 18V8" /><path d="M8 12a6 6 0 018 0" /><path d="M5 9a10 10 0 0114 0" />
              </svg>
            </div>
            <div>
              <h2 className="font-display text-base font-semibold tracking-tight leading-none" style={{ color: 'rgba(255,255,255,0.9)' }}>
                Station Manager
              </h2>
              <p className="text-[10px] font-mono mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Distribute &amp; Orchestrate
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0"
            style={{ padding: '5px 12px', borderRadius: 18, background: `${ACCENT}06`, border: `1px solid ${ACCENT}0a` }}
          >
            <span className="w-[5px] h-[5px] rounded-full" style={{ background: ACCENT, boxShadow: `0 0 5px ${ACCENT}` }} />
            <span className="text-[8px] font-mono uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
              Station Online
            </span>
          </div>
        </motion.div>

        {/* 3-column grid */}
        <div className="flex gap-5 flex-1" style={{ marginTop: 12, marginBottom: 4, minHeight: 0 }}>
          <ColumnCard key="network" column={COLUMNS[0]}>
            <NetworkContent />
          </ColumnCard>
          <ColumnCard key="canvas" column={COLUMNS[1]}>
            <CanvasContent />
          </ColumnCard>
          <ColumnCard key="telemetry" column={COLUMNS[2]}>
            <TerminalContent />
          </ColumnCard>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Column Card ─── */
function ColumnCard({ column, children }: { column: typeof COLUMNS[number]; children?: React.ReactNode }) {
  const Icon = column.icon

  return (
    <motion.div
      variants={itemV}
      className="flex flex-col"
      style={{
        flex: column.flex,
        background: 'rgba(8,8,12,0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: `1px solid ${c(0.06)}`,
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: `inset 0 0 30px rgba(0,0,0,0.15)`,
      }}
    >
      {/* Column header */}
      <div className="flex flex-col flex-shrink-0" style={{ padding: '18px 20px 14px 20px' }}>
        <div className="flex items-center gap-2.5">
          <Icon size={13} style={{ color: c(0.6) }} />
          <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: c(0.5) }}>
            {column.label}
          </span>
        </div>
        <div className="mt-3" style={{ height: 1, background: `linear-gradient(90deg, transparent 0%, ${c(0.08)} 30%, ${c(0.08)} 70%, transparent 100%)` }} />
      </div>

      {children ?? <div className="flex-1" style={{ minHeight: 0 }} />}
    </motion.div>
  )
}

/* ─── Network Activity Graph ─── */
const GRAPH_POINTS = [
  [0, 36], [4, 28], [8, 32], [12, 22], [16, 26], [20, 18],
  [24, 22], [28, 14], [32, 18], [36, 10], [40, 14], [44, 8],
  [48, 12], [52, 6], [56, 10], [60, 4], [64, 8], [68, 12],
  [72, 6], [76, 10], [80, 4], [84, 2], [88, 6], [92, 0],
  [96, 4], [100, 6], [104, 2], [108, 6], [112, 10], [116, 4],
  [120, 8], [124, 2], [128, 6], [132, 10], [136, 4], [140, 8],
] as [number, number][]

function NetworkContent() {
  const d = GRAPH_POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]} ${p[1]}`).join(' ')
  const areaD = `${d} L140 40 L0 40 Z`

  return (
    <>
      <div style={{ flex: '0 0 auto', padding: '0 20px 16px 20px' }}>
        <div className="relative" style={{ width: '100%', height: 40 }}>
          <svg width="100%" height="100%" viewBox="0 0 140 40" preserveAspectRatio="none" className="absolute inset-0">
            <defs>
              <linearGradient id="graphFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c(0.15)} />
                <stop offset="100%" stopColor={c(0)} />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#graphFill)" />
            <motion.path
              d={d}
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.7}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: EASE }}
            />
          </svg>
        </div>
      </div>

      <div style={{ height: 1, margin: '0 20px', background: `linear-gradient(90deg, transparent 0%, ${c(0.06)} 30%, ${c(0.06)} 70%, transparent 100%)` }} />

      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0, scrollbarWidth: 'thin', scrollbarColor: `${c(0.15)} transparent` }}>
        <div className="flex flex-col gap-3" style={{ padding: '14px 16px 16px 16px' }}>
          {STATIONS.map((station) => (
            <StationCard key={station.title} station={station} />
          ))}
        </div>
      </div>
    </>
  )
}

/* ─── Station Card ─── */
const statusColors = {
  active: { dot: '#3B82F6', glow: 'rgba(59,130,246,0.25)', text: '#3B82F6' },
  syncing: { dot: '#F59E0B', glow: 'rgba(245,158,11,0.25)', text: '#F59E0B' },
}

function StationCard({ station }: { station: typeof STATIONS[number] }) {
  const sc = statusColors[station.status]

  return (
    <motion.div
      className="flex items-center gap-3 cursor-default"
      style={{
        borderRadius: 12,
        background: 'rgba(10,10,14,0.5)',
        border: '1px solid rgba(255,255,255,0.03)',
        padding: '12px 14px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{
        y: -1,
        borderColor: c(0.2),
        boxShadow: `0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 ${c(0.04)}`,
        transition: { type: 'spring', stiffness: 400, damping: 24 },
      }}
    >
      <div className="flex-shrink-0 flex items-center justify-center"
        style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}
      >
        <Folder size={14} style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s' }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium leading-tight truncate" style={{ color: 'rgba(255,255,255,0.75)' }}>
          {station.title}
        </div>
        <div className="text-[8px] font-mono truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>
          {station.path}
        </div>
      </div>

      <div className="text-[9px] font-mono tabular-nums flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)', marginRight: 10 }}>
        {station.metric}
      </div>

      <div className="relative flex-shrink-0 flex items-center justify-center" style={{ width: 14, height: 14 }}>
        <motion.div
          className="absolute rounded-full"
          style={{ width: 14, height: 14, border: `1px solid ${sc.glow}`, opacity: 0.3 }}
          animate={station.status === 'syncing'
            ? { scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }
            : { opacity: [0.2, 0.4, 0.2] }
          }
          transition={station.status === 'syncing'
            ? { duration: 2, ease: 'easeInOut', repeat: Infinity }
            : { duration: 3, ease: 'easeInOut', repeat: Infinity }
          }
        />
        <motion.div
          className="rounded-full"
          style={{ width: 6, height: 6, background: sc.dot, boxShadow: `0 0 6px ${sc.glow}` }}
          animate={{ opacity: station.status === 'syncing' ? [0.4, 1, 0.4] : [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
        />
      </div>
    </motion.div>
  )
}

/* ─── Terminal Content ─── */
function TerminalContent() {
  const [visibleCount, setVisibleCount] = useState(3)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  useEffect(() => {
    if (visibleCount >= LOGS.length) return
    const t = setTimeout(() => setVisibleCount((p) => Math.min(p + 1, LOGS.length)), 80)
    return () => clearTimeout(t)
  }, [visibleCount])

  useEffect(() => {
    if (!scrollRef.current || isHovering.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [visibleCount])

  return (
    <div className="flex-1 flex flex-col" style={{ minHeight: 0, padding: '0 16px 16px 16px' }}>
      <div
        className="relative flex-1"
        style={{
          borderRadius: 10,
          background: '#030407',
          boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
          overflow: 'hidden',
        }}
      >
        {/* Top fade mask */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: 24, background: 'linear-gradient(180deg, #030407 0%, transparent 100%)' }}
        />
        {/* Bottom fade mask */}
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: 24, background: 'linear-gradient(0deg, #030407 0%, transparent 100%)' }}
        />

        {/* Scrollable log area */}
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto"
          onMouseEnter={() => { isHovering.current = true }}
          onMouseLeave={() => { isHovering.current = false }}
          style={{
            padding: '14px 12px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(6,182,212,0.15) transparent',
          }}
        >
          <div className="flex flex-col" style={{ gap: 5 }}>
            {LOGS.slice(0, visibleCount).map((log, i) => {
              const isRecent = i >= visibleCount - 3
              const ts = TAG_STYLE[log.tag]
              return (
                <motion.div
                  key={i}
                  className="flex items-start gap-2"
                  initial={isRecent ? { opacity: 0, y: 6 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: isRecent ? (i - (visibleCount - 3)) * 0.15 : 0, ease: EASE }}
                  style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', ui-monospace, monospace" }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="flex-shrink-0 mt-[2px]"
                    style={{ width: 11, height: 11, color: 'rgba(255,255,255,0.15)' }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d={LOG_ICONS[log.icon]} />
                  </svg>

                  <span className="flex-shrink-0" style={{ fontSize: 11, lineHeight: '18px', color: 'rgba(255,255,255,0.3)', fontFamily: 'inherit' }}>
                    [{log.time}]
                  </span>

                  <span
                    className="flex-shrink-0 font-semibold"
                    style={{
                      fontSize: 11,
                      lineHeight: '18px',
                      fontFamily: 'inherit',
                      color: ts.text,
                      background: ts.bg,
                      padding: '0 4px',
                      borderRadius: 3,
                    }}
                  >
                    [{log.tag}]
                  </span>

                  <span style={{ fontSize: 11, lineHeight: '18px', color: 'rgba(255,255,255,0.6)', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                    {log.msg}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Command Canvas Content ─── */

const metricsFont = "'JetBrains Mono', 'Fira Code', 'SF Mono', ui-monospace, monospace"

function CanvasContent() {
  return (
    <div
      className="flex-1 flex flex-col justify-between items-center"
      style={{ minHeight: 0, padding: '16px 14px 14px 14px' }}
    >
      {/* ── TOP ZONE: Telemetry HUD ── */}
      <div className="w-full flex items-center justify-between flex-shrink-0" style={{ height: 28 }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <Clock size={10} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span style={{ fontSize: 9, fontFamily: metricsFont, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.04em' }}>
              14:32 PST
            </span>
          </div>
          <Metric label="LAT" value="14ms" />
          <Metric label="IOPS" value="12k" />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: 9, fontFamily: metricsFont, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>CORE:</span>
            <span style={{ fontSize: 9, fontFamily: metricsFont, fontWeight: 500, color: '#10B981' }}>99%</span>
            <svg width="20" height="10" viewBox="0 0 20 10" className="flex-shrink-0">
              <path d="M0 8 Q3 6 6 7 T12 4 T20 2" fill="none" stroke="#10B981" strokeWidth="0.8" strokeLinecap="round" opacity="0.3" />
            </svg>
          </div>
          <Metric label="NET" value="15%" />
        </div>
      </div>

      {/* ── CENTER ZONE: 3D Nexus Sphere ── */}
      <div className="flex-1 w-full relative flex items-center justify-center" style={{ minHeight: 0, overflow: 'visible' }}>
        <NetworkSphere />
        {/* Floating tags — outside sphere wrapper so they don't overlap */}
        {FLOATING_TAGS.map((tag) => (
          <div key={tag.text} className="absolute pointer-events-none" style={{ left: tag.x, top: tag.y }}>
            <svg className="absolute" style={{ left: -36, top: -5, width: 44, height: 14 }} viewBox="0 0 44 14">
              <line x1="2" y1="7" x2="42" y2="7" stroke={c(0.08)} strokeWidth="0.5" />
              <circle cx="2" cy="7" r="1.2" fill={ACCENT} opacity="0.25" />
            </svg>
            <span style={{
              fontSize: 7, fontFamily: metricsFont,
              color: c(0.4), letterSpacing: '0.06em',
              whiteSpace: 'nowrap', position: 'relative', left: 10,
            }}>
              {tag.text}
            </span>
          </div>
        ))}
      </div>

      {/* ── BOTTOM ZONE: Connect Button ── */}
      <div className="flex items-center justify-center w-full flex-shrink-0" style={{ paddingTop: 8 }}>
        <motion.button
          className="flex items-center justify-center gap-2 cursor-default select-none"
          style={{
            width: '65%',
            height: 46,
            borderRadius: 12,
            background: 'rgba(59,130,246,0.08)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(59,130,246,0.25)',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          whileHover={{
            scale: 1.02,
            background: 'rgba(59,130,246,0.15)',
            borderColor: 'rgba(59,130,246,0.5)',
            transition: { type: 'spring', stiffness: 400, damping: 24 },
          }}
          whileTap={{
            scale: 0.98,
            transition: { type: 'spring', stiffness: 400, damping: 24 },
          }}
        >
          <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="text-[11px] font-medium tracking-[0.06em]" style={{ color: 'rgba(255,255,255,0.85)' }}>
            + Connect New Station
          </span>
        </motion.button>
      </div>
    </div>
  )
}

function Metric({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center gap-1">
      <span style={{ fontSize: 9, fontFamily: metricsFont, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.04em' }}>
        {label}:
      </span>
      <span style={{ fontSize: 9, fontFamily: metricsFont, fontWeight: 500, color: color ?? '#06B6D4' }}>
        {value}
      </span>
    </div>
  )
}

/* ─── 3D Nexus Sphere — God Level ─── */

const SPHERE_S = 260

const NODE_POS: { x: number; y: number }[] = [
  { x: 0.5, y: 0.03 }, { x: 0.88, y: 0.15 },
  { x: 0.97, y: 0.5 }, { x: 0.88, y: 0.85 },
  { x: 0.5, y: 0.97 }, { x: 0.12, y: 0.85 },
  { x: 0.03, y: 0.5 }, { x: 0.12, y: 0.15 },
]

const HUB_NODES = new Set([0, 2, 4, 6])

const NODE_LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 2], [2, 4], [4, 6], [6, 0],
  [1, 3], [3, 5], [5, 7], [7, 1],
  [0, 4], [2, 6],
]

const CIRCULAR_FLOWS = [
  { links: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0]], color: ACCENT },
  { links: [[0, 2], [2, 4], [4, 6], [6, 0]], color: '#06B6D4' },
]

const SCAN_RINGS = [
  { border: '1px solid',  delay: 0, opacity: 0.15 },
  { border: '0.5px dashed', delay: 1.3, opacity: 0.1 },
  { border: '0.5px solid', delay: 2.6, opacity: 0.08 },
]

const RING_ORBITS = [
  { transform: 'rotateX(90deg)',            border: '1.5px solid', opacity: 0.3,  dotCount: 3, dotSpeed: 14, dotColor: ACCENT },
  { transform: 'rotateX(65deg) rotateY(45deg)',  border: '1px dashed',  opacity: 0.25, dotCount: 2, dotSpeed: 18, dotColor: '#06B6D4' },
  { transform: 'rotateY(90deg)',            border: '1.5px solid', opacity: 0.22, dotCount: 2, dotSpeed: 22, dotColor: ACCENT },
  { transform: 'rotateX(65deg) rotateY(-45deg)', border: '1px dotted',  opacity: 0.2,  dotCount: 2, dotSpeed: 16, dotColor: '#06B6D4' },
  { transform: 'rotateX(30deg)',            border: '1px solid',   opacity: 0.18, dotCount: 1, dotSpeed: 25, dotColor: ACCENT },
]

const FLOATING_TAGS = [
  { text: 'NODE 7 SYNC: Optimizing', x: '73%', y: '4%' },
  { text: 'STREAM B: OK', x: '4%', y: '36%' },
  { text: 'LAT: 15ms', x: '68%', y: '88%' },
]

function GodRays({ S, hovered }: { S: number; hovered: boolean }) {
  const rays = Array.from({ length: 16 })
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: S, height: S }}
      animate={{ rotateZ: 360 }}
      transition={{ duration: hovered ? 20 : 45, ease: 'linear', repeat: Infinity }}
    >
      {rays.map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: '50%', top: 0,
            width: 0.5, height: '55%',
            background: `linear-gradient(to top, transparent 0%, ${c(0.015)} 40%, ${c(0.025)} 60%, transparent 100%)`,
            transform: `rotate(${i * 22.5}deg)`,
            transformOrigin: 'bottom center',
          }}
        />
      ))}
    </motion.div>
  )
}

function ScanLine({ S }: { S: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ width: S, height: S }}
      animate={{ rotateZ: 360 }}
      transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
    >
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`}>
        <circle cx={S / 2} cy={S / 2} r={S / 2 - 0.5}
          fill="none" stroke={c(0.1)} strokeWidth="0.6"
          strokeDasharray="1.5 20" strokeLinecap="round"
        />
        <motion.circle cx={S / 2} cy={S / 2} r={S / 2 - 0.5}
          fill="none" stroke={ACCENT} strokeWidth="1.2"
          strokeDasharray="4 600" strokeLinecap="round" opacity={0.4}
          style={{ pathLength: 1 }}
          animate={{ strokeDashoffset: [0, -604] }}
          transition={{ duration: 4, ease: 'linear', repeat: Infinity }}
        />
      </svg>
    </motion.div>
  )
}

function CorePulse({ S }: { S: number }) {
  return (
    <div className="absolute pointer-events-none"
      style={{ width: S * 0.45, height: S * 0.45, left: '27.5%', top: '27.5%' }}
    >
      {/* Deep halo */}
      <motion.div className="absolute inset-0 rounded-full"
        style={{ background: `radial-gradient(circle, ${c(0.18)} 0%, transparent 70%)` }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity }}
      />
      {/* Cyan halo */}
      <motion.div className="absolute inset-[15%] rounded-full"
        style={{ background: `radial-gradient(circle, rgba(6,182,212,0.2) 0%, transparent 100%)` }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: Infinity, delay: 0.3 }}
      />
      {/* Bright core */}
      <div className="absolute rounded-full"
        style={{
          width: '18%', height: '18%',
          left: '41%', top: '41%',
          background: '#06B6D4',
          boxShadow: '0 0 12px rgba(6,182,212,0.9), 0 0 35px rgba(6,182,212,0.3)',
        }}
      />
    </div>
  )
}

function OrbitalTrailDot({ ringTransform, speed, delay, color, size, opacity }: {
  ringTransform: string; speed: number; delay: number; color: string; size: number; opacity: number
}) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ transformStyle: 'preserve-3d', transform: ringTransform }}
      animate={{ rotateZ: [0, 360] }}
      transition={{ duration: speed, ease: 'linear', repeat: Infinity, delay }}
    >
      <div className="absolute rounded-full"
        style={{
          width: size, height: size,
          left: `calc(50% - ${size / 2}px)`, top: -size / 2,
          background: color, opacity,
          boxShadow: size >= 2 ? `0 0 5px ${color}60` : 'none',
        }}
      />
    </motion.div>
  )
}

function OrbitalParticle({ ringTransform, speed, delay, color }: {
  ringTransform: string; speed: number; delay: number; color: string
}) {
  const trail = [
    { delayOff: 0.2, size: 2, opacity: 0.4 },
    { delayOff: 0.4, size: 1.5, opacity: 0.2 },
    { delayOff: 0.6, size: 1, opacity: 0.1 },
  ]
  return (
    <>
      {/* Main dot */}
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: 'preserve-3d', transform: ringTransform }}
        animate={{ rotateZ: [0, 360] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity, delay }}
      >
        <div className="absolute rounded-full"
          style={{
            width: 2.5, height: 2.5,
            left: 'calc(50% - 1.25px)', top: -1.25,
            background: color,
            boxShadow: `0 0 7px ${color}99, 0 0 0 2px ${color}30`,
          }}
        />
      </motion.div>
      {/* Trail dots */}
      {trail.map((t, i) => (
        <OrbitalTrailDot
          key={i}
          ringTransform={ringTransform}
          speed={speed}
          delay={delay + t.delayOff}
          color={color}
          size={t.size}
          opacity={t.opacity}
        />
      ))}
    </>
  )
}

function ConnectionNet({ S, hovered }: { S: number; hovered: boolean }) {
  const glowIntensity = hovered ? 0.2 : 0.1

  return (
    <svg className="absolute inset-0 pointer-events-none" viewBox={`0 0 ${S} ${S}`} width={S} height={S}>
      <defs>
        <filter id="lineGlow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Base lines */}
      {NODE_LINKS.map(([a, b]) => (
        <line key={`l-${a}-${b}`}
          x1={NODE_POS[a].x * S} y1={NODE_POS[a].y * S}
          x2={NODE_POS[b].x * S} y2={NODE_POS[b].y * S}
          stroke={c(0.05)} strokeWidth="0.4"
        />
      ))}

      {/* Circular flow 1 */}
      {CIRCULAR_FLOWS[0].links.map(([a, b], i) => (
        <motion.line key={`c1-${a}-${b}`}
          x1={NODE_POS[a].x * S} y1={NODE_POS[a].y * S}
          x2={NODE_POS[b].x * S} y2={NODE_POS[b].y * S}
          stroke={c(glowIntensity)} strokeWidth="0.7" opacity={0.5}
          strokeDasharray="2 12" strokeLinecap="round"
          animate={{ strokeDashoffset: [-14, 14] }}
          transition={{ duration: 1.5, ease: 'linear', repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      {/* Circular flow 2 (cyan, opposite direction) */}
      {CIRCULAR_FLOWS[1].links.map(([a, b], i) => (
        <motion.line key={`c2-${a}-${b}`}
          x1={NODE_POS[a].x * S} y1={NODE_POS[a].y * S}
          x2={NODE_POS[b].x * S} y2={NODE_POS[b].y * S}
          stroke="rgba(6,182,212,0.25)" strokeWidth="0.6" opacity={0.4}
          strokeDasharray="1.5 18" strokeLinecap="round"
          animate={{ strokeDashoffset: [20, -20] }}
          transition={{ duration: 2.2 + i * 0.2, ease: 'linear', repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  )
}

function NetworkSphere() {
  const [hovered, setHovered] = useState(false)
  const S = SPHERE_S
  const rotDuration = hovered ? 20 : 50

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: S, height: S, perspective: 1000 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* SVG Filters */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ── Layer 1: God Rays ── */}
      <GodRays S={S} hovered={hovered} />

      {/* ── Layer 2: Scanner Pulse Rings ── */}
      {SCAN_RINGS.map((sr, i) => (
        <motion.div key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: '100%', height: '100%',
            border: `${sr.border} ${c(sr.opacity)}`,
          }}
          initial={{ scale: 0.3, opacity: 0.35 }}
          animate={{ scale: 1.7, opacity: 0 }}
          transition={{ duration: 3.5, ease: 'easeOut', repeat: Infinity, delay: sr.delay }}
        />
      ))}

      {/* ── Layer 3: Outer Aura ── */}
      <motion.div className="absolute rounded-full pointer-events-none"
        style={{
          width: S * 1.5, height: S * 1.5,
          background: `radial-gradient(circle, ${c(0.028)} 0%, transparent 65%)`,
        }}
        animate={{ opacity: hovered ? [0.5, 0.8, 0.5] : 0.5 }}
        transition={{ duration: 3, ease: 'easeInOut', repeat: hovered ? Infinity : 0 }}
      />

      {/* ── Layer 4: Core Sunburst ── */}
      <CorePulse S={S} />

      {/* ── Layer 5: Scan Line ── */}
      <ScanLine S={S} />

      {/* ── Layer 6: Rotating Nexus ── */}
      <motion.div
        className="relative"
        style={{ width: S, height: S, transformStyle: 'preserve-3d' }}
        animate={{ rotateZ: 360 }}
        transition={{ duration: rotDuration, ease: 'linear', repeat: Infinity }}
      >
        {/* Rings with orbital particles */}
        {RING_ORBITS.map((ro, i) => (
          <div key={i}>
            <div
              style={{
                position: 'absolute', inset: 0,
                borderRadius: '50%',
                border: `${ro.border} ${c(ro.opacity)}`,
                transform: ro.transform,
              }}
            />
            {Array.from({ length: ro.dotCount }).map((_, j) => (
              <OrbitalParticle
                key={j}
                ringTransform={ro.transform}
                speed={ro.dotSpeed}
                delay={(ro.dotSpeed / ro.dotCount) * j}
                color={ro.dotColor}
              />
            ))}
          </div>
        ))}

        {/* Connection net + data flows */}
        <ConnectionNet S={S} hovered={hovered} />

        {/* Network nodes */}
        {NODE_POS.map((n, i) => {
          const isHub = HUB_NODES.has(i)
          return (
            <motion.div key={i}
              className="absolute rounded-full"
              style={{
                width: isHub ? 5.5 : 4, height: isHub ? 5.5 : 4,
                left: `calc(${n.x * 100}% - ${isHub ? 2.75 : 2}px)`,
                top: `calc(${n.y * 100}% - ${isHub ? 2.75 : 2}px)`,
                background: isHub ? '#06B6D4' : ACCENT,
                boxShadow: isHub
                  ? '0 0 10px rgba(6,182,212,0.7), 0 0 25px rgba(6,182,212,0.2)'
                  : `0 0 8px ${c(0.5)}, 0 0 18px ${c(0.12)}`,
                filter: 'url(#glow)',
              }}
              animate={{ opacity: [0.3, 1, 0.3], scale: [1, isHub ? 1.2 : 1.12, 1] }}
              transition={{
                duration: isHub ? 2 : 2.5 + i * 0.15,
                ease: 'easeInOut', repeat: Infinity,
                delay: isHub ? i * 0.15 : i * 0.12,
              }}
            />
          )
        })}
      </motion.div>

      {/* ── Layer 7: Ambient Particle Field ── */}
      {Array.from({ length: 15 }).map((_, i) => {
        const x = 5 + Math.random() * 90
        const y = 5 + Math.random() * 90
        const s = 0.8 + Math.random() * 1.2
        const drift = 2 + Math.random() * 4
        const dur = 2.5 + Math.random() * 2
        return (
          <motion.div key={i}
            className="absolute rounded-full pointer-events-none"
            style={{
              width: s, height: s,
              left: `${x}%`, top: `${y}%`,
              background: i % 3 === 0 ? '#06B6D4' : ACCENT,
            }}
            animate={{
              opacity: [0.02, 0.1 + Math.random() * 0.08, 0.02],
              y: [0, -(drift), 0],
              x: [0, (i % 2 === 0 ? 1 : -1) * drift * 0.3, 0],
            }}
            transition={{
              duration: dur, ease: 'easeInOut', repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        )
      })}

    </div>
  )
}
