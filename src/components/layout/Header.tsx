import { RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { formatDateBR, formatDateTimeBR } from '../../utils/date'

interface Props {
  isMock: boolean
  isLoading: boolean
  generatedAt?: string
  periodStart?: string
  periodEnd?: string
  onRefresh: () => void
}

export function Header({ isMock, isLoading, generatedAt, periodStart, periodEnd, onRefresh }: Props) {
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 py-4 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-black text-xl tracking-tight">MÔNACO</span>
              <span className="text-zinc-400 text-xl font-light">Intelligence</span>
            </div>
            <p className="text-zinc-500 text-xs">Google Ads + Moskit CRM</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          {periodStart && periodEnd && (
            <div className="text-xs text-zinc-400">
              <span className="text-zinc-500">Período: </span>
              {formatDateBR(periodStart)} – {formatDateBR(periodEnd)}
            </div>
          )}
          {generatedAt && (
            <div className="text-xs text-zinc-500">
              Atualizado: {formatDateTimeBR(generatedAt)}
            </div>
          )}

          {isMock ? (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-xs font-semibold">
              <WifiOff size={12} />
              MODO DEMONSTRAÇÃO — dados locais
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-400/10 border border-emerald-400/30 rounded-full text-emerald-400 text-xs font-semibold">
              <Wifi size={12} />
              DADOS REAIS
            </span>
          )}

          <button
            onClick={onRefresh}
            disabled={isLoading}
            aria-label="Atualizar dados"
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            Atualizar
          </button>
        </div>
      </div>
    </header>
  )
}
