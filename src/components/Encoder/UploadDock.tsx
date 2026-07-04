import { useRef, useCallback } from 'react'
import { motion } from 'motion/react'
import { CloudUpload, X, ListOrdered } from 'lucide-react'
import { useEncoder, formatSize, formatDimensions, type UploadedFile, type EncoderProviderConfig } from './encoder-store'

const EASE = [0.25, 1, 0.5, 1] as const

const cardBase = (accentRgb: string) => ({
  background: 'rgba(12,12,14,0.55)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  border: `1px solid rgba(${accentRgb},0.06)`,
  borderRadius: 14,
})

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
}

/* ───────── Section 1 — Upload Area ───────── */
function UploadArea() {
  const inputRef = useRef<HTMLInputElement>(null)
  const { addFiles, state, setDragOver, config } = useEncoder()
  const ACCENT = config.accent
  const ACCENT_RGB = config.accentRgb

  const handleClick = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files)
      e.target.value = ''
    }
  }, [addFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(true)
  }, [setDragOver])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
  }, [setDragOver])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files)
    }
  }, [addFiles, setDragOver])

  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col items-center justify-center gap-1 flex-shrink-0 cursor-pointer select-none relative"
      style={{
        width: '18%',
        ...cardBase(ACCENT_RGB),
        padding: '10px 8px',
        transition: 'background 0.2s, border-color 0.2s',
        ...(state.isDragOver ? { background: `rgba(${ACCENT_RGB},0.08)`, borderColor: `rgba(${ACCENT_RGB},0.3)` } : {}),
      }}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept={config.acceptAttr}
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="absolute pointer-events-none"
        style={{ width: 80, height: 80, top: 'calc(50% - 46px)', left: 'calc(50% - 40px)', background: `radial-gradient(ellipse at center, rgba(${ACCENT_RGB},0.07) 0%, transparent 70%)` }}
      />
      <CloudUpload size={22} style={{ color: state.isDragOver ? ACCENT : 'rgba(255,255,255,0.1)' }} />
      <div className="text-[9px] font-medium leading-tight text-center" style={{ color: state.isDragOver ? ACCENT : 'rgba(255,255,255,0.25)' }}>
        {state.isDragOver ? 'Drop here' : 'Drop files here'}
      </div>
      <div className="text-[7px] font-medium" style={{ color: ACCENT }}>
        or click to browse
      </div>
      <div className="text-[6px] font-mono mt-1 opacity-40" style={{ color: 'rgba(255,255,255,0.2)' }}>
        {config.acceptedTypes.length > 0
          ? config.acceptedTypes.map(t => t.split('/')[1]?.toUpperCase()).filter(Boolean).slice(0, 6).join(' \u00b7 ')
          : 'All supported formats'}
      </div>
    </motion.div>
  )
}

/* ───────── Section 2 — Progress Area ───────── */
function ProgressArea() {
  const { selectedFile, config } = useEncoder()

  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col items-center justify-center gap-1.5 flex-shrink-0 select-none relative"
      style={{ width: '50%', ...cardBase(config.accentRgb), padding: 8, overflow: 'hidden' }}
    >
      {selectedFile ? (
        <ActiveProgress file={selectedFile} config={config} />
      ) : (
        <EmptyProgress config={config} />
      )}
    </motion.div>
  )
}

function EmptyProgress({ config }: { config: EncoderProviderConfig }) {
  const ACCENT_RGB = config.accentRgb
  const ACCENT = config.accent
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-1 w-full h-full relative select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Title */}
      <div className="flex items-center justify-between w-full mb-1 flex-shrink-0" style={{ padding: '0 2px' }}>
        <span className="text-[7px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Upload Dock &amp; Progress
        </span>
      </div>

      {/* Dashed upload region */}
      <div className="flex-1 w-full rounded-[10px] flex flex-col items-center justify-center gap-1.5"
        style={{
          border: `1px dashed rgba(${ACCENT_RGB},0.08)`,
          background: `rgba(${ACCENT_RGB},0.01)`,
        }}
      >
        {/* Soft accent grid */}
        <div className="absolute inset-0 pointer-events-none rounded-[10px] overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(rgba(${ACCENT_RGB},0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(${ACCENT_RGB},0.025) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px',
            margin: 1,
          }}
        />

        <CloudUpload size={18} style={{ color: 'rgba(255,255,255,0.06)' }} />
        <div className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.12)' }}>
          Waiting for first upload...
        </div>
        <div className="text-[6px] font-mono text-center leading-relaxed" style={{ color: 'rgba(255,255,255,0.06)' }}>
          {config.acceptedTypes.map(t => t.split('/')[1]?.toUpperCase()).filter(Boolean).slice(0, 6).join(' \u00b7 ')}
        </div>
      </div>
    </motion.div>
  )
}

