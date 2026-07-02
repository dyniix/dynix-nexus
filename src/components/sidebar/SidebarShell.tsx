import { useState, useCallback } from 'react'
import { motion } from 'motion/react'
import { SIDEBAR_PRIMARY, SIDEBAR_SYSTEM, MODULE_ICONS, getModuleAccent } from './sidebar.config'
import CreatorLogo from './CreatorLogo'
import SidebarIcon from './SidebarIcons'

interface SidebarShellProps {
  activeModule: string | null
  panelOpen: boolean
  onSelect: (id: string | null) => void
  onTogglePanel: () => void
}

export default function SidebarShell({
  activeModule, panelOpen, onSelect, onTogglePanel,
}: SidebarShellProps) {
  const handleClick = useCallback((id: string) => {
    onSelect(activeModule === id ? null : id)
  }, [activeModule, onSelect])

  return (
    <nav
      className="fixed z-50 pointer-events-none select-none"
      style={{
        left: 16,
        top: '50%',
        translate: '0 -50%',
      }}
    >
      <div className="flex flex-col items-center gap-[6px] pointer-events-auto">
        {/* ── Sidebar Dock — content height only ── */}
        <div className="sidebar-dock flex flex-col items-center">
          {/* Zone 1: Identity */}
          <div className="flex flex-col items-center pt-4 flex-shrink-0">
            <div
              className="flex items-center justify-center overflow-hidden relative"
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'rgba(0,217,255,0.06)',
                border: '1px solid rgba(0,217,255,0.08)',
                animation: 'sidebar-logo-breathe 6s ease-in-out infinite',
                boxShadow: '0 0 6px rgba(0,217,255,0.04), inset 0 0 12px rgba(0,217,255,0.02)',
              }}
            >
              <span className="text-cyan-400 font-display text-2xl font-bold leading-none select-none">DN</span>
            </div>
          </div>

          <div className="sidebar-dock-sep" />

          {/* Zone 2: Primary Modules (6) */}
          <div className="flex flex-col items-center gap-[4px] flex-shrink-0">
            {SIDEBAR_PRIMARY.map(mod => {
              const Icon = MODULE_ICONS[mod.id]
              const accent = 'accent' in mod
                ? (mod as typeof SIDEBAR_PRIMARY[number] & { accent: string }).accent
                : getModuleAccent(mod.id)

              if (!Icon) return null

              return (
                <SidebarIcon
                  key={mod.id}
                  icon={Icon}
                  accent={accent}
                  isActive={activeModule === mod.id}
                  onClick={() => handleClick(mod.id)}
                />
              )
            })}
          </div>

          <div className="sidebar-dock-sep" />

          {/* Zone 3: System (3) */}
          <div className="flex flex-col items-center gap-[4px] flex-shrink-0">
            {SIDEBAR_SYSTEM.map(item => {
              const Icon = MODULE_ICONS[item.id]
              if (!Icon) return null
              return (
                <SidebarIcon
                  key={item.id}
                  icon={Icon}
                  isActive={activeModule === item.id}
                  onClick={() => handleClick(item.id)}
                />
              )
            })}
          </div>

          <div className="sidebar-dock-sep" />

          {/* Zone 4: Creator Logo */}
          <div className="flex flex-col items-center pb-4 flex-shrink-0">
            <div
              className="flex items-center justify-center overflow-hidden relative"
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'rgba(0,217,255,0.05)',
                border: '1px solid rgba(0,217,255,0.06)',
                animation: 'sidebar-logo-breathe 6s ease-in-out infinite',
              }}
            >
              <CreatorLogo className="w-[28px] h-[28px] text-cyan-400" />
            </div>
          </div>
        </div>

        {/* ── Expand Button — OUTSIDE sidebar dock ── */}
        <ExpandButton panelOpen={panelOpen} onToggle={onTogglePanel} />
      </div>
    </nav>
  )
}

function ExpandButton({ panelOpen, onToggle }: { panelOpen: boolean; onToggle: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.button
      className="flex items-center justify-center cursor-pointer outline-none border-none select-none"
      style={{
        width: 82,
        height: 36,
        borderRadius: 18,
        background: hovered || panelOpen
          ? 'linear-gradient(180deg, rgba(16,16,16,0.95), rgba(10,10,10,0.98))'
          : 'linear-gradient(180deg, rgba(10,10,10,0.8), rgba(8,8,8,0.85))',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid',
        borderColor: panelOpen
          ? 'rgba(0,217,255,0.12)'
          : hovered
            ? 'rgba(255,255,255,0.06)'
            : 'rgba(255,255,255,0.03)',
        boxShadow: panelOpen
          ? '0 0 12px rgba(0,217,255,0.08), 0 0 4px rgba(0,217,255,0.04)'
          : hovered
            ? '0 0 8px rgba(0,217,255,0.04)'
            : 'none',
        color: panelOpen
          ? '#00D9FF'
          : hovered
            ? 'rgba(255,255,255,0.5)'
            : 'rgba(255,255,255,0.15)',
        transition: 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, color 0.2s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      whileTap={{ scale: 0.95 }}
    >
      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {panelOpen
          ? <path d="M15 6l-6 6 6 6" />
          : <path d="M9 6l6 6-6 6" />
        }
      </svg>
    </motion.button>
  )
}
