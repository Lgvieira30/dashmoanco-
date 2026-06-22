import type { ReactNode } from 'react'

interface Props {
  label: string
  value: string
  description?: string
  icon: ReactNode
  highlight?: 'default' | 'yellow' | 'green' | 'red' | 'gray'
  large?: boolean
}

const highlightStyles = {
  default: 'border-zinc-800',
  yellow: 'border-yellow-400/40',
  green: 'border-emerald-500/40',
  red: 'border-red-500/40',
  gray: 'border-zinc-700/40',
}

const iconStyles = {
  default: 'text-zinc-500',
  yellow: 'text-yellow-400',
  green: 'text-emerald-400',
  red: 'text-red-400',
  gray: 'text-zinc-500',
}

export function MetricCard({ label, value, description, icon, highlight = 'default', large = false }: Props) {
  return (
    <div
      className={`bg-zinc-900 border ${highlightStyles[highlight]} rounded-xl p-5 flex flex-col gap-3 hover:border-zinc-700 transition-colors`}
    >
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wider leading-tight">{label}</p>
        <span className={`${iconStyles[highlight]} flex-shrink-0`}>{icon}</span>
      </div>
      <p className={`font-black text-white leading-none tracking-tight ${large ? 'text-3xl' : 'text-2xl'}`}>
        {value}
      </p>
      {description && (
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      )}
    </div>
  )
}
