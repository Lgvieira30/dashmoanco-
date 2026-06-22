import { DollarSign, Target, Users, Trophy, Layers, TrendingUp, Award, BarChart2 } from 'lucide-react'
import type { DashboardSummary } from '../../types/dashboard'
import { MetricCard } from './MetricCard'
import { formatBRL, formatNumber, formatPercent } from '../../utils/currency'

interface Props {
  summary: DashboardSummary
}

export function SummaryCards({ summary }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4">
      <div className="col-span-2 sm:col-span-2 xl:col-span-2">
        <MetricCard
          label="Investimento"
          value={formatBRL(summary.investment)}
          description="Total gasto no período"
          icon={<DollarSign size={18} />}
          highlight="yellow"
          large
        />
      </div>
      <MetricCard
        label="Conversões Google"
        value={formatDecimal(summary.googleConversions)}
        description="Atribuídas pelo Google Ads"
        icon={<Target size={16} />}
      />
      <MetricCard
        label="Leads CRM"
        value={formatNumber(summary.crmLeads)}
        description="Registrados no Moskit"
        icon={<Users size={16} />}
        highlight="default"
      />
      <MetricCard
        label="Ganhos"
        value={formatNumber(summary.wins)}
        description="Negócios fechados"
        icon={<Trophy size={16} />}
        highlight="green"
      />
      <MetricCard
        label="Placas Ganhas"
        value={formatNumber(summary.wonPlates)}
        description="Quantidade de placas"
        icon={<Award size={16} />}
        highlight="yellow"
      />
      <MetricCard
        label="CPL Real"
        value={formatBRL(summary.realCpl)}
        description="Custo por lead CRM"
        icon={<BarChart2 size={16} />}
      />
      <MetricCard
        label="Custo por Ganho"
        value={formatBRL(summary.costPerWin)}
        description="Investimento por fechamento"
        icon={<Layers size={16} />}
        highlight="yellow"
      />
      <MetricCard
        label="Taxa de Ganho"
        value={formatPercent(summary.winRate)}
        description="Sobre leads no CRM"
        icon={<TrendingUp size={16} />}
        highlight={summary.winRate >= 20 ? 'green' : summary.winRate >= 10 ? 'yellow' : 'red'}
      />
    </div>
  )
}

function formatDecimal(v: number) {
  return v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
