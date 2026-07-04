import { useState, useEffect } from 'react'
import { motion } from 'motion/react'

/* ── Intelligent AI Communication Grid ──
   Evenly distributed nodes across the full workspace area.
   Proximity-based connections with varying distances.
   Breathing animation, random twinkling, occasional packet pulses.
   Designed to feel like an active AI communication fabric.         */

/* ── Grid parameters ── */
const COLS = 10
const ROWS = 7
const JITTER = 0.12           // ±12% random offset per node
const CONNECT_RADIUS = 22     // connect nodes within 22% distance
const MIN_CONNECTIONS = 2
const MAX_CONNECTIONS = 4

interface Node {
  x: number
  y: number
  index: number
  phase: number           // random breathing phase offset
  twinkleDelay: number    // random delay for twinkling
}

/* ── Build an evenly distributed grid with slight randomness ── */
function buildNodes(cols: number, rows: number): Node[] {
  const result: Node[] = []
  let idx = 0
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const baseX = ((c + 0.5) / cols) * 100
      const baseY = ((r + 0.5) / rows) * 100
      const jx = (Math.random() - 0.5) * JITTER * 2 * (100 / cols)
      const jy = (Math.random() - 0.5) * JITTER * 2 * (100 / rows)
      result.push({
        x: Math.max(2, Math.min(98, baseX + jx)),
        y: Math.max(2, Math.min(98, baseY + jy)),
        index: idx++,
        phase: Math.random() * Math.PI * 2,
        twinkleDelay: Math.random() * 8000,
      })
    }
  }
  return result
}

function dist(a: Node, b: Node) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

interface Connection {
  from: number
  to: number
  len: number
}

/* ── Build proximity-based connections ── */
function buildConnections(nodes: Node[]): Connection[] {
  const added = new Set<string>()
  const connections: Connection[] = []

  for (let i = 0; i < nodes.length; i++) {
    const neighbors = nodes
      .map((n, j) => ({ idx: j, dist: dist(nodes[i], n) }))
      .filter(({ idx, dist }) => idx !== i && dist <= CONNECT_RADIUS)
      .sort((a, b) => a.dist - b.dist)
      .slice(0, MAX_CONNECTIONS)

    if (neighbors.length < MIN_CONNECTIONS) {
      /* Force-connect to nearest outside radius */
      const fallback = nodes
        .map((n, j) => ({ idx: j, dist: dist(nodes[i], n) }))
        .filter(({ idx }) => idx !== i && !neighbors.some(n => n.idx === idx))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, MIN_CONNECTIONS - neighbors.length)
      neighbors.push(...fallback)
    }

    for (const n of neighbors) {
      const key = `${Math.min(i, n.idx)}-${Math.max(i, n.idx)}`
      if (!added.has(key)) {
        added.add(key)
        connections.push({ from: i, to: n.idx, len: n.dist })
      }
    }
  }
  return connections
}

const NODES = buildNodes(COLS, ROWS)
const CONNECTIONS = buildConnections(NODES)

/* ── Pick a random packet path ── */
function pickPacketPath(nodes: Node[], conns: Connection[]): number[] | null {
  const adj = new Map<number, number[]>()
  for (const c of conns) {
    if (!adj.has(c.from)) adj.set(c.from, [])
    if (!adj.has(c.to)) adj.set(c.to, [])
    adj.get(c.from)!.push(c.to)
    adj.get(c.to)!.push(c.from)
  }

  for (let attempt = 0; attempt < 50; attempt++) {
    const start = Math.floor(Math.random() * nodes.length)
    const path = [start]
    const visited = new Set([start])

    for (let hop = 0; hop < 4; hop++) {
      const cur = path[path.length - 1]
      const nbrs = (adj.get(cur) || []).filter(n => !visited.has(n))
      if (nbrs.length === 0) break
      const next = nbrs[Math.floor(Math.random() * nbrs.length)]
      path.push(next)
      visited.add(next)
    }

    if (path.length >= 2) return path
  }
  return null
}

/* ── Component ── */

