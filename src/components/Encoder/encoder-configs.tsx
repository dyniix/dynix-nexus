import type { ReactNode } from 'react'
import type { UploadedFile } from './encoder-store'

export interface PipelineStep {
  label: string
  description: string
  status: 'done' | 'running' | 'pending'
  timer: string
}

export interface InsightSection {
  label: string
  content: string
  type?: 'text' | 'tags' | 'palette'
  tags?: string[]
}

export interface LogEntry {
  time: string
  message: string
  type: 'init' | 'success' | 'processing' | 'warning' | 'idle'
}

export interface RuntimeModule {
  icon: ReactNode
  label: string
  subtitle: string
  status: string
  statusColor: string
  sparkline?: boolean
}

export interface EncoderConfig {
  id: string
  name: string
  subtitle: string
  accent: string
  accentRgb: string
  icon: ReactNode
  acceptedTypes: string[]
  acceptAttr: string
  supportedFormats: string[]
  emptyPreviewTitle: string
  emptyPreviewSubtext: string
  pipelineSteps: PipelineStep[]
  insightSections: InsightSection[]
  logEntries: LogEntry[]
  runtimeModules: RuntimeModule[]
}

/* ─── Shared ─── */
const EASE = [0.25, 1, 0.5, 1] as const

/* ─── IMAGE ENCODER ─── */
export const imageConfig: EncoderConfig = {
  id: 'image',
  name: 'Image Encoder',
  subtitle: 'Vision Processing Engine',
  accent: '#01B0E0',
  accentRgb: '0,192,250',
  icon: (
    <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="#01B0E0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="18" rx="3" />
      <circle cx="8.5" cy="8.5" r="2.5" />
      <path d="M22 15l-4-4-6 6-3-3-5 5" />
    </svg>
  ),
  acceptedTypes: [
    'image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp',
    'image/tiff', 'image/x-tiff', 'image/svg+xml', 'image/avif',
    'image/x-icon', 'image/vnd.microsoft.icon', 'image/heic', 'image/heif',
  ],
  acceptAttr: 'image/*',
  supportedFormats: ['PNG', 'JPG', 'WEBP', 'GIF', 'BMP', 'TIFF'],
  emptyPreviewTitle: 'AI VISION READY',
  emptyPreviewSubtext: 'Waiting for image input...',
  pipelineSteps: [
    { label: 'Image Loaded', description: 'Source validated and decoded', status: 'done', timer: '00:01' },
    { label: 'Pre-processing', description: 'Normalization and enhancement', status: 'done', timer: '00:01' },
    { label: 'Vision Analysis', description: 'Detecting objects, scene & elements', status: 'running', timer: '00:05' },
    { label: 'OCR', description: 'Text recognition and extraction', status: 'pending', timer: 'Pending' },
    { label: 'Caption Generation', description: 'Natural language description', status: 'pending', timer: 'Pending' },
    { label: 'Metadata Extraction', description: 'EXIF and attribute inference', status: 'pending', timer: 'Pending' },
    { label: 'Embedding Generation', description: 'Vector representation encoding', status: 'pending', timer: 'Pending' },
  ],
  insightSections: [
    { label: 'Scene', content: 'Nature, Landscape, Sunset' },
    { label: 'Objects', content: 'Mountain, Lake, Trees, Sky, Clouds, Rocks', type: 'tags' },
    { label: 'Text Found', content: '\u2014' },
    { label: 'Caption (AI)', content: 'A beautiful sunset over a mountain lake with dramatic clouds and reflections.' },
    { label: 'Mood', content: 'Calm, Peaceful, Serene', type: 'tags' },
    { label: 'Color Palette', content: '', type: 'palette' },
  ],
  logEntries: [
    { time: '11:42:10', message: 'Workspace Initialized', type: 'init' },
    { time: '11:42:11', message: 'Image Loaded', type: 'success' },
    { time: '11:42:12', message: 'Pre-processing Start', type: 'processing' },
    { time: '11:42:14', message: 'Pre-processing Done', type: 'success' },
    { time: '11:42:15', message: 'Vision Analysis Start', type: 'processing' },
    { time: '11:42:16', message: 'Objects Detected', type: 'success' },
    { time: '11:42:18', message: 'Scene Classified', type: 'success' },
    { time: '11:42:20', message: 'Running OCR...', type: 'warning' },
  ],
  runtimeModules: [
    { icon: null!, label: 'GPU', subtitle: 'NVIDIA RTX 3050', status: '37%', statusColor: '#01B0E0', sparkline: true },
    { icon: null!, label: 'CPU', subtitle: 'Intel i7-4770', status: '18%', statusColor: '#3B82F6', sparkline: true },
    { icon: null!, label: 'RAM', subtitle: '6.7 / 16 GB', status: '42%', statusColor: '#34D399', sparkline: true },
    { icon: null!, label: 'Memory', subtitle: 'AI Cache', status: '1.2 GB', statusColor: '#FB923C', sparkline: true },
    { icon: null!, label: 'Task', subtitle: 'Vision Analysis', status: 'Running', statusColor: '#A78BFA', sparkline: false },
    { icon: null!, label: 'Uptime', subtitle: '01:24:37', status: '', statusColor: 'rgba(255,255,255,0.45)', sparkline: false },
  ],
}

