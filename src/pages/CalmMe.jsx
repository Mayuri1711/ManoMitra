import { useState } from 'react'
import { calmPlans } from '../data/wellness.js'
import CrisisAlert from '../components/CrisisAlert.jsx'
import SafetyNote from '../components/SafetyNote.jsx'
import SafetyGate from '../components/SafetyGate.jsx'
import { getSafetyAck } from '../lib/storage.js'

const calmOptions = [
  { key: 'panicking', emoji: '😱', label: 'I am panicking', color: 'border-soft-blue/40 hover:bg-soft-blue/10' },
  { key: 'overthinking', emoji: '🌀', label: 'I am overthinking', color: 'border-muted-purple/40 hover:bg-muted-purple/10' },
  { key: 'crying', emoji: '😢', label: 'I feel like crying', color: 'border-soft-blue/40 hover:bg-soft-blue/10' },
  { key: 'angry', emoji: '😤', label: 'I feel angry', color: 'border-warm-amber/40 hover:bg-warm-amber/10' },
  { key: 'unfocused', emoji: '😵', label: 'I cannot focus', color: 'border-saffron/40 hover:bg-saffron/10' },
  { key: 'burnout', emoji: '🪫', label: 'I feel burned out', color: 'border-calm-green/40 hover:bg-calm-green/10' },
  { key: 'sleep', emoji: '😴', label: 'I cannot sleep', color: 'border-muted-purple/40 hover:bg-muted-purple/10' },
  { key: 'hopeless', emoji: '😞', label: 'I feel hopeless', color: 'border-gray-300 hover:bg-gray-50' },
]

const colorMap = {
  'soft-blue': 'text-soft-blue bg-soft-blue/10 border-soft-blue/20',
  'muted-purple': 'text-muted-purple bg-muted-purple/10 border-muted-purple/20',
  'warm-amber': 'text-warm-amber bg-warm-amber/10 border-warm-amber/20',
  'saffron': 'text-saffron-dark bg-saffron/10 border-saffron/20',
  'calm-green': 'text-calm-green-dark bg-calm-green/10 border-calm-green/20',
}

export default function CalmMe() {
  const [selected, setSelected] = useState(null)
  const [showCrisis, setShowCrisis] = useState(false)
  const [safetyAck, setSafetyAckState] = useState(getSafetyAck())

  const plan = selected ? calmPlans[selected] : null

  function handleSelect(key) {
    setSelected(key)
    if (key === 'hopeless') setShowCrisis(true)
    else setShowCrisis(false)
    setTimeout(() => {
      document.getElementById('calm-plan')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {showCrisis && <CrisisAlert onDismiss={() => setShowCrisis(false)} />}
      {!safetyAck && plan && !showCrisis && <SafetyGate onAccept={() => setSafetyAckState(true)} />}

      {/* Hero */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-calm-green/20 flex items-center justify-center mx-auto mb-4 animate-breathe">
          <span className="text-4xl">🌿</span>
        </div>
        <h1 className="section-title mb-2">Calm Me Now</h1>
        <p className="font-body text-text-soft">
          Tell ManoMitra how you're feeling right now. You'll get a personalised 2-minute calm plan instantly.
        </p>
      </div>

      {/* State selector */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {calmOptions.map(({ key, emoji, label, color }) => (
          <button
            key={key}
            onClick={() => handleSelect(key)}
            className={`flex items-center gap-3 p-4 rounded-2xl border-2 font-body font-medium text-sm text-text-main transition-all ${color} ${selected === key ? 'border-saffron bg-saffron/10 shadow-card scale-105' : ''}`}
          >
            <span className="text-2xl flex-shrink-0">{emoji}</span>
            <span className="text-left leading-tight">{label}</span>
          </button>
        ))}
      </div>

      {/* Calm Plan */}
      {plan && !showCrisis && (
        <div id="calm-plan" className="animate-slide-up">
          <div className="card mb-6">
            <div className="text-center mb-6">
              <div className={`inline-block px-4 py-1 rounded-full text-sm font-body font-semibold mb-2 border ${colorMap[plan.color] || colorMap['saffron']}`}>
                {plan.subtitle}
              </div>
              <h2 className="font-display text-2xl font-bold text-text-main">{plan.title}</h2>
            </div>

            {/* Breathing animation */}
            <div className="flex justify-center mb-8">
              <div className="relative flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-calm-green/20 animate-breathe" />
                <div className="absolute w-16 h-16 rounded-full bg-calm-green/30 animate-breathe" style={{ animationDelay: '0.5s' }} />
                <div className="absolute text-3xl animate-breathe" style={{ animationDelay: '1s' }}>🌿</div>
              </div>
            </div>

            <div className="space-y-4">
              {plan.steps.map((step, i) => (
                <div key={i} className="flex items-start gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron text-white font-body font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </div>
                  <div className="flex items-start gap-2 flex-1">
                    <span className="text-lg flex-shrink-0 mt-0.5">{step.emoji}</span>
                    <p className="font-body text-text-main text-sm leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <SafetyNote compact />
            </div>
          </div>

          {/* Affirming message */}
          <div className="bg-saffron/10 rounded-2xl p-4 mb-6 text-center border border-saffron/20">
            <p className="font-display italic text-text-main text-base">
              "You only need to handle this one moment. Not the whole exam. Just this moment."
            </p>
          </div>

          {/* Reset */}
          <button
            onClick={() => setSelected(null)}
            className="btn-secondary w-full py-3"
          >
            🔄 Choose a Different Feeling
          </button>
        </div>
      )}

      {/* If nothing selected, show encouragement */}
      {!selected && (
        <div className="text-center py-8 text-text-soft">
          <div className="text-3xl mb-3 animate-float">☝️</div>
          <p className="font-body text-sm">Select how you're feeling above to get your personalised calm plan</p>
        </div>
      )}
    </div>
  )
}
