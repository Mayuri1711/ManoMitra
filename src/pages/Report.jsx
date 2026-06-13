import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import BurnoutBadge from '../components/BurnoutBadge.jsx'
import WellnessCard from '../components/WellnessCard.jsx'
import { moodEmojis } from '../data/wellness.js'

const actionCards = [
  { key: 'smallStudyAction', emoji: '📚', label: 'Study Action', color: 'bg-warm-amber/10 border-warm-amber/20' },
  { key: 'familyAction', emoji: '👨‍👩‍👧', label: 'Family Connection', color: 'bg-saffron/10 border-saffron/20' },
  { key: 'spiritualAction', emoji: '🪔', label: 'Reflection', color: 'bg-muted-purple/10 border-muted-purple/20' },
  { key: 'bedtimeAction', emoji: '🌙', label: 'Bedtime Reset', color: 'bg-soft-blue/10 border-soft-blue/20' },
]

export default function Report() {
  const { checkIns } = useApp()
  const navigate = useNavigate()
  const latest = checkIns[0]
  const report = latest?.report

  if (!report) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">📋</div>
        <h2 className="section-title mb-3">No Report Yet</h2>
        <p className="font-body text-text-soft mb-6">Complete a daily check-in to generate your mind report.</p>
        <button onClick={() => navigate('/checkin')} className="btn-primary">📝 Start Check-in</button>
      </div>
    )
  }

  const moodEmoji = moodEmojis[report.emotion] || '🌀'
  const burnoutColors = { High: 'from-rose-warm/5 to-rose-warm/10', Medium: 'from-saffron/5 to-saffron/10', Low: 'from-calm-green/5 to-calm-green/10' }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-3xl mb-2">🧠</div>
        <h1 className="section-title mb-1">Your Mind Report for Today</h1>
        <p className="font-body text-text-soft text-sm">
          {new Date(latest.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Summary card */}
      <div className={`card mb-6 bg-gradient-to-br ${burnoutColors[report.burnoutRisk] || burnoutColors.Medium} animate-slide-up`}>
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl">{moodEmoji}</span>
            <div>
              <p className="font-body text-xs text-text-soft uppercase tracking-wide">Main Emotion</p>
              <p className="font-display font-bold text-xl text-text-main">{report.emotion}</p>
            </div>
          </div>
          <BurnoutBadge risk={report.burnoutRisk} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white/60 rounded-xl p-3">
            <p className="font-body text-xs text-text-soft mb-1">Stress Trigger</p>
            <p className="font-body text-sm font-medium text-text-main">{report.trigger}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <p className="font-body text-xs text-text-soft mb-1">Thought Pattern</p>
            <p className="font-body text-sm font-medium text-text-main">{report.thoughtPattern}</p>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="card mb-6 border-l-4 border-saffron animate-slide-up">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">💡</span>
          <div>
            <h3 className="font-body font-semibold text-text-main mb-2">Emotional Insight</h3>
            <p className="font-body text-text-soft leading-relaxed">{report.insight}</p>
          </div>
        </div>
      </div>

      {/* Wellness Recommendations */}
      {report.recommendations && report.recommendations.length > 0 && (
        <div className="mb-6">
          <h2 className="font-body font-semibold text-text-main mb-4 flex items-center gap-2">
            <span>🌿</span> Personalised Indian Wellness Plan
          </h2>
          <div className="space-y-3">
            {report.recommendations.map((rec, i) => (
              <WellnessCard key={i} stepNumber={i + 1} {...rec} />
            ))}
          </div>
        </div>
      )}

      {/* Action cards */}
      <div className="mb-8">
        <h2 className="font-body font-semibold text-text-main mb-4 flex items-center gap-2">
          <span>✅</span> Today's Action Plan
        </h2>
        <div className="space-y-3">
          {actionCards.map(({ key, emoji, label, color }) => report[key] && (
            <div key={key} className={`border rounded-2xl p-4 ${color} animate-fade-in`}>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{emoji}</span>
                <div>
                  <p className="font-body font-semibold text-text-main text-sm mb-1">{label}</p>
                  <p className="font-body text-text-soft text-sm leading-relaxed">{report[key]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={() => navigate('/dashboard')} className="btn-secondary flex-1 py-3">
          📊 View Dashboard
        </button>
        <button onClick={() => navigate('/checkin')} className="btn-primary flex-1 py-3">
          📝 New Check-in
        </button>
      </div>

      {/* Disclaimer */}
      <p className="font-body text-xs text-text-soft text-center mt-6 leading-relaxed">
        🪔 This report is generated for wellness reflection purposes only. ManoMitra is not a replacement for professional mental health support.
      </p>
    </div>
  )
}