/* ─── VIDEO ENCODER ─── */
export const videoConfig: EncoderConfig = {
  id: 'video',
  name: 'Video Encoder',
  subtitle: 'Video Processing Engine',
  accent: '#A855F7',
  accentRgb: '168,85,247',
  icon: (
    <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="#A855F7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  ),
  acceptedTypes: [
    'video/mp4', 'video/quicktime', 'video/x-matroska', 'video/x-msvideo',
    'video/webm', 'video/x-flv', 'video/x-ms-wmv', 'video/x-m4v',
    'video/3gpp', 'video/ogg', 'video/mpeg',
  ],
  acceptAttr: 'video/*',
  supportedFormats: ['MP4', 'MOV', 'MKV', 'AVI', 'WEBM', 'FLV', 'WMV', 'M4V', '3GP', 'OGV'],
  emptyPreviewTitle: 'AI VIDEO READY',
  emptyPreviewSubtext: 'Waiting for video input...',
  pipelineSteps: [
    { label: 'Video Loaded', description: 'Source validated and decoded', status: 'done', timer: '00:01' },
    { label: 'Frame Extraction', description: 'Keyframe detection and sampling', status: 'done', timer: '00:02' },
    { label: 'Scene Detection', description: 'Identifying scene transitions', status: 'running', timer: '00:04' },
    { label: 'Object Tracking', description: 'Motion-based object tracking', status: 'pending', timer: 'Pending' },
    { label: 'Motion Analysis', description: 'Optical flow and movement vectors', status: 'pending', timer: 'Pending' },
    { label: 'Audio Separation', description: 'Isolating audio from video track', status: 'pending', timer: 'Pending' },
    { label: 'Subtitle Detection', description: 'OCR-based subtitle extraction', status: 'pending', timer: 'Pending' },
    { label: 'Video Embedding', description: 'Video vector encoding', status: 'pending', timer: 'Pending' },
  ],
  insightSections: [
    { label: 'Duration', content: '00:03:42' },
    { label: 'Resolution', content: '1920 \u00d7 1080' },
    { label: 'FPS', content: '29.97' },
    { label: 'Codec', content: 'H.264' },
    { label: 'Bitrate', content: '12.5 Mbps' },
    { label: 'Aspect Ratio', content: '16:9' },
    { label: 'Scenes Detected', content: '14' },
    { label: 'Objects', content: 'Person, Car, Building, Tree, Sign', type: 'tags' },
    { label: 'Audio Tracks', content: '1 (AAC, 48kHz)' },
    { label: 'Subtitle Language', content: 'English' },
  ],
  logEntries: [
    { time: '11:42:10', message: 'Workspace Initialized', type: 'init' },
    { time: '11:42:11', message: 'Video Loaded', type: 'success' },
    { time: '11:42:13', message: 'Extracting Frames...', type: 'processing' },
    { time: '11:42:16', message: 'Frame Extraction Complete', type: 'success' },
    { time: '11:42:17', message: 'Scene Detection Start', type: 'processing' },
    { time: '11:42:20', message: 'Scene Classified', type: 'success' },
    { time: '11:42:22', message: 'Analyzing Motion...', type: 'processing' },
    { time: '11:42:25', message: 'Subtitle Detection', type: 'warning' },
  ],
  runtimeModules: [
    { icon: null!, label: 'GPU', subtitle: 'NVIDIA RTX 3050', status: '52%', statusColor: '#A855F7', sparkline: true },
    { icon: null!, label: 'CPU', subtitle: 'Intel i7-4770', status: '34%', statusColor: '#3B82F6', sparkline: true },
    { icon: null!, label: 'RAM', subtitle: '6.7 / 16 GB', status: '68%', statusColor: '#34D399', sparkline: true },
    { icon: null!, label: 'Memory', subtitle: 'Frame Buffer', status: '3.8 GB', statusColor: '#FB923C', sparkline: true },
    { icon: null!, label: 'Task', subtitle: 'Scene Detection', status: 'Running', statusColor: '#A78BFA', sparkline: false },
    { icon: null!, label: 'Uptime', subtitle: '01:24:37', status: '', statusColor: 'rgba(255,255,255,0.45)', sparkline: false },
  ],
}

/* ─── DOCUMENT ENCODER ─── */
export const documentConfig: EncoderConfig = {
  id: 'document',
  name: 'Document Encoder',
  subtitle: 'Document Processing Engine',
  accent: '#F97316',
  accentRgb: '249,115,22',
  icon: (
    <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
  acceptedTypes: [
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain', 'application/rtf',
    'application/vnd.oasis.opendocument.text',
    'text/csv',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-powerpoint',
  ],
  acceptAttr: '.pdf,.doc,.docx,.txt,.rtf,.odt,.csv,.xlsx,.xls,.pptx,.ppt',
  supportedFormats: ['PDF', 'DOC', 'DOCX', 'TXT', 'RTF', 'ODT', 'CSV', 'XLSX', 'PPTX'],
  emptyPreviewTitle: 'AI DOCUMENT READY',
  emptyPreviewSubtext: 'Waiting for document input...',
  pipelineSteps: [
    { label: 'Document Loaded', description: 'Source validated and decoded', status: 'done', timer: '00:01' },
    { label: 'OCR', description: 'Optical character recognition', status: 'done', timer: '00:03' },
    { label: 'Layout Detection', description: 'Paragraphs, headers & columns', status: 'running', timer: '00:02' },
    { label: 'Table Detection', description: 'Identifying tabular structures', status: 'pending', timer: 'Pending' },
    { label: 'Entity Extraction', description: 'Names, dates, locations & more', status: 'pending', timer: 'Pending' },
    { label: 'Keyword Detection', description: 'Key terms and topic extraction', status: 'pending', timer: 'Pending' },
    { label: 'Summary Generation', description: 'AI-powered document summarization', status: 'pending', timer: 'Pending' },
    { label: 'Embedding', description: 'Document vector encoding', status: 'pending', timer: 'Pending' },
  ],
  insightSections: [
    { label: 'Pages', content: '12' },
    { label: 'Words', content: '4,280' },
    { label: 'Characters', content: '28,154' },
    { label: 'Tables', content: '3' },
    { label: 'Images', content: '7' },
    { label: 'Language', content: 'English' },
    { label: 'Keywords', content: 'AI, Machine Learning, Data, Neural, Training', type: 'tags' },
    { label: 'Document Type', content: 'Research Paper' },
  ],
  logEntries: [
    { time: '11:42:10', message: 'Workspace Initialized', type: 'init' },
    { time: '11:42:11', message: 'Loading PDF...', type: 'processing' },
    { time: '11:42:14', message: 'Document Loaded', type: 'success' },
    { time: '11:42:15', message: 'Extracting Text...', type: 'processing' },
    { time: '11:42:18', message: 'OCR Running...', type: 'processing' },
    { time: '11:42:21', message: 'OCR Complete', type: 'success' },
    { time: '11:42:23', message: 'Tables Detected', type: 'success' },
    { time: '11:42:25', message: 'Keywords Found', type: 'success' },
  ],
  runtimeModules: [
    { icon: null!, label: 'GPU', subtitle: 'NVIDIA RTX 3050', status: '22%', statusColor: '#F97316', sparkline: true },
    { icon: null!, label: 'CPU', subtitle: 'Intel i7-4770', status: '45%', statusColor: '#3B82F6', sparkline: true },
    { icon: null!, label: 'RAM', subtitle: '6.7 / 16 GB', status: '31%', statusColor: '#34D399', sparkline: true },
    { icon: null!, label: 'Memory', subtitle: 'OCR Cache', status: '0.9 GB', statusColor: '#FB923C', sparkline: true },
    { icon: null!, label: 'Task', subtitle: 'Layout Detection', status: 'Running', statusColor: '#A78BFA', sparkline: false },
    { icon: null!, label: 'Uptime', subtitle: '01:24:37', status: '', statusColor: 'rgba(255,255,255,0.45)', sparkline: false },
  ],
}

/* ─── AUDIO ENCODER ─── */
export const audioConfig: EncoderConfig = {
  id: 'audio',
  name: 'Audio Encoder',
  subtitle: 'Audio Processing Engine',
  accent: '#34D399',
  accentRgb: '52,211,147',
  icon: (
    <svg viewBox="0 0 24 24" className="w-[19px] h-[19px]" fill="none" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  acceptedTypes: [
    'audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/flac',
    'audio/aac', 'audio/mp4', 'audio/ogg', 'audio/opus',
    'audio/x-aiff', 'audio/x-ms-wma',
  ],
  acceptAttr: 'audio/*',
  supportedFormats: ['MP3', 'WAV', 'FLAC', 'AAC', 'M4A', 'OGG', 'OPUS', 'AIFF', 'WMA'],
  emptyPreviewTitle: 'AI AUDIO READY',
  emptyPreviewSubtext: 'Waiting for audio input...',
  pipelineSteps: [
    { label: 'Audio Loaded', description: 'Source validated and decoded', status: 'done', timer: '00:01' },
    { label: 'Wave Analysis', description: 'Waveform and frequency analysis', status: 'done', timer: '00:02' },
    { label: 'Noise Detection', description: 'Background noise identification', status: 'running', timer: '00:03' },
    { label: 'Speaker Detection', description: 'Identifying distinct speakers', status: 'pending', timer: 'Pending' },
    { label: 'Speech Recognition', description: 'Converting speech to text', status: 'pending', timer: 'Pending' },
    { label: 'Transcript', description: 'Generating time-coded transcript', status: 'pending', timer: 'Pending' },
    { label: 'Emotion Analysis', description: 'Vocal tone and mood detection', status: 'pending', timer: 'Pending' },
    { label: 'Embedding', description: 'Audio vector encoding', status: 'pending', timer: 'Pending' },
  ],
  insightSections: [
    { label: 'Duration', content: '00:04:12' },
    { label: 'Bitrate', content: '320 kbps' },
    { label: 'Sample Rate', content: '44.1 kHz' },
    { label: 'Channels', content: '2 (Stereo)' },
    { label: 'Language', content: 'English' },
    { label: 'Detected Speakers', content: '2' },
    { label: 'Loudness', content: '-14.2 LUFS' },
    { label: 'BPM', content: '120' },
    { label: 'Mood', content: 'Energetic, Upbeat', type: 'tags' },
    { label: 'Genre', content: 'Electronic / Pop' },
  ],
  logEntries: [
    { time: '11:42:10', message: 'Workspace Initialized', type: 'init' },
    { time: '11:42:11', message: 'Audio Loaded', type: 'success' },
    { time: '11:42:13', message: 'Waveform Generated', type: 'success' },
    { time: '11:42:15', message: 'Noise Detection Running...', type: 'processing' },
    { time: '11:42:18', message: 'Speech Detected', type: 'success' },
    { time: '11:42:20', message: 'Transcript Started', type: 'processing' },
    { time: '11:42:23', message: 'Emotion Analysis', type: 'warning' },
    { time: '11:42:26', message: 'Embedding Complete', type: 'success' },
  ],
  runtimeModules: [
    { icon: null!, label: 'GPU', subtitle: 'NVIDIA RTX 3050', status: '18%', statusColor: '#34D399', sparkline: true },
    { icon: null!, label: 'CPU', subtitle: 'Intel i7-4770', status: '28%', statusColor: '#3B82F6', sparkline: true },
    { icon: null!, label: 'RAM', subtitle: '6.7 / 16 GB', status: '24%', statusColor: '#34D399', sparkline: true },
    { icon: null!, label: 'Memory', subtitle: 'Audio Buffer', status: '0.4 GB', statusColor: '#FB923C', sparkline: true },
    { icon: null!, label: 'Task', subtitle: 'Noise Detection', status: 'Running', statusColor: '#A78BFA', sparkline: false },
    { icon: null!, label: 'Uptime', subtitle: '01:24:37', status: '', statusColor: 'rgba(255,255,255,0.45)', sparkline: false },
  ],
}

export const encoderConfigs = {
  image: imageConfig,
  video: videoConfig,
  document: documentConfig,
  audio: audioConfig,
} as const

export type EncoderType = keyof typeof encoderConfigs
