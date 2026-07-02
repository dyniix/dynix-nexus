import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import LoadingSequence from './components/Loading/LoadingSequence'
import WelcomeScreen from './components/Welcome/WelcomeScreen'
import Shell from './components/Shell/Shell'

type Phase = 'loading' | 'welcome' | 'transitioning' | 'shell'

export default function App() {
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

  const shellActive = phase === 'transitioning' || phase === 'shell'

  /* ── TEMPORARY: Wheel event debug logger ──
     Open DevTools console (F12), scroll over workspace cards.
     The logged element is what's receiving the wheel event.
     Tell me the tagName, className, and any dataset shown. */
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      const t = e.target as HTMLElement | null
      if (!t) return
      console.group('🐭 wheel target')
      console.log('tagName:', t.tagName)
      console.log('className:', t.className)
      console.log('id:', t.id)
      console.log('dataset:', JSON.stringify(t.dataset))
      const parents: string[] = []
      let p = t.parentElement
      for (let i = 0; i < 5 && p; i++) {
        parents.push(`${p.tagName}${p.id ? '#' + p.id : ''}${p.className ? '.' + p.className.split(' ').filter(Boolean).join('.') : ''}`)
        p = p.parentElement
      }
      console.log('parents:', parents)
      console.groupEnd()
    }
    window.addEventListener('wheel', handler, { passive: true })
    return () => window.removeEventListener('wheel', handler)
  }, [])

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
