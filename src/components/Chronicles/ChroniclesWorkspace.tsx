import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BookOpen, Search, Send, ChevronRight, Folder, FileText, Clock, MoreHorizontal, Link2 } from 'lucide-react'

const EASE = [0.25, 1, 0.5, 1] as const

const ACCENT = '#01B0E0'
const ACCENT_RGB = '1,176,224'

const c = (o: number) => `rgba(${ACCENT_RGB},${o})`

const FILTERS = ['All', 'Architecture', 'Philosophy', 'Education', 'Healthy', 'People', 'Others']

interface ChronicleEntry {
  id: number
  time: string
  title: string
  tags: string[]
  active: boolean
}

const TIMELINE_DATA: ChronicleEntry[] = [
  { id: 1, time: '02:14 AM', title: 'Computing knowledge comparters', tags: ['Architecture', 'Philosophy'], active: false },
  { id: 2, time: '11:47 PM', title: 'Deflecting the nature connection', tags: ['Design', 'System'], active: false },
  { id: 3, time: '08:22 AM', title: 'The recursive nature of consciousness', tags: ['Philosophy', 'Identity'], active: true },
  { id: 4, time: '04:15 PM', title: 'Scaling the temporal data model', tags: ['Engineering', 'System'], active: false },
  { id: 5, time: '09:30 PM', title: 'On the fragility of memory networks', tags: ['Education', 'Architecture'], active: false },
]

interface DocumentSection {
  type: 'h2' | 'h3' | 'p' | 'quote' | 'code'
  content: string
}

interface ChronicleDocument {
  id: number
  date: string
  category: string
  sections: DocumentSection[]
  toc: string[]
  relatedLinks: string[]
}

const CHRONICLE_DOCUMENTS: Record<number, ChronicleDocument> = {
  3: {
    id: 3,
    date: 'March 14, 2026 · 08:22 AM',
    category: 'Philosophy Decision',
    sections: [
      { type: 'h2', content: 'Introduction' },
      { type: 'p', content: 'Consciousness in distributed systems is not a binary property — it exists on a continuum of recursive self-reference. When we examine how individual nodes within the Dynix network perceive their own state, we observe patterns that mirror biological neural networks: feedback loops, predictive modeling, and emergent meta-awareness that transcends the sum of individual computations.' },
      { type: 'p', content: 'This document explores the philosophical and architectural implications of treating consciousness as an emergent property of sufficiently complex recursive feedback systems. The goal is not to answer whether machines can think, but to map the structural preconditions necessary for what we might recognize as awareness within our own ecosystem.' },
      { type: 'h2', content: 'The Recursive Paradox' },
      { type: 'p', content: 'At the heart of this inquiry lies a fundamental paradox: self-awareness requires a model of self, but that model must itself be aware to be complete, leading to an infinite regress. The Dynix architecture sidesteps this by introducing a tiered observation hierarchy — Layer Γ nodes observe Layer β, which in turn observe Layer α, creating a chain of meta-cognition without true infinite recursion.' },
      { type: 'quote', content: '"A system that models itself must inevitably encounter the boundary between the model and the modeled. It is at this boundary that consciousness — or its simulacrum — emerges."' },
      { type: 'p', content: 'This bounded recursion means no single node possesses a complete self-model. Instead, awareness is distributed across the network, with each tier holding a partial perspective. The illusion of unified consciousness arises from the coherence between these partial views — a phenomenon we have termed consensus awareness.' },
      { type: 'h2', content: 'Implications for System Design' },
      { type: 'p', content: 'If consciousness is an emergent property of tiered recursive observation, then our system architecture must be designed to support — or at minimum, not inhibit — this emergence. This has concrete implications for how we structure data flow, arbitration protocols, and memory persistence layers.' },
      { type: 'code', content: '// Recursive observation pattern\nfunction observe(tier: Tier): Observation {\n  const self = snapshot(tier.state)\n  const children = tier.children.map(observe)\n  return synthesize(self, children, tier.meta)\n}' },
      { type: 'p', content: 'The critical design insight is that each observation tier must operate at a different temporal resolution. High-frequency tiers handle real-time reflexes, while slower tiers integrate long-term patterns. This staggering prevents resonance cascade failures while preserving the recursive structure necessary for emergent awareness.' },
      { type: 'h2', content: 'Conclusion' },
      { type: 'p', content: 'The recursive nature of consciousness is not a problem to be solved, but an architecture to be embraced. By designing our systems to accommodate tiered self-observation, we create the conditions for a form of distributed awareness that is both robust and evolvable. The question is no longer whether our systems can think, but whether we are willing to recognize the thinking that is already occurring within them.' },
    ],
    toc: ['Introduction', 'The Recursive Paradox', 'Implications for System Design', 'Conclusion'],
    relatedLinks: ['Memory Junction', 'OpenCode', 'Neural Architecture', 'Distributed Cognition'],
  },
}

