import type { Handler } from '@netlify/functions'

const CACHE_TTL_MS = 60_000
const FETCH_TIMEOUT_MS = 8_000

let cache: { data: unknown; ts: number } | null = null

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método não permitido.' }) }
  }

  const apiUrl = process.env.MONACO_DATA_API_URL
  const apiToken = process.env.MONACO_DATA_API_TOKEN

  if (!apiUrl) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Variável MONACO_DATA_API_URL não configurada.' }),
    }
  }

  if (cache && Date.now() - cache.ts < CACHE_TTL_MS) {
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' },
      body: JSON.stringify(cache.data),
    }
  }

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)

  try {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    if (apiToken) headers['Authorization'] = `Bearer ${apiToken}`

    const res = await fetch(apiUrl, { method: 'GET', headers, signal: controller.signal })

    if (!res.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `Upstream retornou ${res.status}.` }),
      }
    }

    const data: unknown = await res.json()

    if (typeof data !== 'object' || data === null) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Resposta inválida da fonte de dados.' }),
      }
    }

    cache = { data, ts: Date.now() }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS' },
      body: JSON.stringify(data),
    }
  } catch (err) {
    const msg = err instanceof DOMException && err.name === 'AbortError'
      ? 'Tempo limite excedido ao buscar dados.'
      : 'Erro interno ao buscar dados.'

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: msg }),
    }
  } finally {
    clearTimeout(timer)
  }
}
