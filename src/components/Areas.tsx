import { useState } from 'react'
import { MapPin, Sparkles, SprayCan } from 'lucide-react'
import { AREAS, type Area } from '@/data/catalog'

export function Areas({ onBook }: { onBook: (area?: Area) => void }) {
  const [active, setActive] = useState<Area>('Dhanmondi')

  return (
    <section id="areas" className="bg-sage py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">Service Areas</p>
          <h2 className="section-title mt-3">Now cleaning across five Dhaka neighbourhoods.</h2>
          <p className="mt-4 max-w-lg text-pretty text-slate-600">
            Tap your area to check availability. We are growing fast, so if you are nearby, book anyway and we will confirm by phone.
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5" role="radiogroup" aria-label="Service areas">
            {AREAS.map((a) => {
              const on = a === active
              return (
                <button
                  key={a}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => setActive(a)}
                  className={`inline-flex min-h-[44px] items-center gap-2 rounded-full border px-5 font-display text-sm font-bold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf ${
                    on
                      ? 'border-forest bg-forest text-white shadow-card'
                      : 'border-forest/15 bg-white text-forest hover:-translate-y-0.5 hover:border-leaf'
                  }`}
                >
                  <MapPin className={`h-4 w-4 ${on ? 'text-leaf' : 'text-leaf-600'}`} aria-hidden />
                  {a}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-forest/10 bg-white p-5 shadow-card sm:flex-row sm:items-center sm:justify-between" aria-live="polite">
            <p className="text-sm text-slate-700">
              <strong className="font-display text-forest">{active}</strong> is covered by our trained local teams.
            </p>
            <button type="button" className="btn-primary !min-h-[44px] shrink-0" onClick={() => onBook(active)}>
              Book in {active}
            </button>
          </div>
        </div>

        <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-card sm:p-8">
          <h3 className="font-display text-xl font-extrabold text-forest">Not ready to subscribe?</h3>
          <p className="mt-1 text-sm text-slate-600">One-time cleaning is available for everyone, no commitment.</p>

          <ul className="mt-6 space-y-4">
            <li className="flex gap-4 rounded-2xl bg-sage p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-leaf">
                <SprayCan className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-sm font-extrabold text-forest">One-time Regular Cleaning</p>
                <p className="font-display tabular mt-0.5 text-lg font-extrabold text-leaf-600">৳1,200 – ৳4,800</p>
                <p className="mt-1 text-xs text-slate-600">Sweeping, vacuuming, neutral-pH mopping, dusting, bathrooms and a light kitchen wipe-down.</p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl bg-sage p-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-leaf">
                <Sparkles className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="font-display text-sm font-extrabold text-forest">One-time Deep Cleaning</p>
                <p className="font-display tabular mt-0.5 text-lg font-extrabold text-leaf-600">৳5,000 – ৳12,000</p>
                <p className="mt-1 text-xs text-slate-600">Machine scrubbing, pressure washing, fans, windows, grills and a deep kitchen and bathroom wash.</p>
              </div>
            </li>
          </ul>

          <button type="button" className="btn-ghost mt-6 w-full" onClick={() => onBook()}>
            Book a one-time cleaning
          </button>
        </div>
      </div>
    </section>
  )
}
