const moods = [
  { label: 'Calm', emoji: '😌', color: 'hover:bg-calm-green/20 data-[selected=true]:bg-calm-green/20 data-[selected=true]:border-calm-green' },
  { label: 'Happy', emoji: '😊', color: 'hover:bg-saffron/20 data-[selected=true]:bg-saffron/20 data-[selected=true]:border-saffron' },
  { label: 'Stressed', emoji: '😰', color: 'hover:bg-warm-amber/20 data-[selected=true]:bg-warm-amber/20 data-[selected=true]:border-warm-amber' },
  { label: 'Anxious', emoji: '😟', color: 'hover:bg-soft-blue/20 data-[selected=true]:bg-soft-blue/20 data-[selected=true]:border-soft-blue' },
  { label: 'Sad', emoji: '😢', color: 'hover:bg-soft-blue/20 data-[selected=true]:bg-soft-blue/20 data-[selected=true]:border-soft-blue' },
  { label: 'Angry', emoji: '😠', color: 'hover:bg-rose-warm/20 data-[selected=true]:bg-rose-warm/20 data-[selected=true]:border-rose-warm' },
  { label: 'Tired', emoji: '😴', color: 'hover:bg-muted-purple/20 data-[selected=true]:bg-muted-purple/20 data-[selected=true]:border-muted-purple' },
  { label: 'Confused', emoji: '😕', color: 'hover:bg-warm-amber/20 data-[selected=true]:bg-warm-amber/20 data-[selected=true]:border-warm-amber' },
  { label: 'Hopeless', emoji: '😞', color: 'hover:bg-gray-200 data-[selected=true]:bg-gray-200 data-[selected=true]:border-gray-400' },
  { label: 'Motivated', emoji: '💪', color: 'hover:bg-calm-green/20 data-[selected=true]:bg-calm-green/20 data-[selected=true]:border-calm-green' },
]

export default function MoodSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {moods.map(({ label, emoji, color }) => (
        <button
          key={label}
          type="button"
          data-selected={value === label}
          onClick={() => onChange(label)}
          className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 border-transparent transition-all duration-150 ${color} ${value === label ? 'shadow-card scale-105' : 'hover:scale-102'}`}
          aria-label={`Select mood: ${label}`}
        >
          <span className="text-2xl">{emoji}</span>
          <span className="font-body text-xs text-text-soft font-medium">{label}</span>
        </button>
      ))}
    </div>
  )
}
