const MARKS = [
  { top: '12%', left: '3%', label: 'X:042', },
  { bottom: '8%', right: '2%', label: 'GRID-A3', },
  { top: '45%', right: '2%', label: 'NODE-07', },
  { bottom: '35%', left: '2%', label: 'SYS-01', },
  { top: '78%', left: '6%', label: 'RUNTIME', },
]

interface CoordinateMarksProps {
  parallax: { x: number; y: number }
}

export default function CoordinateMarks({ parallax }: CoordinateMarksProps) {
  return (
    <div
      className="absolute inset-0 pointer-events-none z-[1]"
      style={{
        transform: `translate(${parallax.x * 0.7}px, ${parallax.y * 0.7}px)`,
        willChange: 'transform',
      }}
    >
      {MARKS.map((m, i) => (
        <span
          key={i}
          className="absolute text-[8px] font-mono tracking-wider select-none"
          style={{
            top: 'top' in m ? m.top : undefined,
            bottom: 'bottom' in m ? m.bottom : undefined,
            left: 'left' in m ? m.left : undefined,
            right: 'right' in m ? m.right : undefined,
            color: 'rgba(255, 255, 255, 0.025)',
          }}
        >
          {m.label}
        </span>
      ))}
    </div>
  )
}
