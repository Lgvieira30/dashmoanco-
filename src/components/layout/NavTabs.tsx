interface Tab {
  id: string
  label: string
}

const TABS: Tab[] = [
  { id: 'overview', label: 'Visão Geral' },
  { id: 'campaigns', label: 'Campanhas' },
  { id: 'adgroups', label: 'Grupos' },
  { id: 'ads', label: 'Anúncios' },
  { id: 'matchtypes', label: 'Correspondência' },
  { id: 'keywords', label: 'Palavras-chave' },
  { id: 'searchterms', label: 'Termos de Pesquisa' },
  { id: 'decisions', label: 'Decisões' },
]

interface Props {
  active: string
  onChange: (id: string) => void
}

export function NavTabs({ active, onChange }: Props) {
  return (
    <nav
      className="bg-zinc-950 border-b border-zinc-800 sticky top-[73px] z-40"
      role="tablist"
      aria-label="Seções do painel"
    >
      <div className="max-w-screen-2xl mx-auto px-6 flex overflow-x-auto gap-0 scrollbar-none">
        {TABS.map(tab => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            onClick={() => onChange(tab.id)}
            className={`px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 ${
              active === tab.id
                ? 'border-yellow-400 text-yellow-400'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
