import { useState, useEffect, useRef } from 'react'

export function useMouseParallax(intensity = 1) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const raf = useRef(0)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      target.current = {
        x: ((e.clientX / window.innerWidth) - 0.5) * 2 * intensity,
        y: ((e.clientY / window.innerHeight) - 0.5) * 2 * intensity,
      }
    }

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.06
      current.current.y += (target.current.y - current.current.y) * 0.06

      const dx = Math.abs(current.current.x)
      const dy = Math.abs(current.current.y)

      if (dx > 0.001 || dy > 0.001) {
        setOffset({ x: current.current.x, y: current.current.y })
      } else if (current.current.x !== 0 || current.current.y !== 0) {
        current.current = { x: 0, y: 0 }
        setOffset({ x: 0, y: 0 })
      }

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouse)
      cancelAnimationFrame(raf.current)
    }
  }, [intensity])

  return offset
}
