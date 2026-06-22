import { TrendingUp, Award, ArrowUpRight, AlertTriangle, PauseCircle, Minus } from 'lucide-react'
import type { DashboardPayload } from '../../types/dashboard'
import { StatusBadge } from '../feedback/StatusBadge'
import { formatBRL, formatNumber } from '../../utils/currency'
import {
  topByInvestment, topByWins, topByPlates,
  adsToScale, itemsToReview, pausedCampaigns, noCrmItems,
} from '../../utils/metrics'

interface Props {
  data: DashboardPayload
}

function Section({ icon, title, color, children }: {
  icon: React.ReactNode; title: string; color: string; children: React.ReactNode
}) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className={color}>{icon}</span>
        <p className="text-sm font-bold text-white">{title}</p>
      </div>
      {children}
    </div>
  )
}

export function DecisionsPanel({ data }: Props) {
  const topInvest = topByInvestment(data.campaigns)
  const topWins = topByWins(data.campaigns)
  const topPlates = topByPlates(data.campaigns)
  const toScale = adsToScale(data.ads)
  const toReview = itemsToReview(data)
  const paused = pausedCampaigns(data)
  const noCrm = noCrmItems(data)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      <Section icon={<TrendingUp size={18} />} title="Destaques de Campanha" color="text-yellow-400">
        <div className="space-y-3">
          {topInvest && (
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Maior investimento</p>
                <p className="text-sm text-white font-semibold">{topInvest.campaignName}</p>
              </div>
              <p className="text-yellow-400 font-bold text-sm whitespace-nowrap">{formatBRL(topInvest.investment)}</p>
            </div>
          )}
          {topWins && (
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Mais ganhos</p>
                <p className="text-sm text-white font-semibold">{topWins.campaignName}</p>
              </div>
              <p className="text-emerald-400 font-bold text-sm">{formatNumber(topWins.wins)} ganhos</p>
            </div>
          )}
          {topPlates && (
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wide">Mais placas</p>
                <p className="text-sm text-white font-semibold">{topPlates.campaignName}</p>
              </div>
              <p className="text-blue-400 font-bold text-sm">{formatNumber(topPlates.wonPlates)} placas</p>
            </div>
          )}
        </div>
      </Section>

      <Section icon={<ArrowUpRight size={18} />} title={`Anúncios para Escalar (${toScale.length})`} color="text-emerald-400">
        {toScale.length === 0 ? (
          <p className="text-zinc-500 text-sm">Nenhum anúncio marcado para escalar.</p>
        ) : (
          <div className="space-y-2">
            {toScale.slice(0, 5).map(a => (
              <div key={a.adId} className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-zinc-500 font-mono">{a.adId}</p>
                  <p className="text-xs text-zinc-300">{a.adGroupName}</p>
                </div>
                <div className="text-right">
                  <p className="text-yellow-400 text-xs font-semibold">{formatBRL(a.investment)}</p>
                  <p className="text-emerald-400 text-xs">{formatNumber(a.wins)} ganhos</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section icon={<AlertTriangle size={18} />} title={`Para Revisar (${toReview.campaigns.length + toReview.ads.length})`} color="text-red-400">
        <div className="space-y-2">
          {toReview.campaigns.map(c => (
            <div key={c.campaignId} className="flex items-center justify-between">
              <span className="text-xs text-zinc-300">{c.campaignName}</span>
              <StatusBadge status={c.decision} />
            </div>
          ))}
          {toReview.ads.map(a => (
            <div key={a.adId} className="flex items-center justify-between">
              <span className="text-xs text-zinc-500 font-mono">Anúncio {a.adId}</span>
              <StatusBadge status={a.decision} />
            </div>
          ))}
          {toReview.campaigns.length + toReview.ads.length === 0 && (
            <p className="text-zinc-500 text-sm">Nenhum item para revisar.</p>
          )}
        </div>
      </Section>

      <Section icon={<PauseCircle size={18} />} title={`Campanhas Pausadas (${paused.length})`} color="text-zinc-400">
        {paused.length === 0 ? (
          <p className="text-zinc-500 text-sm">Nenhuma campanha pausada.</p>
        ) : (
          <div className="space-y-2">
            {paused.map(c => (
              <div key={c.campaignId} className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">{c.campaignName}</span>
                <StatusBadge status={c.decision} />
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section icon={<Minus size={18} />} title={`Sem CRM (${noCrm.length})`} color="text-zinc-500">
        {noCrm.length === 0 ? (
          <p className="text-zinc-500 text-sm">Todos os itens têm dados de CRM.</p>
        ) : (
          <div className="space-y-2">
            {noCrm.map(c => (
              <div key={c.campaignId} className="flex items-center justify-between">
                <span className="text-xs text-zinc-300">{c.campaignName}</span>
                <StatusBadge status={c.decision} />
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section icon={<Award size={18} />} title="Métricas de Eficiência" color="text-blue-400">
        <div className="space-y-3">
          {data.campaigns.filter(c => c.wins > 0).sort((a, b) => a.costPerWin - b.costPerWin).slice(0, 4).map(c => (
            <div key={c.campaignId} className="flex items-center justify-between gap-2">
              <p className="text-xs text-zinc-300 truncate">{c.campaignName}</p>
              <p className="text-xs text-white font-semibold whitespace-nowrap">{formatBRL(c.costPerWin)}<span className="text-zinc-500">/ganho</span></p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
