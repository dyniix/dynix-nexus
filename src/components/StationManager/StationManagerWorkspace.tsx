import { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'motion/react'

const EASE = [0.25, 1, 0.5, 1] as const

const ACCENT_RGB = '0,217,255'

const c = (o: number) => `rgba(${ACCENT_RGB},${o})`

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
}

const itemV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

/* ─── Mock Data ─── */

const STATIONS = [
  { title: 'A-Promise',       path: '/volumes/p/a-promise',       metric: '98/100', status: 'spinner' },
  { title: 'Chronos Sync',    path: '/volumes/p/Chronos Sync',    metric: '',       status: 'dot' },
  { title: 'Origin Point',    path: '/volumes/p/origin point',    metric: '98/100', status: 'spinner' },
  { title: 'Nebula Protocol', path: '/volumes/p/nebula protocol', metric: '',       status: 'dot' },
]

const LOGS = [
  { icon: 'sys',  time: '14:32:39', tag: 'SYS' as const,  msg: 'Initializing core...' },
  { icon: 'lock', time: '14:32:39', tag: 'AUTH' as const, msg: "Key accepted for node 'Origin'..." },
  { icon: 'lock', time: '14:32:39', tag: 'AUTH' as const, msg: "Key accepted for node 'Origin'..." },
  { icon: 'data', time: '14:32:59', tag: 'DATA' as const, msg: "Syncing 'A-Promise' (55% complete)" },
  { icon: 'ok',   time: '14:32:59', tag: 'OK' as const,   msg: 'System status nominal.' },
  { icon: 'sys',  time: '14:32:59', tag: 'SYS' as const,  msg: 'Initializing core...' },
  { icon: 'sys',  time: '14:32:59', tag: 'SYS' as const,  msg: 'Initializing core...' },
  { icon: 'data', time: '14:32:00', tag: 'DATA' as const, msg: 'Syncing node process...' },
  { icon: 'ok',   time: '14:32:08', tag: 'OK' as const,   msg: 'System status nominal.' },
  { icon: 'ok',   time: '14:32:20', tag: 'OK' as const,   msg: 'System status nominal.' },
  { icon: 'data', time: '14:32:28', tag: 'DATA' as const, msg: "Syncing started node 'Origin'..." },
  { icon: 'data', time: '14:32:29', tag: 'DATA' as const, msg: 'System status nominal.' },
  { icon: 'data', time: '14:32:29', tag: 'DATA' as const, msg: 'System status nominal.' },
  { icon: 'data', time: '14:32:29', tag: 'DATA' as const, msg: 'System status nominal.' },
  { icon: 'ok',   time: '14:32:20', tag: 'OK' as const,   msg: 'System status nominal.' },
  { icon: 'warn', time: '14:33:21', tag: 'WARN' as const, msg: 'High latency detected...' },
  { icon: 'warn', time: '14:33:35', tag: 'WARN' as const, msg: 'High latency detected is...' },
  { icon: 'data', time: '14:39:39', tag: 'DATA' as const, msg: 'System status nominal.' },
  { icon: 'warn', time: '14:39:36', tag: 'WARN' as const, msg: 'High latency detected...' },
  { icon: 'warn', time: '14:39:37', tag: 'WARN' as const, msg: 'High latency detected is...' },
  { icon: 'data', time: '14:33:38', tag: 'DATA' as const, msg: 'System status nominal.' },
  { icon: 'lock', time: '14:33:38', tag: 'AUTH' as const, msg: "1 accepted for node 'Gtngi'..." },
  { icon: 'data', time: '14:33:39', tag: 'DATA' as const, msg: "Syncing status for node 'Origin'" },
  { icon: 'sys',  time: '14:33:39', tag: 'SYS' as const,  msg: 'Initializing core...' },
  { icon: 'data', time: '14:32:38', tag: 'DATA' as const, msg: "Syncing 'A-Promise' (55% complete)." },
  { icon: 'ok',   time: '14:32:30', tag: 'OK' as const,   msg: 'System status nominal.' },
  { icon: 'warn', time: '14:32:39', tag: 'WARN' as const, msg: 'High latency detected...' },
  { icon: 'lock', time: '14:39:39', tag: 'AUTH' as const, msg: "Key accepted for node 'Origin'..." },
  { icon: 'data', time: '14:39:39', tag: 'DATA' as const, msg: 'System status nominal.' },
]

