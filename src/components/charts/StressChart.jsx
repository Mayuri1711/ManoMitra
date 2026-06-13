import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function StressChart({ checkIns }) {
  const data = [...checkIns].reverse().slice(-14).map(c => ({
    date: new Date(c.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
    stress: c.stressLevel,
  }))

  return (
    <div className="card">
      <h3 className="font-body font-semibold text-text-main mb-4 text-sm">😰 Stress Over Time</h3>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F4A82320" />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B5B4E', fontFamily: 'DM Sans' }} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: '#6B5B4E', fontFamily: 'DM Sans' }} />
          <Tooltip
            contentStyle={{ background: '#FDF6EC', border: '1px solid #F4A82330', borderRadius: '12px', fontFamily: 'DM Sans', fontSize: 12 }}
            labelStyle={{ color: '#2D1B0E', fontWeight: 600 }}
          />
          <Line type="monotone" dataKey="stress" stroke="#F4A823" strokeWidth={2.5} dot={{ fill: '#F4A823', strokeWidth: 2, r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
