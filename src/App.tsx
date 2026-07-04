import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import { useLocation } from 'react-router-dom'
import LoadingSequence from './components/Loading/LoadingSequence'
import WelcomeScreen from './components/Welcome/WelcomeScreen'
import Shell from './components/Shell/Shell'

type Phase = 'loading' | 'welcome' | 'transitioning' | 'shell'

export default function App() {
  const location = useLocation()
  const [phase, setPhase] = useState<Phase>('loading')

  const handleLoadingComplete = useCallback(() => {
    setPhase('welcome')
  }, [])

  const handleEnter = useCallback(() => {
    setPhase('transitioning')
  }, [])

  useEffect(() => {
    if (phase === 'transitioning') {
      const t = setTimeout(() => setPhase('shell'), 280)
      return () => clearTimeout(t)
    }
  }, [phase])

  const isEncoderRoute = location.pathname.startsWith('/encoder/')
  const isStationRoute = location.pathname.startsWith('/station')
  const isChroniclesRoute = location.pathname.startsWith('/chronicles')
  const isMemoryRoute = location.pathname.startsWith('/memory')
  const isLogsRoute = location.pathname.startsWith('/logs')
  const isSettingsRoute = location.pathname.startsWith('/settings')

  if (isEncoderRoute) {
    const encoderType = location.pathname.split('/')[2]
    return <Shell active initialEncoder={encoderType} />
  }
  if (isStationRoute) {
    return <Shell active initialEncoder="station" />
  }
  if (isChroniclesRoute) {
    return <Shell active initialEncoder="chronicles" />
  }
  if (isMemoryRoute) {
    return <Shell active initialEncoder="memory" />
  }
  if (isLogsRoute) {
    return <Shell active initialEncoder="logs" />
  }
  if (isSettingsRoute) {
    return <Shell active initialEncoder="settings" />
  }

  const shellActive = phase === 'transitioning' || phase === 'shell'

  return (
    <div className="fixed inset-0 bg-nexus-900" style={{ overflow: 'clip' }}>
      {/* Shell — pre-rendered from mount, hidden until transitioning phase */}
      <div
        className={`transition-opacity duration-[280ms] ${shellActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
      >
        <Shell active={shellActive} />
      </div>

      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingSequence key="loading" onComplete={handleLoadingComplete} />
        )}

        {(phase === 'welcome' || phase === 'transitioning') && (
          <WelcomeScreen
            key="welcome"
            onEnter={handleEnter}
            exiting={phase === 'transitioning'}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
