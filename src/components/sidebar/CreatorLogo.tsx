import type { SVGProps, FC } from 'react'

const CreatorLogo: FC<SVGProps<SVGSVGElement>> = (p) => (
  <svg viewBox="0 0 24 24" fill="none" {...p}>
    {/* Outer diamond — foundation */}
    <path
      d="M12 1.5l9 5.2v10.6L12 22.5l-9-5.2V6.7l9-5.2z"
      stroke="currentColor"
      strokeWidth="0.6"
      opacity="0.15"
    />

    {/* Inner diamond — primary form */}
    <path
      d="M12 4l6.5 3.8v7.6L12 19.2l-6.5-3.8V7.8L12 4z"
      stroke="currentColor"
      strokeWidth="1.2"
      opacity="0.55"
    />

    {/* Core — smallest diamond */}
    <path
      d="M12 7l4 2.3v4.6L12 16.3l-4-2.3V9.3L12 7z"
      stroke="currentColor"
      strokeWidth="0.8"
      opacity="0.3"
    />

    {/* Left brace — creation gesture */}
    <path
      d="M8 8.5l-3 3.5 3 3.5"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Right brace — mirror */}
    <path
      d="M16 8.5l3 3.5-3 3.5"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.6"
    />

    {/* Center dot — focal spark */}
    <circle
      cx="12"
      cy="12"
      r="1"
      fill="currentColor"
      opacity="0.8"
    />

    {/* Diagonal accent — dynamic energy */}
    <line
      x1="17"
      y1="7"
      x2="20"
      y2="4"
      stroke="currentColor"
      strokeWidth="0.5"
      opacity="0.2"
    />
  </svg>
)

export default CreatorLogo
