export default function BurnoutBadge({ risk }) {
  const config = {
    Low: { bg: 'bg-calm-green/15', text: 'text-calm-green-dark', border: 'border-calm-green/30', dot: 'bg-calm-green', label: 'Low Risk' },
    Medium: { bg: 'bg-saffron/15', text: 'text-saffron-dark', border: 'border-saffron/30', dot: 'bg-saffron', label: 'Medium Risk' },
    High: { bg: 'bg-rose-warm/15', text: 'text-rose-warm', border: 'border-rose-warm/30', dot: 'bg-rose-warm', label: 'High Risk' },
  }

  const c = config[risk] || config.Medium

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-body font-semibold border ${c.bg} ${c.text} ${c.border}`}>
      <span className={`w-2 h-2 rounded-full ${c.dot} animate-pulse-soft`} />
      Burnout: {c.label}
    </span>
  )
}
