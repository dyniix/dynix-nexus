import { useMouseParallax } from '../../hooks/useMouseParallax'
import NexusNetwork from './NexusNetwork'
import CoordinateMarks from './CoordinateMarks'

export type RuntimeState = 'idle' | 'healthy' | 'active' | 'encoding' | 'error'

interface BackgroundEngineProps {
  state?: RuntimeState
}

export default function BackgroundEngine({ state = 'idle' }: BackgroundEngineProps) {
  const parallax = useMouseParallax()

  return (
    <div className="bg-engineered" aria-hidden>
      {/* Layer 1 — Base: #08090A + radial gradient */}
      <div
        className="bg-layer-base"
        style={{
          transform: `translate(${parallax.x * 0.15}px, ${parallax.y * 0.15}px)`,
          willChange: 'transform',
        }}
      />

      {/* Layer 2 — Noise: film grain */}
      <div className="bg-layer-noise" />

      {/* Layer 2b — Premium canvas texture */}
      <div className="bg-layer-texture" />

      {/* Layer 3 — Irregular Blueprint: triangles, diagonals, construction lines */}
      <div
        className="bg-blueprint-irregular"
        style={{
          transform: `translate(${parallax.x * 0.25}px, ${parallax.y * 0.25}px)`,
          willChange: 'transform',
        }}
      />

      {/* Layer 4 — Nexus Network: nodes, connections, packets */}
      <NexusNetwork state={state} parallax={parallax} />

      {/* Layer 5 — Runtime Pulse: soft cyan field near Dynamic Island */}
      <div
        className="bg-layer-pulse"
        style={{
          opacity: state === 'encoding' ? 0.6 : state === 'active' ? 0.4 : 0.25,
          transform: `translate(${parallax.x * 0.1}px, ${parallax.y * 0.1}px)`,
          willChange: 'transform, opacity',
        }}
      />

      {/* Layer 6 — Atmospheric Lighting: large blurred lights behind sections */}
      <div
        className="bg-atm-island"
        style={{
          transform: `translate(${parallax.x * 0.08}px, ${parallax.y * 0.08}px)`,
          willChange: 'transform',
        }}
      />
      <div
        className="bg-atm-workspace"
        style={{
          transform: `translate(${parallax.x * 0.12}px, ${parallax.y * 0.12}px)`,
          willChange: 'transform',
        }}
      />
      <div
        className="bg-atm-flow"
        style={{
          transform: `translate(${parallax.x * 0.1}px, ${parallax.y * 0.1}px)`,
          willChange: 'transform',
        }}
      />

      {/* Layer 7 — Vignette: darker edges, brighter center */}
      <div className="bg-vignette" />

      {/* Layer 8 — Coordinate Marks: tiny engineering markers */}
      <CoordinateMarks parallax={parallax} />

      {/* Layer 9 — Ambient Lighting: multiple light sources */}
      <div
        className="bg-layer-ambient"
        style={{
          transform: `translate(${parallax.x * 0.2}px, ${parallax.y * 0.2}px)`,
          willChange: 'transform',
        }}
      />
    </div>
  )
}
