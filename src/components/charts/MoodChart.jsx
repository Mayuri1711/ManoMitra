import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const moodColors = {
  Calm: '#4CAF7D', Happy: '#4CAF7D', Motivated: '#4CAF7D',
  Stressed: '#E8955A', Anxious: '#5B9BD5',
  Sad: '#9B7FD4', Hopeless: '#9B7FD4',
  Angry: '#E07070', Tired: '#9B7FD4', Confused: '#E8955A',
}

export default function MoodChart({ checkIns }) {
  const moodCounts = {}
  checkIns.forEach(c => {
    moodCounts[c.mood] = (moodCounts[c.mood] || 0) + 1
  })

  const data = Object.entries(moodCounts).map(([mood, count]) => ({ mood, count })).sort((a, b) => b.count - a.count).slice(0, 6)

  return (
    <div className="card">
      <h3 className="font-body font-semibold text-text-main mb-4 text-sm">😊 Mood Frequency</h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F4A82320" />
          <XAxis dataKey="mood" tick={{ fontSize: 10, fill: '#6B5B4E', fontFamily: 'DM Sans' }} />
          <YAxis tick={{ fontSize: 11, fill: '#6B5B4E', fontFamily: 'DM Sans' }} />
          <Tooltip
            contentStyle={{ background: '#FDF6EC', border: '1px solid #F4A82330', borderRadius: '12px', fontFamily: 'DM Sans', fontSize: 12 }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={moodColors[entry.mood] || '#F4A823'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
