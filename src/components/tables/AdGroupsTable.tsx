import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import type { AdGroupPerformance } from '../../types/dashboard'
import { StatusBadge } from '../feedback/StatusBadge'
import { formatBRL, formatNumber, formatPercent } from '../../utils/currency'

type SortKey = keyof AdGroupPerformance
type Dir = 'asc' | 'desc'

interface Props {
  adGroups: AdGroupPerformance[]
}

function Th({ label, field, sort, onSort }: {
  label: string; field: SortKey; sort: SortKey; dir?: Dir; onSort: (f: SortKey) => void
}) {
  return (
    <button onClick={() => onSort(field)} className="flex items-center gap-1 text-xs font-semibold text-zinc-400 uppercase tracking-wide hover:text-white transition-colors group">
      {label}
      <ArrowUpDown size={11} className={`transition-opacity ${sort === field ? 'opacity-100 text-yellow-400' : 'opacity-30 group-hover:opacity-60'}`} />
    </button>
  )
}

export function AdGroupsTable({ adGroups }: Props) {
  const [sort, setSort] = useState<SortKey>('investment')
  const [dir, setDir] = useState<Dir>('desc')

  const handleSort = (field: SortKey) => {
    if (sort === field) setDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSort(field); setDir('desc') }
  }

  const sorted = [...adGroups].sort((a, b) => {
    const av = a[sort], bv = b[sort]
    if (typeof av === 'number' && typeof bv === 'number') return dir === 'asc' ? av - bv : bv - av
    return dir === 'asc' ? String(av).localeCompare(String(bv), 'pt-BR') : String(bv).localeCompare(String(av), 'pt-BR')
  })

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full text-sm table-sticky">
        <thead>
          <tr className="bg-zinc-900 border-b border-zinc-800">
            <th className="text-left px-4 py-3 bg-zinc-900"><Th label="Campanha" field="campaignName" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-left px-4 py-3 bg-zinc-900"><Th label="Grupo" field="adGroupName" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-left px-4 py-3 bg-zinc-900"><span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">ID Grupo</span></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Investimento" field="investment" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Leads" field="crmLeads" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Ganhos" field="wins" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Perdidos" field="lost" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Abertos" field="open" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Placas" field="wonPlates" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Custo/Ganho" field="costPerWin" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Taxa Ganho" field="winRate" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-center px-4 py-3 bg-zinc-900"><span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Decisão</span></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((g, i) => (
            <tr key={g.adGroupId} className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-transparent'}`}>
              <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">{g.campaignName}</td>
              <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{g.adGroupName}</td>
              <td className="px-4 py-3 text-zinc-500 font-mono text-xs">{g.adGroupId}</td>
              <td className="px-4 py-3 text-right text-yellow-400 font-semibold whitespace-nowrap">{formatBRL(g.investment)}</td>
              <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(g.crmLeads)}</td>
              <td className="px-4 py-3 text-right text-emerald-400 font-semibold">{formatNumber(g.wins)}</td>
              <td className="px-4 py-3 text-right text-red-400">{formatNumber(g.lost)}</td>
              <td className="px-4 py-3 text-right text-blue-400">{formatNumber(g.open)}</td>
              <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(g.wonPlates)}</td>
              <td className="px-4 py-3 text-right text-zinc-300 whitespace-nowrap">{g.costPerWin > 0 ? formatBRL(g.costPerWin) : '—'}</td>
              <td className="px-4 py-3 text-right text-zinc-300">{g.winRate > 0 ? formatPercent(g.winRate) : '—'}</td>
              <td className="px-4 py-3 text-center"><StatusBadge status={g.decision} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
