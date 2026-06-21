import { useState, useEffect, useRef } from 'react'

interface Props {
  correctPin: string
  onSuccess: () => void
}

const KEYS = ['1','2','3','4','5','6','7','8','9','','0']

const FLOATING = ['💜','🩷','✨','💫','🌸','💕','🫧','🌙']

interface FloatItem {
  id: number
  emoji: string
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export default function PinScreen({ correctPin, onSuccess }: Props) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const [pinVisible, setPinVisible] = useState(false)
  const [time, setTime] = useState('')
  const [dateStr, setDateStr] = useState('')

  const touchStartY = useRef<number | null>(null)

  const [floats] = useState<FloatItem[]>(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      emoji: FLOATING[i % FLOATING.length],
      x: Math.random() * 88,
      y: Math.random() * 90,
      size: 10 + Math.random() * 14,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
    }))
  )

  const starsRef = useRef(
    Array.from({ length: 40 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 65,
      s: 0.8 + Math.random() * 1.8,
      d: Math.random() * 3,
      dur: 1.5 + Math.random() * 2,
    }))
  )

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const h = now.getHours().toString().padStart(2, '0')
      const m = now.getMinutes().toString().padStart(2, '0')
      setTime(`${h}:${m}`)
      const days = ['Ням','Дав','Мяг','Лха','Пүр','Баа','Бям']
      setDateStr(`${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getDate()).padStart(2,'0')} · ${days[now.getDay()]} гараг`)
    }
    update()
    const t = setInterval(update, 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    if (pin.length === 6) {
      if (pin === correctPin) {
        setTimeout(() => onSuccess(), 300)
      } else {
        setShake(true)
        setTimeout(() => { setShake(false); setPin('') }, 600)
      }
    }
  }, [pin])

  const showPin = () => setPinVisible(true)

  const handleKey = (key: string) => {
    if (key === '') return
    if (key === 'X') {
      if (pin.length > 0) setPin(p => p.slice(0, -1))
      return
    }
    if (pin.length < 6) setPin(p => p + key)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return
    const dy = touchStartY.current - e.changedTouches[0].clientY
    if (dy > 40) showPin()
    touchStartY.current = null
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100dvh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '40px',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(160deg, #1a0533 0%, #2d1b69 40%, #4a1560 70%, #1a0533 100%)',
      }} />

      {/* Stars */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
        {starsRef.current.map((star, i) => (
          <circle key={i} cx={`${star.x}%`} cy={`${star.y}%`} r={star.s} fill="white">
            <animate attributeName="opacity" values="0.15;0.9;0.15"
              dur={`${star.dur}s`} begin={`${star.d}s`} repeatCount="indefinite"/>
          </circle>
        ))}
      </svg>

      {/* Floating emojis */}
      {floats.map(f => (
        <span key={f.id} style={{
          position: 'absolute',
          left: `${f.x}%`,
          top: `${f.y}%`,
          fontSize: `${f.size}px`,
          opacity: 0.22,
          animation: `floatEM ${f.duration}s ease-in-out ${f.delay}s infinite`,
          pointerEvents: 'none',
          zIndex: 1,
        }}>
          {f.emoji}
        </span>
      ))}

      {/* ── LOCK SCREEN (pin хаагдсан үед) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '60px', paddingBottom: '48px',
        zIndex: 2,
        opacity: pinVisible ? 0 : 1,
        pointerEvents: pinVisible ? 'none' : 'auto',
        transition: 'opacity 0.35s ease',
      }}>
        {/* Time */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '76px',
            fontWeight: 300,
            color: '#fff',
            lineHeight: 1,
            letterSpacing: '2px',
            textShadow: '0 0 30px rgba(200,130,255,0.6)',
          }}>
            {time}
          </div>
          <div style={{
            fontSize: '13px',
            color: 'rgba(255,200,235,0.65)',
            letterSpacing: '1.5px',
            marginTop: '10px',
            fontWeight: 300,
          }}>
            {dateStr}
          </div>
        </div>

        {/* Heart */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '52px', animation: 'heartPulse 1.8s ease-in-out infinite' }}></div>
          <div style={{
            fontFamily: 'Georgia, serif',
            fontSize: '19px',
            color: '#e8b4ff',
            marginTop: '10px',
            letterSpacing: '0.5px',
          }}>
          </div>
        </div>

        {/* Notification card — дарахад PIN гарна */}
        <div
          onClick={showPin}
          style={{
            width: 'calc(100% - 48px)',
            maxWidth: '340px',
            background: 'rgba(255,255,255,0.07)',
            border: '0.5px solid rgba(200,150,255,0.35)',
            borderRadius: '18px',
            padding: '14px 16px',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>💌</span>
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#fff', marginBottom: '3px' }}>
                Төрсөн өдрийн мэнд хүргэе!
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255,200,235,0.7)' }}>
                
              </div>
            </div>
          </div>
        </div>

        {/* Swipe hint */}
        <div style={{ textAlign: 'center', color: 'rgba(255,200,235,0.4)', fontSize: '12px', letterSpacing: '1px' }}>
          <div style={{ animation: 'bounceUp 1.8s ease-in-out infinite', fontSize: '16px', marginBottom: '4px' }}>↑</div>
          дээш шудрах
        </div>
      </div>

      {/* ── PIN SCREEN (slideup) ── */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'space-between',
        paddingTop: '80px', paddingBottom: '40px',
        zIndex: 3,
        transform: pinVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.45s cubic-bezier(0.32, 0.72, 0, 1)',
      }}>
        {/* Title */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '52px', marginBottom: '12px' }}></div>
          <div style={{ fontSize: '17px', color: '#fff', fontWeight: 400, letterSpacing: '0.5px' }}>
            Нууц кодоо оруулаарай
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,200,235,0.5)', marginTop: '6px' }}>
          </div>
        </div>

        {/* PIN dots */}
        <div style={{
          display: 'flex', gap: '18px',
          animation: shake ? 'shakeX 0.5s ease' : 'none',
        }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} style={{
              width: '13px', height: '13px',
              borderRadius: '50%',
              border: '1.5px solid rgba(210,150,255,0.7)',
              background: i < pin.length ? 'linear-gradient(135deg, #c77dff, #e040fb)' : 'transparent',
              transition: 'background 0.15s ease',
              boxShadow: i < pin.length ? '0 0 8px rgba(200,100,255,0.6)' : 'none',
            }} />
          ))}
        </div>

        {/* Keypad */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '10px',
          width: 'min(300px, 85vw)',
        }}>
          {KEYS.map((key, i) => {
            const isX = key === 'X'
            const isEmpty = key === ''
            const disabled = isX && pin.length === 0
            return (
              <button
                key={i}
                onClick={() => !disabled && handleKey(key)}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  borderRadius: '50%',
                  border: isEmpty ? 'none' : '0.5px solid rgba(200,150,255,0.2)',
                  background: isEmpty ? 'transparent' : 'rgba(255,255,255,0.07)',
                  color: disabled ? 'rgba(255,255,255,0.15)' : '#fff',
                  fontSize: isX ? '20px' : '26px',
                  fontWeight: 300,
                  cursor: isEmpty || disabled ? 'default' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  outline: 'none',
                  WebkitTapHighlightColor: 'transparent',
                  transition: 'background 0.1s, transform 0.1s, color 0.2s',
                  margin: '0 auto',
                  maxWidth: '82px',
                }}
                onPointerDown={e => {
                  if (isEmpty || disabled) return
                  const t = e.currentTarget
                  t.style.background = 'rgba(200,120,255,0.25)'
                  t.style.transform = 'scale(0.92)'
                }}
                onPointerUp={e => {
                  if (isEmpty) return
                  const t = e.currentTarget
                  setTimeout(() => {
                    t.style.background = 'rgba(255,255,255,0.07)'
                    t.style.transform = 'scale(1)'
                  }, 120)
                }}
              >
                {key}
              </button>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes floatEM {
          0%, 100% { transform: translateY(0px) rotate(-8deg); }
          50% { transform: translateY(-14px) rotate(8deg); }
        }
        @keyframes heartPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes shakeX {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-8px); }
          80% { transform: translateX(8px); }
        }
        @keyframes bounceUp {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 0.9; }
        }
      `}</style>
    </div>
  )
}