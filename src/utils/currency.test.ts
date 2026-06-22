import { describe, it, expect } from 'vitest'
import { formatBRL, formatNumber, formatPercent } from './currency'

describe('formatBRL', () => {
  it('formata valor em reais no padrão brasileiro', () => {
    const result = formatBRL(6819.04)
    expect(result).toContain('6.819')
    expect(result).toContain('R$')
  })
})

describe('formatNumber', () => {
  it('formata número com separador de milhar', () => {
    expect(formatNumber(1696)).toContain('1.696')
  })
})

describe('formatPercent', () => {
  it('formata percentual com vírgula decimal', () => {
    const result = formatPercent(19.44)
    expect(result).toContain('%')
    expect(result).toContain('19')
  })
})
