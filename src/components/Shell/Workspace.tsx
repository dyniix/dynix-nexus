import { motion } from 'motion/react'

export default function Workspace() {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="text-nexus-500 text-[10px] font-mono tracking-[0.2em] uppercase mb-4">
          Workspace
        </div>

        <div className="text-nexus-400 text-sm leading-relaxed">
          No module selected.
          <br />
          Open a module from the sidebar to get started.
        </div>

        <div className="mt-8 flex flex-col gap-2 items-center">
          <div className="flex items-center gap-3 text-nexus-500 text-[11px] font-mono">
            <span className="w-2 h-px bg-nexus-600" />
            Quick Actions
            <span className="w-2 h-px bg-nexus-600" />
          </div>

          <div className="flex gap-2 mt-2">
            {['◇ Dashboard', '▣ Encode', '◎ Browse'].map((action) => (
              <div
                key={action}
                className="px-3 py-1.5 rounded-lg bg-nexus-800 border border-nexus-700/50 text-nexus-500 text-[10px] font-mono tracking-wide"
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
