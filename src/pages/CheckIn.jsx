import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'
import { crisisDetect } from '../lib/crisisDetect.js'
import { generateAIReport } from '../lib/openaiClient.js'
import MoodSelector from '../components/MoodSelector.jsx'
import SliderInput from '../components/SliderInput.jsx'
import CrisisAlert from '../components/CrisisAlert.jsx'
import { v4 as uuidv4 } from 'uuid'

const triggers = [
  'Mock test score', 'Upcoming exam', 'Parent expectations',
  'Syllabus backlog', 'Comparison with others', 'Social media distraction',
  'Lack of confidence', 'Coaching pressure', 'Health / Tiredness',
  'Financial / Family tension', 'Relationship / Friend issues', 'Other',
]

const DEMO_DATA = {
  mood: 'Anxious',
  stressLevel: 8,
  energyLevel: 3,
  sleepHours: 5,
  studyHours: 7,
  trigger: 'Mock test score',
  journal: 'I studied so much but my mock score is still low. Everyone else seems ahead of me. I feel like I will disappoint my parents. I don\'t know if I am cut out for this.',
}

export default function CheckIn() {
  const { profile, addCheckIn, setIsLoading } = useApp()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isDemo = searchParams.get('demo') === 'true'

  const [form, setForm] = useState({
    mood: '',
    stressLevel: 5,
    energyLevel: 5,
    sleepHours: 6,
    studyHours: 4,
    trigger: '',
    journal: '',
  })
  const [crisis, setCrisis] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isDemo) {
      setForm(DEMO_DATA)
    }
  }, [isDemo])

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (field === 'journal') {
      const result = crisisDetect(value)
      if (result.isCrisis) setCrisis(result)
      else setCrisis(null)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.mood) { setError('Please select your mood'); return }
    if (!form.trigger) { setError('Please select a stress trigger'); return }
    setError('')
    setLoading(true)
    setIsLoading(true)

    try {
      const report = await generateAIReport(form, profile)
      const checkIn = {
        id: uuidv4(),
        date: new Date().toISOString(),
        ...form,
        report,
      }
      addCheckIn(checkIn)
      navigate('/report')
    } catch (err) {
      console.error(err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
      setIsLoading(false)
    }
  }

  function loadDemo() {
    setForm(DEMO_DATA)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {crisis && <CrisisAlert onDismiss={() => setCrisis(null)} />}

      <div className="text-center mb-8 animate-fade-in">
        <div className="text-3xl mb-2">📝</div>
        <h1 className="section-title mb-2">Daily Check-in</h1>
        <p className="font-body text-text-soft text-sm">
          {profile?.name ? `Hello, ${profile.name}! ` : ''}How are you doing today?
        </p>
        {!isDemo && (
          <button onClick={loadDemo} className="mt-2 font-body text-xs text-saffron hover:text-saffron-dark underline underline-offset-2 transition-colors">
            ✨ Try Sample Student (JEE Demo)
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 animate-slide-up">
        {/* Mood */}
        <div className="card">
          <h2 className="font-body font-semibold text-text-main mb-4">A. How are you feeling right now?</h2>
          <MoodSelector value={form.mood} onChange={v => update('mood', v)} />
        </div>

        {/* Sliders */}
        <div className="card space-y-6">
          <h2 className="font-body font-semibold text-text-main">B–C. Stress & Energy</h2>
          <SliderInput
            label="Stress Level"
            value={form.stressLevel}
            onChange={v => update('stressLevel', v)}
            leftLabel="Very calm"
            rightLabel="Extremely stressed"
          />
          <SliderInput
            label="Energy Level"
            value={form.energyLevel}
            onChange={v => update('energyLevel', v)}
            leftLabel="Exhausted"
            rightLabel="Full energy"
          />
        </div>

        {/* Sleep & Study hours */}
        <div className="card">
          <h2 className="font-body font-semibold text-text-main mb-4">D–E. Sleep & Study Hours</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-body font-medium text-text-main text-sm block mb-2">Sleep Hours</label>
              <input
                type="number"
                min={0} max={12} step={0.5}
                value={form.sleepHours}
                onChange={e => update('sleepHours', Number(e.target.value))}
                className="input-field"
                aria-label="Sleep hours"
              />
            </div>
            <div>
              <label className="font-body font-medium text-text-main text-sm block mb-2">Study Hours</label>
              <input
                type="number"
                min={0} max={18} step={0.5}
                value={form.studyHours}
                onChange={e => update('studyHours', Number(e.target.value))}
                className="input-field"
                aria-label="Study hours"
              />
            </div>
          </div>
        </div>

        {/* Trigger */}
        <div className="card">
          <h2 className="font-body font-semibold text-text-main mb-4">F. Today's Main Stress Trigger</h2>
          <select
            value={form.trigger}
            onChange={e => update('trigger', e.target.value)}
            className="input-field"
            aria-label="Stress trigger"
          >
            <option value="">Select what's weighing on you most...</option>
            {triggers.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Journal */}
        <div className="card">
          <h2 className="font-body font-semibold text-text-main mb-2">G. Free Journal</h2>
          <p className="font-body text-xs text-text-soft mb-3">
            Write freely. Everything here is private and only for you.
          </p>
          <textarea
            value={form.journal}
            onChange={e => update('journal', e.target.value)}
            placeholder="Write freely. What happened today? What are you feeling? What is worrying you?"
            rows={5}
            className="input-field resize-none"
            aria-label="Journal entry"
          />
          <p className="font-body text-xs text-text-soft mt-1">{form.journal.length} characters</p>
        </div>

        {error && (
          <div className="bg-rose-warm/10 border border-rose-warm/30 rounded-2xl p-4">
            <p className="font-body text-sm text-rose-warm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`btn-primary w-full py-4 text-base ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              Generating Your Mind Report...
            </span>
          ) : (
            '🧠 Generate My Mind Report'
          )}
        </button>
      </form>
    </div>
  )
}
