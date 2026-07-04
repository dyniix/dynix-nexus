import { useState } from 'react'
import { motion } from 'motion/react'

const ACCENT_RGB = '100,116,139'

const c = (o: number) => `rgba(${ACCENT_RGB},${o})`

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
}

const EASE = [0.25, 1, 0.5, 1] as const

const itemV = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE } },
}

const SETTINGS_MENU = [
  { id: 'general',      label: '\u2699\uFE0F General' },
  { id: 'appearance',   label: '\uD83C\uDFA8 Appearance' },
  { id: 'ai-models',    label: '\uD83E\uDDE0 AI Models & Bridge' },
  { id: 'runtime',      label: '\u26A1 Runtime & GPU' },
  { id: 'integrations', label: '\uD83D\uDD17 Integrations' },
  { id: 'station-sync', label: '\uD83D\uDCE1 Station Sync' },
] as const

/* ── Premium Toggle ── */

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
  return (
    <motion.div
      className="relative cursor-pointer flex-shrink-0"
      style={{
        width: 38,
        height: 20,
        borderRadius: 10,
        background: on ? '#22D3EE' : 'rgba(255,255,255,0.07)',
      }}
      onClick={onChange}
      layout
      transition={{ type: 'spring', stiffness: 520, damping: 28 }}
    >
      <motion.div
        className="absolute top-[2px]"
        style={{
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: on ? '#fff' : 'rgba(255,255,255,0.15)',
          boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
        }}
        animate={{ x: on ? 20 : 2 }}
        transition={{ type: 'spring', stiffness: 520, damping: 28 }}
      />
    </motion.div>
  )
}

/* ── Segmented Control ── */