interface NexusNetworkProps {
  state: 'idle' | 'healthy' | 'active' | 'encoding' | 'error'
  parallax: { x: number; y: number }
}

export default function NexusNetwork({ state, parallax }: NexusNetworkProps) {
  const accentColor = state === 'error' ? '#EF4444' : '#00D9FF'
  const accentRgba = state === 'error' ? 'rgba(239, 68, 68, ' : 'rgba(0, 217, 255, '

  /* ── Packet pulse state ── */
  const [packet, setPacket] = useState<{ path: number[]; key: number } | null>(null)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>
    let key = 0

    const schedule = () => {
      const delay = 4000 + Math.random() * 6000
      timeout = setTimeout(() => {
        const path = pickPacketPath(NODES, CONNECTIONS)
        if (path) {
          key++
          setPacket({ path, key })
        }
        schedule()
      }, delay)
    }

    const initial = setTimeout(schedule, 2000)
    return () => { clearTimeout(timeout); clearTimeout(initial) }
  }, [])

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{
        transform: `translate(${parallax.x * 0.4}px, ${parallax.y * 0.4}px)`,
        willChange: 'transform',
      }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="packet-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Subtle ambient glow behind network — places it in space */}
      <ellipse
        cx="50%" cy="50%"
        rx="45%" ry="35%"
        fill={`${accentRgba}0.015)`}
      />

      {/* ── Connections ── */}
      <g opacity={0.12}>
        {CONNECTIONS.map((c, i) => {
          const from = NODES[c.from]
          const to = NODES[c.to]
          const strokeW = Math.max(0.4, 0.9 - c.len * 0.012)
          return (
            <line
              key={`conn-${i}`}
              x1={`${from.x}%`} y1={`${from.y}%`}
              x2={`${to.x}%`} y2={`${to.y}%`}
              stroke={`rgba(255,255,255,${Math.max(0.04, 0.12 - c.len * 0.002)})`}
              strokeWidth={strokeW}
            />
          )
        })}
      </g>

      {/* ── Nodes ── */}
      {NODES.map((n) => (
        <g key={`node-${n.index}`}>
          {/* Outer glow */}
          <circle
            cx={`${n.x}%`} cy={`${n.y}%`}
            r={3.5}
            fill={`${accentRgba}0.06)`}
          >
            <animate
              attributeName="opacity"
              values="0.4;0.8;0.4"
              dur={`${3 + n.phase}s`}
              repeatCount="indefinite"
            />
          </circle>
          {/* Core dot */}
          <circle
            cx={`${n.x}%`} cy={`${n.y}%`}
            r={1.4}
            fill={`rgba(255,255,255,${state === 'error' ? 0.14 : 0.10})`}
          >
            {/* Breathing */}
            <animate
              attributeName="r"
              values="1;1.6;1"
              dur={`${4 + n.phase * 0.5}s`}
              repeatCount="indefinite"
            />
            {/* Random twinkling */}
            <animate
              attributeName="opacity"
              values="0.08;0.08;0.25;0.08;0.08"
              keyTimes="0;0.1;0.12;0.14;1"
              dur={`${6 + n.twinkleDelay * 0.001}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}

      {/* ── Packet pulse ── */}
      {packet && packet.path.length >= 2 && (() => {
        const pathNodes = packet.path.map(i => NODES[i])
        const opacityArr = [
          0,
          ...Array(pathNodes.length - 2).fill(1),
          0,
        ]

        return (
          <motion.circle
            key={`pkt-${packet.key}`}
            r={2.2}
            fill={accentColor}
            filter="url(#packet-glow)"
            initial={{
              cx: `${pathNodes[0].x}%`,
              cy: `${pathNodes[0].y}%`,
              opacity: 0,
            }}
            animate={{
              cx: pathNodes.map(n => `${n.x}%`),
              cy: pathNodes.map(n => `${n.y}%`),
              opacity: opacityArr,
            }}
            transition={{
              duration: 2 + pathNodes.length * 0.3,
              ease: 'linear',
            }}
          />
        )
      })()}
    </svg>
  )
}
