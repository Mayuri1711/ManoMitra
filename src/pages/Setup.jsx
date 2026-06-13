import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext.jsx'

const exams = ['NEET', 'JEE', 'CUET', 'CAT', 'GATE', 'UPSC', 'Board Exams', 'Other']

const stressSources = [
  'Mock test scores', 'Family expectations', 'Fear of failure',
  'Comparison with friends', 'Too much syllabus', 'Coaching pressure',
  'Lack of focus', 'Sleep issues', 'Loneliness', 'Other',
]

const wellnessStyles = [
  'Yoga & Pranayama', 'Meditation', 'Spiritual Reflection',
  'Family Support', 'Study Planning', 'Mixed Indian Wellness Plan',
]

export default function Setup() {
  const { profile, setProfile } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: profile?.name || '',
    exam: profile?.exam || '',
    year: profile?.year || '',
    mainStressSource: profile?.mainStressSource || '',
    preferredWellnessStyle: profile?.preferredWellnessStyle || '',
  })
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.name || !form.exam || !form.mainStressSource || !form.preferredWellnessStyle) {
      setSubmitted(true)
      return
    }
    setProfile(form)
    navigate('/checkin')
  }

  const isEditing = !!profile

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8 animate-fade-in">
        <div className="text-4xl mb-3">{isEditing ? '✏️' : '🌟'}</div>
        <h1 className="section-title mb-2">{isEditing ? 'Update Your Profile' : 'Set Up Your Profile'}</h1>
        <p className="font-body text-text-soft">
          Tell ManoMitra a little about yourself so we can personalise your wellness experience.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card space-y-6 animate-slide-up">
        {/* Name */}
        <div>
          <label className="font-body font-medium text-text-main block mb-2">Your Name *</label>
          <input
            type="text"
            className="input-field"
            placeholder="What should ManoMitra call you?"
            value={form.name}
            onChange={e => update('name', e.target.value)}
          />
          {submitted && !form.name && <p className="font-body text-xs text-rose-warm mt-1">Please enter your name</p>}
        </div>

        {/* Exam */}
        <div>
          <label className="font-body font-medium text-text-main block mb-2">Exam Preparing For *</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {exams.map(exam => (
              <button
                key={exam}
                type="button"
                onClick={() => update('exam', exam)}
                className={`px-3 py-2 rounded-xl text-sm font-body font-medium border-2 transition-all ${form.exam === exam ? 'bg-saffron text-white border-saffron' : 'bg-cream border-saffron/20 text-text-soft hover:border-saffron/50'}`}
              >
                {exam}
              </button>
            ))}
          </div>
          {submitted && !form.exam && <p className="font-body text-xs text-rose-warm mt-1">Please select your exam</p>}
        </div>

        {/* Year */}
        <div>
          <label className="font-body font-medium text-text-main block mb-2">Current Class / Year</label>
          <input
            type="text"
            className="input-field"
            placeholder="e.g. 12th Standard, 2nd Year B.Tech, UPSC Aspirant"
            value={form.year}
            onChange={e => update('year', e.target.value)}
          />
        </div>

        {/* Stress Source */}
        <div>
          <label className="font-body font-medium text-text-main block mb-2">Main Stress Source *</label>
          <div className="space-y-2">
            {stressSources.map(src => (
              <label key={src} className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${form.mainStressSource === src ? 'bg-saffron/10 border-saffron/50' : 'bg-cream border-saffron/10 hover:border-saffron/30'}`}>
                <input
                  type="radio"
                  name="stressSource"
                  value={src}
                  checked={form.mainStressSource === src}
                  onChange={() => update('mainStressSource', src)}
                  className="accent-saffron"
                />
                <span className="font-body text-sm text-text-main">{src}</span>
              </label>
            ))}
          </div>
          {submitted && !form.mainStressSource && <p className="font-body text-xs text-rose-warm mt-1">Please select your main stress source</p>}
        </div>

        {/* Wellness Style */}
        <div>
          <label className="font-body font-medium text-text-main block mb-2">Preferred Wellness Style *</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {wellnessStyles.map(style => (
              <button
                key={style}
                type="button"
                onClick={() => update('preferredWellnessStyle', style)}
                className={`px-4 py-3 rounded-xl text-sm font-body font-medium border-2 text-left transition-all ${form.preferredWellnessStyle === style ? 'bg-calm-green/10 border-calm-green text-calm-green-dark' : 'bg-cream border-saffron/20 text-text-soft hover:border-saffron/40'}`}
              >
                {style}
              </button>
            ))}
          </div>
          {submitted && !form.preferredWellnessStyle && <p className="font-body text-xs text-rose-warm mt-1">Please select your preferred style</p>}
        </div>

        <button type="submit" className="btn-primary w-full py-4 text-base">
          {isEditing ? '✅ Save Changes' : '🌟 Start My Wellness Journey'}
        </button>
      </form>
    </div>
  )
}
