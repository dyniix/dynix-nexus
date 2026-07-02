import { useState, useCallback } from 'react'
import { AnimatePresence } from 'motion/react'
import LoadingSequence from './components/Loading/LoadingSequence'
import WelcomeScreen from './components/Welcome/WelcomeScreen'
import Shell from './components/Shell/Shell'

type Phase = 'loading' | 'welcome' | 'shell'

export default function App() {
  const [phase, setPhase] = useState<Phase>('loading')

  const handleLoadingComplete = useCallback(() => {
    setPhase('welcome')
  }, [])

  const handleEnterWorkspace = useCallback(() => {
    setPhase('shell')
  }, [])

  return (
    <AnimatePresence mode="wait">
      {phase === 'loading' && (
        <LoadingSequence key="loading" onComplete={handleLoadingComplete} />
      )}
      {phase === 'welcome' && (
        <WelcomeScreen key="welcome" onEnter={handleEnterWorkspace} />
      )}
      {phase === 'shell' && (
        <Shell key="shell" />
      )}
    </AnimatePresence>
  )
}
