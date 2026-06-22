import { useState } from 'react'
import { ArrowUpDown } from 'lucide-react'
import type { AdPerformance } from '../../types/dashboard'
import { StatusBadge } from '../feedback/StatusBadge'
import { formatBRL, formatNumber, formatPercent } from '../../utils/currency'

type SortKey = keyof AdPerformance
type Dir = 'asc' | 'desc'

interface Props {
  ads: AdPerformance[]
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

export function AdsTable({ ads }: Props) {
  const [sort, setSort] = useState<SortKey>('investment')
  const [dir, setDir] = useState<Dir>('desc')

  const handleSort = (field: SortKey) => {
    if (sort === field) setDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSort(field); setDir('desc') }
  }

  const sorted = [...ads].sort((a, b) => {
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
            <th className="text-left px-4 py-3 bg-zinc-900"><span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">ID Anúncio</span></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Investimento" field="investment" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Conv." field="googleConversions" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Leads" field="crmLeads" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Ganhos" field="wins" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Perdidos" field="lost" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Placas" field="wonPlates" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="CPL Real" field="realCpl" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Custo/Ganho" field="costPerWin" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-right px-4 py-3 bg-zinc-900"><Th label="Taxa Ganho" field="winRate" sort={sort} dir={dir} onSort={handleSort} /></th>
            <th className="text-center px-4 py-3 bg-zinc-900"><span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Decisão</span></th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((a, i) => (
            <tr key={a.adId} className={`border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors ${i % 2 === 0 ? 'bg-zinc-900/30' : 'bg-transparent'}`}>
              <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">{a.campaignName}</td>
              <td className="px-4 py-3 text-zinc-400 text-xs whitespace-nowrap">{a.adGroupName}</td>
              <td className="px-4 py-3 text-zinc-500 font-mono text-xs">{a.adId}</td>
              <td className="px-4 py-3 text-right text-yellow-400 font-semibold whitespace-nowrap">{formatBRL(a.investment)}</td>
              <td className="px-4 py-3 text-right text-zinc-300">{a.googleConversions.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</td>
              <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(a.crmLeads)}</td>
              <td className="px-4 py-3 text-right text-emerald-400 font-semibold">{formatNumber(a.wins)}</td>
              <td className="px-4 py-3 text-right text-red-400">{formatNumber(a.lost)}</td>
              <td className="px-4 py-3 text-right text-zinc-300">{formatNumber(a.wonPlates)}</td>
              <td className="px-4 py-3 text-right text-zinc-300 whitespace-nowrap">{a.realCpl > 0 ? formatBRL(a.realCpl) : '—'}</td>
              <td className="px-4 py-3 text-right text-zinc-300 whitespace-nowrap">{a.costPerWin > 0 ? formatBRL(a.costPerWin) : '—'}</td>
              <td className="px-4 py-3 text-right text-zinc-300">{a.winRate > 0 ? formatPercent(a.winRate) : '—'}</td>
              <td className="px-4 py-3 text-center"><StatusBadge status={a.decision} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
