const categoryColors = {
  'Yoga': { bg: 'bg-calm-green/10', text: 'text-calm-green-dark', border: 'border-calm-green/20' },
  'Pranayama': { bg: 'bg-soft-blue/10', text: 'text-soft-blue', border: 'border-soft-blue/20' },
  'Meditation': { bg: 'bg-muted-purple/10', text: 'text-muted-purple', border: 'border-muted-purple/20' },
  'Family Connection': { bg: 'bg-saffron/10', text: 'text-saffron-dark', border: 'border-saffron/20' },
  'Study Reset': { bg: 'bg-warm-amber/10', text: 'text-warm-amber', border: 'border-warm-amber/20' },
  'Reflection': { bg: 'bg-muted-purple/10', text: 'text-muted-purple', border: 'border-muted-purple/20' },
  'Spiritual': { bg: 'bg-muted-purple/10', text: 'text-muted-purple', border: 'border-muted-purple/20' },
}

export default function WellnessCard({ category, emoji, title, description, duration, stepNumber }) {
  const colors = categoryColors[category] || categoryColors['Yoga']

  return (
    <div className={`card animate-fade-in`}>
      <div className="flex items-start gap-4">
        {stepNumber && (
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-saffron text-white font-body font-bold text-sm flex items-center justify-center">
            {stepNumber}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`tag ${colors.bg} ${colors.text} border ${colors.border}`}>
              {category}
            </span>
            {duration && (
              <span className="tag bg-gray-100 text-text-soft">
                ⏱️ {duration}
              </span>
            )}
          </div>
          <div className="flex items-start gap-2">
            <span className="text-xl flex-shrink-0">{emoji}</span>
            <div>
              <h4 className="font-body font-semibold text-text-main text-sm mb-1">{title}</h4>
              <p className="font-body text-text-soft text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