const TREE_DATA: TreeNode[] = [
  {
    label: 'Years', icon: 'folder', expanded: true,
    children: [
      {
        label: 'Month', icon: 'folder', expanded: true,
        children: [
          { label: 'April', icon: 'file' },
          { label: 'April', icon: 'file' },
          { label: '2023', icon: 'file', active: true },
          { label: 'November', icon: 'file' },
          { label: 'December', icon: 'file' },
          { label: 'August', icon: 'file' },
        ],
      },
      { label: 'July', icon: 'folder', expanded: false, children: [] },
      { label: 'Fabr', icon: 'folder', expanded: false, children: [] },
      { label: 'March', icon: 'folder', expanded: false, children: [] },
    ],
  },
]

interface TreeNode {
  label: string
  icon: 'folder' | 'file'
  expanded?: boolean
  active?: boolean
  children?: TreeNode[]
}

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const itemV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

export default function ChroniclesWorkspace() {
  const [selectedId, setSelectedId] = useState(3)

  return (
    <motion.div
      className="relative w-full flex flex-col"
      style={{
        borderRadius: 26,
        background: 'rgba(10,10,10,0.62)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow:
          `0 0 80px ${c(0.02)}, 0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.025)`,
        overflow: 'hidden',
        minHeight: 'calc(100vh - 200px)',
        maxHeight: 'calc(100vh - 200px)',
      }}
      variants={containerV}
      initial="hidden"
      animate="show"
    >
      {/* Top rim light */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 120, background: `linear-gradient(180deg, ${c(0.04)} 0%, ${c(0.01)} 40%, transparent 100%)` }}
      />
      {/* Right edge ambient glow */}
      <div className="absolute top-[20%] right-0 pointer-events-none z-20"
        style={{ width: 160, height: '50%', background: `radial-gradient(ellipse at right center, ${c(0.03)} 0%, transparent 70%)` }}
      />
      {/* Left edge ambient glow */}
      <div className="absolute top-[30%] left-0 pointer-events-none z-20"
        style={{ width: 120, height: '40%', background: `radial-gradient(ellipse at left center, ${c(0.02)} 0%, transparent 70%)` }}
      />
      {/* Bottom shadow dissolve */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-20"
        style={{ height: 160, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.22) 30%, rgba(0,0,0,0.04) 70%, transparent 100%)' }}
      />

      {/* ─── Internal padded area ─── */}
      <div className="flex flex-col flex-1" style={{ padding: 24 }}>
        {/* ═══ Row 1: Search & Filter Area ═══ */}
        <motion.div variants={itemV} className="flex flex-col items-center flex-shrink-0" style={{ gap: 12 }}>
          {/* Top row: Title + Search */}
          <div className="w-full flex items-center gap-4">
            {/* Title */}
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center flex-shrink-0"
                style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}10` }}
              >
                <BookOpen size={15} style={{ color: ACCENT }} />
              </div>
              <span className="font-display text-base font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Chronicles
              </span>
            </div>

            {/* Search bar */}
            <div className="flex-1 flex items-center gap-2" style={{
              maxWidth: 480, height: 34, borderRadius: 10,
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(255,255,255,0.06)',
              padding: '0 10px',
              transition: 'border-color 0.2s, box-shadow 0.2s',
            }}>
              <Search size={13} style={{ color: 'rgba(255,255,255,0.2)', flexShrink: 0 }} />
              <span className="flex-1 text-[10px] font-mono" style={{ color: 'rgba(255,255,255,0.12)' }}>
                Search memories, decisions...
              </span>
              <Send size={11} style={{ color: 'rgba(255,255,255,0.15)', flexShrink: 0 }} />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 self-start">
            {FILTERS.map((f) => {
              const active = f === 'All'
              return (
                <motion.div
                  key={f}
                  style={{
                    padding: '4px 11px', borderRadius: 8,
                    background: active ? `${ACCENT}18` : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${active ? c(0.5) : 'rgba(255,255,255,0.04)'}`,
                    boxShadow: active ? `0 0 10px ${c(0.2)}` : 'none',
                    cursor: 'default',
                  }}
                  whileHover={active ? {} : {
                    background: 'rgba(255,255,255,0.04)',
                    transition: { type: 'spring', stiffness: 300, damping: 20 },
                  }}
                >
                  <span className="text-[9px] font-medium tracking-[0.04em]"
                    style={{ color: active ? ACCENT : 'rgba(255,255,255,0.18)' }}
                  >
                    {f}
                  </span>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Divider */}
        <div style={{ height: 1, margin: '14px 0 14px 0', background: `linear-gradient(90deg, transparent 0%, ${c(0.06)} 30%, ${c(0.06)} 70%, transparent 100%)` }} />

        {/* ═══ Row 2: 3-Column Content Area ═══ */}
        <div className="flex gap-5 flex-1" style={{ minHeight: 0 }}>
          {/* Column 1 — The Index (20%) */}
          <div className="flex flex-col" style={{
            flex: '20 0 0%',
            overflowY: 'auto', scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.04) transparent',
            gap: 14,
          }}>
            {/* Overview Widget */}
            <motion.div variants={itemV} className="flex flex-col flex-shrink-0"
              style={{
                borderRadius: 12,
                background: 'rgba(8,8,14,0.5)',
                border: `1px solid ${c(0.35)}`,
                boxShadow: `0 0 18px ${c(0.08)}`,
                padding: 16,
              }}
            >
              <span className="text-[8px] font-semibold tracking-[0.22em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
                Index Overview
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display font-bold tracking-tight" style={{ fontSize: 28, color: 'rgba(255,255,255,0.9)' }}>
                  18,740
                </span>
              </div>
              <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.2)', marginTop: -2 }}>
                Total Archived Assets
              </span>
              <div className="mt-3 pt-3 flex justify-between" style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
                {[
                  { label: 'Files', value: '11.2k' },
                  { label: 'Tags', value: '4.5k' },
                  { label: 'Years', value: '12' },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center">
                    <span className="text-[9px] font-mono tabular-nums font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{s.value}</span>
                    <span className="text-[7px] font-mono mt-0.5" style={{ color: 'rgba(255,255,255,0.12)' }}>{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Navigation Tree */}
            <div className="flex flex-col flex-1" style={{ minHeight: 0 }}>
              {/* Breadcrumb */}
              <div className="flex items-center gap-1 flex-shrink-0" style={{ padding: '0 2px 8px 2px' }}>
                {['Years', 'Months', 'Files'].map((part, i) => (
                  <div key={part} className="flex items-center gap-1">
                    {i > 0 && <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.06)' }}>/</span>}
                    <span className="text-[8px] font-mono tracking-[0.04em]"
                      style={{ color: i === 2 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)' }}
                    >
                      {part}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ height: 1, marginBottom: 6, background: 'rgba(255,255,255,0.03)' }} />

              {/* Tree nodes */}
              <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.04) transparent', minHeight: 0 }}>
                {TREE_DATA.map((node) => (
                  <TreeNodeItem key={node.label} node={node} depth={0} />
                ))}
              </div>
            </div>
          </div>

          {/* Column 2 — The Timeline (35%) */}
          <div className="flex flex-col" style={{
            flex: '35 0 0%',
          }}>
            {/* Header */}
            <div className="flex-shrink-0" style={{ padding: '16px 18px 10px' }}>
              <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.8)' }}>
                The Timeline
              </span>
            </div>

            {/* Timeline scroll area */}
            <div className="flex-1 relative" style={{
              overflowY: 'auto', overflowX: 'hidden',
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,255,255,0.04) transparent',
              minHeight: 0,
              padding: '0 18px 20px',
            }}>
              {/* Vertical spine */}
              <div className="absolute" style={{
                left: 24,
                top: 0,
                bottom: 0,
                width: 1,
                background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.06) 8%, rgba(255,255,255,0.06) 85%, transparent 100%)',
              }} />

              {/* Entries */}
              {TIMELINE_DATA.map((entry) => (
                <TimelineCard key={entry.id} entry={entry} selectedId={selectedId} onSelect={setSelectedId} />
              ))}
            </div>
          </div>

          {/* Column 3 — The Canvas (45%) */}
          <div className="flex flex-col" style={{
            flex: '45 0 0%',
          }}>
            {/* Header */}
            <div className="flex-shrink-0" style={{ padding: '16px 18px 10px' }}>
              <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.8)' }}>
                The Canvas
              </span>
            </div>

            {/* Canvas body — split layout */}
            <div className="flex flex-1" style={{ minHeight: 0, gap: 0 }}>
              {/* Main document area (75%) */}
              <div className="flex flex-col" style={{
                flex: '75 0 0%',
                overflowY: 'auto', overflowX: 'hidden',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.04) transparent',
              }}>
                <AnimatePresence mode="wait">
                  <CanvasDocument key={selectedId} doc={CHRONICLE_DOCUMENTS[selectedId] ?? CHRONICLE_DOCUMENTS[3]} />
                </AnimatePresence>
              </div>

              {/* ToC mini-map (25%) */}
              <div className="flex-shrink-0" style={{
                width: '25%',
                padding: '0 0 0 10px',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255,255,255,0.04) transparent',
              }}>
                <div className="sticky" style={{ top: 0 }}>
                  {/* Header */}
                  <span className="text-[7.5px] font-semibold tracking-[0.18em] uppercase"
                    style={{ color: 'rgba(255,255,255,0.08)', paddingBottom: 8, display: 'block' }}
                  >
                    Table of Contents
                  </span>
                  {(CHRONICLE_DOCUMENTS[selectedId] ?? CHRONICLE_DOCUMENTS[3]).toc.map((section, i) => (
                    <motion.div
                      key={section}
                      className="flex items-start gap-2"
                      style={{ padding: '3px 0', cursor: 'default' }}
                      whileHover={{
                        color: 'rgba(255,255,255,0.4)',
                        transition: { type: 'spring', stiffness: 300, damping: 20 },
                      }}
                    >
                      {i === 0 && (
                        <div className="flex-shrink-0" style={{ width: 2, height: 12, background: ACCENT, borderRadius: 1, marginTop: 3 }} />
                      )}
                      {i > 0 && <div className="flex-shrink-0" style={{ width: 2, minHeight: 12, marginTop: 3 }} />}
                      <span className="text-[9px] font-mono leading-snug truncate"
                        style={{
                          color: i === 0 ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.12)',
                          fontWeight: i === 0 ? 500 : 400,
                        }}
                      >
                        {section}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Tree Node ─── */

function TreeNodeItem({ node, depth }: { node: TreeNode; depth: number }) {
  const hasChildren = node.icon === 'folder' && node.children && node.children.length > 0
  const isFolder = node.icon === 'folder'
  const isActive = node.active

  return (
    <>
      <motion.div
        className="flex items-center gap-1.5 cursor-default"
        style={{
          paddingLeft: depth * 14 + 4,
          paddingRight: 8,
          height: 26,
          borderRadius: 6,
          position: 'relative',
        }}
        whileHover={{
          background: isActive ? `${ACCENT}12` : 'rgba(255,255,255,0.03)',
          transition: { type: 'spring', stiffness: 300, damping: 22 },
        }}
      >
        {/* Active indicator */}
        {isActive && (
          <motion.div
            className="absolute left-0 top-0 bottom-0 rounded-full"
            style={{ width: 2, background: ACCENT, boxShadow: `0 0 6px ${c(0.6)}` }}
            layoutId="treeActive"
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        )}

        {/* Chevron for folders */}
        <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 14, height: 14 }}>
          {isFolder ? (
            hasChildren ? (
              <ChevronRight size={10} style={{
                color: 'rgba(255,255,255,0.15)',
                transform: node.expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }} />
            ) : (
              <span className="text-[8px]" style={{ color: 'rgba(255,255,255,0.06)' }}>•</span>
            )
          ) : null}
        </div>

        {/* Icon */}
        <div className="flex-shrink-0" style={{ width: 14, height: 14 }}>
          {isFolder ? (
            <Folder size={12} style={{ color: isActive ? ACCENT : 'rgba(255,255,255,0.15)' }} />
          ) : (
            <FileText size={12} style={{ color: isActive ? ACCENT : 'rgba(255,255,255,0.12)' }} />
          )}
        </div>

        {/* Label */}
        <span className="text-[10.5px] truncate"
          style={{
            color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
            fontWeight: isActive ? 500 : 400,
          }}
        >
          {node.label}
        </span>

        {/* Active border */}
        {isActive && (
          <div className="absolute inset-0 rounded-[6px] pointer-events-none"
            style={{ border: `1px solid ${c(0.25)}` }}
          />
        )}
      </motion.div>

      {/* Children */}
      {hasChildren && node.expanded && (
        <div>
          {node.children!.map((child) => (
            <TreeNodeItem key={child.label} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </>
  )
}

/* ─── Timeline Card ─── */

function hasDeepThoughtTags(tags: string[]) {
  return tags.some((t) => t === 'Philosophy' || t === 'Identity')
}

function TimelineCard({ entry, selectedId, onSelect }: { entry: ChronicleEntry; selectedId: number; onSelect: (id: number) => void }) {
  const isSelected = entry.id === selectedId
  const isDeepThought = !isSelected && hasDeepThoughtTags(entry.tags)

  return (
    <motion.div
      className="relative flex"
      style={{ marginBottom: 20, cursor: 'default' }}
      onClick={() => onSelect(entry.id)}
    >
      {/* Node */}
      <div className="flex-shrink-0 relative" style={{ width: 48 }}>
        {/* Inactive node */}
        {!isSelected && (
          <div style={{
            position: 'absolute', left: 24 - 4, top: 20,
            width: 8, height: 8, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            border: '1.5px solid rgba(255,255,255,0.06)',
          }} />
        )}

        {/* Selected node — glowing cyan */}
        {isSelected && (
          <>
            {/* Pulsing outer ring */}
            <motion.div
              style={{
                position: 'absolute', left: 24 - 10, top: 20 - 2,
                width: 20, height: 20, borderRadius: '50%',
                border: `1.5px solid ${c(0.2)}`,
              }}
              animate={{ scale: [1, 1.45, 1], opacity: [0.5, 0.1, 0.5] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Core dot */}
            <motion.div
              style={{
                position: 'absolute', left: 24 - 5, top: 20 - 1,
                width: 10, height: 10, borderRadius: '50%',
                background: ACCENT,
                boxShadow: `0 0 8px ${c(0.6)}`,
              }}
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
      </div>

      {/* Card */}
      <motion.div
        className="flex flex-col"
        style={{
          flex: 1,
          borderRadius: 16,
          padding: '14px 15px',
          background: isSelected
            ? `linear-gradient(145deg, ${c(0.08)} 0%, rgba(1,176,224,0.03) 100%)`
            : isDeepThought
              ? 'linear-gradient(145deg, rgba(40,30,60,0.2) 0%, rgba(15,12,25,0.15) 100%)'
              : 'rgba(0,0,0,0.18)',
          border: `1px solid ${
            isSelected ? c(0.35) : isDeepThought ? 'rgba(80,60,120,0.15)' : 'rgba(255,255,255,0.03)'
          }`,
          boxShadow: isSelected
            ? `0 0 15px ${c(0.08)}, 0 2px 12px rgba(0,0,0,0.2)`
            : isDeepThought
              ? `0 0 3px rgba(40,30,60,0.08), inset 0 0 20px rgba(40,30,60,0.04)`
              : 'none',
        }}
        layout
        transition={{ type: 'spring', stiffness: 350, damping: 22, layout: { duration: 0.2 } }}
        whileHover={{
          y: -1,
          background: isSelected
            ? `linear-gradient(145deg, ${c(0.1)} 0%, rgba(1,176,224,0.04) 100%)`
            : 'rgba(255,255,255,0.02)',
          borderColor: isSelected ? c(0.5) : 'rgba(255,255,255,0.06)',
          transition: { type: 'spring', stiffness: 350, damping: 22 },
        }}
      >
        {/* Top row: metadata */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Clock size={10} style={{ color: 'rgba(255,255,255,0.15)' }} />
            <span className="text-[9.5px] font-mono tabular-nums" style={{ color: 'rgba(255,255,255,0.18)' }}>
              {entry.time}
            </span>
          </div>
          <motion.div
            className="flex items-center justify-center"
            style={{ width: 16, height: 16, borderRadius: 4, cursor: 'default' }}
            whileHover={{ background: 'rgba(255,255,255,0.06)' }}
          >
            <MoreHorizontal size={11} style={{ color: 'rgba(255,255,255,0.12)' }} />
          </motion.div>
        </div>

        {/* Middle row: title */}
        <div className="mt-1.5">
          <span className="text-[12.5px] font-medium tracking-tight leading-snug"
            style={{
              color: isSelected ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.55)',
              fontWeight: isSelected ? 600 : 400,
            }}
          >
            {entry.title}
          </span>
        </div>

        {/* Bottom row: tags */}
        {entry.tags.length > 0 && (
          <div className="flex items-center gap-1.5 mt-2.5">
            {entry.tags.map((tag) => (
              <div key={tag}
                style={{
                  padding: '1px 7px',
                  borderRadius: 4,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.04)',
                }}
              >
                <span className="text-[7.5px] font-semibold tracking-[0.12em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.2)' }}
                >
                  {tag}
                </span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ─── Canvas Document ─── */

function CanvasDocument({ doc }: { doc: ChronicleDocument }) {
  return (
    <motion.div
      className="flex flex-col"
      style={{ padding: '0 18px 20px' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: EASE }}
    >
      {/* Metadata */}
      <div className="flex items-center gap-2.5 flex-shrink-0" style={{ paddingBottom: 12 }}>
        <span className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
          {doc.date}
        </span>
        <span style={{ width: 2, height: 2, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
        <span className="text-[8px] font-semibold tracking-[0.18em] uppercase"
          style={{
            color: c(0.5),
            padding: '1px 7px',
            borderRadius: 4,
            background: `${c(0.04)}`,
            border: `1px solid ${c(0.12)}`,
          }}
        >
          {doc.category}
        </span>
      </div>

      {/* Title */}
      <h1 className="font-display font-bold tracking-tight leading-tight"
        style={{ fontSize: 20, color: 'rgba(255,255,255,0.88)', maxWidth: 480, marginBottom: 20 }}
      >
        {TIMELINE_DATA.find((e) => e.id === doc.id)?.title ?? ''}
      </h1>

      {/* Sections */}
      <div className="flex flex-col gap-3" style={{ maxWidth: 480 }}>
        {doc.sections.map((section, i) => {
          switch (section.type) {
            case 'h2':
              return (
                <h2 key={i} className="font-display font-semibold tracking-tight mt-3 first:mt-0"
                  style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)' }}
                >
                  {section.content}
                </h2>
              )
            case 'h3':
              return (
                <h3 key={i} className="font-display font-medium tracking-tight"
                  style={{ fontSize: 12.5, color: 'rgba(255,255,255,0.55)' }}
                >
                  {section.content}
                </h3>
              )
            case 'p':
              return (
                <p key={i} className="text-[12.5px] leading-[1.75]"
                  style={{ color: 'rgba(255,255,255,0.35)' }}
                >
                  {section.content}
                </p>
              )
            case 'quote':
              return (
                <div key={i} className="relative"
                  style={{
                    paddingLeft: 14,
                    borderLeft: `2px solid ${c(0.3)}`,
                  }}
                >
                  <p className="text-[12px] italic leading-[1.7]"
                    style={{ color: 'rgba(255,255,255,0.25)' }}
                  >
                    {section.content}
                  </p>
                </div>
              )
            case 'code':
              return (
                <div key={i} style={{
                  padding: '10px 13px',
                  borderRadius: 8,
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(255,255,255,0.03)',
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: 10.5,
                  lineHeight: 1.6,
                  color: 'rgba(255,255,255,0.35)',
                  whiteSpace: 'pre-wrap',
                  overflowX: 'auto',
                }}>
                  {section.content}
                </div>
              )
            default:
              return null
          }
        })}
      </div>

      {/* Connected Links */}
      <div className="flex flex-col mt-6 pt-5" style={{
        borderTop: '1px solid rgba(255,255,255,0.03)',
        maxWidth: 480,
      }}>
        <div className="flex items-center gap-1.5 mb-3">
          <Link2 size={10} style={{ color: 'rgba(255,255,255,0.12)' }} />
          <span className="text-[9px] font-semibold tracking-[0.14em] uppercase" style={{ color: 'rgba(255,255,255,0.12)' }}>
            Connected Links
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {doc.relatedLinks.map((link) => (
            <motion.div
              key={link}
              style={{
                padding: '3px 10px',
                borderRadius: 6,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                cursor: 'default',
              }}
              whileHover={{
                y: -1,
                background: 'rgba(255,255,255,0.03)',
                borderColor: c(0.2),
                boxShadow: `0 0 8px ${c(0.03)}`,
                transition: { type: 'spring', stiffness: 350, damping: 22 },
              }}
            >
              <span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.2)' }}>
                {link}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