function SegmentedControl<T extends string>({
  options,
  active,
  onChange,
}: {
  options: readonly T[]
  active: T
  onChange: (v: T) => void
}) {
  return (
    <div
      className="flex flex-shrink-0"
      style={{
        borderRadius: 8,
        background: 'rgba(255,255,255,0.025)',
        padding: 2,
        gap: 1,
      }}
    >
      {options.map((opt) => {
        const isActive = opt === active
        return (
          <motion.div
            key={opt}
            className="cursor-pointer select-none"
            style={{
              padding: '3px 10px',
              borderRadius: 6,
              background: isActive ? 'rgba(255,255,255,0.07)' : 'transparent',
              border: `1px solid ${isActive ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
            }}
            onClick={() => onChange(opt)}
            whileHover={isActive ? {} : { background: 'rgba(255,255,255,0.02)' }}
          >
            <span
              className="text-[11px] font-medium"
              style={{
                color: isActive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.18)',
              }}
            >
              {opt}
            </span>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ── Action Button ── */

function ActionButton({ label }: { label: string }) {
  return (
    <motion.button
      className="flex-shrink-0 cursor-pointer"
      style={{
        padding: '5px 12px',
        borderRadius: 6,
        border: '1px solid rgba(255,255,255,0.06)',
        background: 'transparent',
        fontSize: 10,
        color: 'rgba(255,255,255,0.35)',
      }}
      whileHover={{
        background: 'rgba(255,255,255,0.03)',
        borderColor: 'rgba(255,255,255,0.1)',
        boxShadow: '0 0 12px rgba(255,255,255,0.04)',
      }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
    </motion.button>
  )
}

/* ── Setting Row ── */

function SettingRow({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ padding: '14px 20px' }}
    >
      <div className="flex flex-col" style={{ gap: 2 }}>
        <span className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {title}
        </span>
        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.15)', maxWidth: 260 }}>
          {description}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── Card wrapper ── */

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#0A0A0C',
        border: '1px solid rgba(255,255,255,0.04)',
        borderRadius: 12,
      }}
    >
      {/* Card header */}
      <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
        <span className="text-[11px] font-medium tracking-wide uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

/* ── Main export ── */

export default function SettingsWorkspace() {
  const [activeMenu, setActiveMenu] = useState('runtime')
  const [hwAccelOn, setHwAccelOn] = useState(true)
  const [vramLimit, setVramLimit] = useState<'2GB' | '4GB' | 'MAX'>('MAX')
  const [preloadOn, setPreloadOn] = useState(true)
  const [preemptionOn, setPreemptionOn] = useState(false)
  const [maxEngines, setMaxEngines] = useState<'1' | '2' | '4'>('4')

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
        minHeight: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
      }}
      variants={containerV}
      initial="hidden"
      animate="show"
    >
      {/* Top rim light */}
      <div
        className="absolute top-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 80, background: `linear-gradient(180deg, ${c(0.03)} 0%, transparent 100%)` }}
      />
      {/* Right edge ambient */}
      <div
        className="absolute top-[20%] right-0 pointer-events-none z-20"
        style={{ width: 100, height: '40%', background: `radial-gradient(ellipse at right center, ${c(0.02)} 0%, transparent 70%)` }}
      />
      {/* Bottom shadow dissolve */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 80, background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 100%)' }}
      />

      {/* ── Content ── */}
      <div className="flex flex-col flex-1" style={{ minHeight: 0 }}>

        {/* ═══ TOP HEADER ═══ */}
        <motion.div
          variants={itemV}
          className="flex-shrink-0"
          style={{ padding: '24px 32px 22px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
        >
          <h1 className="text-[22px] font-display font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Settings
          </h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>
            System &amp; Runtime Configuration
          </p>
        </motion.div>

        {/* ═══ BODY: 25/75 ═══ */}
        <div className="flex flex-1" style={{ minHeight: 0 }}>

          {/* Column 1: Settings Menu (25%) */}
          <motion.div
            variants={itemV}
            className="flex-shrink-0 overflow-y-auto"
            style={{
              width: '25%',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.02) transparent',
            }}
          >
            <div className="flex flex-col" style={{ padding: '14px 8px' }}>
              {SETTINGS_MENU.map((item) => {
                const active = item.id === activeMenu
                return (
                  <motion.div
                    key={item.id}
                    className="relative flex items-center cursor-pointer select-none"
                    style={{
                      padding: '10px 16px',
                      borderRadius: 8,
                      margin: '1px 0',
                      background: active
                        ? 'rgba(1,176,224,0.08)'
                        : 'transparent',
                    }}
                    whileHover={active ? {} : { background: 'rgba(255,255,255,0.02)' }}
                    onClick={() => setActiveMenu(item.id)}
                    layout
                  >
                    {/* Active cyan indicator */}
                    {active && (
                      <motion.div
                        layoutId="menu-indicator"
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: 2,
                          height: 16,
                          borderRadius: 1,
                          background: '#00D9FF',
                          boxShadow: '0 0 6px rgba(0,217,255,0.3)',
                        }}
                      />
                    )}
                    <span
                      className="text-xs font-medium"
                      style={{
                        color: active ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.18)',
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div className="flex-shrink-0" style={{ width: 1, background: 'rgba(255,255,255,0.04)' }} />

          {/* Column 2: Configuration Canvas (75%) */}
          <motion.div
            variants={itemV}
            className="flex-1 overflow-y-auto"
            style={{
              minHeight: 0,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.02) transparent',
            }}
          >
            <div className="flex flex-col" style={{ padding: '24px 28px', gap: 22 }}>

              {/* Section Header */}
              <div>
                <h2 className="text-base font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Runtime &amp; GPU
                </h2>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.12)' }}>
                  Manage hardware allocation and processing priorities.
                </p>
              </div>

              {/* ── Card 1: Hardware ── */}
              <SettingsCard title="Hardware">
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <SettingRow title="Hardware Acceleration" description="Use RTX 3050 CUDA cores for media encoding">
                    <Toggle on={hwAccelOn} onChange={() => setHwAccelOn(!hwAccelOn)} />
                  </SettingRow>
                </div>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <SettingRow title="VRAM Allocation Limit" description="Maximum video memory assigned to tasks">
                    <SegmentedControl
                      options={['2GB', '4GB', 'MAX'] as const}
                      active={vramLimit}
                      onChange={setVramLimit}
                    />
                  </SettingRow>
                </div>
                <div>
                  <SettingRow title="Flush GPU Cache" description="Free stale GPU memory buffers">
                    <ActionButton label="Clear Now" />
                  </SettingRow>
                </div>
              </SettingsCard>

              {/* ── Card 2: Processing Pipeline ── */}
              <SettingsCard title="Processing Pipeline">
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <SettingRow title="Background Preloading" description="Preload media in idle cycles for near-instant encode">
                    <Toggle on={preloadOn} onChange={() => setPreloadOn(!preloadOn)} />
                  </SettingRow>
                </div>
                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <SettingRow title="Allow Preemption" description="Higher-priority tasks may interrupt active encodes">
                    <Toggle on={preemptionOn} onChange={() => setPreemptionOn(!preemptionOn)} />
                  </SettingRow>
                </div>
                <div>
                  <SettingRow title="Max Concurrent Engines" description="Parallel encode pipelines per session">
                    <SegmentedControl
                      options={['1', '2', '4'] as const}
                      active={maxEngines}
                      onChange={setMaxEngines}
                    />
                  </SettingRow>
                </div>
              </SettingsCard>

            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}
