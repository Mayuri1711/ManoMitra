import { Link } from 'react-router-dom'

export default function SafetyNote({ compact = false }) {
  return (
    <div className={`bg-warm-amber/10 border border-warm-amber/30 rounded-2xl ${compact ? 'p-3' : 'p-4'}`}>
      <div className="flex items-start gap-3">
        <span className="text-lg flex-shrink-0">⚠️</span>
        <div className="flex-1">
          <p className="font-body font-semibold text-warm-amber text-sm mb-1">
            Practise gently and safely
          </p>
          <p className="font-body text-xs text-text-soft leading-relaxed">
            Never force a posture or your breath. <strong>Stop immediately if you feel pain, dizziness, or breathlessness.</strong> Do pranayama on an empty stomach, and asanas on a soft, non-slip surface.
          </p>
          {!compact && (
            <p className="font-body text-xs text-text-soft leading-relaxed mt-2">
              If you are pregnant, or have a heart/respiratory condition, recent injury, or surgery, please consult a doctor before practising. These are gentle suggestions, not medical advice.{' '}
              <Link to="/terms" className="text-warm-amber underline underline-offset-2 hover:text-saffron-dark">
                Read full Terms &amp; Safety
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
