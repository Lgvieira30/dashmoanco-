import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts'
import type { CampaignPerformance } from '../../types/dashboard'
import { formatBRL, formatNumber } from '../../utils/currency'

interface Props {
  campaigns: CampaignPerformance[]
}

interface TooltipProps {
  active?: boolean
  payload?: Array<{ payload: { name: string; x: number; y: number } }>
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-white font-semibold mb-1">{d.name}</p>
      <p className="text-yellow-400">Invest.: {formatBRL(d.x)}</p>
      <p className="text-emerald-400">Placas: {formatNumber(d.y)}</p>
    </div>
  )
}

export function InvestmentVsPlates({ campaigns }: Props) {
  const data = campaigns.map(c => ({
    name: c.campaignName,
    x: c.investment,
    y: c.wonPlates,
  }))

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <p className="text-sm font-semibold text-zinc-300 mb-4">Investimento × Placas Ganhas</p>
      <ResponsiveContainer width="100%" height={200}>
        <ScatterChart margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <XAxis
            dataKey="x"
            type="number"
            tick={{ fill: '#71717a', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `R$${(v / 1000).toFixed(1)}k`}
          >
            <Label value="Investimento" position="insideBottom" offset={-10} fill="#52525b" fontSize={11} />
          </XAxis>
          <YAxis
            dataKey="y"
            type="number"
            tick={{ fill: '#71717a', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          >
            <Label value="Placas" angle={-90} position="insideLeft" fill="#52525b" fontSize={11} />
          </YAxis>
          <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3', stroke: '#444' }} />
          <Scatter data={data} fill="#facc15" />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
