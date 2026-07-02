import { motion } from 'motion/react'

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-nexus-900 px-6">
      <motion.div
        className="text-center max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase mb-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Dynix Nexus
        </motion.div>

        <motion.h1
          className="text-nexus-100 font-display text-5xl sm:text-6xl font-semibold tracking-tight mb-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          Control Center
        </motion.h1>

        <motion.p
          className="text-nexus-400 text-sm leading-relaxed mb-8"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          The command center of the Dynix ecosystem.
          <br />
          Manage perception, memory, stations, and runtime —
          <br />
          all from one workspace.
        </motion.p>

        <motion.button
          className="px-6 py-2.5 text-sm font-medium text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 font-mono tracking-wide"
          onClick={onEnter}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enter Workspace
        </motion.button>

        <motion.div
          className="mt-12 text-nexus-500 text-[10px] font-mono tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          v0.1.0 | dynix
        </motion.div>
      </motion.div>
    </div>
  )
}
