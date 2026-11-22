import { useMemo, useState } from 'react'
import { Bath, Camera, Check, ChefHat, Info, Minus, Plus, Sofa, Sparkles, type LucideIcon } from 'lucide-react'
import { ADDONS, FREQUENCIES, TIERS, type AddOnId, type Frequency, type Tier } from '@/data/catalog'
import { computeQuote, formatBDT, type AddOnSelection, type Quote } from '@/lib/pricing'
import { SummaryCard } from './SummaryCard'

const ADDON_ICONS: Record<AddOnId, LucideIcon> = {
  bodycam: Camera,
  germ: Bath,
  degrease: ChefHat,
  upholstery: Sofa,
}

function StepHeader({ n, title, children }: { n: number; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <span className="font-display grid h-8 w-8 place-items-center rounded-full bg-forest text-sm font-extrabold text-white">{n}</span>
        <h3 className="font-display text-lg font-extrabold text-forest">{title}</h3>
      </div>
      {children}
    </div>
  )
}

function BhkTooltip() {
  const [open, setOpen] = useState(false)
  return (
    <span className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-label="What does BHK mean?"
        aria-describedby="bhk-tip"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        className="grid h-11 w-11 place-items-center rounded-full text-forest transition hover:bg-sage"
      >
        <Info className="h-5 w-5" />
      </button>
      <span
        id="bhk-tip"
        role="tooltip"
        className={`absolute right-0 top-12 z-20 w-72 rounded-2xl border border-forest/10 bg-white p-4 text-left text-xs leading-relaxed text-slate-600 shadow-lift transition ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <strong className="font-display text-forest">BHK = Bedroom, Hall, Kitchen.</strong>
        <span className="mt-1.5 block">
          Every Base Regular Eco-Clean includes sweeping, vacuuming, non-toxic neutral-pH mopping, microfiber dusting, bathroom
          cleaning and a light kitchen wipe-down.
        </span>
      </span>
    </span>
  )
}

function Stepper({ value, max, onChange, label }: { value: number; max: number; onChange: (n: number) => void; label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white" role="group" aria-label={label}>
      <button
        type="button"
        aria-label="Fewer sessions"
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className="grid h-11 w-11 place-items-center rounded-full text-forest transition hover:bg-sage disabled:opacity-30"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="tabular min-w-[4.5rem] text-center text-sm font-semibold text-ink">
        {value} {value === 1 ? 'session' : 'sessions'}
      </span>
      <button
        type="button"
        aria-label="More sessions"
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
        className="grid h-11 w-11 place-items-center rounded-full text-forest transition hover:bg-sage disabled:opacity-30"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}

export function PlanBuilder({ onBook }: { onBook: (quote: Quote) => void }) {
  const [tierId, setTierId] = useState<Tier['id']>('bhk2')
  const [sessions, setSessions] = useState<Frequency['sessions']>(4)
  const [deep, setDeep] = useState(false)
  const [addOns, setAddOns] = useState<AddOnSelection>({})

  const quote = useMemo(() => computeQuote(tierId, sessions, deep, addOns), [tierId, sessions, deep, addOns])
  const tier = quote.tier

  const toggleAddOn = (id: AddOnId) =>
    setAddOns((prev) => {
      const next = { ...prev }
      if (next[id]) delete next[id]
      else next[id] = 1
      return next
    })

  const setAddOnSessions = (id: AddOnId, n: number) => setAddOns((prev) => ({ ...prev, [id]: n }))

  return (
    <section id="builder" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Build Your Own Plan</p>
          <h2 className="section-title mt-3">Configure it like a PC build. Pay only for what you need.</h2>
          <p className="mt-4 text-pretty text-slate-600">
            Choose your space, how often we visit and any extras. Your monthly total updates instantly.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_390px] lg:items-start">
          <div className="space-y-10">
            {/* Step 1 */}
            <div>
              <StepHeader n={1} title="Choose home / room size">
                <BhkTooltip />
              </StepHeader>
              <p className="-mt-2 mb-4 text-sm text-slate-500">Base price is per 1 Regular Eco-Clean session.</p>
              <div role="radiogroup" aria-label="Home size" className="grid gap-3 sm:grid-cols-2">
                {TIERS.map((t) => {
                  const active = t.id === tierId
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setTierId(t.id)}
                      className={`relative rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf ${
                        active
                          ? 'border-forest bg-sage shadow-card ring-1 ring-forest'
                          : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-leaf/60 hover:shadow-card'
                      }`}
                    >
                      {active && (
                        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full bg-forest text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                      )}
                      <p className="font-display pr-6 text-sm font-extrabold text-forest">{t.name}</p>
                      <p className="mt-1.5 text-xs text-slate-600">{t.layout}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {t.sqft} · {t.crew}
                      </p>
                      <p className="font-display tabular mt-3 text-xl font-extrabold text-forest">
                        {formatBDT(t.base)} <span className="text-xs font-semibold text-slate-500">/ session</span>
                      </p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <StepHeader n={2} title="Choose monthly frequency" />
              <div role="radiogroup" aria-label="Monthly frequency" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {FREQUENCIES.map((f) => {
                  const active = f.sessions === sessions
                  return (
                    <button
                      key={f.sessions}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setSessions(f.sessions)}
                      className={`rounded-2xl border p-4 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf ${
                        active
                          ? 'border-forest bg-forest text-white shadow-card'
                          : 'border-slate-200 bg-white hover:-translate-y-0.5 hover:border-leaf/60 hover:shadow-card'
                      }`}
                    >
                      <p className="font-display text-base font-extrabold">{f.label}</p>
                      <p className={`text-xs ${active ? 'text-white/70' : 'text-slate-500'}`}>{f.cadence}</p>
                      <p
                        className={`font-display tabular mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          active ? 'bg-leaf text-forest' : 'bg-sage text-forest'
                        }`}
                      >
                        {f.discountPct}% Off
                      </p>
                    </button>
                  )
                })}
              </div>
              <p className="mt-3 text-sm italic text-slate-500">
                Frequency discount applies only to the total Base Regular Clean price (Base Price × Sessions).
              </p>
            </div>

            {/* Step 3 */}
            <div>
              <StepHeader n={3} title="Monthly Deep Clean upgrade" />
              <label
                className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 transition duration-200 ${
                  deep ? 'border-forest bg-sage ring-1 ring-forest' : 'border-slate-200 bg-white hover:border-leaf/60'
                }`}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-forest text-leaf">
                  <Sparkles className="h-5 w-5" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="font-display block text-sm font-extrabold text-forest">
                    Upgrade 1 visit to a Full Machine Deep Clean
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-600">
                    Floor scrubbing machine, pressure washer, fan / window / grill cleaning and a deep kitchen and bathroom wash. Once per
                    month, fixed charge, no frequency discount.
                  </span>
                  <span className="font-display tabular mt-2 block text-sm font-extrabold text-leaf-600">
                    +{formatBDT(tier.deep)} for {tier.name}
                  </span>
                </span>
                <span className="relative mt-1 inline-flex h-7 w-12 shrink-0 items-center">
                  <input
                    type="checkbox"
                    role="switch"
                    checked={deep}
                    onChange={(e) => setDeep(e.target.checked)}
                    aria-label="Add monthly deep clean"
                    className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                  />
                  <span className="h-7 w-12 rounded-full bg-slate-300 transition peer-checked:bg-forest peer-focus-visible:ring-4 peer-focus-visible:ring-leaf/30" />
                  <span className="pointer-events-none absolute left-0.5 h-6 w-6 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
                </span>
              </label>
            </div>

            {/* Step 4 */}
            <div>
              <StepHeader n={4} title="Optional add-ons" />
              <p className="-mt-2 mb-4 text-sm text-slate-500">
                Fixed per-session charges. Choose up to {sessions} {sessions === 1 ? 'session' : 'sessions'} each. No frequency discount.
              </p>
              <ul className="space-y-3">
                {ADDONS.map((a) => {
                  const Icon = ADDON_ICONS[a.id]
                  const chosen = addOns[a.id]
                  const count = chosen ? Math.min(chosen, sessions) : 0
                  return (
                    <li
                      key={a.id}
                      className={`rounded-2xl border p-4 transition duration-200 ${
                        chosen ? 'border-forest bg-sage ring-1 ring-forest' : 'border-slate-200 bg-white hover:border-leaf/60'
                      }`}
                    >
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                        <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            checked={!!chosen}
                            onChange={() => toggleAddOn(a.id)}
                            className="h-5 w-5 shrink-0 accent-[#14532D]"
                          />
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-forest shadow-card">
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <span className="min-w-0">
                            <span className="font-display block text-sm font-extrabold text-forest">{a.name}</span>
                            <span className="block text-xs text-slate-500">{a.detail}</span>
                          </span>
                        </label>
                        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
                          <span className="font-display tabular text-sm font-extrabold text-forest">
                            +{formatBDT(a.pricePerSession)} <span className="text-xs font-semibold text-slate-500">/ session</span>
                          </span>
                          {chosen ? (
                            <Stepper
                              value={count}
                              max={sessions}
                              onChange={(n) => setAddOnSessions(a.id, n)}
                              label={`${a.name} sessions`}
                            />
                          ) : null}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <SummaryCard quote={quote} onBook={() => onBook(quote)} />
          </div>
        </div>
      </div>

      {/* Mobile running total */}
      <div className="pointer-events-none sticky bottom-16 z-30 mt-8 px-4 lg:hidden">
        <div className="glass pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-3 rounded-full border border-forest/15 py-2 pl-5 pr-2 shadow-lift">
          <div>
            <p className="text-[11px] text-slate-500">Monthly total</p>
            <p className="font-display tabular text-lg font-extrabold leading-none text-forest">{formatBDT(quote.total)}</p>
          </div>
          <button type="button" onClick={() => onBook(quote)} className="btn-primary !min-h-[44px] !px-5">
            Book Plan
          </button>
        </div>
      </div>
    </section>
  )
}
