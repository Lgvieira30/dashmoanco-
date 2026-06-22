import { z } from 'zod'

export type DecisionStatus =
  | 'ESCALAR'
  | 'MANTER'
  | 'OBSERVAR'
  | 'REVISAR'
  | 'PAUSADA'
  | 'PAUSADO'
  | 'SEM CRM'

export interface DashboardSummary {
  investment: number
  googleConversions: number
  crmLeads: number
  wins: number
  lost: number
  open: number
  wonPlates: number
  realCpl: number
  costPerWin: number
  winRate: number
}

export interface CampaignPerformance {
  campaignId: string
  campaignName: string
  investment: number
  googleConversions: number
  crmLeads: number
  wins: number
  lost: number
  open: number
  wonPlates: number
  realCpl: number
  costPerWin: number
  winRate: number
  decision: DecisionStatus
  active: boolean | null
}

export interface AdGroupPerformance {
  campaignId: string
  campaignName: string
  adGroupId: string
  adGroupName: string
  investment: number
  googleConversions: number
  crmLeads: number
  wins: number
  lost: number
  open: number
  wonPlates: number
  costPerWin: number
  winRate: number
  decision: DecisionStatus
}

export interface AdPerformance {
  campaignName: string
  adGroupName: string
  adId: string
  investment: number
  googleConversions: number
  crmLeads: number
  wins: number
  lost: number
  open: number
  wonPlates: number
  realCpl: number
  costPerWin: number
  winRate: number
  decision: DecisionStatus
}

export interface MatchTypePerformance {
  matchType: 'EXACT' | 'PHRASE' | 'BROAD'
  adGroupId: string
  investment: number
  impressions: number
  clicks: number
  googleConversions: number
  crmLeads: number
  wins: number
  lost: number
  wonPlates: number
  realCpl: number
  costPerWin: number
  winRate: number
  decision: DecisionStatus
}

export interface DashboardPayload {
  generatedAt: string
  periodStart: string
  periodEnd: string
  mode: 'mock' | 'live'
  summary: DashboardSummary
  campaigns: CampaignPerformance[]
  adGroups: AdGroupPerformance[]
  ads: AdPerformance[]
  matchTypes: MatchTypePerformance[]
  keywords: unknown[]
  searchTerms: unknown[]
}

// Zod schemas for runtime validation
const DecisionStatusSchema = z.enum([
  'ESCALAR', 'MANTER', 'OBSERVAR', 'REVISAR', 'PAUSADA', 'PAUSADO', 'SEM CRM',
])

const DashboardSummarySchema = z.object({
  investment: z.number(),
  googleConversions: z.number(),
  crmLeads: z.number(),
  wins: z.number(),
  lost: z.number(),
  open: z.number(),
  wonPlates: z.number(),
  realCpl: z.number(),
  costPerWin: z.number(),
  winRate: z.number(),
})

const CampaignPerformanceSchema = z.object({
  campaignId: z.string(),
  campaignName: z.string(),
  investment: z.number(),
  googleConversions: z.number(),
  crmLeads: z.number(),
  wins: z.number(),
  lost: z.number(),
  open: z.number(),
  wonPlates: z.number(),
  realCpl: z.number(),
  costPerWin: z.number(),
  winRate: z.number(),
  decision: DecisionStatusSchema,
  active: z.boolean().nullable(),
})

const AdGroupPerformanceSchema = z.object({
  campaignId: z.string(),
  campaignName: z.string(),
  adGroupId: z.string(),
  adGroupName: z.string(),
  investment: z.number(),
  googleConversions: z.number(),
  crmLeads: z.number(),
  wins: z.number(),
  lost: z.number(),
  open: z.number(),
  wonPlates: z.number(),
  costPerWin: z.number(),
  winRate: z.number(),
  decision: DecisionStatusSchema,
})

const AdPerformanceSchema = z.object({
  campaignName: z.string(),
  adGroupName: z.string(),
  adId: z.string(),
  investment: z.number(),
  googleConversions: z.number(),
  crmLeads: z.number(),
  wins: z.number(),
  lost: z.number(),
  open: z.number(),
  wonPlates: z.number(),
  realCpl: z.number(),
  costPerWin: z.number(),
  winRate: z.number(),
  decision: DecisionStatusSchema,
})

const MatchTypePerformanceSchema = z.object({
  matchType: z.enum(['EXACT', 'PHRASE', 'BROAD']),
  adGroupId: z.string(),
  investment: z.number(),
  impressions: z.number(),
  clicks: z.number(),
  googleConversions: z.number(),
  crmLeads: z.number(),
  wins: z.number(),
  lost: z.number(),
  wonPlates: z.number(),
  realCpl: z.number(),
  costPerWin: z.number(),
  winRate: z.number(),
  decision: DecisionStatusSchema,
})

export const DashboardPayloadSchema = z.object({
  generatedAt: z.string(),
  periodStart: z.string(),
  periodEnd: z.string(),
  mode: z.enum(['mock', 'live']),
  summary: DashboardSummarySchema,
  campaigns: z.array(CampaignPerformanceSchema),
  adGroups: z.array(AdGroupPerformanceSchema),
  ads: z.array(AdPerformanceSchema),
  matchTypes: z.array(MatchTypePerformanceSchema),
  keywords: z.array(z.unknown()),
  searchTerms: z.array(z.unknown()),
})
