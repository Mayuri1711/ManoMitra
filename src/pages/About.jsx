import { Link, useNavigate } from 'react-router-dom'

const features = [
  { emoji: '📝', title: 'Daily Check-in', body: 'A gentle daily ritual to log your mood, stress, energy, sleep, and study hours — plus a private journal that only you can see.' },
  { emoji: '🧠', title: 'AI Mind Report', body: 'A warm, non-clinical reflection of your day — your main emotion, stress trigger, thought pattern, and a personalised Indian wellness plan.' },
  { emoji: '🌿', title: 'Calm Me Now', body: 'Feeling panicked, overwhelmed, or unable to focus? Get an instant 2-minute calm plan with guided breathing — right when you need it.' },
  { emoji: '📊', title: 'Wellness Dashboard', body: 'See your mood, stress, and sleep trends over time, so you can notice patterns and celebrate small progress.' },
  { emoji: '💬', title: 'Talk to ManoMitra', body: 'A caring AI companion that listens like an elder sibling — never diagnosing, always gentle, always pointing you toward calm.' },
  { emoji: '🪔', title: 'Indian-Style Wellness', body: 'Yoga, pranayama, meditation, spiritual reflection, family connection, and study balance — rooted in Indian wellness traditions.' },
]

const beliefs = [
  'Marks are important, but your mind matters more.',
  'Rest is not a reward — it is part of the work.',
  'You are not alone, and asking for help is strength.',
  'Small, gentle steps create lasting calm.',
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-10 animate-fade-in">
        <div className="w-20 h-20 rounded-full bg-saffron/15 flex items-center justify-center mx-auto mb-4 animate-breathe">
          <span className="text-4xl">🪔</span>
        </div>
        <h1 className="section-title mb-2">About ManoMitra</h1>
        <p className="font-body text-text-soft leading-relaxed">
          Your AI companion for a calm mind, focused study, and Indian-style wellness.
        </p>
      </div>

      {/* Mission */}
      <div className="card mb-6 animate-slide-up">
        <h2 className="font-body font-semibold text-text-main mb-2 flex items-center gap-2">
          <span>🌱</span> Why ManoMitra Exists
        </h2>
        <p className="font-body text-sm text-text-soft leading-relaxed mb-3">
          Every year, millions of Indian students prepare for high-pressure exams like NEET, JEE, CUET, CAT,
          GATE, UPSC, and the Board Exams. The stress is real — long hours, comparison, family expectations,
          and very little space to simply breathe.
        </p>
        <p className="font-body text-sm text-text-soft leading-relaxed">
          ManoMitra (literally <em>"friend of the mind"</em>) was built to be that gentle friend in your corner —
          a calm, judgment-free space to check in with yourself, understand your feelings, and practise simple,
          Indian-rooted wellness that fits into a busy study day.
        </p>
      </div>

      {/* What it does */}
      <h2 className="font-body font-semibold text-text-main mb-4 flex items-center gap-2">
        <span>✨</span> What ManoMitra Offers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 animate-slide-up">
        {features.map((f, i) => (
          <div key={i} className="card">
            <div className="text-2xl mb-2">{f.emoji}</div>
            <h3 className="font-body font-semibold text-text-main text-sm mb-1">{f.title}</h3>
            <p className="font-body text-xs text-text-soft leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>

      {/* Beliefs */}
      <div className="card mb-6 bg-calm-green/5 border border-calm-green/20">
        <h2 className="font-body font-semibold text-text-main mb-3 flex items-center gap-2">
          <span>💚</span> What We Believe
        </h2>
        <ul className="space-y-2">
          {beliefs.map((b, i) => (
            <li key={i} className="flex items-start gap-2 font-body text-sm text-text-soft">
              <span className="text-calm-green-dark flex-shrink-0">🌿</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Privacy */}
      <div className="card mb-6">
        <h2 className="font-body font-semibold text-text-main mb-2 flex items-center gap-2">
          <span>🔒</span> Your Privacy
        </h2>
        <p className="font-body text-sm text-text-soft leading-relaxed">
          Everything you write stays on your own device. Your check-ins and journal are saved only in your
          browser's local storage — there is no account, no server, and no one else can read them.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="card mb-8 bg-saffron/5 border border-saffron/20">
        <p className="font-body text-sm text-text-soft leading-relaxed">
          🪔 ManoMitra is a wellness and reflection companion for educational purposes only. It is{' '}
          <strong className="text-text-main">not a replacement for professional mental health support</strong>.
          Please read our{' '}
          <Link to="/terms" className="text-saffron-dark underline underline-offset-2 hover:text-saffron">
            Terms &amp; Safety
          </Link>{' '}
          before following any wellness suggestion.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={() => navigate('/checkin')} className="btn-primary flex-1 py-3">
          📝 Start Daily Check-in
        </button>
        <button onClick={() => navigate('/calm')} className="btn-secondary flex-1 py-3">
          🌿 Calm Me Now
        </button>
      </div>
    </div>
  )
}
