import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
      <AlertTriangle size={48} className="text-red-400" />
      <div>
        <p className="text-lg font-semibold text-white mb-1">Falha ao carregar dados</p>
        <p className="text-zinc-400 text-sm max-w-sm">{message}</p>
      </div>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 px-5 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 transition-colors"
      >
        <RefreshCw size={16} />
        Tentar novamente
      </button>
    </div>
  )
}
