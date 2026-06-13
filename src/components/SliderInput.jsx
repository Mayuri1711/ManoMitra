export default function SliderInput({ label, value, onChange, min = 1, max = 10, leftLabel, rightLabel }) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="font-body font-medium text-text-main text-sm">{label}</label>
        <span className="font-display font-bold text-saffron text-lg w-8 text-center">{value}</span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #F4A823 ${pct}%, #F4E8C1 ${pct}%)`,
          }}
          aria-label={label}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
        />
      </div>
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between mt-1">
          <span className="font-body text-xs text-text-soft">{leftLabel}</span>
          <span className="font-body text-xs text-text-soft">{rightLabel}</span>
        </div>
      )}
    </div>
  )
}
