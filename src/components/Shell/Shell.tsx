import { useState, useCallback, useMemo } from 'react'
import DynamicIsland from './DynamicIsland'
import Workspace from './Workspace'
import BackgroundEngine from '../Background/BackgroundEngine'
import SidebarShell from '../sidebar/SidebarShell'
import ModulePanel from '../sidebar/ModulePanel'
import { getModuleAccent } from '../sidebar/sidebar.config'

export default function Shell({ active }: { active: boolean }) {
  const [activeModule, setActiveModule] = useState<string | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)

  const accent = useMemo(
    () => (activeModule ? getModuleAccent(activeModule) : '#00D9FF'),
    [activeModule],
  )

  const handleSelect = useCallback((id: string | null) => {
    setActiveModule(id)
  }, [])

  const handleClose = useCallback(() => {
    setPanelOpen(false)
  }, [])

  const handleTogglePanel = useCallback(() => {
    setPanelOpen(prev => !prev)
  }, [])

  return (
    <>
      <BackgroundEngine state="idle" />

      {/* Fixed overlays — z-index stack: content(10) → overlay(20) → panel(40) → sidebar/island(50) */}

      {panelOpen && (
        <div className="fixed inset-0 z-20" onClick={handleClose} />
      )}

      <SidebarShell
        activeModule={activeModule}
        panelOpen={panelOpen}
        onSelect={handleSelect}
        onTogglePanel={handleTogglePanel}
      />

      <ModulePanel
        activeModule={activeModule}
        panelOpen={panelOpen}
        accent={accent}
        onSelect={(id: string) => setActiveModule(id)}
        onClose={handleClose}
      />

      <DynamicIsland active={active} />

      {/* Scroll container — sibling of fixed elements, avoids Chromium compositor hit-testing bug */}
      <div className="absolute inset-0 overflow-y-auto z-10">
        <div className="min-h-screen flex flex-col items-center pt-24">
          <main className="w-full max-w-[1300px] px-12 flex-1">
            <Workspace active={active} />
          </main>
        </div>
      </div>
    </>
  )
}
