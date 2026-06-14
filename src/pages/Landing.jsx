import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { quotes } from '../data/wellness.js'
import { saveProfile } from '../lib/storage.js'

const demoStudent = {
  name: 'Arjun (Demo)',
  exam: 'JEE',
  year: '12th Standard',
  mainStressSource: 'Mock test scores',
  preferredWellnessStyle: 'Mixed Indian Wellness Plan',
}

const quote = quotes[Math.floor(Math.random() * quotes.length)]

const pillars = [
  { emoji: '🧘', label: 'Yoga' },
  { emoji: '🌬️', label: 'Breath' },
  { emoji: '🕉️', label: 'Meditation' },
  { emoji: '🪔', label: 'Reflection' },
  { emoji: '👨‍👩‍👧', label: 'Family' },
  { emoji: '📚', label: 'Study' },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  if (h < 21) return 'Good evening'
  return 'Good night'
}

export default function Landing() {
  const navigate = useNavigate()
  const { setProfile } = useApp()

  function handleTryDemo() {
    saveProfile(demoStudent)
    setProfile(demoStudent)
    navigate('/checkin?demo=true')
  }

  return (
    <div className="overflow-hidden">
      {/* Calm hero */}
      <section
        className="relative min-h-[calc(100vh-104px)] flex flex-col items-center justify-center text-center px-6 py-16"
        style={{ background: 'linear-gradient(170deg, #FDF6EC 0%, #F6F3E8 55%, #EEF4ED 100%)' }}
      >
        {/* Soft gentle orbs */}
        <div className="absolute top-24 -left-10 w-56 h-56 rounded-full bg-calm-green/10 blur-3xl animate-float" />
        <div className="absolute bottom-16 -right-10 w-64 h-64 rounded-full bg-saffron/10 blur-3xl animate-float" style={{ animationDelay: '3s' }} />

        <div className="relative z-10 max-w-xl mx-auto animate-fade-in">
          {/* Breathing diya */}
          <div className="text-7xl mb-8 animate-breathe inline-block">🪔</div>

          <h1 className="font-display text-5xl md:text-6xl font-bold text-text-main mb-5 leading-tight">
            Mano<span className="text-gradient">Mitra</span>
          </h1>

          <p className="font-body text-text-soft text-lg md:text-xl leading-relaxed mb-10">
            {getGreeting()}. Take a slow breath —<br className="hidden sm:block" /> you're here, and that's enough. 🌿
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/checkin')} className="btn-primary text-base px-8 py-4 shadow-glow">
              📝 Start Daily Check-in
            </button>
            <button onClick={() => navigate('/calm')} className="btn-calm text-base px-8 py-4">
              🌿 Calm Me Now
            </button>
          </div>

          {/* Demo link */}
          <button
            onClick={handleTryDemo}
            className="block mx-auto mt-8 font-body text-sm text-text-soft hover:text-saffron transition-colors underline underline-offset-4"
          >
            ✨ Try a Sample Student
          </button>
        </div>
      </section>

      {/* Gentle quote */}
      <section className="px-6 py-14 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-display italic text-text-main text-xl md:text-2xl leading-relaxed mb-3">
            "{quote.text}"
          </p>
          <p className="font-body text-sm text-text-soft">— {quote.author}</p>
        </div>
      </section>

      {/* Minimal wellness pillars */}
      <section className="px-6 py-14" style={{ background: 'linear-gradient(135deg, #FDF6EC 0%, #EEF4ED 100%)' }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
            {pillars.map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-2 animate-fade-in" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="w-14 h-14 rounded-full bg-white shadow-card flex items-center justify-center text-2xl">
                  {p.emoji}
                </div>
                <span className="font-body text-xs text-text-soft font-medium">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
