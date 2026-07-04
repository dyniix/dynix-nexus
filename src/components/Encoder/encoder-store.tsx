import { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react'

export interface UploadedFile {
  id: string
  file: File
  url: string
  name: string
  size: number
  type: string
  dimensions: { width: number; height: number } | null
  duration?: number
  lastModified: number
  status: 'ready' | 'error'
  error?: string
}

interface EncoderState {
  files: UploadedFile[]
  selectedId: string | null
  isDragOver: boolean
}

type Action =
  | { type: 'ADD_FILES'; files: UploadedFile[] }
  | { type: 'REMOVE_FILE'; id: string }
  | { type: 'SELECT_FILE'; id: string }
  | { type: 'SET_DRAG_OVER'; isOver: boolean }

function reducer(state: EncoderState, action: Action): EncoderState {
  switch (action.type) {
    case 'ADD_FILES':
      return { ...state, files: [...state.files, ...action.files] }
    case 'REMOVE_FILE':
      return {
        ...state,
        files: state.files.filter(f => f.id !== action.id),
        selectedId: state.selectedId === action.id
          ? state.files.find(f => f.id !== action.id)?.id ?? null
          : state.selectedId,
      }
    case 'SELECT_FILE':
      return { ...state, selectedId: action.id }
    case 'SET_DRAG_OVER':
      return { ...state, isDragOver: action.isOver }
    default:
      return state
  }
}

const initialState: EncoderState = {
  files: [],
  selectedId: null,
  isDragOver: false,
}

interface EncoderContextType {
  state: EncoderState
  addFiles: (fileList: FileList | File[]) => Promise<void>
  removeFile: (id: string) => void
  selectFile: (id: string) => void
  setDragOver: (isOver: boolean) => void
  selectedFile: UploadedFile | null
  config: EncoderProviderConfig
}

const EncoderContext = createContext<EncoderContextType | null>(null)

export interface EncoderProviderConfig {
  acceptedTypes: string[]
  acceptAttr: string
  accent: string
  accentRgb: string
  validateFile?: (file: File) => boolean
  readMetadata?: (file: File) => Promise<{ dimensions?: { width: number; height: number } | null; duration?: number } | null>
}

function formatSize(bytes: number): string {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 0 ? 2 : 0)} ${units[i]}`
}

function formatDimensions(w: number, h: number): string {
  return `${w} × ${h}`
}

function getExtension(name: string): string {
  return name.split('.').pop()?.toUpperCase() ?? ''
}

async function readImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise(resolve => {
    if (file.type === 'image/svg+xml') { resolve(null); return }
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => { URL.revokeObjectURL(url); resolve({ width: img.naturalWidth, height: img.naturalHeight }) }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    img.src = url
  })
}

async function readVideoMetadata(file: File): Promise<{ dimensions?: { width: number; height: number } | null; duration?: number } | null> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file)
    const video = document.createElement('video')
    video.preload = 'metadata'
    video.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      resolve({
        dimensions: { width: video.videoWidth, height: video.videoHeight },
        duration: video.duration,
      })
    }
    video.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    video.src = url
  })
}

async function readAudioMetadata(file: File): Promise<{ duration?: number } | null> {
  return new Promise(resolve => {
    const url = URL.createObjectURL(file)
    const audio = document.createElement('audio')
    audio.preload = 'metadata'
    audio.onloadedmetadata = () => {
      URL.revokeObjectURL(url)
      resolve({ duration: audio.duration })
    }
    audio.onerror = () => { URL.revokeObjectURL(url); resolve(null) }
    audio.src = url
  })
}

let idCounter = 0

export function EncoderProvider({ children, config }: { children: ReactNode; config: EncoderProviderConfig }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addFiles = useCallback(async (fileList: FileList | File[]) => {
    const incoming = Array.from(fileList)
    const valid: UploadedFile[] = []

    for (const file of incoming) {
      if (!config.acceptedTypes.includes(file.type)) {
        if (config.validateFile && config.validateFile(file)) {
          // custom validation passed
        } else {
          continue
        }
      }

      let dimensions: { width: number; height: number } | null = null
      let duration: number | undefined

      if (file.type.startsWith('video/')) {
        const meta = await readVideoMetadata(file)
        if (!meta) continue
        dimensions = meta.dimensions ?? null
        duration = meta.duration
      } else if (file.type.startsWith('audio/')) {
        const meta = await readAudioMetadata(file)
        if (!meta) continue
        duration = meta.duration
      } else if (file.type.startsWith('image/')) {
        const meta = await readImageDimensions(file)
        if (!meta && file.type !== 'image/svg+xml' && file.type !== 'image/gif') continue
        dimensions = meta
      }

      const id = `file_${++idCounter}`
      const url = URL.createObjectURL(file)

      valid.push({
        id, file, url, name: file.name, size: file.size,
        type: file.type, dimensions, duration,
        lastModified: file.lastModified, status: 'ready',
      })
    }

    if (valid.length > 0) {
      dispatch({ type: 'ADD_FILES', files: valid })
      dispatch({ type: 'SELECT_FILE', id: valid[0].id })
    }
  }, [config])

  const removeFile = useCallback((id: string) => {
    const file = state.files.find(f => f.id === id)
    if (file) URL.revokeObjectURL(file.url)
    dispatch({ type: 'REMOVE_FILE', id })
  }, [state.files])

  const selectFile = useCallback((id: string) => {
    dispatch({ type: 'SELECT_FILE', id })
  }, [])

  const setDragOver = useCallback((isOver: boolean) => {
    dispatch({ type: 'SET_DRAG_OVER', isOver })
  }, [])

  const selectedFile = state.files.find(f => f.id === state.selectedId) ?? null

  return (
    <EncoderContext.Provider value={{ state, addFiles, removeFile, selectFile, setDragOver, selectedFile, config }}>
      {children}
    </EncoderContext.Provider>
  )
}

export function useEncoder(): EncoderContextType {
  const ctx = useContext(EncoderContext)
  if (!ctx) throw new Error('useEncoder must be used within EncoderProvider')
  return ctx
}

export { formatSize, formatDimensions, getExtension }
