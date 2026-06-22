import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import type { DashboardSummary } from '../../types/dashboard'

interface Props {
  summary: DashboardSummary
}

const SLICES = [
  { key: 'open', label: 'Em aberto', color: '#60a5fa' },
  { key: 'wins', label: 'Ganhos', color: '#34d399' },
  { key: 'lost', label: 'Perdidos', color: '#f87171' },
] as const

interface TooltipPayload {
  name: string
  value: number
  payload: { color: string }
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p style={{ color: payload[0].payload.color }} className="font-semibold">{payload[0].name}</p>
      <p className="text-white font-bold">{payload[0].value} negócios</p>
    </div>
  )
}

export function DealDistribution({ summary }: Props) {
  const data = SLICES.map(s => ({ name: s.label, value: summary[s.key], color: s.color })).filter(d => d.value > 0)

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-sm font-semibold text-zinc-300 mb-4">Distribuição de Negócios</p>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} innerRadius={35}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, color: '#a1a1aa' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
