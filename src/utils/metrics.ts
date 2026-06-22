import type { CampaignPerformance, AdPerformance, DashboardPayload } from '../types/dashboard'

export function topByInvestment(campaigns: CampaignPerformance[]): CampaignPerformance | null {
  return campaigns.reduce<CampaignPerformance | null>((top, c) => {
    return !top || c.investment > top.investment ? c : top
  }, null)
}

export function topByWins(campaigns: CampaignPerformance[]): CampaignPerformance | null {
  return campaigns.reduce<CampaignPerformance | null>((top, c) => {
    return !top || c.wins > top.wins ? c : top
  }, null)
}

export function topByPlates(campaigns: CampaignPerformance[]): CampaignPerformance | null {
  return campaigns.reduce<CampaignPerformance | null>((top, c) => {
    return !top || c.wonPlates > top.wonPlates ? c : top
  }, null)
}

export function adsToScale(ads: AdPerformance[]): AdPerformance[] {
  return ads.filter(a => a.decision === 'ESCALAR')
}

export function itemsToReview(payload: DashboardPayload) {
  return {
    campaigns: payload.campaigns.filter(c => c.decision === 'REVISAR'),
    adGroups: payload.adGroups.filter(g => g.decision === 'REVISAR'),
    ads: payload.ads.filter(a => a.decision === 'REVISAR'),
  }
}

export function pausedCampaigns(payload: DashboardPayload): CampaignPerformance[] {
  return payload.campaigns.filter(c => c.decision === 'PAUSADA' || c.decision === 'PAUSADO')
}

export function noCrmItems(payload: DashboardPayload): CampaignPerformance[] {
  return payload.campaigns.filter(c => c.decision === 'SEM CRM')
}
