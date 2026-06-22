import { describe, it, expect } from 'vitest'
import { topByInvestment, topByWins, adsToScale } from './metrics'
import type { CampaignPerformance, AdPerformance } from '../types/dashboard'

const campaigns: CampaignPerformance[] = [
  { campaignId: '1', campaignName: 'A', investment: 1000, googleConversions: 5, crmLeads: 5, wins: 2, lost: 1, open: 2, wonPlates: 10, realCpl: 200, costPerWin: 500, winRate: 40, decision: 'MANTER', active: true },
  { campaignId: '2', campaignName: 'B', investment: 3000, googleConversions: 10, crmLeads: 10, wins: 5, lost: 2, open: 3, wonPlates: 100, realCpl: 300, costPerWin: 600, winRate: 50, decision: 'ESCALAR', active: true },
]

describe('topByInvestment', () => {
  it('retorna campanha com maior investimento', () => {
    expect(topByInvestment(campaigns)?.campaignId).toBe('2')
  })
})

describe('topByWins', () => {
  it('retorna campanha com mais ganhos', () => {
    expect(topByWins(campaigns)?.campaignId).toBe('2')
  })
})

describe('adsToScale', () => {
  const ads: AdPerformance[] = [
    { campaignName: 'A', adGroupName: 'G', adId: '1', investment: 100, googleConversions: 1, crmLeads: 1, wins: 1, lost: 0, open: 0, wonPlates: 10, realCpl: 100, costPerWin: 100, winRate: 100, decision: 'ESCALAR' },
    { campaignName: 'A', adGroupName: 'G', adId: '2', investment: 200, googleConversions: 0, crmLeads: 0, wins: 0, lost: 1, open: 0, wonPlates: 0, realCpl: 0, costPerWin: 0, winRate: 0, decision: 'REVISAR' },
  ]
  it('filtra anúncios marcados para escalar', () => {
    expect(adsToScale(ads)).toHaveLength(1)
    expect(adsToScale(ads)[0].adId).toBe('1')
  })
})
