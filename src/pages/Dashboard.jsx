import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import StressChart from '../components/charts/StressChart.jsx'
import MoodChart from '../components/charts/MoodChart.jsx'
import SleepChart from '../components/charts/SleepChart.jsx'
import BurnoutBadge from '../components/BurnoutBadge.jsx'
import { moodEmojis } from '../data/wellness.js'

function avg(arr, key) {
  if (!arr.length) return 0
  return (arr.reduce((s, c) => s + (c[key] || 0), 0) / arr.length).toFixed(1)
}

function mostCommon(arr, key) {
  const counts = {}
  arr.forEach(c => { counts[c[key]] = (counts[c[key]] || 0) + 1 })
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || '—'
}

function generateWeeklyInsight(checkIns) {
  const recent = checkIns.slice(0, 7)
  if (!recent.length) return null

  const avgStress = avg(recent, 'stressLevel')
  const trigger = mostCommon(recent, 'trigger')
  const mood = mostCommon(recent, 'mood')
  const avgSleep = avg(recent, 'sleepHours')

  let insight = `This week, your average stress level was ${avgStress}/10`
  if (parseFloat(avgStress) >= 7) insight += ` — that's quite high.`
  else if (parseFloat(avgStress) >= 5) insight += ` — moderate, but manageable.`
  else insight += ` — great work keeping stress in check.`

  insight += ` Your most common mood was ${mood}, and your biggest recurring trigger was "${trigger}".`

  if (parseFloat(avgSleep) < 6) {
    insight += ` Your average sleep of ${avgSleep} hours is below the recommended 7–8 hours, which may be amplifying stress and reducing focus.`
  }

  if (/mock|score|test/.test((trigger || '').toLowerCase())) {
    insight += ` Before your next mock test, try 5 minutes of Anulom Vilom and set one process goal (e.g., "I will review 3 topics") instead of only a score goal.`
  } else if (/parent|family|expect/.test((trigger || '').toLowerCase())) {
    insight += ` Consider one honest, gentle conversation with your family this week — not about marks, but about how you're feeling.`
  } else {
    insight += ` Try one 25-minute focused study sprint daily and notice how your stress changes over the coming week.`
  }

  return insight
}

export default function Dashboard() {
  const { checkIns, profile } = useApp()
  const navigate = useNavigate()

  if (!checkIns.length) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="section-title mb-3">Your Dashboard</h2>
        <p className="font-body text-text-soft mb-6">
          Complete your first daily check-in to start seeing your wellness patterns here.
        </p>
        <button onClick={() => navigate('/checkin')} className="btn-primary">📝 Start First Check-in</button>
      </div>
    )
  }

  const avgStress = avg(checkIns, 'stressLevel')
  const avgSleep = avg(checkIns, 'sleepHours')
  const avgStudy = avg(checkIns, 'studyHours')
  const commonMood = mostCommon(checkIns, 'mood')
  const commonTrigger = mostCommon(checkIns, 'trigger')
  const weeklyInsight = generateWeeklyInsight(checkIns)

  const burnoutCounts = { High: 0, Medium: 0, Low: 0 }
  checkIns.forEach(c => { if (c.report?.burnoutRisk) burnoutCounts[c.report.burnoutRisk]++ })
  const dominantBurnout = Object.entries(burnoutCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Low'

  const stats = [
    { label: 'Avg Stress', value: `${avgStress}/10`, emoji: '😰', color: 'text-warm-amber' },
    { label: 'Avg Sleep', value: `${avgSleep}h`, emoji: '🌙', color: 'text-muted-purple' },
    { label: 'Avg Study', value: `${avgStudy}h`, emoji: '📚', color: 'text-soft-blue' },
    { label: 'Check-ins', value: checkIns.length, emoji: '📝', color: 'text-calm-green' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8 animate-fade-in">
        <div>
          <h1 className="section-title mb-1">Your Dashboard</h1>
          <p className="font-body text-text-soft text-sm">
            {profile?.name ? `${profile.name}'s ` : ''}wellness patterns over time
          </p>
        </div>
        <button onClick={() => navigate('/checkin')} className="btn-primary text-sm px-4 py-2">
          + Check-in
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <div key={i} className="card text-center animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="text-2xl mb-1">{s.emoji}</div>
            <div className={`font-display font-bold text-2xl ${s.color} mb-1`}>{s.value}</div>
            <div className="font-body text-xs text-text-soft">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Burnout + common patterns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card text-center">
          <p className="font-body text-xs text-text-soft mb-2">Burnout Trend</p>
          <BurnoutBadge risk={dominantBurnout} />
        </div>
        <div className="card text-center">
          <p className="font-body text-xs text-text-soft mb-2">Most Common Mood</p>
          <p className="font-body font-semibold text-text-main">
            {moodEmojis[commonMood]} {commonMood}
          </p>
        </div>
        <div className="card text-center">
          <p className="font-body text-xs text-text-soft mb-2">Top Trigger</p>
          <p className="font-body font-semibold text-text-main text-sm leading-tight">{commonTrigger}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <StressChart checkIns={checkIns} />
        <MoodChart checkIns={checkIns} />
      </div>
      <div className="mb-8">
        <SleepChart checkIns={checkIns} />
      </div>

      {/* Weekly insight */}
      {weeklyInsight && (
        <div className="card border-l-4 border-calm-green mb-8 animate-fade-in">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🌿</span>
            <div>
              <h3 className="font-body font-semibold text-text-main mb-2">Weekly Wellness Insight</h3>
              <p className="font-body text-text-soft text-sm leading-relaxed">{weeklyInsight}</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent check-ins */}
      <div>
        <h2 className="font-body font-semibold text-text-main mb-4">Recent Check-ins</h2>
        <div className="space-y-3">
          {checkIns.slice(0, 7).map((c, i) => (
            <div key={c.id} className="card flex items-center gap-4 animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
              <span className="text-2xl flex-shrink-0">{moodEmojis[c.mood] || '🌀'}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-body font-medium text-text-main text-sm">{c.mood}</p>
                  <span className="text-text-soft/40">·</span>
                  <p className="font-body text-xs text-text-soft truncate">{c.trigger}</p>
                </div>
                <p className="font-body text-xs text-text-soft">
                  {new Date(c.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-body text-sm font-semibold ${c.stressLevel >= 7 ? 'text-rose-warm' : c.stressLevel >= 5 ? 'text-saffron' : 'text-calm-green'}`}>
                  {c.stressLevel}/10
                </span>
                {c.report?.burnoutRisk && <BurnoutBadge risk={c.report.burnoutRisk} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
