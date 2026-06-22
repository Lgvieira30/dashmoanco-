import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { CampaignPerformance } from '../../types/dashboard'
import { formatBRL } from '../../utils/currency'

const COLORS = ['#facc15', '#a3e635', '#fb923c', '#94a3b8']

interface Props {
  campaigns: CampaignPerformance[]
}

interface TooltipPayload {
  value: number
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-zinc-300 font-medium mb-1">{label}</p>
      <p className="text-yellow-400 font-bold">{formatBRL(payload[0].value)}</p>
    </div>
  )
}

export function InvestmentByCampaign({ campaigns }: Props) {
  const data = campaigns.map(c => ({
    name: c.campaignName.length > 18 ? c.campaignName.slice(0, 18) + '…' : c.campaignName,
    investment: c.investment,
    decision: c.decision,
  }))

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-sm font-semibold text-zinc-300 mb-4">Investimento por Campanha</p>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#71717a', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v / 1000).toFixed(0)}k`} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
          <Bar dataKey="investment" radius={[4, 4, 0, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