const TAG_STYLE: Record<string, { text: string; bg: string; border: string; badgeBg: string; iconColor: string }> = {
  SYS:  { text: '#00D9FF', bg: 'rgba(0,217,255,0.06)', border: 'rgba(0,217,255,0.12)', badgeBg: 'rgba(0,217,255,0.15)',  iconColor: '#00D9FF' },
  AUTH: { text: '#F59E0B', bg: 'rgba(245,158,11,0.06)',  border: 'rgba(245,158,11,0.12)',  badgeBg: 'rgba(245,158,11,0.15)',   iconColor: '#F59E0B' },
  DATA: { text: '#3B82F6', bg: 'rgba(59,130,246,0.06)',  border: 'rgba(59,130,246,0.12)',  badgeBg: 'rgba(59,130,246,0.15)',   iconColor: '#3B82F6' },
  WARN: { text: '#EF4444', bg: 'rgba(239,68,68,0.06)',   border: 'rgba(239,68,68,0.12)',   badgeBg: 'rgba(239,68,68,0.15)',    iconColor: '#EF4444' },
  OK:   { text: '#10B981', bg: 'rgba(16,185,129,0.06)',  border: 'rgba(16,185,129,0.12)',  badgeBg: 'rgba(16,185,129,0.15)',   iconColor: '#10B981' },
}

/* ─── 3D Projection & Rotating Sphere Config ─── */

const R_SPHERE = 78
const D_CAM = 250

// 3D Nodes placed on the sphere surface
const SPHERE_NODES = [
  { id: 0, x: 55,  y: -48, z: 45,  label: "NODE 7 SYNC: Optimizing", sub: "LAT: 15ms",  align: "right" },
  { id: 1, x: -70, y: -12, z: 40,  label: "STREAM B: OK",            sub: "LAT: 17ms",  align: "left" },
  { id: 2, x: 68,  y: 15,  z: 35,  label: "GTBEAM B: OK",            sub: "LAT: 16ms",  align: "right" },
  { id: 3, x: -25, y: 62,  z: 48,  label: "STREAM B: OK",            sub: "LAT: 12ms",  align: "left" },
  { id: 4, x: 42,  y: 52,  z: -45, label: "NODE 7 SYNC: Optimizing", sub: "LAT: 16ms",  align: "right" },
  { id: 5, x: -45, y: -58, z: -48, label: "STREAM B: OK",            sub: "LAT: 18ms",  align: "left" },
]

const SPHERE_LINKS = [
  { from: 0, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 1 },
  { from: 1, to: 0 },
  { from: 0, to: 4 },
  { from: 4, to: 2 },
  { from: 1, to: 5 },
  { from: 5, to: 3 },
]

// 3D rotation projection function
function sphereProject(x: number, y: number, z: number, rx: number, ry: number) {
  const cy = Math.cos(ry), sy = Math.sin(ry)
  const x1 = x * cy - z * sy
  const z1 = x * sy + z * cy
  const cx = Math.cos(rx), sx = Math.sin(rx)
  const y2 = y * cx - z1 * sx
  const z2 = y * sx + z1 * cx
  const s = D_CAM / (D_CAM + z2)
  return { x: x1 * s + 150, y: y2 * s + 150, z: z2, s }
}

