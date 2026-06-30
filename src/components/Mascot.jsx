// Mascote original do app — um porquinho "blob" fofo com expressões variadas.
// Desenhado em SVG puro (sem assets externos), no espírito da ilustração 3D
// arredondada (kawaii), mas com traço próprio do Meu Bolso.

const EYES = {
  happy: (
    <>
      <path d="M70 92 Q78 80 86 92" stroke="#4b2e2e" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M114 92 Q122 80 130 92" stroke="#4b2e2e" strokeWidth="5" strokeLinecap="round" fill="none" />
    </>
  ),
  sad: (
    <>
      <circle cx="78" cy="94" r="5" fill="#4b2e2e" />
      <circle cx="122" cy="94" r="5" fill="#4b2e2e" />
      <path d="M68 82 Q78 76 87 81" stroke="#4b2e2e" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M113 81 Q122 76 132 82" stroke="#4b2e2e" strokeWidth="4" strokeLinecap="round" fill="none" />
    </>
  ),
  neutral: (
    <>
      <circle cx="78" cy="92" r="5" fill="#4b2e2e" />
      <circle cx="122" cy="92" r="5" fill="#4b2e2e" />
    </>
  ),
  excited: (
    <>
      <circle cx="78" cy="92" r="7" fill="#4b2e2e" />
      <circle cx="122" cy="92" r="7" fill="#4b2e2e" />
      <circle cx="80.5" cy="89" r="2" fill="#fff" />
      <circle cx="124.5" cy="89" r="2" fill="#fff" />
    </>
  ),
  sleepy: (
    <>
      <path d="M71 92 H86" stroke="#4b2e2e" strokeWidth="5" strokeLinecap="round" />
      <path d="M115 92 H130" stroke="#4b2e2e" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
}

const MOUTHS = {
  happy: <path d="M86 108 Q100 123 114 108" stroke="#4b2e2e" strokeWidth="5" strokeLinecap="round" fill="none" />,
  sad: <path d="M86 117 Q100 105 114 117" stroke="#4b2e2e" strokeWidth="5" strokeLinecap="round" fill="none" />,
  neutral: <line x1="91" y1="110" x2="109" y2="110" stroke="#4b2e2e" strokeWidth="5" strokeLinecap="round" />,
  excited: <ellipse cx="100" cy="113" rx="9" ry="7" fill="#4b2e2e" />,
  sleepy: <ellipse cx="100" cy="110" rx="6" ry="4" fill="#4b2e2e" />,
}

export default function Mascot({ mood = 'happy', size = 96, className = '', animated = true }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={`${animated ? 'animate-float-cute' : ''} ${className}`}
      role="img"
      aria-label={`Mascote ${mood}`}
    >
      {/* sombra */}
      <ellipse cx="100" cy="178" rx="48" ry="8" fill="#000" opacity="0.06" />

      {/* orelhas */}
      <ellipse cx="60" cy="50" rx="17" ry="15" fill="#ffafc5" />
      <ellipse cx="140" cy="50" rx="17" ry="15" fill="#ffafc5" />
      <ellipse cx="60" cy="51" rx="9" ry="7" fill="#ff86a8" />
      <ellipse cx="140" cy="51" rx="9" ry="7" fill="#ff86a8" />

      {/* corpo */}
      <ellipse cx="100" cy="112" rx="64" ry="58" fill="#ffc9da" />
      <ellipse cx="100" cy="132" rx="38" ry="20" fill="#ffd9e6" opacity="0.75" />

      {/* bochechas */}
      <ellipse cx="58" cy="108" rx="11" ry="6.5" fill="#ff7fa3" opacity="0.55" />
      <ellipse cx="142" cy="108" rx="11" ry="6.5" fill="#ff7fa3" opacity="0.55" />

      {/* focinho */}
      <ellipse cx="100" cy="119" rx="21" ry="15" fill="#ff9fbb" />
      <ellipse cx="92" cy="119" rx="3.5" ry="5" fill="#c5567a" />
      <ellipse cx="108" cy="119" rx="3.5" ry="5" fill="#c5567a" />

      {EYES[mood] || EYES.neutral}
      {MOUTHS[mood] || MOUTHS.neutral}

      {mood === 'sad' && (
        <path d="M65 98 q-3 7 0 13" stroke="#7dd3fc" strokeWidth="4" strokeLinecap="round" fill="none" />
      )}
      {mood === 'excited' && (
        <>
          <text x="38" y="60" fontSize="22" fill="#fbbf24">✦</text>
          <text x="148" y="48" fontSize="16" fill="#fbbf24">✦</text>
        </>
      )}
      {mood === 'sleepy' && (
        <text x="142" y="46" fontSize="18" fill="#94a3b8" fontFamily="sans-serif" fontWeight="700">
          z
        </text>
      )}
    </svg>
  )
}