function ActiveProgress({ file, config }: { file: UploadedFile; config: EncoderProviderConfig }) {
  const ACCENT = config.accent
  return (
    <motion.div
      className="flex items-center gap-3 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
    >
      {/* Thumbnail */}
      <div className="w-[44px] h-[44px] rounded-[8px] overflow-hidden flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.04)' }}
      >
        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.55)' }}>
            {file.name}
          </span>
          <span className="text-[7px] font-mono px-1.5 py-0.5 rounded-[4px] flex-shrink-0 uppercase"
            style={{ background: `${ACCENT}0a`, border: `1px solid ${ACCENT}12`, color: ACCENT }}
          >
            Ready
          </span>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          {file.dimensions && (
            <span className="text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
              {formatDimensions(file.dimensions.width, file.dimensions.height)}
            </span>
          )}
          <span className="text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.2)' }}>
            {formatSize(file.size)}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mt-1.5 w-full h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: '100%', background: ACCENT }} />
        </div>
      </div>
    </motion.div>
  )
}

/* ───────── Section 3 — Queue ───────── */
function QueuePanel() {
  const { state, selectFile, removeFile, config } = useEncoder()

  return (
    <motion.div
      variants={staggerItem}
      className="flex flex-col flex-shrink-0 select-none relative"
      style={{ width: '22%', ...cardBase(config.accentRgb), padding: 8, overflow: 'hidden' }}
    >
      <div className="flex items-center justify-between w-full mb-1 flex-shrink-0">
        <span className="text-[7px] font-semibold tracking-[0.18em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>
          Queue {state.files.length > 0 ? `(${state.files.length})` : ''}
        </span>
      </div>

      {state.files.length === 0 ? (
        <EmptyQueue config={config} />
      ) : (
        <div className="flex-1 overflow-y-auto flex flex-col gap-1" style={{ minHeight: 0 }}>
          {state.files.map(f => (
            <QueueItem
              key={f.id}
              file={f}
              isSelected={f.id === state.selectedId}
              onSelect={() => selectFile(f.id)}
              onRemove={() => removeFile(f.id)}
              accent={config.accent}
              accentRgb={config.accentRgb}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

function EmptyQueue({ config }: { config: EncoderProviderConfig }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-1.5">
      <div className="absolute pointer-events-none"
        style={{ width: 70, height: 70, top: 'calc(50% - 8px)', left: 'calc(50% - 35px)', background: `radial-gradient(ellipse at center, rgba(${config.accentRgb},0.06) 0%, transparent 70%)` }}
      />
      <ListOrdered size={14} style={{ color: 'rgba(255,255,255,0.05)' }} />
      <div className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.12)' }}>
        Queue Empty
      </div>
      <div className="text-[7px] font-mono" style={{ color: 'rgba(255,255,255,0.08)' }}>
        Ready to receive uploads.
      </div>
      <div className="text-[6px] font-mono text-center leading-relaxed mt-0.5" style={{ color: 'rgba(255,255,255,0.05)' }}>
        {config.acceptedTypes.map(t => t.split('/')[1]?.toUpperCase()).filter(Boolean).slice(0, 6).join(' \u00b7 ')}
      </div>
    </div>
  )
}

function QueueItem({ file, isSelected, onSelect, onRemove, accent, accentRgb }: {
  file: UploadedFile
  isSelected: boolean
  onSelect: () => void
  onRemove: () => void
  accent: string
  accentRgb: string
}) {
  return (
    <div
      className="flex items-center gap-2 rounded-[8px] cursor-pointer group"
      style={{
        padding: '4px 6px',
        background: isSelected ? `rgba(${accentRgb},0.06)` : 'transparent',
        border: isSelected ? `1px solid rgba(${accentRgb},0.12)` : '1px solid transparent',
        transition: 'background 0.15s, border-color 0.15s',
      }}
      onClick={onSelect}
    >
      {/* Thumbnail */}
      <div className="w-[26px] h-[26px] rounded-[5px] overflow-hidden flex-shrink-0"
        style={{ background: 'rgba(0,0,0,0.3)' }}
      >
        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="text-[8px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.4)' }}>
          {file.name}
        </div>
        <div className="text-[6px] font-mono" style={{ color: 'rgba(255,255,255,0.15)' }}>
          {formatSize(file.size)}
        </div>
      </div>

      {/* Remove button */}
      <button
        className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 p-1 rounded-[4px] hover:bg-white/5"
        onClick={e => { e.stopPropagation(); onRemove() }}
      >
        <X size={9} style={{ color: 'rgba(255,255,255,0.2)' }} />
      </button>
    </div>
  )
}

/* ───────── MAIN — Upload Dock ───────── */

const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

export default function UploadDock() {
  return (
    <motion.div
      className="flex gap-3 flex-shrink-0 w-full"
      variants={containerV}
      initial="hidden"
      animate="show"
    >
      <UploadArea />
      <ProgressArea />
      <QueuePanel />
    </motion.div>
  )
}
