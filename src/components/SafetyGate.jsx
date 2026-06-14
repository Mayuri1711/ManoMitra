import { useState } from 'react'
import { Link } from 'react-router-dom'
import { setSafetyAck } from '../lib/storage.js'

const points = [
  { emoji: '🧘', text: 'These are gentle, beginner-friendly suggestions — never force a posture or your breath.' },
  { emoji: '🛑', text: 'Stop immediately if you feel pain, dizziness, breathlessness, or discomfort.' },
  { emoji: '🌬️', text: 'Practise pranayama (breathing) on an empty stomach, sitting comfortably.' },
  { emoji: '🩺', text: 'If pregnant, or with a heart/respiratory condition, recent injury or surgery — consult a doctor first.' },
]

export default function SafetyGate({ onAccept }) {
  const [checked, setChecked] = useState(false)

  function handleAccept() {
    if (!checked) return
    setSafetyAck(true)
    onAccept?.()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🪔</div>
          <h2 className="font-display text-2xl text-text-main mb-2">Before You Begin</h2>
          <p className="font-body text-text-soft text-sm leading-relaxed">
            ManoMitra suggests yoga, breathing, and meditation for your wellbeing. Please read these safety points first.
          </p>
        </div>

        <div className="space-y-3 mb-6">
          {points.map((p, i) => (
            <div key={i} className="flex items-start gap-3 bg-cream rounded-2xl p-3">
              <span className="text-lg flex-shrink-0">{p.emoji}</span>
              <p className="font-body text-sm text-text-main leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>

        <label className="flex items-start gap-3 mb-6 cursor-pointer bg-warm-amber/10 border border-warm-amber/30 rounded-2xl p-4">
          <input
            type="checkbox"
            checked={checked}
            onChange={e => setChecked(e.target.checked)}
            className="mt-0.5 accent-saffron w-4 h-4 flex-shrink-0"
          />
          <span className="font-body text-sm text-text-main leading-relaxed">
            I understand these are gentle wellness suggestions, <strong>not medical advice</strong>, and I will stop if I feel unwell.
          </span>
        </label>

        <button
          onClick={handleAccept}
          disabled={!checked}
          className={`btn-primary w-full py-3 ${!checked ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          🌿 Begin Safely
        </button>

        <p className="font-body text-xs text-text-soft text-center mt-4">
          <Link to="/terms" className="underline underline-offset-2 hover:text-saffron-dark">
            Read full Terms &amp; Safety
          </Link>
        </p>
      </div>
    </div>
  )
}
