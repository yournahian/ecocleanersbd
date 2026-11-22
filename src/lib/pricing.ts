import { ADDONS, FREQUENCIES, TIERS, type AddOnId, type Frequency, type Pack, type Tier } from '@/data/catalog'

export type AddOnSelection = Partial<Record<AddOnId, number>> // sessions; absent or 0 = not selected

export interface QuoteLine {
  id: AddOnId
  name: string
  sessions: number
  unit: number
  total: number
}

export interface Quote {
  tier: Tier
  freq: Frequency
  gross: number
  discountPct: number
  discount: number
  net: number
  deep: number
  addOns: QuoteLine[]
  addOnTotal: number
  total: number
}

export type BookingRequest = { type: 'package'; pack: Pack } | { type: 'custom'; quote: Quote }

export function formatBDT(amount: number): string {
  return `৳${amount.toLocaleString('en-US')}`
}

/** All amounts are whole taka. Percentages are applied with integer math (gross * pct / 100, rounded). */
export function computeQuote(
  tierId: Tier['id'],
  sessions: Frequency['sessions'],
  deepClean: boolean,
  selection: AddOnSelection,
): Quote {
  const tier = TIERS.find((t) => t.id === tierId) ?? TIERS[0]
  const freq = FREQUENCIES.find((f) => f.sessions === sessions) ?? FREQUENCIES[0]

  const gross = tier.base * freq.sessions
  const discount = Math.round((gross * freq.discountPct) / 100)
  const net = gross - discount
  const deep = deepClean ? tier.deep : 0

  const addOns: QuoteLine[] = []
  for (const addOn of ADDONS) {
    const chosen = selection[addOn.id] ?? 0
    if (chosen <= 0) continue
    const count = Math.min(Math.max(1, Math.floor(chosen)), freq.sessions)
    addOns.push({
      id: addOn.id,
      name: addOn.name,
      sessions: count,
      unit: addOn.pricePerSession,
      total: addOn.pricePerSession * count,
    })
  }
  const addOnTotal = addOns.reduce((sum, line) => sum + line.total, 0)

  return {
    tier,
    freq,
    gross,
    discountPct: freq.discountPct,
    discount,
    net,
    deep,
    addOns,
    addOnTotal,
    total: net + deep + addOnTotal,
  }
}

export function quoteLines(quote: Quote): string[] {
  const lines = [
    `Space: ${quote.tier.name} (${quote.tier.sqft})`,
    `Frequency: ${quote.freq.label} (${quote.freq.cadence})`,
    `Base: ${formatBDT(quote.tier.base)} x ${quote.freq.sessions} = ${formatBDT(quote.gross)}`,
  ]
  if (quote.discount > 0) lines.push(`Frequency discount (${quote.discountPct}%): -${formatBDT(quote.discount)}`)
  lines.push(`Net base: ${formatBDT(quote.net)}`)
  if (quote.deep > 0) lines.push(`Monthly Deep Clean upgrade: +${formatBDT(quote.deep)}`)
  for (const line of quote.addOns) {
    lines.push(`${line.name} (${line.sessions} x ${formatBDT(line.unit)}): +${formatBDT(line.total)}`)
  }
  lines.push(`Monthly total: ${formatBDT(quote.total)}`)
  return lines
}
