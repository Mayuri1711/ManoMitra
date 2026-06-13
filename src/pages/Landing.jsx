import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { quotes } from '../data/wellness.js'
import { saveProfile } from '../lib/storage.js'

const features = [
  { emoji: '📝', title: 'Daily Mood & Journal Tracking', desc: 'Log your mood, stress, sleep, and thoughts every day in a safe, private space.' },
  { emoji: '🧠', title: 'AI Stress Pattern Detection', desc: 'Understand your triggers — mock scores, comparison, family pressure — and break the cycle.' },
  { emoji: '🧘', title: 'Yoga & Pranayama Suggestions', desc: 'Science-backed Indian wellness practices tailored to your current emotional state.' },
  { emoji: '🪔', title: 'Spiritual Reflection Mode', desc: 'Inspired by the Gita, Vivekananda, and Kabir. Optional, inclusive, and deeply grounding.' },
  { emoji: '👨‍👩‍👧', title: 'Family Connection Activities', desc: 'Reconnect with your family in ways that reduce pressure and increase warmth.' },
  { emoji: '📊', title: 'Exam Stress Dashboard', desc: 'Track your patterns over time and catch burnout before it catches you.' },
]

const demoStudent = {
  name: 'Arjun (Demo)',
  exam: 'JEE',
  year: '12th Standard',
  mainStressSource: 'Mock test scores',
  preferredWellnessStyle: 'Mixed Indian Wellness Plan',
}

const quote = quotes[Math.floor(Math.random() * quotes.length)]

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
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20"
        style={{ background: 'linear-gradient(160deg, #FDF6EC 0%, #FEF3DA 40%, #F5ECD4 100%)' }}>

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-saffron/10 blur-2xl animate-float" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-calm-green/10 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-muted-purple/10 blur-2xl animate-float" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 max-w-3xl mx-auto animate-fade-in">
          {/* Diya emoji with breathe animation */}
          <div className="text-6xl mb-6 animate-breathe inline-block">🪔</div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-text-main mb-4 leading-tight">
            Mano<span className="text-gradient">Mitra</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-saffron-dark font-medium mb-4">
            AI wellness companion for Indian students facing exam stress.
          </p>

          <p className="font-body text-text-soft text-base md:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            Track your mood, understand your stress triggers, and receive personalized Indian wellness suggestions using journaling, yoga, pranayama, meditation, spiritual reflection, family connection, and study balance.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={() => navigate('/checkin')} className="btn-primary text-base px-8 py-4 shadow-glow">
              📝 Start Daily Check-in
            </button>
            <button onClick={() => navigate('/calm')} className="btn-calm text-base px-8 py-4">
              🌿 Calm Me Now
            </button>
          </div>

          {/* Demo button */}
          <button
            onClick={handleTryDemo}
            className="font-body text-sm text-text-soft hover:text-saffron transition-colors underline underline-offset-4"
          >
            ✨ Try Sample Student (JEE Demo)
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="font-body text-xs text-text-soft">Scroll to explore</span>
          <div className="w-0.5 h-8 bg-gradient-to-b from-saffron/50 to-transparent rounded-full" />
        </div>
      </section>

      {/* Quote Banner */}
      <section className="bg-saffron/10 border-y border-saffron/20 py-6 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display italic text-text-main text-lg md:text-xl mb-1">
            "{quote.text}"
          </p>
          <p className="font-body text-sm text-text-soft">— {quote.author}</p>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title mb-3">Your Complete Wellness Companion</h2>
          <p className="font-body text-text-soft max-w-xl mx-auto">
            ManoMitra combines ancient Indian wisdom with AI to support every dimension of your wellbeing during exam preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div key={i} className="card card-hover cursor-default" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="font-body font-semibold text-text-main mb-2">{f.title}</h3>
              <p className="font-body text-sm text-text-soft leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Wellness pillars */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="section-title mb-3">Indian Wellness, Personalised for You</h2>
            <p className="font-body text-text-soft">Six pillars of support designed for the Indian student experience</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '🧘', label: 'Yoga & Asanas', color: 'bg-calm-green/10 text-calm-green-dark' },
              { emoji: '🌬️', label: 'Pranayama', color: 'bg-soft-blue/10 text-soft-blue' },
              { emoji: '🕉️', label: 'Meditation', color: 'bg-muted-purple/10 text-muted-purple' },
              { emoji: '🪔', label: 'Spiritual Reflection', color: 'bg-saffron/10 text-saffron-dark' },
              { emoji: '👨‍👩‍👧', label: 'Family Connection', color: 'bg-warm-amber/10 text-warm-amber' },
              { emoji: '📚', label: 'Study Reset', color: 'bg-calm-green/10 text-calm-green-dark' },
            ].map((p, i) => (
              <div key={i} className={`${p.color} rounded-2xl p-4 text-center`}>
                <div className="text-2xl mb-2">{p.emoji}</div>
                <p className="font-body font-semibold text-sm">{p.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #FDF6EC 0%, #FEF0D5 100%)' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-4xl mb-4">🙏</div>
          <h2 className="section-title mb-4">Start Your Wellness Journey Today</h2>
          <p className="font-body text-text-soft mb-8 leading-relaxed">
            Your marks are feedback, not your identity. Your effort today is never wasted.
            Let ManoMitra be the caring companion you deserve during this journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/setup')} className="btn-primary px-8 py-4">
              🌟 Set Up My Profile
            </button>
            <button onClick={() => navigate('/checkin')} className="btn-secondary px-8 py-4">
              📝 Start Check-in
            </button>
          </div>
          <p className="font-body text-xs text-text-soft mt-6">
            No account needed · Your data stays on your device · 100% private
          </p>
        </div>
      </section>
    </div>
  )
}
