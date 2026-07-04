import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'motion/react'
import {
  Image, Eye, FolderOpen,
  Check, Circle, LoaderCircle, Sparkles,
  ZoomIn, Fullscreen as FsIcon, Move, RotateCw,
  Cpu, MemoryStick, HardDrive, Cog, Clock, Terminal, ExternalLink, RefreshCw,
} from 'lucide-react'
import { EncoderProvider, useEncoder, formatSize, formatDimensions, getExtension, type UploadedFile, type EncoderProviderConfig } from './encoder-store'
import UploadDock from './UploadDock'
import type { EncoderConfig, InsightSection } from './encoder-configs'

/* ───────────────────────────────────────────
   ENCODER WORKSPACE — shared base
   ─────────────────────────────────────────── */

const EASE = [0.25, 1, 0.5, 1] as const

const col = (rgb: string, opacity: number) => `rgba(${rgb},${opacity})`

const groupStyle = (accentRgb: string): React.CSSProperties => ({
  borderRadius: 16,
  border: `1.5px solid ${col(accentRgb, 0.22)}`,
  padding: 20,
  boxShadow: `0 0 40px ${col(accentRgb, 0.06)}, inset 0 0 60px ${col(accentRgb, 0.02)}`,
})

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}
const itemV = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

export default function EncoderWorkspace({ config }: { config: EncoderConfig }) {
  const providerConfig: EncoderProviderConfig = {
    acceptedTypes: config.acceptedTypes,
    acceptAttr: config.acceptAttr,
    accent: config.accent,
    accentRgb: config.accentRgb,
  }

  return (
    <EncoderProvider config={providerConfig}>
      <WorkspaceInner config={config} />
    </EncoderProvider>
  )
}

