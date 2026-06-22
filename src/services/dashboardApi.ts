import { DashboardPayloadSchema, type DashboardPayload } from '../types/dashboard'

const TIMEOUT_MS = 10_000

export async function fetchDashboardData(): Promise<DashboardPayload> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

  try {
    const res = await fetch('/.netlify/functions/dashboard-data', {
      signal: controller.signal,
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    if (!res.ok) {
      const text = await res.text().catch(() => 'Erro desconhecido')
      throw new Error(`Servidor retornou ${res.status}: ${text}`)
    }

    const json: unknown = await res.json()
    const parsed = DashboardPayloadSchema.safeParse(json)

    if (!parsed.success) {
      console.error('Validação falhou:', parsed.error.flatten())
      throw new Error('Dados recebidos com formato inválido.')
    }

    return parsed.data
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new Error('Tempo limite excedido ao buscar dados.', { cause: err })
    }
    throw err instanceof Error ? err : new Error('Erro desconhecido', { cause: err })
  } finally {
    clearTimeout(timer)
  }
}
