import { useEffect, useState } from 'react'

interface Props {
  onDone: () => void
}

const BIRTH_YEAR = '2026/06/22'

interface Balloon {
  id: number
  x: number
  y: number
  size: number
  color: string
  duration: number
  delay: number
}

const BALLOON_COLORS = [
  '#ff4d6d',
  '#ffd60a',
  '#4cc9f0',
  '#8338ec',
  '#06d6a0',
  '#ff8fab',
  '#ffffff',
]

export default function BirthdayReveal({ onDone }: Props) {
  const [fadeOut, setFadeOut] = useState(false)
  const [balloons, setBalloons] = useState<Balloon[]>([])

  useEffect(() => {
    const arr: Balloon[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * 400,
      size: 45 + Math.random() * 25,
      color:
        BALLOON_COLORS[
          Math.floor(Math.random() * BALLOON_COLORS.length)
        ],
      duration: 7 + Math.random() * 5,
      delay: Math.random() * 5,
    }))

    setBalloons(arr)

    const fadeTimer = setTimeout(() => setFadeOut(true), 2500)
    const doneTimer = setTimeout(() => onDone(), 3000)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <>
      <style>{`
        @keyframes floatBalloon {
          from {
            transform: translateY(0);
          }

          to {
            transform: translateY(-130vh);
          }
        }

        @keyframes glow {
          0% {
            text-shadow:
              0 0 20px #ffd60a,
              0 0 40px #ffd60a,
              0 0 70px #ffd60a;
          }

          50% {
            text-shadow:
              0 0 30px #ffd60a,
              0 0 60px #ffd60a,
              0 0 100px #ffd60a;
          }

          100% {
            text-shadow:
              0 0 20px #ffd60a,
              0 0 40px #ffd60a,
              0 0 70px #ffd60a;
          }
        }
      `}</style>

      <div
        style={{
          width: '100%',
          height: '100dvh',
          background: '#FFB6C1', // Энгийн улаан
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        {/* Balloon */}
        {balloons.map((b) => (
          <div
            key={b.id}
            style={{
              position: 'absolute',
              left: b.x,
              bottom: -150 + b.y,
              animation: `floatBalloon ${b.duration}s linear infinite`,
              animationDelay: `${b.delay}s`,
            }}
          >
            {/* Balloon body */}
            <div
              style={{
                width: b.size,
                height: b.size * 1.2,
                borderRadius: '50%',
                background: b.color,
                boxShadow: `0 0 20px ${b.color}`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  bottom: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0,
                  height: 0,
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: `10px solid ${b.color}`,
                }}
              />
            </div>

            {/* String */}
            <div
              style={{
                width: '2px',
                height: '70px',
                background: '#fff',
                margin: '0 auto',
                opacity: 0.8,
              }}
            />
          </div>
        ))}

        {/* Text */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
          }}
        >
          {/* Yellow glow behind */}
          <div
            style={{
              position: 'absolute',
              width: '400px',
              height: '180px',
              background:
                'radial-gradient(circle, rgba(255,214,10,0.9) 0%, rgba(255,214,10,0.4) 40%, transparent 80%)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              filter: 'blur(35px)',
              zIndex: -1,
            }}
          />

          <span
            style={{
              fontSize: '72px',
              fontWeight: 200,
              color: '#fff',
              letterSpacing: '3px',
              animation: 'glow 2s infinite',
            }}
          >
            {BIRTH_YEAR}
          </span>
        </div>
      </div>
    </>
  )
}