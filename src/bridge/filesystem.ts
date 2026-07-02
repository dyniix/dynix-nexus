import type { FileEntry, PerceptionResult } from './types'

export interface FilesystemAdapter {
  readFile(path: string): Promise<ArrayBuffer>
  writeFile(path: string, data: ArrayBuffer): Promise<void>
  listDirectory(path: string): Promise<FileEntry[]>
  selectFile(filters?: { name: string; extensions: string[] }[]): Promise<string | null>
  selectDirectory(): Promise<string | null>
  readPerception(sessionId: string): Promise<PerceptionResult | null>
}

class DevFilesystemAdapter implements FilesystemAdapter {
  async readFile(_path: string): Promise<ArrayBuffer> {
    console.warn('[Filesystem] readFile — not available in dev mode')
    throw new Error('Filesystem not available in dev mode')
  }

  async writeFile(_path: string, _data: ArrayBuffer): Promise<void> {
    console.warn('[Filesystem] writeFile — not available in dev mode')
    throw new Error('Filesystem not available in dev mode')
  }

  async listDirectory(_path: string): Promise<FileEntry[]> {
    return []
  }

  async selectFile(_filters?: { name: string; extensions: string[] }[]): Promise<string | null> {
    console.warn('[Filesystem] selectFile — not available in dev mode')
    return null
  }

  async selectDirectory(): Promise<string | null> {
    console.warn('[Filesystem] selectDirectory — not available in dev mode')
    return null
  }

  async readPerception(_sessionId: string): Promise<PerceptionResult | null> {
    return null
  }
}

let adapter: FilesystemAdapter = new DevFilesystemAdapter()

export function setFilesystemAdapter(impl: FilesystemAdapter): void {
  adapter = impl
}

export const filesystem = {
  readFile: (path: string) => adapter.readFile(path),
  writeFile: (path: string, data: ArrayBuffer) => adapter.writeFile(path, data),
  listDirectory: (path: string) => adapter.listDirectory(path),
  selectFile: (filters?: { name: string; extensions: string[] }[]) => adapter.selectFile(filters),
  selectDirectory: () => adapter.selectDirectory(),
  readPerception: (sessionId: string) => adapter.readPerception(sessionId),
}