function WorkspaceInner({ config }: { config: EncoderConfig }) {
  const ACCENT = config.accent
  const ACCENT_RGB = config.accentRgb
  const c = (o: number) => col(ACCENT_RGB, o)

  return (
    <motion.div
      className="relative w-full flex-1 flex flex-col"
      style={{
        borderRadius: 26,
        background: 'rgba(10,10,10,0.62)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${c(0.07)}`,
        boxShadow:
          `0 0 80px ${c(0.02)}, 0 8px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.025)`,
        overflow: 'hidden',
        minHeight: 420,
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

      {/* Internal padded area */}
      <div className="flex flex-col flex-1" style={{ padding: 16 }}>
        {/* ═══ HEADER ═══ */}
        <motion.div variants={itemV} className="flex items-center justify-between flex-shrink-0" style={{ height: 56 }}>
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-[12px] flex items-center justify-center flex-shrink-0"
              style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}10`, boxShadow: `0 0 12px ${ACCENT}06` }}
            >
              {config.icon}
            </div>
            <div>
              <h2 className="font-display text-base font-semibold tracking-tight leading-none" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {config.name}
              </h2>
              <p className="text-[10px] font-mono mt-1" style={{ color: 'rgba(255,255,255,0.25)' }}>
                {config.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0"
            style={{ padding: '5px 12px', borderRadius: 18, background: `${ACCENT}06`, border: `1px solid ${ACCENT}0a` }}
          >
            <span className="w-[5px] h-[5px] rounded-full" style={{ background: ACCENT, boxShadow: `0 0 5px ${ACCENT}` }} />
            <span className="text-[8px] font-mono uppercase tracking-[0.18em]" style={{ color: ACCENT }}>
              Runtime Ready
            </span>
          </div>
        </motion.div>

        {/* ═══ CONTENT ═══ */}
        <div className="flex gap-5 flex-1" style={{ minHeight: 300, marginTop: 10, marginBottom: 8 }}>
          <div className="flex flex-col overflow-hidden" style={{ flex: '82 0 0%', ...groupStyle(ACCENT_RGB) }}>
            <WorkflowArea config={config} />
          </div>
          <div className="flex flex-col overflow-hidden" style={{ flex: '18 0 0%', minWidth: 150, ...groupStyle(ACCENT_RGB) }}>
            <RuntimePanelCard config={config} />
          </div>
        </div>

        {/* ═══ UPLOAD DOCK ═══ */}
        <div className="overflow-hidden" style={{ ...groupStyle(ACCENT_RGB) }}>
          <UploadDock />
        </div>
      </div>
    </motion.div>
  )
}

/* ───────── WORKFLOW AREA ───────── */

const cardStyle = (accRgb: string) => ({
  background: 'rgba(12,12,14,0.55)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: `1px solid ${col(accRgb, 0.06)}`,
  borderRadius: 18,
})

const staggerItem = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
}

const previewTools = [
  { label: 'Zoom', icon: ZoomIn },
  { label: 'Fullscreen', icon: FsIcon },
  { label: 'Compare', icon: Move },
  { label: 'Reset View', icon: RotateCw },
]

function WorkflowArea({ config }: { config: EncoderConfig }) {
  const { selectedFile } = useEncoder()
  const ACCENT = config.accent
  const ACCENT_RGB = config.accentRgb
  const c = (o: number) => col(ACCENT_RGB, o)

  return (
    <motion.div className="flex gap-5 flex-1" style={{ minHeight: 320 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }} initial="hidden" animate="show">
      {/* ─── Preview Column ─── */}
      <motion.div variants={staggerItem} className="flex flex-col flex-shrink-0" style={{ flex: '33 0 0%', ...cardStyle(ACCENT_RGB), padding: 16, overflow: 'hidden' }}>
        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
          <Image size={13} style={{ color: ACCENT }} />
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Input Preview
          </span>
        </div>
        {selectedFile ? <ActivePreview file={selectedFile} config={config} /> : <EmptyPreview config={config} />}
      </motion.div>

      {/* ─── Pipeline Column ─── */}
      <motion.div variants={staggerItem} className="flex flex-col flex-shrink-0 relative" style={{ flex: '28 0 0%', ...cardStyle(ACCENT_RGB), padding: '16px 16px 10px 16px', overflow: 'hidden' }}>
        <div className="absolute pointer-events-none" style={{ width: '90%', height: 180, top: '35%', left: '5%', background: `radial-gradient(ellipse at center, ${ACCENT}0a 0%, transparent 70%)` }} />
        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
          <Sparkles size={13} style={{ color: ACCENT }} />
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            AI Process Pipeline
          </span>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          {config.pipelineSteps.map((node, i) => (
            <PipelineNodeRow key={node.label} node={node} index={i} accent={ACCENT} />
          ))}
        </div>
      </motion.div>

      {/* ─── Insights Column ─── */}
      <motion.div variants={staggerItem} className="flex flex-col flex-shrink-0" style={{ flex: '32 0 0%', ...cardStyle(ACCENT_RGB), padding: 16, overflow: 'hidden' }}>
        <div className="flex items-center gap-2 mb-3 flex-shrink-0">
          <Eye size={13} style={{ color: ACCENT }} />
          <span className="text-[10px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>
            AI Insights (Live)
          </span>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col" style={{ height: 0 }}>
          {config.insightSections.map((section) => (
            <InsightRow key={section.label} section={section} accent={ACCENT} />
          ))}
          <div className="flex-1 min-h-[4px]" />
          <SummaryButton accent={ACCENT} />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Preview: Generic Active ─── */
function ActivePreview({ file, config }: { file: UploadedFile; config: EncoderConfig }) {
  const [loaded, setLoaded] = useState(false)
  const ACCENT = config.accent
  const ACCENT_RGB = config.accentRgb
  const c = (o: number) => col(ACCENT_RGB, o)

  if (file.type.startsWith('video/')) {
    return <VideoPreview file={file} accent={ACCENT} accentRgb={ACCENT_RGB} />
  }
  if (file.type.startsWith('audio/')) {
    return <AudioPreview file={file} accent={ACCENT} accentRgb={ACCENT_RGB} />
  }
  // default: image
  return (
    <motion.div className="flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <div className="flex-1 rounded-[14px] relative overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(145deg, rgba(8,8,10,0.6) 0%, rgba(0,0,0,0.45) 100%)', boxShadow: `inset 0 0 0 1px ${c(0.06)}, inset 0 0 30px rgba(0,0,0,0.2)` }}
      >
        {!loaded && <div className="absolute inset-0 flex items-center justify-center"><div className="w-6 h-6 rounded-full border-[2px] border-transparent border-t-cyan-400 animate-spin" /></div>}
        <img src={file.url} alt={file.name} onLoad={() => setLoaded(true)} className="w-full h-full"
          style={{ objectFit: 'contain', opacity: loaded ? 1 : 0, transition: 'opacity 0.25s ease' }}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-1 opacity-0 hover:opacity-100 transition-opacity duration-200">
          {previewTools.map(tool => (
            <div key={tool.label} className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center cursor-default"
              style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.04)' }} title={tool.label}>
              <tool.icon size={11} style={{ color: 'rgba(255,255,255,0.3)' }} />
            </div>
          ))}
        </div>
      </div>
      {/* Metadata strip */}
      <div className="flex items-center gap-3 mt-2.5 px-1 flex-shrink-0">
        <span className="text-[10px] font-medium truncate min-w-0" style={{ color: 'rgba(255,255,255,0.5)' }}>{file.name}</span>
        <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        {file.dimensions && <><span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{formatDimensions(file.dimensions.width, file.dimensions.height)}</span><div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} /></>}
        <span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{formatSize(file.size)}</span>
        <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span className="text-[8px] font-mono flex-shrink-0 uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>{getExtension(file.name)}</span>
        <div className="flex-1" />
        <span className="text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.12)' }}>Ready</span>
      </div>
    </motion.div>
  )
}

/* ─── Video Preview ─── */
function VideoPreview({ file, accent, accentRgb }: { file: UploadedFile; accent: string; accentRgb: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)
  const c = (o: number) => col(accentRgb, o)

  return (
    <motion.div className="flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <div className="flex-1 rounded-[14px] relative overflow-hidden flex items-center justify-center"
        style={{ background: 'linear-gradient(145deg, rgba(8,8,10,0.6) 0%, rgba(0,0,0,0.45) 100%)', boxShadow: `inset 0 0 0 1px ${c(0.06)}, inset 0 0 30px rgba(0,0,0,0.2)` }}
      >
        <video
          ref={videoRef}
          src={file.url}
          className="w-full h-full"
          style={{ objectFit: 'contain' }}
          controls
          preload="metadata"
          onLoadedData={() => setLoaded(true)}
        />
      </div>
      <div className="flex items-center gap-3 mt-2.5 px-1 flex-shrink-0">
        <span className="text-[10px] font-medium truncate min-w-0" style={{ color: 'rgba(255,255,255,0.5)' }}>{file.name}</span>
        <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        {file.dimensions && <><span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{formatDimensions(file.dimensions.width, file.dimensions.height)}</span><div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} /></>}
        <span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{formatSize(file.size)}</span>
        <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        {file.duration != null && <><span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>{formatDuration(file.duration)}</span><div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} /></>}
        <span className="text-[8px] font-mono flex-shrink-0 uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>{getExtension(file.name)}</span>
        <div className="flex-1" />
        <span className="text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.12)' }}>Ready</span>
      </div>
    </motion.div>
  )
}

/* ─── Audio Preview ─── */
function AudioPreview({ file, accent, accentRgb }: { file: UploadedFile; accent: string; accentRgb: string }) {
  const c = (o: number) => col(accentRgb, o)

  return (
    <motion.div className="flex-1 flex flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      <div className="flex-1 rounded-[14px] relative overflow-hidden flex flex-col items-center justify-center gap-3"
        style={{ background: 'linear-gradient(145deg, rgba(8,8,10,0.6) 0%, rgba(0,0,0,0.45) 100%)', boxShadow: `inset 0 0 0 1px ${c(0.06)}, inset 0 0 30px rgba(0,0,0,0.2)` }}
      >
        {/* Animated waveform placeholder */}
        <div className="flex items-end gap-[2px] h-12">
          {[2, 4, 3, 6, 5, 8, 6, 10, 7, 12, 9, 14, 10, 12, 8, 10, 6, 8, 5, 6, 3, 4, 2].map((h, i) => (
            <motion.div
              key={i}
              className="w-[2px] rounded-full"
              style={{ background: accent, opacity: 0.2 + (h / 14) * 0.3 }}
              animate={{ height: [h, h + 4, h, h - 2, h], opacity: [0.2 + (h / 14) * 0.3, 0.5, 0.2 + (h / 14) * 0.3, 0.3, 0.2 + (h / 14) * 0.3] }}
              transition={{ duration: 1.2 + i * 0.08, ease: 'easeInOut', repeat: Infinity }}
            />
          ))}
        </div>
        <audio src={file.url} controls className="w-[80%] max-w-[300px]" style={{ height: 32 }} />
      </div>
      <div className="flex items-center gap-3 mt-2.5 px-1 flex-shrink-0">
        <span className="text-[10px] font-medium truncate min-w-0" style={{ color: 'rgba(255,255,255,0.5)' }}>{file.name}</span>
        <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.25)' }}>{formatSize(file.size)}</span>
        <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        {file.duration != null && <><span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.2)' }}>{formatDuration(file.duration)}</span><div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} /></>}
        <div className="w-px h-3" style={{ background: 'rgba(255,255,255,0.06)' }} />
        <span className="text-[8px] font-mono flex-shrink-0 uppercase" style={{ color: 'rgba(255,255,255,0.2)' }}>{getExtension(file.name)}</span>
        <div className="flex-1" />
        <span className="text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.12)' }}>Ready</span>
      </div>
    </motion.div>
  )
}

/* ─── Empty Preview ─── */
function EmptyPreview({ config }: { config: EncoderConfig }) {
  const ACCENT = config.accent
  const ACCENT_RGB = config.accentRgb
  const c = (o: number) => col(ACCENT_RGB, o)

  return (
    <div className="flex-1 rounded-[14px] relative select-none flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(8,8,10,0.6) 0%, rgba(0,0,0,0.45) 100%)',
        boxShadow: `inset 0 0 0 1px ${c(0.06)}, inset 0 0 40px rgba(0,0,0,0.25)`,
      }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: `linear-gradient(${c(0.03)} 1px, transparent 1px), linear-gradient(90deg, ${c(0.03)} 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
      />
      <motion.div className="absolute pointer-events-none"
        style={{ width: '60%', height: '50%', top: '25%', left: '20%', background: `radial-gradient(ellipse at center, ${ACCENT}14 0%, transparent 60%)` }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div className="absolute left-[10%] right-[10%] h-[1px] pointer-events-none"
        style={{ background: `linear-gradient(90deg, transparent 0%, ${c(0.15)} 50%, transparent 100%)` }}
        animate={{ top: ['15%', '85%', '15%'] }}
        transition={{ duration: 6, ease: 'linear', repeat: Infinity }}
      />
      <div className="absolute bottom-4 right-5 pointer-events-none select-none">
        <span className="text-[11px] font-semibold tracking-[0.35em] opacity-30" style={{ color: `${ACCENT}1f` }}>DN</span>
      </div>
      <div className="flex flex-col items-center gap-3 pointer-events-none z-10">
        <div className="w-[56px] h-[56px] rounded-[16px] flex items-center justify-center"
          style={{ border: `1.5px solid ${ACCENT}14`, background: `${ACCENT}05` }}
        >
          <Image size={24} style={{ color: ACCENT, opacity: 0.35 }} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="text-[13px] font-semibold tracking-[0.22em]" style={{ color: 'rgba(255,255,255,0.35)' }}>{config.emptyPreviewTitle}</div>
          <div className="text-[9px] font-mono" style={{ color: 'rgba(255,255,255,0.1)' }}>{config.emptyPreviewSubtext}</div>
        </div>
      </div>
    </div>
  )
}

/* ─── Pipeline Node Row ─── */
interface PipelineNodeData {
  label: string
  description: string
  status: 'done' | 'running' | 'pending'
  timer: string
}

function PipelineNodeRow({ node, index, accent }: { node: PipelineNodeData; index: number; accent: string }) {
  const isLast = false

  const icon = node.status === 'done' ? (
    <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.12)', border: '1.5px solid #34D399' }}>
      <Check size={9} strokeWidth={3} style={{ color: '#34D399' }} />
    </div>
  ) : node.status === 'running' ? (
    <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center" style={{ background: `${accent}15`, border: `1.5px solid ${accent}`, boxShadow: `0 0 14px ${accent}40` }}>
      <LoaderCircle size={9} style={{ color: accent }} className="animate-spin" />
    </div>
  ) : (
    <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)', border: '1.5px solid rgba(255,255,255,0.08)' }}>
      <Circle size={8} style={{ color: 'rgba(255,255,255,0.08)' }} />
    </div>
  )

  return (
    <div className="relative flex items-start gap-3">
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 18 }}>
        {icon}
        {index < 7 && (
          <div className="w-px flex-1" style={{ minHeight: 24, background: node.status === 'done' ? 'rgba(52,211,153,0.15)' : node.status === 'running' ? `linear-gradient(180deg, ${accent}30, rgba(255,255,255,0.03))` : 'rgba(255,255,255,0.03)' }} />
        )}
      </div>
      <div className="flex-1 flex items-center justify-between min-w-0" style={{ paddingBottom: 16, marginTop: -1 }}>
        <div className="min-w-0">
          <div className="text-[11px] font-medium tracking-tight truncate"
            style={{ color: node.status === 'done' ? 'rgba(255,255,255,0.7)' : node.status === 'running' ? accent : 'rgba(255,255,255,0.2)' }}
          >
            {node.label}
          </div>
          <div className="text-[8px] font-mono truncate mt-0.5"
            style={{ color: node.status === 'pending' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.2)' }}
          >
            {node.description}
          </div>
        </div>
        {node.status === 'done' ? (
          <div className="flex items-center gap-1 flex-shrink-0">
            <Check size={8} strokeWidth={3} style={{ color: '#34D399' }} />
            <span className="text-[8px] font-mono" style={{ color: 'rgba(52,211,153,0.5)' }}>{node.timer}</span>
          </div>
        ) : node.status === 'running' ? (
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-[5px] h-[5px] rounded-full" style={{ background: accent, boxShadow: `0 0 5px ${accent}` }} />
            <span className="text-[8px] font-mono" style={{ color: accent }}>{node.timer}</span>
          </div>
        ) : (
          <span className="text-[8px] font-mono flex-shrink-0" style={{ color: 'rgba(255,255,255,0.08)' }}>{node.timer}</span>
        )}
      </div>
    </div>
  )
}

