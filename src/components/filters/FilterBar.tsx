import { Search, X } from 'lucide-react'
import type { FilterState } from '../../hooks/useDashboardFilters'
import type { DashboardPayload, DecisionStatus } from '../../types/dashboard'

const DECISIONS: { value: DecisionStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas as decisões' },
  { value: 'ESCALAR', label: 'Escalar' },
  { value: 'MANTER', label: 'Manter' },
  { value: 'OBSERVAR', label: 'Observar' },
  { value: 'REVISAR', label: 'Revisar' },
  { value: 'PAUSADA', label: 'Pausada' },
  { value: 'SEM CRM', label: 'Sem CRM' },
]

interface Props {
  filters: FilterState
  data: DashboardPayload
  onUpdate: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void
  onReset: () => void
}

export function FilterBar({ filters, data, onUpdate, onReset }: Props) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.campaignId !== 'all' ||
    filters.activeStatus !== 'all' ||
    filters.decision !== 'all'

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-[200px]">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          placeholder="Buscar por nome ou ID…"
          value={filters.search}
          onChange={e => onUpdate('search', e.target.value)}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-yellow-400/50 focus:ring-1 focus:ring-yellow-400/30"
        />
      </div>

      <select
        value={filters.campaignId}
        onChange={e => onUpdate('campaignId', e.target.value)}
        aria-label="Filtrar por campanha"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400/50 min-w-[180px]"
      >
        <option value="all">Todas as campanhas</option>
        {data.campaigns.map(c => (
          <option key={c.campaignId} value={c.campaignId}>{c.campaignName}</option>
        ))}
      </select>

      <select
        value={filters.activeStatus}
        onChange={e => onUpdate('activeStatus', e.target.value as FilterState['activeStatus'])}
        aria-label="Filtrar por status"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400/50 min-w-[140px]"
      >
        <option value="all">Ativo + Pausado</option>
        <option value="active">Somente ativas</option>
        <option value="paused">Somente pausadas</option>
      </select>

      <select
        value={filters.decision}
        onChange={e => onUpdate('decision', e.target.value as FilterState['decision'])}
        aria-label="Filtrar por decisão"
        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-yellow-400/50 min-w-[160px]"
      >
        {DECISIONS.map(d => (
          <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>

      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg transition-colors"
        >
          <X size={14} />
          Limpar
        </button>
      )}
    </div>
  )
}