/* ─── Main Component ─── */

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
      {/* Ambient background glows */}
      <div className="absolute top-[20%] right-0 pointer-events-none z-20"
        style={{ width: 160, height: '50%', background: `radial-gradient(ellipse at right center, ${c(0.03)} 0%, transparent 70%)` }}
      />
      <div className="absolute top-[30%] left-0 pointer-events-none z-20"
        style={{ width: 120, height: '40%', background: `radial-gradient(ellipse at left center, ${c(0.02)} 0%, transparent 70%)` }}
      />
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 160, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 30%, rgba(0,0,0,0.04) 70%, transparent 100%)' }}
      />

      <div className="flex flex-col flex-1" style={{ padding: 24 }}>
        
        {/* ═══ Header Section ═══ */}
        <motion.div variants={itemV} className="flex items-center justify-between flex-shrink-0" style={{ height: 40, marginBottom: 12 }}>
          <div>
            <h2 className="font-display text-base font-semibold tracking-tight leading-none" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Station Manager
            </h2>
          </div>
          <div className="flex items-center gap-2 cursor-pointer text-slate-500 hover:text-white transition-colors">
            <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>
            </svg>
          </div>
        </motion.div>

        {/* ═══ 3-Column Layout ═══ */}
        <div className="flex gap-5 flex-1" style={{ minHeight: 0 }}>
          
          {/* COLUMN 1: PROJECT NETWORK (26%) */}
          <motion.div
            variants={itemV}
            className="flex flex-col"
            style={{
              flex: '26 0 0%',
              background: 'rgba(8,8,12,0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${c(0.06)}`,
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: `inset 0 0 30px rgba(0,0,0,0.15)`,
            }}
          >
            {/* Header */}
            <div className="flex flex-col flex-shrink-0" style={{ padding: '18px 20px 10px 20px' }}>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="none" stroke={c(0.6)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" /><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" /><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1" />
                </svg>
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: c(0.5) }}>
                  PROJECT NETWORK
                </span>
              </div>
            </div>

            <NetworkColumnContent />
          </motion.div>

          {/* COLUMN 2: COMMAND CANVAS (48%) */}
          <motion.div
            variants={itemV}
            className="flex flex-col"
            style={{
              flex: '48 0 0%',
              background: 'rgba(8,8,12,0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${c(0.06)}`,
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: `inset 0 0 30px rgba(0,0,0,0.15)`,
            }}
          >
            {/* Header */}
            <div className="flex flex-col flex-shrink-0" style={{ padding: '18px 20px 10px 20px' }}>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="none" stroke={c(0.6)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" /><path d="M3 12h3M18 12h3M12 3v3M12 18v3" />
                </svg>
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: c(0.5) }}>
                  COMMAND CANVAS
                </span>
              </div>
            </div>

            <CommandCanvasContent />
          </motion.div>

          {/* COLUMN 3: LIVE TELEMETRY (26%) */}
          <motion.div
            variants={itemV}
            className="flex flex-col"
            style={{
              flex: '26 0 0%',
              background: 'rgba(8,8,12,0.55)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: `1px solid ${c(0.06)}`,
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: `inset 0 0 30px rgba(0,0,0,0.15)`,
            }}
          >
            {/* Header */}
            <div className="flex flex-col flex-shrink-0" style={{ padding: '18px 20px 10px 20px' }}>
              <div className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="w-[13px] h-[13px]" fill="none" stroke={c(0.6)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 17 10 11 4 5" /><line x1="12" y1="19" x2="20" y2="19" />
                </svg>
                <span className="text-[10px] font-semibold tracking-[0.22em] uppercase" style={{ color: c(0.5) }}>
                  LIVE TELEMETRY
                </span>
              </div>
            </div>

            <LiveTelemetryContent />
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}

/* ─── Column 1 Implementation ─── */

function NetworkColumnContent() {
  const linePath = "M0,28 C28,18 42,6 62,14 C82,22 96,2 116,18 C136,32 152,8 172,12 C186,15 192,9 200,5"
  const areaPath = `${linePath} L200,42 L0,42 Z`

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Smooth Sparkline */}
      <div style={{ flex: '0 0 auto', padding: '4px 20px 12px 20px' }}>
        <div className="relative" style={{ width: '100%', height: 42 }}>
          <svg width="100%" height="100%" viewBox="0 0 200 42" preserveAspectRatio="none" className="absolute inset-0">
            <defs>
              <linearGradient id="networkGraphFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,217,255,0.12)" />
                <stop offset="100%" stopColor="rgba(0,217,255,0)" />
              </linearGradient>
            </defs>
            <path d={areaPath} fill="url(#networkGraphFill)" />
            <motion.path
              d={linePath}
              fill="none"
              stroke="#00D9FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </svg>
        </div>
      </div>

      <div style={{ height: 1, margin: '0 20px', background: `linear-gradient(90deg, transparent 0%, ${c(0.06)} 30%, ${c(0.06)} 70%, transparent 100%)` }} />

      {/* Stations List */}
      <div className="flex-1 overflow-y-auto" style={{ minHeight: 0, scrollbarWidth: 'thin', scrollbarColor: `${c(0.12)} transparent` }}>
        <div className="flex flex-col gap-2.5" style={{ padding: '14px 16px' }}>
          {STATIONS.map((station) => (
            <StationRowCard key={station.title} station={station} />
          ))}
        </div>
      </div>
    </div>
  )
}

