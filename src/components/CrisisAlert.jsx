import { useState, useEffect } from 'react'

export default function CrisisAlert({ onDismiss }) {
  const [canDismiss, setCanDismiss] = useState(false)
  const [countdown, setCountdown] = useState(8)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) {
          clearInterval(timer)
          setCanDismiss(true)
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl animate-slide-up">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🤝</div>
          <h2 className="font-display text-2xl text-text-main mb-2">You Are Not Alone</h2>
          <p className="font-body text-text-soft text-sm leading-relaxed">
            I'm really sorry you're feeling this much pain right now. What you're feeling is real, and you deserve immediate support.
          </p>
        </div>

        {/* Main message */}
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 mb-6">
          <p className="font-body text-sm text-rose-800 leading-relaxed">
            <strong>Please reach out to a trusted adult, parent, teacher, or counselor right now.</strong> You do not have to face this alone. If you are in immediate danger, please call your local emergency services or crisis helpline immediately.
          </p>
        </div>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => window.open('tel:iCall', '_self')}
            className="flex flex-col items-center gap-1 bg-calm-green/10 hover:bg-calm-green/20 border border-calm-green/30 rounded-2xl p-4 transition-all"
          >
            <span className="text-2xl">📞</span>
            <span className="font-body font-semibold text-calm-green-dark text-sm">Call Trusted Contact</span>
          </button>
          <button
            onClick={() => window.open('tel:iCall', '_self')}
            className="flex flex-col items-center gap-1 bg-soft-blue/10 hover:bg-soft-blue/20 border border-soft-blue/30 rounded-2xl p-4 transition-all"
          >
            <span className="text-2xl">👩‍🏫</span>
            <span className="font-body font-semibold text-soft-blue text-sm">Talk to Parent/Teacher</span>
          </button>
          <button
            onClick={() => window.open('https://icallhelpline.org/', '_blank')}
            className="flex flex-col items-center gap-1 bg-muted-purple/10 hover:bg-muted-purple/20 border border-muted-purple/30 rounded-2xl p-4 transition-all"
          >
            <span className="text-2xl">🆘</span>
            <span className="font-body font-semibold text-muted-purple text-sm">Crisis Support (iCall)</span>
          </button>
          <button
            className="flex flex-col items-center gap-1 bg-saffron/10 hover:bg-saffron/20 border border-saffron/30 rounded-2xl p-4 transition-all"
          >
            <span className="text-2xl">🏃</span>
            <span className="font-body font-semibold text-saffron-dark text-sm">Move Near Someone Now</span>
          </button>
        </div>

        {/* Helplines */}
        <div className="bg-cream rounded-2xl p-3 mb-4">
          <p className="font-body text-xs text-text-soft text-center leading-relaxed">
            <strong className="text-text-main">India Crisis Helplines:</strong><br />
            iCall: 9152987821 &nbsp;|&nbsp; Vandrevala Foundation: 1860-2662-345 (24/7)<br />
            NIMHANS: 080-46110007 &nbsp;|&nbsp; Vandrevala: 1800-2333-330 (free, 24/7)
          </p>
        </div>

        {/* Disclaimer */}
        <p className="font-body text-xs text-text-soft text-center mb-4">
          ManoMitra is not a replacement for professional mental health support. Please seek help from a qualified professional.
        </p>

        {/* Dismiss */}
        {onDismiss && (
          <div className="text-center">
            <button
              onClick={onDismiss}
              disabled={!canDismiss}
              className={`font-body text-sm transition-all ${canDismiss ? 'text-text-soft hover:text-text-main cursor-pointer underline' : 'text-text-soft/40 cursor-not-allowed'}`}
            >
              {canDismiss ? 'I am safe and with someone' : `I am safe (${countdown}s)`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
