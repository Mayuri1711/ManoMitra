import { useNavigate } from 'react-router-dom'

const sections = [
  {
    emoji: '🩺',
    title: 'Not Medical Advice',
    body: 'ManoMitra is a wellness and reflection companion for educational purposes only. It does not provide medical, psychological, or therapeutic advice, diagnosis, or treatment. Nothing in this app should be used as a substitute for consultation with a qualified doctor, mental health professional, or certified yoga instructor.',
  },
  {
    emoji: '🧘',
    title: 'Physical Practice Safety',
    body: 'All yoga, pranayama (breathing), and meditation suggestions are gentle and beginner-oriented. Always practise slowly and never force a posture or your breath. Stop immediately if you experience pain, dizziness, lightheadedness, breathlessness, nausea, or any discomfort. Practise asanas on a soft, non-slip surface, and pranayama while seated comfortably on an empty stomach.',
  },
  {
    emoji: '⚠️',
    title: 'Contraindications — Consult a Doctor First',
    body: 'Please speak to a qualified doctor before practising if any of the following apply to you: pregnancy; high or low blood pressure; heart conditions; respiratory conditions such as asthma; epilepsy; recent surgery; any injury (especially to the back, neck, knees, or wrists); vertigo; or any chronic medical condition. Certain breathing practices and postures may not be suitable for these conditions.',
  },
  {
    emoji: '🌬️',
    title: 'A Note on Breathing Practices',
    body: 'Pranayama techniques such as Anulom Vilom and Bhramari should feel calm and natural. If you feel dizzy or short of breath, return to normal breathing immediately and rest. Never hold your breath to the point of strain. Beginners should keep sessions short.',
  },
  {
    emoji: '🧠',
    title: 'A Note on Meditation',
    body: 'For most people meditation is calming, but in rare cases it can surface difficult emotions or memories. If a practice ever feels distressing, gently stop and ground yourself, and consider speaking to a mental health professional.',
  },
  {
    emoji: '🙏',
    title: 'Assumption of Risk',
    body: 'By using ManoMitra and following its suggestions, you acknowledge that you do so voluntarily and at your own risk, and that you are responsible for practising within your own physical and mental limits. ManoMitra and its creators are not liable for any injury, harm, or adverse effect resulting from the use of this app or its suggestions.',
  },
  {
    emoji: '💚',
    title: 'Mental Health Disclaimer',
    body: 'ManoMitra is not a replacement for professional mental health support. If you are in crisis, experiencing thoughts of self-harm, or in immediate danger, please reach out to a trusted adult, counselor, or emergency service right away.',
  },
]

export default function Terms() {
  const navigate = useNavigate()

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-3xl mb-2">📜</div>
        <h1 className="section-title mb-2">Terms &amp; Safety</h1>
        <p className="font-body text-text-soft text-sm">
          Please read this carefully before following any wellness suggestion.
        </p>
      </div>

      <div className="space-y-4 animate-slide-up">
        {sections.map((s, i) => (
          <div key={i} className="card">
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{s.emoji}</span>
              <div>
                <h2 className="font-body font-semibold text-text-main mb-1">{s.title}</h2>
                <p className="font-body text-sm text-text-soft leading-relaxed">{s.body}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Helplines */}
        <div className="card bg-calm-green/5 border border-calm-green/20">
          <h2 className="font-body font-semibold text-text-main mb-3 flex items-center gap-2">
            <span>📞</span> India Crisis Helplines
          </h2>
          <div className="space-y-1 font-body text-sm text-text-soft">
            <p>iCall: <strong className="text-text-main">9152987821</strong></p>
            <p>Vandrevala Foundation: <strong className="text-text-main">1800-2333-330</strong> (24/7, free)</p>
            <p>NIMHANS: <strong className="text-text-main">080-46110007</strong></p>
          </div>
        </div>
      </div>

      <div className="text-center mt-8">
        <button onClick={() => navigate(-1)} className="btn-secondary px-6 py-3">
          ← Go Back
        </button>
      </div>
    </div>
  )
}
