import type { SVGProps, FC } from 'react'

export interface ModuleDef {
  id: string
  title: string
  subtitle: string
  accent: string
}

export interface SystemDef {
  id: string
  title: string
}

/* ── SVG Icon Components ── */

export const IconImage: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="3" width="20" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="2.5" /><path d="M22 15l-4-4-6 6-3-3-5 5" />
  </svg>
)
export const IconVideo: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="2" y="4" width="20" height="16" rx="3" /><path d="M10 8l6 4-6 4V8z" />
  </svg>
)
export const IconDocument: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9l-7-7z" /><path d="M13 2v7h7" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" />
  </svg>
)
export const IconAudio: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M9 18V5l12-2v13" /><circle cx="6" cy="16" r="3" /><circle cx="18" cy="14" r="3" />
  </svg>
)
export const IconMemory: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="4" r="2.5" /><circle cx="5" cy="12" r="2.5" /><circle cx="19" cy="12" r="2.5" /><circle cx="12" cy="20" r="2.5" />
    <line x1="12" y1="6.5" x2="5" y2="9.5" /><line x1="12" y1="6.5" x2="19" y2="9.5" />
    <line x1="5" y1="14.5" x2="12" y2="17.5" /><line x1="19" y1="14.5" x2="12" y2="17.5" />
  </svg>
)
export const IconStation: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="20" r="2" /><path d="M12 18V8" /><path d="M8 12a6 6 0 018 0" /><path d="M5 9a10 10 0 0114 0" />
  </svg>
)
export const IconChronicles: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5V4.5A2.5 2.5 0 016.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="14" y2="11" />
  </svg>
)
export const IconSettings: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="3.5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
)
export const IconTerminal: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="4 17 10 11 4 5" /><line x1="14" y1="19" x2="20" y2="19" />
  </svg>
)
export const IconLogs: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="4" y1="6" x2="16" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="14" y2="18" /><path d="M18 16l3 3-3 3" />
  </svg>
)
export const IconSparkle: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 2l1.2 4.8a6 6 0 004.6 4.6L22 12l-4.2 1.2a6 6 0 00-4.6 4.6L12 22l-1.2-4.2a6 6 0 00-4.6-4.6L2 12l4.2-1.2a6 6 0 004.6-4.6L12 2z" />
  </svg>
)
export const IconChevronRight: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
export const IconExpand: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
  </svg>
)
export const IconCollapse: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
)
export const IconPlay: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
)
export const IconSkipBack: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="19 20 9 12 19 4 19 20" /><line x1="5" y1="19" x2="5" y2="5" />
  </svg>
)
export const IconSkipForward: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <polygon points="5 4 15 12 5 20 5 4" /><line x1="19" y1="5" x2="19" y2="19" />
  </svg>
)

/* ── Module Icon Map ── */

export const MODULE_ICONS: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  image: IconImage,
  video: IconVideo,
  document: IconDocument,
  audio: IconAudio,
  memory: IconMemory,
  station: IconStation,
  chronicles: IconChronicles,
  settings: IconSettings,
  terminal: IconTerminal,
  logs: IconLogs,
}

/* ── Module Definitions ── */

export const PRIMARY_MODULES: ModuleDef[] = [
  { id: 'image',     title: 'Image Encoder',     subtitle: 'Process & Encode Images',    accent: '#00C8FF' },
  { id: 'video',     title: 'Video Encoder',     subtitle: 'Transcode & Stream',         accent: '#8B5CF6' },
  { id: 'document',  title: 'Document Encoder',  subtitle: 'Parse & Index',              accent: '#F97316' },
  { id: 'audio',     title: 'Audio Encoder',     subtitle: 'Transcribe & Process',       accent: '#22C55E' },
]

export const AI_MODULES: ModuleDef[] = [
  { id: 'memory',    title: 'Memory Junction',   subtitle: 'Vector Index & Retrieval',   accent: '#6366F1' },
  { id: 'station',   title: 'Station Manager',   subtitle: 'Distribute & Orchestrate',   accent: '#3B82F6' },
]

export const PANEL_SYSTEM_ITEMS: SystemDef[] = [
  { id: 'chronicles', title: 'Chronicles' },
  { id: 'settings',   title: 'Settings' },
  { id: 'logs',       title: 'Logs' },
]

/* ── Sidebar Icon Order ── */

export type SidebarItem = ModuleDef | SystemDef

export const SIDEBAR_PRIMARY: SidebarItem[] = [...PRIMARY_MODULES, ...AI_MODULES]
export const SIDEBAR_SYSTEM: SidebarItem[] = [
  { id: 'chronicles', title: 'Chronicles' },
  { id: 'settings',   title: 'Settings' },
  { id: 'terminal',   title: 'Terminal' },
]

/* ── Panel Sections ── */

export const PANEL_SECTIONS = {
  primary: { label: 'PRIMARY MODULES', items: PRIMARY_MODULES },
  ai:      { label: 'AI MODULES',      items: AI_MODULES },
  system:  { label: 'SYSTEM',          items: PANEL_SYSTEM_ITEMS },
} as const

export function getModuleAccent(id: string): string {
  const all = [...PRIMARY_MODULES, ...AI_MODULES]
  return all.find(m => m.id === id)?.accent ?? '#00D9FF'
}