function StationRowCard({ station }: { station: typeof STATIONS[number] }) {
  return (
    <motion.div
      className="flex items-center gap-3 cursor-default"
      style={{
        borderRadius: 12,
        background: 'rgba(10,10,14,0.45)',
        border: '1px solid rgba(255,255,255,0.03)',
        padding: '11px 12px',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      whileHover={{
        y: -1,
        borderColor: c(0.18),
        boxShadow: `0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 ${c(0.03)}`,
        transition: { type: 'spring', stiffness: 450, damping: 22 },
      }}
    >
      {/* Folder Container */}
      <div className="flex-shrink-0 flex items-center justify-center"
        style={{
          width: 32, height: 32,
          borderRadius: 8,
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.04)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
        }}
      >
        <svg viewBox="0 0 24 24" className="w-[14px] h-[14px]" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-[12px] font-medium leading-tight truncate" style={{ color: 'rgba(255,255,255,0.72)' }}>
          {station.title}
        </div>
        <div className="text-[8px] font-mono truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.16)' }}>
          {station.path}
        </div>
      </div>

      {station.metric && (
        <div className="text-[9px] font-mono tabular-nums flex-shrink-0" style={{ color: 'rgba(255,255,255,0.22)', marginRight: 6 }}>
          {station.metric}
        </div>
      )}

      {/* Spinner / Dot status render */}
      <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 16, height: 16 }}>
        {station.status === 'spinner' ? (
          <div className="relative flex items-center justify-center" style={{ width: 16, height: 16 }}>
            <motion.svg
              className="absolute"
              viewBox="0 0 24 24"
              style={{ width: 16, height: 16 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.5, ease: 'linear', repeat: Infinity }}
            >
              <circle cx="12" cy="12" r="9" fill="none" stroke="#00D9FF" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
            </motion.svg>
            <div className="w-[3px] h-[3px] rounded-full bg-[#00D9FF]" style={{ boxShadow: '0 0 6px #00D9FF' }} />
          </div>
        ) : (
          <div className="relative flex items-center justify-center" style={{ width: 14, height: 14 }}>
            <motion.div
              className="absolute rounded-full"
              style={{ width: 12, height: 12, border: '1px solid rgba(0,217,255,0.3)', opacity: 0.3 }}
              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
            />
            <div className="w-[5px] h-[5px] rounded-full bg-[#00D9FF]" style={{ boxShadow: '0 0 6px #00D9FF' }} />
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Column 2 Implementation ─── */

function CommandCanvasContent() {
  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ padding: '4px 14px 14px 14px', overflowY: 'auto' }}>
      
      {/* Telemetry HUD */}
      <div className="w-full flex flex-col flex-shrink-0" style={{ padding: '0 6px', gap: 6 }}>
        {/* Row 1 */}
        <div className="flex items-center gap-4 text-[9px] font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 24" className="w-[10px] h-[10px]" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>14:32 PST</span>
          </div>
          
          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 10" className="w-[16px] h-[8px] text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0,5 Q4,1 8,5 T16,5 T24,5" />
            </svg>
            <span>Core Health: <span className="text-cyan-400 font-semibold">99%</span></span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg viewBox="0 0 24 10" className="w-[16px] h-[8px] text-blue-400" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0,5 Q4,8 8,5 T16,5 T24,5" />
            </svg>
            <span>Network Load: <span className="text-blue-400 font-semibold">15%</span></span>
          </div>
        </div>

        {/* Row 2 */}
        <div className="flex justify-between items-center text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <div className="flex gap-4">
            <div>LAT: <span className="text-white">14ms</span></div>
            <div>IOPS: <span className="text-white">12k</span></div>
          </div>
          <div className="flex gap-4">
            <div>LAT: <span className="text-white">14ms</span></div>
            <div>IOPS: <span className="text-white">12k</span></div>
          </div>
        </div>
      </div>

      {/* 3D Rotating Sphere Canvas */}
      <div className="flex-shrink-0 self-center flex items-center justify-center" style={{ width: 320, height: 320, overflow: 'visible' }}>
        <Rotating3DSphere />
      </div>

      {/* Connect Station Button */}
      <div className="flex items-center justify-center w-full flex-shrink-0" style={{ paddingTop: 8 }}>
        <motion.button
          className="flex items-center justify-center gap-2 cursor-pointer select-none"
          style={{
            width: '65%',
            height: 42,
            borderRadius: 12,
            background: 'rgba(0,217,255,0.05)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(0,217,255,0.22)',
          }}
          whileHover={{
            scale: 1.02,
            background: 'rgba(0,217,255,0.12)',
            borderColor: 'rgba(0,217,255,0.45)',
            boxShadow: '0 0 15px rgba(0,217,255,0.15)',
            transition: { type: 'spring', stiffness: 400, damping: 22 },
          }}
          whileTap={{
            scale: 0.98,
            transition: { type: 'spring', stiffness: 400, damping: 22 },
          }}
        >
          <svg viewBox="0 0 24 24" className="w-[12px] h-[12px]" fill="none" stroke="#00D9FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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

/* ─── 3D Rotating Sphere holographic system ─── */

function Rotating3DSphere() {
  const [rot, setRot] = useState({ x: 0.15, y: 0.5 })
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let id: number
    const tick = () => {
      setRot(p => ({
        x: p.x + (hovered ? 0.001 : 0.002),
        y: p.y + (hovered ? 0.0025 : 0.005),
      }))
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(id)
  }, [hovered])

  const wire3D = useMemo(() => {
    const rings: { x: number; y: number; z: number }[][] = []
    for (let k = 0; k < 8; k++) {
      const alpha = (k / 8) * Math.PI
      const ring: { x: number; y: number; z: number }[] = []
      for (let i = 0; i < 48; i++) {
        const theta = (i / 48) * Math.PI * 2
        const rx = R_SPHERE * Math.cos(theta), ry = R_SPHERE * Math.sin(theta)
        ring.push({ x: rx * Math.cos(alpha), y: ry, z: -rx * Math.sin(alpha) })
      }
      rings.push(ring)
    }
    for (let k = -2; k <= 2; k++) {
      const Y = k * 28, r = Math.sqrt(R_SPHERE * R_SPHERE - Y * Y)
      const ring: { x: number; y: number; z: number }[] = []
      for (let i = 0; i < 48; i++) {
        const theta = (i / 48) * Math.PI * 2
        ring.push({ x: r * Math.cos(theta), y: Y, z: r * Math.sin(theta) })
      }
      rings.push(ring)
    }
    return rings
  }, [])

  const loops2D = useMemo(() =>
    wire3D.map(r => r.map(p => sphereProject(p.x, p.y, p.z, rot.x, rot.y))), [wire3D, rot])

  const nodes2D = useMemo(() =>
    SPHERE_NODES.map(n => ({ ...n, p: sphereProject(n.x, n.y, n.z, rot.x, rot.y) })), [rot])

  const links2D = useMemo(() =>
    SPHERE_LINKS.map(l => {
      const a = SPHERE_NODES[l.from], b = SPHERE_NODES[l.to]
      const pts: { x: number; y: number }[] = []
      for (let i = 0; i <= 16; i++) {
        const t = i / 16
        let ix = (1 - t) * a.x + t * b.x, iy = (1 - t) * a.y + t * b.y, iz = (1 - t) * a.z + t * b.z
        const len = Math.sqrt(ix * ix + iy * iy + iz * iz), f = R_SPHERE / len
        const p = sphereProject(ix * f, iy * f, iz * f, rot.x, rot.y)
        pts.push(p)
      }
      return { ...l, pts }
    }), [rot])

  const particles2D = useMemo(() =>
    SPHERE_LINKS.map((l, idx) => {
      const a = SPHERE_NODES[l.from], b = SPHERE_NODES[l.to]
      const t = (rot.y * 1.6 + idx * 0.31) % 1
      let ix = (1 - t) * a.x + t * b.x, iy = (1 - t) * a.y + t * b.y, iz = (1 - t) * a.z + t * b.z
      const len = Math.sqrt(ix * ix + iy * iy + iz * iz), f = R_SPHERE / len
      return sphereProject(ix * f, iy * f, iz * f, rot.x, rot.y)
    }), [rot])

  const toP = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => (i === 0 ? 'M' : 'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ')

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: 900 }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      
      <div className="absolute pointer-events-none rounded-full" style={{ width: '55%', paddingBottom: '55%', background: 'radial-gradient(circle, rgba(0,217,255,0.12) 0%, transparent 70%)', filter: 'blur(12px)', top: '22.5%', left: '22.5%' }} />
      <motion.div className="absolute pointer-events-none rounded-full" style={{ width: '38%', paddingBottom: '38%', background: 'radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 80%)', top: '31%', left: '31%' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.5, 0.25] }} transition={{ duration: 3.5, ease: 'easeInOut', repeat: Infinity }} />

      <svg width="100%" height="100%" viewBox="0 0 300 300" className="absolute inset-0 pointer-events-none overflow-visible">
        <defs>
          <filter id="sphereGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {loops2D.map((loop, i) => {
          const avgZ = loop.reduce((s, p) => s + p.z, 0) / loop.length
          const d = Math.max(0.04, 0.12 - (avgZ + R_SPHERE) / (R_SPHERE * 2) * 0.08)
          return <path key={`l-${i}`} d={toP(loop) + ' Z'} fill="none" stroke={`rgba(0,217,255,${d.toFixed(3)})`} strokeWidth={avgZ < 0 ? 1 : 0.6} />
        })}

        {links2D.map((link, i) => {
          const avgZ = link.pts.reduce((s: any, p: any) => s + p.z, 0) / link.pts.length
          const d = Math.max(0.06, 0.2 - (avgZ + R_SPHERE) / (R_SPHERE * 2) * 0.14)
          return <path key={`lnk-${i}`} d={toP(link.pts)} fill="none" stroke={`rgba(0,217,255,${d.toFixed(3)})`} strokeWidth="0.7" strokeDasharray="2.5 3.5" />
        })}

        {particles2D.map((pt, i) => (
          <circle key={`p-${i}`} cx={pt.x} cy={pt.y} r={pt.z < 0 ? 2.5 : 1.2} fill="#00D9FF" opacity={pt.z < 0 ? 0.9 : 0.25} filter={pt.z < 0 ? 'url(#sphereGlow)' : undefined} />
        ))}

        {nodes2D.map((n) => {
          const front = n.p.z < 0
          const sz = (n.id < 2 ? 5.5 : 4.5) * n.p.s
          return (
            <g key={`n-${n.id}`} opacity={front ? 1 : 0.2}>
              {front && <circle cx={n.p.x} cy={n.p.y} r={sz * 2.2} fill="none" stroke="rgba(0,217,255,0.25)" strokeWidth="0.6" />}
              <circle cx={n.p.x} cy={n.p.y} r={sz} fill="#00D9FF" filter={front ? 'url(#nodeGlow)' : undefined} />
              {front && <circle cx={n.p.x} cy={n.p.y} r={sz * 0.4} fill="white" opacity={0.9} />}
            </g>
          )
        })}

        {nodes2D.map((n) => {
          if (n.p.z > 10) return null
          const right = n.align === 'right', lx = n.p.x, ly = n.p.y
          const bx = lx + (right ? 20 : -20), by = ly - 14, ex = lx + (right ? 30 : -30)
          const a = Math.max(0.15, 0.7 - (n.p.z + R_SPHERE) / (R_SPHERE * 2) * 0.55)
          return (
            <g key={`ld-${n.id}`} opacity={a}>
              <polyline points={`${lx},${ly} ${bx},${by} ${ex},${by}`} fill="none" stroke="rgba(0,217,255,0.3)" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
              <circle cx={ex} cy={by} r="1.2" fill="rgba(0,217,255,0.5)" />
            </g>
          )
        })}
      </svg>

      {nodes2D.map((n) => {
        if (n.p.z > 10) return null
        const right = n.align === 'right', lx = n.p.x + (right ? 34 : -34), ly = n.p.y - 20
        const a = Math.max(0.15, 0.85 - (n.p.z + R_SPHERE) / (R_SPHERE * 2) * 0.7)
        return (
          <div key={`lb-${n.id}`} className="absolute pointer-events-none select-none font-mono" style={{ left: lx, top: ly, transform: right ? 'none' : 'translateX(-100%)', textAlign: right ? 'left' : 'right', opacity: a, whiteSpace: 'nowrap' }}>
            <div className="text-[6.5px] font-semibold tracking-wide leading-tight uppercase" style={{ color: 'rgba(255,255,255,0.7)' }}>{n.label}</div>
            <div className="text-[6px] font-medium leading-tight mt-0.5" style={{ color: 'rgba(0,217,255,0.8)' }}>{n.sub}</div>
          </div>
        )
      })}
    </div>
  )
}

