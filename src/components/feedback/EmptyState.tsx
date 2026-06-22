import { Inbox } from 'lucide-react'

interface Props {
  message: string
  description?: string
}

export function EmptyState({ message, description }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
      <Inbox size={40} className="text-zinc-600" />
      <p className="text-zinc-300 font-medium">{message}</p>
      {description && <p className="text-zinc-500 text-sm max-w-sm">{description}</p>}
    </div>
  )
}
