export interface RuntimeMetrics {
  state: 'idle' | 'processing' | 'error' | 'shutdown'
  queueLength: number
  gpuUtilization: number | null
  vramUsedMb: number | null
  vramTotalMb: number | null
  activeModules: number
  uptimeMs: number
}

export interface ModuleInfo {
  id: string
  label: string
  icon: string
  status: 'ready' | 'loading' | 'absent'
  version: string
}

export interface FileEntry {
  name: string
  path: string
  sizeBytes: number
  isDirectory: boolean
}

export interface PerceptionResult {
  sessionId: string
  document: unknown
  createdAt: string
}

export type EngineStatus = 'idle' | 'running' | 'error' | 'disabled'

export interface EngineInfo {
  id: string
  mediaTypes: string[]
  status: EngineStatus
  version: string
}
