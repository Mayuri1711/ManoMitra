import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function SleepChart({ checkIns }) {
  const data = [...checkIns].reverse().slice(-14).map(c => ({
    date: new Date(c.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    sleep: c.sleepHours,
    stress: c.stressLevel,
  }))

  return (
    <div className="card">
      <h3 className="font-body font-semibold text-text-main mb-4 text-sm">🌙 Sleep vs Stress</h3>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#9B7FD4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#9B7FD4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#F4A82320" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B5B4E', fontFamily: 'DM Sans' }} />
          <YAxis tick={{ fontSize: 11, fill: '#6B5B4E', fontFamily: 'DM Sans' }} />
          <Tooltip
            contentStyle={{ background: '#FDF6EC', border: '1px solid #F4A82330', borderRadius: '12px', fontFamily: 'DM Sans', fontSize: 12 }}
          />
          <Area type="monotone" dataKey="sleep" stroke="#9B7FD4" strokeWidth={2.5} fill="url(#sleepGrad)" name="Sleep (hrs)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
