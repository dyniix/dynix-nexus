import { motion } from 'motion/react'

const EASE = [0.25, 1, 0.5, 1] as const

export default function WelcomeScreen({
  onEnter,
  exiting,
}: {
  onEnter: () => void
  exiting: boolean
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-nexus-900 select-none"
      exit={{ opacity: 0, transition: { duration: 0.28, ease: EASE } }}
    >
      <div className="pt-12">
        <motion.div
          className="text-center max-w-lg px-6"
          animate={
            exiting
              ? { opacity: 0, y: -60, scale: 0.95 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: 0.28, ease: EASE }}
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-8"
            animate={
              exiting
                ? { y: -180, scale: 0.6 }
                : { y: 0, scale: 1 }
            }
            transition={{ duration: 0.28, ease: EASE }}
          >
            <span className="w-1 h-1 rounded-full bg-cyan-500" />
            <span className="text-cyan-400 text-xs font-mono tracking-[0.3em] uppercase">
              DYNIX NEXUS
            </span>
          </motion.div>

          <motion.div
            animate={exiting ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.24, ease: EASE }}
          >
            <motion.h1
              className="text-nexus-100 font-display text-5xl sm:text-6xl font-semibold tracking-tight mb-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15, ease: EASE }}
            >
              Control Center
            </motion.h1>

            <motion.p
              className="text-nexus-400 text-sm leading-relaxed mb-10"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.25, ease: EASE }}
            >
              The command center of the Dynix ecosystem.
              <br />
              Manage perception, memory, stations, and runtime —
              <br />
              all from one workspace.
            </motion.p>

            <motion.button
              className="px-6 py-2.5 text-sm font-medium text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-200 font-mono tracking-wide"
              onClick={onEnter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35, ease: EASE }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Workspace
            </motion.button>

            <motion.div
              className="mt-14 text-nexus-500 text-[10px] font-mono tracking-wider"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.5 }}
            >
              v0.1 Alpha | Built by Dynix
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