/* ─── Insight Row ─── */
function InsightRow({ section, accent }: { section: InsightSection; accent: string }) {
  if (section.type === 'palette') {
    return (
      <div className="py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.025)' }}>
        <div className="text-[8px] font-mono uppercase tracking-[0.14em] mb-2" style={{ color: 'rgba(255,255,255,0.15)' }}>{section.label}</div>
        <div className="flex gap-1.5">
          {['#f48c06','#e85d04','#0d1b2a','#1b263b','#0f3460','#1a3a2a'].map((c, i) => (
            <div key={i} className="flex-1 h-[18px] rounded-[5px]" style={{ background: c, border: '1px solid rgba(255,255,255,0.06)' }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.025)' }}>
      <div className="text-[8px] font-mono uppercase tracking-[0.14em] mb-1" style={{ color: 'rgba(255,255,255,0.15)' }}>{section.label}</div>
      <div className="text-[11px] font-medium leading-snug" style={{ color: 'rgba(255,255,255,0.65)' }}>{section.content}</div>
    </div>
  )
}

/* ─── Summary Button ─── */
function SummaryButton({ accent }: { accent: string }) {
  return (
    <div className="w-full h-[34px] rounded-[10px] flex items-center justify-center gap-2 cursor-default select-none flex-shrink-0"
      style={{ background: `${accent}06`, border: `1px solid ${accent}12`, transition: 'background 0.2s' }}
    >
      <FolderOpen size={12} style={{ color: accent }} />
      <span className="text-[9px] font-mono uppercase tracking-[0.12em]" style={{ color: accent }}>Readme / Summary</span>
    </div>
  )
}

/* ───────── RUNTIME PANEL ───────── */

const moduleColors = (accent: string): Record<string, { bg: string; iconBg: string; text: string }> => ({
  GPU: { bg: `${accent}08`, iconBg: `${accent}15`, text: accent },
  CPU: { bg: 'rgba(59,130,246,0.08)', iconBg: 'rgba(59,130,246,0.15)', text: '#3B82F6' },
  RAM: { bg: 'rgba(52,211,153,0.08)', iconBg: 'rgba(52,211,153,0.15)', text: '#34D399' },
  Memory: { bg: 'rgba(251,146,60,0.08)', iconBg: 'rgba(251,146,60,0.15)', text: '#FB923C' },
  Task: { bg: 'rgba(167,139,250,0.08)', iconBg: 'rgba(167,139,250,0.15)', text: '#A78BFA' },
  Uptime: { bg: 'rgba(255,255,255,0.03)', iconBg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.45)' },
})

const RUNTIME_ICONS: Record<string, React.ReactNode> = {
  GPU: <Cpu size={12} />,
  CPU: <Cpu size={12} />,
  RAM: <MemoryStick size={12} />,
  Memory: <HardDrive size={12} />,
  Task: <Cog size={12} />,
  Uptime: <Clock size={12} />,
}

function Sparkline({ color }: { color: string }) {
  const pts = [[0,12],[4,8],[8,14],[12,6],[16,10],[20,4],[24,8],[28,2],[32,6],[36,0],[40,4],[44,8],[48,2],[52,6],[54,4]]
  const d = pts.map((p,i) => `${i===0?'M':'L'}${p[0]} ${p[1]}`).join(' ')
  return (
    <svg width="44" height="15" viewBox="0 0 55 15" className="flex-shrink-0">
      <path d={d} fill="none" stroke={color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      <circle cx="54" cy="4" r="1.5" fill={color} opacity="0.6" />
    </svg>
  )
}

function RuntimePanelCard({ config }: { config: EncoderConfig }) {
  const ACCENT = config.accent
  const ACCENT_RGB = config.accentRgb
  const c = (o: number) => col(ACCENT_RGB, o)
  const colors = moduleColors(ACCENT)
  const logTypeColor: Record<string, string> = { init: '#3B82F6', success: '#34D399', processing: ACCENT, warning: '#FB923C', idle: 'rgba(255,255,255,0.15)' }
  const logTypeDot: Record<string, string> = { init: '#3B82F6', success: '#34D399', processing: ACCENT, warning: '#FB923C', idle: 'rgba(255,255,255,0.15)' }
  const staggerItem = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } } }

  return (
    <motion.div className="flex flex-col h-full gap-2 w-full" style={{ minHeight: 0 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }} initial="hidden" animate="show"
    >
      {/* Runtime Status */}
      <motion.div variants={staggerItem} className="flex flex-col flex-shrink-0 w-full"
        style={{ flex: '6 0 0%', background: 'rgba(12,12,14,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${c(0.06)}`, borderRadius: 16, padding: 8, overflow: 'hidden', minHeight: 0 }}
      >
        <div className="flex items-center gap-1.5 mb-2 flex-shrink-0">
          <span className="w-[5px] h-[5px] rounded-full" style={{ background: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }} />
          <span className="text-[8px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Runtime Status</span>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          {config.runtimeModules.map(mod => (
            <div key={mod.label} className="flex items-center gap-2.5" style={{ padding: '3px 0', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
              <div className="w-[28px] h-[28px] rounded-[8px] flex items-center justify-center flex-shrink-0" style={{ background: colors[mod.label]?.iconBg ?? colors.Uptime.iconBg }}>
                {RUNTIME_ICONS[mod.label] ?? <Cpu size={12} style={{ color: colors[mod.label]?.text ?? colors.Uptime.text }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium tracking-tight leading-none" style={{ color: 'rgba(255,255,255,0.6)' }}>{mod.label}</div>
                <div className="text-[7px] font-mono truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.15)' }}>{mod.subtitle}</div>
              </div>
              <div className="text-[10px] font-mono font-medium tabular-nums flex-shrink-0" style={{ color: mod.statusColor }}>{mod.status}</div>
              {mod.sparkline ? <Sparkline color={colors[mod.label]?.text ?? colors.Uptime.text} /> : mod.label === 'Uptime' ? <RefreshCw size={10} style={{ color: 'rgba(255,255,255,0.12)' }} /> : null}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Live Logs */}
      <motion.div variants={staggerItem} className="flex flex-col flex-shrink-0 w-full"
        style={{ flex: '4 0 0%', background: 'rgba(12,12,14,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: `1px solid ${c(0.06)}`, borderRadius: 16, padding: '8px 8px 0 8px', overflow: 'hidden', minHeight: 0 }}
      >
        <div className="flex items-center gap-1.5 mb-2.5 flex-shrink-0">
          <Terminal size={10} style={{ color: ACCENT, filter: `drop-shadow(0 0 6px ${ACCENT}40)` }} />
          <span className="text-[8px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Live Logs</span>
        </div>
        <div className="flex-1 overflow-y-auto" style={{ minHeight: 0 }}>
          {config.logEntries.map((log, i) => (
            <div key={i} className="flex items-start gap-2" style={{ padding: '3px 0' }}>
              <span className="text-[8px] font-mono flex-shrink-0 tabular-nums mt-[1px]" style={{ color: 'rgba(255,255,255,0.12)' }}>{log.time}</span>
              <span className="w-[4px] h-[4px] rounded-full flex-shrink-0 mt-[5px]" style={{ background: logTypeDot[log.type] }} />
              <span className="text-[8px] font-mono truncate" style={{
                color: logTypeColor[log.type],
                ...(log.type === 'processing' ? { filter: `drop-shadow(0 0 4px ${ACCENT}26)` } : {}),
              }}>{log.message}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-end gap-1.5 flex-shrink-0 cursor-default select-none"
          style={{ padding: '8px 0', borderTop: '1px solid rgba(255,255,255,0.02)' }}
        >
          <span className="text-[7px] font-mono uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.12)' }}>View Full Logs</span>
          <ExternalLink size={9} style={{ color: 'rgba(255,255,255,0.12)' }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Helpers ─── */
function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}
