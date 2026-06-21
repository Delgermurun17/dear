import { useState } from 'react'
import PinScreen from './components/PinScreen'
import BirthdayReveal from './components/BirthdayReveal'
import LetterScreen from './components/LetterScreen'
import CakeScreen from './components/CakeScreen'

// ✏️ ЭНД НУУЦ ҮГ ТОХИРУУЛ
const SECRET_PIN = '050817'

type Screen = 'pin' | 'reveal' | 'letter' | 'cake'

export default function App() {
  const [screen, setScreen] = useState<Screen>('pin')

  return (
    <div style={{ width: '100%', height: '100dvh', position: 'relative' }}>
      {screen === 'pin' && (
        <PinScreen
          correctPin={SECRET_PIN}
          onSuccess={() => setScreen('reveal')}
        />
      )}
      {screen === 'reveal' && (
        <BirthdayReveal onDone={() => setScreen('letter')} />
      )}
      {screen === 'letter' && (
        <LetterScreen onNext={() => setScreen('cake')} />
      )}
      {screen === 'cake' && (
        <CakeScreen />
      )}
    </div>
  )
}
