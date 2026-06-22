import type { DecisionStatus } from '../../types/dashboard'

const config: Record<DecisionStatus, { label: string; className: string }> = {
  ESCALAR:  { label: 'ESCALAR',  className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' },
  MANTER:   { label: 'MANTER',   className: 'bg-green-700/20 text-green-400 border border-green-700/30' },
  OBSERVAR: { label: 'OBSERVAR', className: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' },
  REVISAR:  { label: 'REVISAR',  className: 'bg-red-500/20 text-red-400 border border-red-500/30' },
  PAUSADA:  { label: 'PAUSADA',  className: 'bg-zinc-700/40 text-zinc-400 border border-zinc-600/30' },
  PAUSADO:  { label: 'PAUSADO',  className: 'bg-zinc-700/40 text-zinc-400 border border-zinc-600/30' },
  'SEM CRM':{ label: 'SEM CRM', className: 'bg-zinc-600/20 text-zinc-500 border border-zinc-600/20' },
}

interface Props {
  status: DecisionStatus
  size?: 'sm' | 'md'
}

export function StatusBadge({ status, size = 'sm' }: Props) {
  const { label, className } = config[status] ?? config['SEM CRM']
  const sizeClass = size === 'md' ? 'px-3 py-1 text-xs' : 'px-2 py-0.5 text-[11px]'
  return (
    <span className={`inline-flex items-center rounded font-semibold tracking-wide ${sizeClass} ${className}`}>
      {label}
    </span>
  )
}
