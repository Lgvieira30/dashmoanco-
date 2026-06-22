import { useState } from 'react'
import { useDashboardData } from './hooks/useDashboardData'
import { useDashboardFilters } from './hooks/useDashboardFilters'
import { Header } from './components/layout/Header'
import { NavTabs } from './components/layout/NavTabs'
import { FilterBar } from './components/filters/FilterBar'
import { SummaryCards } from './components/cards/SummaryCards'
import { MetricCard } from './components/cards/MetricCard'
import { DecisionsPanel } from './components/cards/DecisionsPanel'
import { InvestmentByCampaign } from './components/charts/InvestmentByCampaign'
import { LeadsAndWins } from './components/charts/LeadsAndWins'
import { InvestmentVsPlates } from './components/charts/InvestmentVsPlates'
import { DealDistribution } from './components/charts/DealDistribution'
import { CampaignsTable } from './components/tables/CampaignsTable'
import { AdGroupsTable } from './components/tables/AdGroupsTable'
import { AdsTable } from './components/tables/AdsTable'
import { MatchTypesSection } from './components/tables/MatchTypesSection'
import { ErrorState } from './components/feedback/ErrorState'
import { EmptyState } from './components/feedback/EmptyState'
import { CardSkeleton, TableSkeleton, ChartSkeleton } from './components/feedback/LoadingSkeleton'

type TabId = 'overview' | 'campaigns' | 'adgroups' | 'ads' | 'matchtypes' | 'keywords' | 'searchterms' | 'decisions'

function SectionTitle({ title, count }: { title: string; count?: number }) {
  return (
    <div className="flex items-baseline gap-3 mb-5">
      <h2 className="text-lg font-bold text-white">{title}</h2>
      {count !== undefined && (
        <span className="text-xs text-zinc-500">{count} {count === 1 ? 'registro' : 'registros'}</span>
      )}
    </div>
  )
}

export default function App() {
  const { data, status, error, isMock, refresh } = useDashboardData()
  const { filters, updateFilter, resetFilters, filteredCampaigns, filteredAdGroups, filteredAds } = useDashboardFilters(data)
  const [tab, setTab] = useState<TabId>('overview')

  const isLoading = status === 'loading' || status === 'idle'

  return (
    <div className="min-h-screen bg-[#111112] text-white">
      <Header
        isMock={isMock}
        isLoading={isLoading}
        generatedAt={data?.generatedAt}
        periodStart={data?.periodStart}
        periodEnd={data?.periodEnd}
        onRefresh={refresh}
      />
      <NavTabs active={tab} onChange={id => setTab(id as TabId)} />

      <main className="max-w-screen-2xl mx-auto px-6 py-8">
        {status === 'error' && error && (
          <ErrorState message={error} onRetry={refresh} />
        )}

        {isLoading && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
              {Array.from({ length: 8 }).map((_, i) => <CardSkeleton key={i} />)}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, i) => <ChartSkeleton key={i} />)}
            </div>
            <TableSkeleton />
          </div>
        )}

        {status === 'success' && data && (
          <>
            <div className="mb-8">
              <SummaryCards summary={data.summary} />
            </div>

            {tab !== 'overview' && tab !== 'decisions' && (
              <div className="mb-6">
                <FilterBar filters={filters} data={data} onUpdate={updateFilter} onReset={resetFilters} />
              </div>
            )}

            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <MetricCard
                    label="Negócios Abertos"
                    value={data.summary.open.toString()}
                    description="Em andamento no CRM"
                    icon={null}
                    highlight="default"
                  />
                  <MetricCard
                    label="Negócios Perdidos"
                    value={data.summary.lost.toString()}
                    description="Fechados como perdido"
                    icon={null}
                    highlight="red"
                  />
                  <MetricCard
                    label="Campanhas Ativas"
                    value={data.campaigns.filter(c => c.active).length.toString()}
                    description={`de ${data.campaigns.length} campanhas`}
                    icon={null}
                    highlight="green"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  <InvestmentByCampaign campaigns={data.campaigns} />
                  <LeadsAndWins campaigns={data.campaigns} />
                  <InvestmentVsPlates campaigns={data.campaigns} />
                  <DealDistribution summary={data.summary} />
                </div>
              </div>
            )}

            {tab === 'campaigns' && (
              <div>
                <SectionTitle title="Campanhas" count={filteredCampaigns.length} />
                {filteredCampaigns.length === 0
                  ? <EmptyState message="Nenhuma campanha encontrada" description="Ajuste os filtros para ver resultados." />
                  : <CampaignsTable campaigns={filteredCampaigns} />
                }
              </div>
            )}

            {tab === 'adgroups' && (
              <div>
                <SectionTitle title="Grupos de Anúncios" count={filteredAdGroups.length} />
                {filteredAdGroups.length === 0
                  ? <EmptyState message="Nenhum grupo encontrado" description="Ajuste os filtros para ver resultados." />
                  : <AdGroupsTable adGroups={filteredAdGroups} />
                }
              </div>
            )}

            {tab === 'ads' && (
              <div>
                <SectionTitle title="Anúncios" count={filteredAds.length} />
                {filteredAds.length === 0
                  ? <EmptyState message="Nenhum anúncio encontrado" description="Ajuste os filtros para ver resultados." />
                  : <AdsTable ads={filteredAds} />
                }
              </div>
            )}

            {tab === 'matchtypes' && (
              <div>
                <SectionTitle title="Correspondência de Palavras-chave" count={data.matchTypes.length} />
                {data.matchTypes.length === 0
                  ? <EmptyState message="Nenhum dado de correspondência disponível" />
                  : <MatchTypesSection matchTypes={data.matchTypes} />
                }
              </div>
            )}

            {tab === 'keywords' && (
              <div>
                <SectionTitle title="Palavras-chave" />
                <EmptyState
                  message="Aguardando coleta por palavra-chave"
                  description="Esta seção será preenchida quando os dados de palavras-chave estiverem disponíveis na planilha."
                />
              </div>
            )}

            {tab === 'searchterms' && (
              <div>
                <SectionTitle title="Termos de Pesquisa" />
                <EmptyState
                  message="Aguardando coleta de termos de pesquisa"
                  description="Esta seção será preenchida quando os dados de termos de pesquisa estiverem disponíveis na planilha."
                />
              </div>
            )}

            {tab === 'decisions' && (
              <div>
                <SectionTitle title="Decisões e Recomendações Automáticas" />
                <DecisionsPanel data={data} />
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
