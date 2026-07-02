import { useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { panelReveal, fadeUp, staggerContainer } from './SidebarMotion'
import CreatorLogo from './CreatorLogo'
import {
  MODULE_ICONS, PANEL_SECTIONS,
  IconChevronRight,
} from './sidebar.config'
import type { ModuleDef, SystemDef } from './sidebar.config'

interface ModulePanelProps {
  activeModule: string | null
  panelOpen: boolean
  accent: string
  onSelect: (id: string) => void
  onClose: () => void
}

export default function ModulePanel({
  activeModule, panelOpen, accent, onSelect, onClose,
}: ModulePanelProps) {

  useEffect(() => {
    if (!panelOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [panelOpen, onClose])

  return (
    <AnimatePresence>
      {panelOpen && (
        <motion.div
          className="fixed z-40 pointer-events-none select-none"
          style={{
            left: 118,
            top: '50%',
            translate: '0 -50%',
          }}
          variants={panelReveal}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div
            className="sidebar-panel pointer-events-auto overflow-y-auto"
            style={{ width: 280, maxHeight: '82vh', minHeight: 580 }}
          >
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">

              {/* ── Section 1: Identity Header ── */}
              <motion.div variants={fadeUp} className="flex flex-col items-center pt-8 pb-6 px-5">
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden relative mb-4"
                  style={{
                    background: `${accent}0d`,
                    border: `1px solid ${accent}12`,
                    boxShadow: `0 0 24px ${accent}14`,
                  }}
                >
                  <span className="font-display text-2xl font-bold leading-none select-none" style={{ color: accent }}>
                    DN
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-nexus-400 tracking-[0.12em] uppercase leading-tight">
                  DYNIX NEXUS
                </span>
                <span className="text-[9px] font-medium text-nexus-500/60 tracking-wider mt-[3px]">
                  AI COMMAND CENTER
                </span>
                <div className="flex items-center gap-1.5 mt-3">
                  <span
                    className="w-[6px] h-[6px] rounded-full animate-pulse"
                    style={{ background: accent, boxShadow: `0 0 6px ${accent}`, opacity: 0.7 }}
                  />
                  <span className="text-[9px] font-mono text-nexus-500/50">Runtime Online</span>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="sidebar-panel-sep" />

              {/* ── Section 2: Primary Modules (Image, Video, Document, Audio) ── */}
              <ModuleSection
                label="PRIMARY MODULES"
                items={PANEL_SECTIONS.primary.items}
                activeModule={activeModule}
                onSelect={onSelect}
                showStatus
              />

              <motion.div variants={fadeUp} className="sidebar-panel-sep" />

              {/* ── Section 3: AI Modules (Memory Junction, Station Manager) ── */}
              <ModuleSection
                label="AI MODULES"
                items={PANEL_SECTIONS.ai.items}
                activeModule={activeModule}
                onSelect={onSelect}
                showStatus
              />

              <motion.div variants={fadeUp} className="sidebar-panel-sep" />

              {/* ── Section 4: System (Chronicles, Settings, Logs) ── */}
              <SystemSection
                items={PANEL_SECTIONS.system.items}
                activeModule={activeModule}
                onSelect={onSelect}
              />

              <motion.div variants={fadeUp} className="sidebar-panel-sep" />

              {/* ── Section 5: Creator Bottom Widget ── */}
              <motion.div variants={fadeUp}>
                <CreatorSection />
              </motion.div>

              {/* Bottom breathing space */}
              <div className="h-4" />

            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ── Module Section (Primary / AI) ── */

function ModuleSection({
  label, items, activeModule, onSelect, showStatus,
}: {
  label: string
  items: ModuleDef[]
  activeModule: string | null
  onSelect: (id: string) => void
  showStatus?: boolean
}) {
  return (
    <motion.div variants={fadeUp}>
      <div className="sidebar-panel-section-label">{label}</div>
      {items.map(mod => {
        const isActive = mod.id === activeModule
        const Icon = MODULE_ICONS[mod.id]

        return (
          <button
            key={mod.id}
            className="sidebar-panel-item"
            onClick={() => onSelect(mod.id)}
            style={isActive ? {
              background: `${mod.accent}06`,
              boxShadow: `inset 0 1px 0 ${mod.accent}08`,
              borderLeft: `1px solid ${mod.accent}`,
              paddingLeft: 19,
            } : undefined}
          >
            {Icon && (
              <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" strokeWidth={1.5}
                style={{ color: isActive ? mod.accent : 'rgba(255,255,255,0.2)' }}
              />
            )}
            <div className="flex-1 min-w-0 flex flex-col gap-px">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium truncate"
                  style={{ color: isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)' }}
                >
                  {mod.title}
                </span>
                {showStatus && (
                  <span className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                    <span className="w-[5px] h-[5px] rounded-full"
                      style={{
                        background: isActive ? mod.accent : 'rgba(255,255,255,0.08)',
                        boxShadow: isActive ? `0 0 4px ${mod.accent}60` : 'none',
                      }}
                    />
                    <span className="text-[8px] font-mono text-nexus-500/50">Ready</span>
                  </span>
                )}
              </div>
              <span className="text-[9px] text-nexus-500/40 truncate">{mod.subtitle}</span>
            </div>
          </button>
        )
      })}
    </motion.div>
  )
}

/* ── System Section (Chronicles, Settings, Logs) ── */

function SystemSection({
  items, activeModule, onSelect,
}: {
  items: SystemDef[]
  activeModule: string | null
  onSelect: (id: string) => void
}) {
  return (
    <motion.div variants={fadeUp}>
      <div className="sidebar-panel-section-label">SYSTEM</div>
      {items.map(item => {
        const isActive = item.id === activeModule
        const Icon = MODULE_ICONS[item.id]

        return (
          <button
            key={item.id}
            className="sidebar-panel-item system"
            onClick={() => onSelect(item.id)}
            style={isActive ? {
              background: 'rgba(255,255,255,0.03)',
              borderLeft: '1px solid rgba(255,255,255,0.15)',
              paddingLeft: 19,
            } : undefined}
          >
            {Icon && (
              <Icon className="w-4 h-4 flex-shrink-0" strokeWidth={1.5}
                style={{ color: isActive ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)' }}
              />
            )}
            <span className="flex-1 text-xs truncate"
              style={{ color: isActive ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.4)' }}
            >
              {item.title}
            </span>
            <IconChevronRight className="w-3.5 h-3.5 flex-shrink-0"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            />
          </button>
        )
      })}
    </motion.div>
  )
}

/* ── Creator Bottom Widget ── */

function CreatorSection() {
  return (
    <div className="px-5 pt-4 pb-5">
      <div className="flex items-center gap-4">
        <div
          className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center flex-shrink-0 overflow-hidden relative"
          style={{
            background: 'rgba(0,217,255,0.05)',
            border: '1px solid rgba(0,217,255,0.06)',
            animation: 'sidebar-logo-breathe 6s ease-in-out infinite',
          }}
        >
          <CreatorLogo className="w-[28px] h-[28px] text-cyan-400" />
        </div>
        <div>
          <div
            className="text-[13px] font-display font-semibold tracking-wide"
            style={{ color: 'rgba(255,255,255,0.75)' }}
          >
            Creator
          </div>
          <div
            className="text-[9px] font-mono tracking-[0.12em] mt-0.5"
            style={{ color: 'rgba(255,255,255,0.25)' }}
          >
            DYNIX PRIME
          </div>
        </div>
      </div>
    </div>
  )
}
