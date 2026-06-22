import type { MatchTypePerformance } from '../../types/dashboard'
import { StatusBadge } from '../feedback/StatusBadge'
import { formatBRL, formatNumber, formatPercent } from '../../utils/currency'

const MATCH_LABELS: Record<string, string> = {
  EXACT: 'Exata',
  PHRASE: 'Frase',
  BROAD: 'Ampla',
}

const MATCH_COLORS: Record<string, string> = {
  EXACT: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  PHRASE: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  BROAD: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
}

interface Props {
  matchTypes: MatchTypePerformance[]
}

export function MatchTypesSection({ matchTypes }: Props) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matchTypes.map(m => (
          <div key={m.matchType + m.adGroupId} className={`border rounded-xl p-5 ${MATCH_COLORS[m.matchType] ?? 'border-zinc-800'}`}>
            <div className="flex items-center justify-between mb-4">
              <span className={`text-sm font-black uppercase tracking-wider ${MATCH_COLORS[m.matchType]?.split(' ')[0]}`}>
                Correspondência {MATCH_LABELS[m.matchType] ?? m.matchType}
              </span>
              <StatusBadge status={m.decision} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Investimento</p>
                <p className="text-white font-bold">{formatBRL(m.investment)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Impressões</p>
                <p className="text-white font-bold">{formatNumber(m.impressions)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Cliques</p>
                <p className="text-white font-bold">{formatNumber(m.clicks)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Conv. Google</p>
                <p className="text-white font-bold">{m.googleConversions}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Leads CRM</p>
                <p className="text-white font-bold">{formatNumber(m.crmLeads)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Ganhos</p>
                <p className="text-emerald-400 font-bold">{formatNumber(m.wins)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Placas</p>
                <p className="text-white font-bold">{formatNumber(m.wonPlates)}</p>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide mb-0.5">Custo/Ganho</p>
                <p className="text-white font-bold">{m.costPerWin > 0 ? formatBRL(m.costPerWin) : '—'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-zinc-800">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-zinc-900 border-b border-zinc-800">
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Correspondência</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Investimento</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Impressões</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Cliques</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Conv.</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Leads</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Ganhos</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Placas</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">CPL Real</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Custo/Ganho</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Taxa Ganho</th>
              <th className="text-center px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Decisão</th>
            </tr>
          </thead>
          <tbody>
            {matchTypes.map((m, i) => (
              <tr key={m.matchType + m.adGroupId + i} className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-transparent'}`}>
                <td className="px-4 py-3 font-semibold" style={{ color: MATCH_COLORS[m.matchType]?.split(' ')[0].replace('text-', '') }}>
                  <span className={`font-bold ${MATCH_COLORS[m.matchType]?.split(' ')[0]}`}>{MATCH_LABELS[m.matchType] ?? m.matchType}</span>
                </td>
                <td className="px-4 py-3 text-right text-yellow-400 font-semibold whitespace-nowrap">{formatBRL(m.investment)}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(m.impressions)}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(m.clicks)}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{m.googleConversions}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(m.crmLeads)}</td>
                <td className="px-4 py-3 text-right text-emerald-400 font-semibold">{formatNumber(m.wins)}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(m.wonPlates)}</td>
                <td className="px-4 py-3 text-right text-zinc-300 whitespace-nowrap">{m.realCpl > 0 ? formatBRL(m.realCpl) : '—'}</td>
                <td className="px-4 py-3 text-right text-zinc-300 whitespace-nowrap">{m.costPerWin > 0 ? formatBRL(m.costPerWin) : '—'}</td>
                <td className="px-4 py-3 text-right text-zinc-300">{m.winRate > 0 ? formatPercent(m.winRate) : '—'}</td>
                <td className="px-4 py-3 text-center"><StatusBadge status={m.decision} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
