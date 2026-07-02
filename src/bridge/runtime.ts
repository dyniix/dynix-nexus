import type { RuntimeMetrics, EngineInfo } from './types'

export interface RuntimeAdapter {
  getMetrics(): Promise<RuntimeMetrics>
  getEngines(): Promise<EngineInfo[]>
  shutdown(): Promise<void>
  restart(): Promise<void>
}

class DevRuntimeAdapter implements RuntimeAdapter {
  async getMetrics(): Promise<RuntimeMetrics> {
    return {
      state: 'idle',
      queueLength: 0,
      gpuUtilization: null,
      vramUsedMb: null,
      vramTotalMb: null,
      activeModules: 0,
      uptimeMs: 0,
    }
  }

  async getEngines(): Promise<EngineInfo[]> {
    return []
  }

  async shutdown(): Promise<void> {
    console.log('[Runtime] Shutdown requested (dev mode — no-op)')
  }

  async restart(): Promise<void> {
    console.log('[Runtime] Restart requested (dev mode — no-op)')
  }
}

let adapter: RuntimeAdapter = new DevRuntimeAdapter()

export function setRuntimeAdapter(impl: RuntimeAdapter): void {
  adapter = impl
}

export const runtime = {
  getMetrics: () => adapter.getMetrics(),
  getEngines: () => adapter.getEngines(),
  shutdown: () => adapter.shutdown(),
  restart: () => adapter.restart(),
}
