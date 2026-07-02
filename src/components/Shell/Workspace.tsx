import { motion } from 'motion/react'
import { useState } from 'react'

const MODULES = [
  { id: 'encoder', icon: '▣', label: 'Media Encoder', status: 'ready' as const, desc: 'Perception pipeline' },
  { id: 'memory', icon: '◎', label: 'Memory Junction', status: 'absent' as const, desc: 'Vector store' },
  { id: 'stations', icon: '⊕', label: 'Station Manager', status: 'absent' as const, desc: 'Multi-machine' },
  { id: 'chronicles', icon: '◇', label: 'Chronicles', status: 'absent' as const, desc: 'Session history' },
  { id: 'runtime', icon: '⚙', label: 'Runtime Config', status: 'absent' as const, desc: 'Engine management' },
]

const RECENT = [
  { time: '10:28', event: 'Nexus Shell scaffolding complete' },
  { time: '10:15', event: 'Workspace Home redesigned' },
  { time: '10:02', event: 'Loading sequence created' },
  { time: '09:45', event: 'Project initialized — Dynix Nexus' },
]

const QUICK_ACTIONS = [
  { label: 'Open Media Encoder', action: 'encoder' },
  { label: 'View Runtime Status', action: 'runtime' },
  { label: 'Browse Documentation', action: 'docs' },
  { label: 'System Configuration', action: 'settings' },
]

const LAYERS = [
  { label: 'HUB', width: 180, color: 'from-cyan-500/20 to-cyan-500/5' },
  { label: 'BROKER', width: 180, color: 'from-blue-500/20 to-blue-500/5' },
  { label: 'MANAGER', width: 180, color: 'from-indigo-500/20 to-indigo-500/5' },
  { label: 'ENGINES', width: 180, color: 'from-violet-500/20 to-violet-500/5' },
]

export default function Workspace() {
  const [activeAction, setActiveAction] = useState<string | null>(null)

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-10 py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-2 text-nexus-500 text-[10px] font-mono tracking-[0.2em] uppercase mb-2">
              <span className="w-2 h-px bg-nexus-600" />
              Dynix Nexus
              <span className="w-2 h-px bg-nexus-600" />
            </div>
            <h1 className="text-nexus-100 font-display text-2xl font-semibold tracking-tight">
              Workspace Home
            </h1>
            <p className="text-nexus-400 text-sm mt-1 leading-relaxed">
              Command center of the Dynix ecosystem.
              <br />
              Runtime v0.1.0 — Hub → Broker → Manager → Engines
            </p>
          </motion.div>

          {/* Architecture Visualization */}
          <motion.div
            className="mb-10 dynix-glass rounded-xl p-5 overflow-hidden relative"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-nexus-500 text-[9px] font-mono tracking-[0.15em] uppercase mb-4">
              Runtime Architecture
            </div>
            <div className="relative h-28 flex flex-col justify-center gap-1.5">
              {LAYERS.map((layer, i) => (
                <motion.div
                  key={layer.label}
                  className="relative h-5"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    className={`h-full rounded bg-gradient-to-r ${layer.color} border border-white/5 flex items-center justify-between px-3`}
                    style={{ width: `${layer.width}px` }}
                  >
                    <span className="text-[10px] font-mono text-nexus-300 tracking-wider">{layer.label}</span>
                    <span className="text-[8px] font-mono text-nexus-500">
                      {i === 0 ? 'v1' : '—'}
                    </span>
                  </div>
                  {i < LAYERS.length - 1 && (
                    <div className="absolute -bottom-1 left-8 w-px h-1 bg-nexus-500/30" />
                  )}
                </motion.div>
              ))}
              <div className="absolute right-6 top-1/2 -translate-y-1/2">
                <div className="text-right">
                  <div className="text-[18px] font-mono text-cyan-500/20 font-bold leading-none">→</div>
                  <div className="text-[8px] font-mono text-nexus-500 mt-0.5">AI</div>
                </div>
              </div>
              <motion.div
                className="absolute -top-px -right-px w-2 h-2 rounded-full bg-cyan-500/30"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Modules */}
            <motion.div
              className="dynix-glass rounded-xl p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-nexus-500 text-[9px] font-mono tracking-[0.15em] uppercase mb-3">
                Modules
              </div>
              <div className="flex flex-col gap-1">
                {MODULES.map((mod) => (
                  <div key={mod.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg hover:bg-nexus-700/30 transition-colors duration-200">
                    <span className={`text-sm ${mod.status === 'ready' ? 'text-cyan-400' : 'text-nexus-500'}`}>
                      {mod.icon}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono tracking-wide ${mod.status === 'ready' ? 'text-nexus-200' : 'text-nexus-500'}`}>
                          {mod.label}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full uppercase tracking-wider ${
                          mod.status === 'ready'
                            ? 'bg-cyan-500/10 text-cyan-400'
                            : 'bg-nexus-700 text-nexus-500'
                        }`}>
                          {mod.status}
                        </span>
                      </div>
                      <div className="text-[10px] text-nexus-500 font-mono">{mod.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              className="dynix-glass rounded-xl p-5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-nexus-500 text-[9px] font-mono tracking-[0.15em] uppercase mb-3">
                Recent Activity
              </div>
              <div className="flex flex-col gap-1">
                {RECENT.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 py-1.5 px-2 rounded-lg"
                  >
                    <span className="text-[10px] font-mono text-nexus-500 flex-shrink-0 w-10">{item.time}</span>
                    <span className="text-xs text-nexus-400">{item.event}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-nexus-700/50">
                <div className="text-[10px] font-mono text-nexus-500 text-center">
                  End of feed
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-nexus-500 text-[9px] font-mono tracking-[0.15em] uppercase mb-3">
              Quick Actions
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACTIONS.map((action) => (
                <motion.button
                  key={action.action}
                  className="px-3.5 py-2 rounded-lg text-xs font-mono tracking-wide transition-all duration-200"
                  style={{
                    background: activeAction === action.action
                      ? 'rgba(3, 143, 164, 0.1)'
                      : 'rgba(26, 26, 38, 0.6)',
                    border: activeAction === action.action
                      ? '1px solid rgba(3, 143, 164, 0.3)'
                      : '1px solid rgba(255, 255, 255, 0.04)',
                    color: activeAction === action.action
                      ? '#05b3cc'
                      : '#6b6b80',
                  }}
                  onClick={() => setActiveAction(action.action)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {action.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Documentation */}
          <motion.div
            className="dynix-glass rounded-xl p-5 mb-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-nexus-500 text-[9px] font-mono tracking-[0.15em] uppercase mb-3">
              Documentation
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: 'Runtime V1 Blueprint', desc: 'Architecture specification', file: 'runtime-v1-blueprint.md' },
                { title: 'Engine Interface', desc: 'Contract design', file: 'engine-interface.md' },
                { title: 'Common Primitives', desc: 'Shared language specification', file: 'common-primitives.md' },
                { title: 'Junction Architecture', desc: 'Memory & session system', file: 'junction-architecture.md' },
              ].map((doc) => (
                <div
                  key={doc.file}
                  className="p-3 rounded-lg bg-nexus-800/50 border border-nexus-700/30 hover:border-nexus-600/50 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-xs font-mono text-nexus-200 tracking-wide">{doc.title}</div>
                  <div className="text-[10px] font-mono text-nexus-500 mt-0.5">{doc.desc}</div>
                  <div className="text-[9px] font-mono text-nexus-600 mt-1">→ docs/{doc.file}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
