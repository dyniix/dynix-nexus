import { useState, useCallback, useMemo, useRef, useEffect } from 'react'
import Lenis from 'lenis'
import DynamicIsland from './DynamicIsland'
import Workspace from './Workspace'
import ImageEncoderWorkspace from '../Encoder/ImageEncoderWorkspace'
import VideoEncoderWorkspace from '../Encoder/VideoEncoderWorkspace'
import DocumentEncoderWorkspace from '../Encoder/DocumentEncoderWorkspace'
import AudioEncoderWorkspace from '../Encoder/AudioEncoderWorkspace'
import StationManagerWorkspace from '../StationManager/StationManagerWorkspace'
import ChroniclesWorkspace from '../Chronicles/ChroniclesWorkspace'
import MemoryJunctionWorkspace from '../MemoryJunction/MemoryJunctionWorkspace'
import LogsWorkspace from '../Logs/LogsWorkspace'
import SettingsWorkspace from '../Settings/SettingsWorkspace'
import BackgroundEngine from '../Background/BackgroundEngine'
import SidebarShell from '../sidebar/SidebarShell'
import ModulePanel from '../sidebar/ModulePanel'
import { getModuleAccent } from '../sidebar/sidebar.config'

export default function Shell({ active, initialEncoder }: { active: boolean; initialEncoder?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeModule, setActiveModule] = useState<string | null>(initialEncoder ?? null)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const lenis = new Lenis({
      wrapper: el,
      content: el.children[0] as HTMLElement,
      eventsTarget: el,
      duration: 0.8,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      infinite: false,
      autoResize: true,
      syncTouch: false,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

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

  const encoderModuleIds = new Set(['image', 'video', 'document', 'audio', 'station', 'chronicles', 'memory', 'logs', 'settings'])
  const isEncoderActive = activeModule ? encoderModuleIds.has(activeModule) : false

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
        onSelect={(id: string | null) => setActiveModule(id)}
        onClose={handleClose}
      />

      <DynamicIsland active={active} />

      {/* Scroll container — Lenis-smooth-scrolled */}
      <div ref={scrollRef} className="absolute inset-0 overflow-y-auto z-10">
        <div className="min-h-screen flex flex-col items-center pt-24">
          {isEncoderActive ? (
            <div className="flex-1 flex flex-col self-stretch" style={{ padding: '0 20px', marginTop: -16, paddingBottom: 92, marginLeft: 190, marginRight: 115 }}>
              {activeModule === 'image' && <ImageEncoderWorkspace />}
              {activeModule === 'video' && <VideoEncoderWorkspace />}
              {activeModule === 'document' && <DocumentEncoderWorkspace />}
              {activeModule === 'audio' && <AudioEncoderWorkspace />}
              {activeModule === 'station' && <StationManagerWorkspace />}
              {activeModule === 'chronicles' && <ChroniclesWorkspace />}
              {activeModule === 'memory' && <MemoryJunctionWorkspace />}
              {activeModule === 'logs' && <LogsWorkspace />}
              {activeModule === 'settings' && <SettingsWorkspace />}
            </div>
          ) : (
            <main className="w-full max-w-[1300px] px-12 flex-1">
              <Workspace active={active} />
            </main>
          )}
        </div>
      </div>
    </>
  )
}
