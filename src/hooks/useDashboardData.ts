import { useState, useEffect, useCallback } from 'react'
import type { DashboardPayload } from '../types/dashboard'
import { mockDashboard } from '../data/mockDashboard'
import { fetchDashboardData } from '../services/dashboardApi'

type Status = 'idle' | 'loading' | 'success' | 'error'

interface UseDashboardDataResult {
  data: DashboardPayload | null
  status: Status
  error: string | null
  isMock: boolean
  refresh: () => void
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

export function useDashboardData(): UseDashboardDataResult {
  const [data, setData] = useState<DashboardPayload | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setStatus('loading')
    setError(null)

    if (USE_MOCK) {
      await new Promise(r => setTimeout(r, 600))
      setData(mockDashboard)
      setStatus('success')
      return
    }

    try {
      const payload = await fetchDashboardData()
      setData(payload)
      setStatus('success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao carregar dados.'
      setError(msg)
      setStatus('error')
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { data, status, error, isMock: USE_MOCK, refresh: load }
}
