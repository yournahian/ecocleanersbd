import { CalendarCheck, Tag } from 'lucide-react'
import { formatBDT, type Quote } from '@/lib/pricing'

function Row({ label, value, muted = false, accent = false }: { label: React.ReactNode; value: string; muted?: boolean; accent?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 text-sm">
      <dt className={muted ? 'text-slate-500' : 'text-slate-700'}>{label}</dt>
      <dd className={`tabular shrink-0 font-semibold ${accent ? 'text-leaf-600' : 'text-ink'}`}>{value}</dd>
    </div>
  )
}

export function SummaryCard({ quote, onBook }: { quote: Quote; onBook: () => void }) {
  return (
    <aside
      aria-label="Live bill summary"
      className="glass rounded-3xl border border-forest/10 p-6 shadow-lift"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-extrabold text-forest">Your monthly plan</h3>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-sage px-2.5 py-1 text-[11px] font-bold text-forest">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-leaf" />
          Live
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-sage p-4">
        <p className="font-display text-sm font-bold text-forest">{quote.tier.name}</p>
        <p className="mt-0.5 text-xs text-slate-600">
          {quote.tier.sqft} · {quote.tier.crew}
        </p>
        <p className="mt-0.5 text-xs text-slate-600">
          {quote.freq.label} · {quote.freq.cadence}
        </p>
      </div>

      <dl className="mt-4 divide-y divide-slate-100">
        <Row
          label={
            <>
              Gross base cost
              <span className="tabular block text-xs text-slate-400">
                {formatBDT(quote.tier.base)} x {quote.freq.sessions}
              </span>
            </>
          }
          value={formatBDT(quote.gross)}
        />
        <Row
          label={
            <span className="inline-flex items-center gap-2">
              Frequency discount
              <span className="tabular inline-flex items-center gap-1 rounded-full bg-leaf/15 px-2 py-0.5 text-[11px] font-bold text-forest">
                <Tag className="h-3 w-3" aria-hidden />
                {quote.discountPct}%
              </span>
            </span>
          }
          value={quote.discount > 0 ? `-${formatBDT(quote.discount)}` : formatBDT(0)}
          accent={quote.discount > 0}
        />
        <Row label="Net base cost" value={formatBDT(quote.net)} />
        {quote.deep > 0 && <Row label="Monthly Deep Clean upgrade" value={`+${formatBDT(quote.deep)}`} />}
        {quote.addOns.map((a) => (
          <Row
            key={a.id}
            label={
              <>
                {a.name}
                <span className="tabular block text-xs text-slate-400">
                  {a.sessions} x {formatBDT(a.unit)}
                </span>
              </>
            }
            value={`+${formatBDT(a.total)}`}
          />
        ))}
        {quote.addOns.length === 0 && quote.deep === 0 && <Row label="Add-ons" value="None" muted />}
      </dl>

      <div className="mt-4 flex items-end justify-between gap-4 rounded-2xl bg-forest p-4 text-white">
        <div>
          <p className="text-xs text-white/70">Final monthly total</p>
          <p className="text-[11px] text-white/50">BDT per month</p>
        </div>
        <p aria-live="polite" className="font-display tabular text-3xl font-extrabold text-leaf sm:text-4xl">
          {formatBDT(quote.total)}
        </p>
      </div>

      <button type="button" onClick={onBook} className="btn-primary mt-4 w-full !min-h-[52px] !text-base">
        <CalendarCheck className="h-4 w-4" aria-hidden />
        Book Custom Plan
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">Your 15% first-service discount is applied at confirmation. No online payment.</p>
    </aside>
  )
}