/* ─── Column 3 Implementation ─── */

function LiveTelemetryContent() {
  const [visibleCount, setVisibleCount] = useState(4)
  const scrollRef = useRef<HTMLDivElement>(null)
  const isHovering = useRef(false)

  // Autoplay logs with a fast organic delay
  useEffect(() => {
    if (visibleCount >= LOGS.length) return
    const t = setTimeout(() => setVisibleCount((p) => Math.min(p + 1, LOGS.length)), 90)
    return () => clearTimeout(t)
  }, [visibleCount])

  // Autoscroll logic
  useEffect(() => {
    if (!scrollRef.current || isHovering.current) return
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [visibleCount])

  return (
    <div className="flex-1 flex flex-col min-h-0" style={{ padding: '0 16px 16px 16px' }}>
      <div
        className="relative flex-1"
        style={{
          borderRadius: 10,
          background: '#030407',
          boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.02)',
          overflow: 'hidden',
        }}
      >
        {/* Top/Bottom Fade Masks */}
        <div className="absolute top-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: 24, background: 'linear-gradient(180deg, #030407 0%, transparent 100%)' }}
        />
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-10"
          style={{ height: 24, background: 'linear-gradient(0deg, #030407 0%, transparent 100%)' }}
        />

        {/* Scroll logs container */}
        <div
          ref={scrollRef}
          className="h-full overflow-y-auto"
          onMouseEnter={() => { isHovering.current = true }}
          onMouseLeave={() => { isHovering.current = false }}
          style={{
            padding: '16px 12px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(0,217,255,0.12) transparent',
          }}
        >
          <div className="flex flex-col" style={{ gap: 7.5 }}>
            {LOGS.slice(0, visibleCount).map((log, i) => {
              const isRecent = i >= visibleCount - 4
              const ts = TAG_STYLE[log.tag]
              return (
                <motion.div
                  key={i}
                  className="flex items-center gap-2"
                  initial={isRecent ? { opacity: 0, x: -4 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: isRecent ? (i - (visibleCount - 4)) * 0.1 : 0, ease: EASE }}
                  style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', ui-monospace, monospace" }}
                >
                  {/* Badge Container matching station mng.png exactly */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center"
                    style={{
                      width: 14, height: 14,
                      borderRadius: 3,
                      background: ts.badgeBg,
                      border: `1px solid ${ts.border}`,
                      color: ts.iconColor,
                    }}
                  >
                    {log.icon === 'lock' && (
                      <svg viewBox="0 0 24 24" className="w-[8px] h-[8px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                    {log.icon === 'data' && (
                      <svg viewBox="0 0 24 24" className="w-[8px] h-[8px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                      </svg>
                    )}
                    {log.icon === 'warn' && (
                      <svg viewBox="0 0 24 24" className="w-[8px] h-[8px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                    )}
                    {log.icon === 'ok' && (
                      <svg viewBox="0 0 24 24" className="w-[8px] h-[8px]" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                    {log.icon === 'sys' && (
                      <svg viewBox="0 0 24 24" className="w-[8px] h-[8px]" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82-.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                      </svg>
                    )}
                  </div>

                  {/* Timestamp */}
                  <span className="flex-shrink-0 text-[10px] text-slate-500 font-mono">
                    [{log.time}]
                  </span>

                  {/* Tag */}
                  <span
                    className="flex-shrink-0 font-bold"
                    style={{
                      fontSize: 9.5,
                      fontFamily: 'inherit',
                      color: ts.text,
                      background: ts.bg,
                      border: `1px solid ${ts.border}`,
                      padding: '0px 3px',
                      borderRadius: 3,
                    }}
                  >
                    {log.tag}
                  </span>

                  {/* Message */}
                  <span className="text-[10px] text-slate-300 font-mono leading-none truncate" style={{ paddingLeft: 1 }}>
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
