import { useState, useMemo } from 'react'
import type { DashboardPayload, CampaignPerformance, DecisionStatus } from '../types/dashboard'

export interface FilterState {
  search: string
  campaignId: string
  adGroupId: string
  activeStatus: 'all' | 'active' | 'paused'
  decision: DecisionStatus | 'all'
}

const defaultFilters: FilterState = {
  search: '',
  campaignId: 'all',
  adGroupId: 'all',
  activeStatus: 'all',
  decision: 'all',
}

export function useDashboardFilters(data: DashboardPayload | null) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => setFilters(defaultFilters)

  const filteredCampaigns = useMemo((): CampaignPerformance[] => {
    if (!data) return []
    return data.campaigns.filter(c => {
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (!c.campaignName.toLowerCase().includes(q) && !c.campaignId.includes(q)) return false
      }
      if (filters.campaignId !== 'all' && c.campaignId !== filters.campaignId) return false
      if (filters.activeStatus === 'active' && c.active === false) return false
      if (filters.activeStatus === 'paused' && c.active !== false) return false
      if (filters.decision !== 'all' && c.decision !== filters.decision) return false
      return true
    })
  }, [data, filters])

  const filteredAdGroups = useMemo(() => {
    if (!data) return []
    return data.adGroups.filter(g => {
      if (filters.campaignId !== 'all' && g.campaignId !== filters.campaignId) return false
      if (filters.adGroupId !== 'all' && g.adGroupId !== filters.adGroupId) return false
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !g.adGroupName.toLowerCase().includes(q) &&
          !g.campaignName.toLowerCase().includes(q) &&
          !g.adGroupId.includes(q)
        ) return false
      }
      if (filters.decision !== 'all' && g.decision !== filters.decision) return false
      return true
    })
  }, [data, filters])

  const filteredAds = useMemo(() => {
    if (!data) return []
    return data.ads.filter(a => {
      if (filters.campaignId !== 'all') {
        const campaign = data.campaigns.find(c => c.campaignId === filters.campaignId)
        if (campaign && a.campaignName !== campaign.campaignName) return false
      }
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !a.adId.includes(q) &&
          !a.campaignName.toLowerCase().includes(q) &&
          !a.adGroupName.toLowerCase().includes(q)
        ) return false
      }
      if (filters.decision !== 'all' && a.decision !== filters.decision) return false
      return true
    })
  }, [data, filters])

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredCampaigns,
    filteredAdGroups,
    filteredAds,
  }
}
