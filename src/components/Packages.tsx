import { Check, Star } from 'lucide-react'
import { PACKS, type Pack } from '@/data/catalog'
import { formatBDT } from '@/lib/pricing'

export function Packages({ onSelect }: { onSelect: (pack: Pack) => void }) {
  return (
    <section id="packages" className="bg-sage py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Ready Subscription Packages</p>
          <h2 className="section-title mt-3">Pick a plan like you pick a data bundle.</h2>
          <p className="mt-4 text-pretty text-slate-600">
            Simple monthly bundles for every kind of Dhaka home. Cancel or switch any time.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PACKS.map((pack) => (
            <li key={pack.id} className="relative flex">
              {pack.popular && (
                <span className="font-display absolute -top-3 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-leaf px-3.5 py-1 text-xs font-bold text-forest shadow-card">
                  <Star className="h-3.5 w-3.5 fill-current" aria-hidden />
                  Most Popular
                </span>
              )}
              <article
                className={`flex w-full flex-col rounded-3xl p-6 transition duration-200 hover:-translate-y-1 ${
                  pack.popular
                    ? 'bg-forest text-white shadow-lift ring-2 ring-leaf'
                    : 'border border-slate-200/80 bg-white shadow-card hover:border-leaf/50 hover:shadow-lift'
                }`}
              >
                <h3 className="font-display text-lg font-extrabold">{pack.name}</h3>
                <p className={`mt-1 text-sm ${pack.popular ? 'text-white/70' : 'text-slate-500'}`}>{pack.audience}</p>

                <p className="mt-5 flex items-baseline gap-1.5">
                  <span className="font-display tabular text-4xl font-extrabold">{formatBDT(pack.price)}</span>
                  <span className={`text-sm ${pack.popular ? 'text-white/70' : 'text-slate-500'}`}>/ month</span>
                </p>

                <p
                  className={`mt-4 rounded-xl px-3 py-2 text-xs font-semibold ${
                    pack.popular ? 'bg-white/10 text-leaf' : 'bg-sage text-forest'
                  }`}
                >
                  {pack.scope}
                </p>

                <ul className="mt-5 flex-1 space-y-3">
                  {pack.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-snug">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${pack.popular ? 'text-leaf' : 'text-leaf-600'}`} aria-hidden />
                      <span className={pack.popular ? 'text-white/90' : 'text-slate-700'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => onSelect(pack)}
                  className={`mt-7 w-full ${
                    pack.popular
                      ? 'inline-flex min-h-[44px] items-center justify-center rounded-full bg-leaf px-6 font-display text-sm font-bold text-forest transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
                      : 'btn-primary'
                  }`}
                >
                  Select Package
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
