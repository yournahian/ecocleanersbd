import { useEffect, useState } from 'react'
import { BatteryFull, CheckCircle2, Circle, Signal, UserCheck, Wifi } from 'lucide-react'

const TASKS = [
  { label: 'Sweeping & vacuuming', done: true },
  { label: 'Neutral-pH floor mopping', done: true },
  { label: 'Bathroom germ-shield scrub', done: false },
  { label: 'Kitchen wipe-down', done: false },
]

function pad(n: number) {
  return String(n).padStart(2, '0')
}

/** Illustrative UI preview of the live body-cam status card. Not a real feed. */
export function BodyCamCard() {
  const [seconds, setSeconds] = useState(18 * 60 + 42)

  useEffect(() => {
    const id = window.setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-ink text-white shadow-lift">
      {/* Viewfinder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-forest-900 via-forest to-slate-900">
        <div aria-hidden className="absolute inset-0 opacity-30" style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        <svg aria-hidden className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
          <rect x="30" y="110" width="260" height="90" fill="#0E3F22" />
          <rect x="60" y="60" width="90" height="80" rx="6" fill="#166534" />
          <rect x="170" y="80" width="80" height="60" rx="6" fill="#14532D" />
          <circle cx="250" cy="50" r="22" fill="#22C55E" opacity="0.25" />
        </svg>
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-2.5 py-1 text-[11px] font-bold tracking-wider">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            LIVE
          </span>
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-semibold tabular backdrop-blur">
            {pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}
          </span>
        </div>
        <div className="absolute right-3 top-3 flex items-center gap-2 text-white/80">
          <Wifi className="h-4 w-4" aria-hidden />
          <Signal className="h-4 w-4" aria-hidden />
          <BatteryFull className="h-4 w-4" aria-hidden />
        </div>
        <div className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
          Living room · Camera 1
        </div>
        <div className="absolute bottom-3 right-3 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium backdrop-blur">
          Sample preview
        </div>
      </div>

      {/* Status */}
      <div className="space-y-4 p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-leaf/15 text-leaf">
              <UserCheck className="h-5 w-5" aria-hidden />
            </span>
            <div>
              <p className="font-display text-sm font-bold">Your cleaner is on site</p>
              <p className="text-xs text-white/60">ID verified · Background-checked</p>
            </div>
          </div>
          <span className="rounded-full bg-leaf/15 px-2.5 py-1 text-[11px] font-bold text-leaf">In progress</span>
        </div>

        <ul className="space-y-2">
          {TASKS.map((t) => (
            <li key={t.label} className="flex items-center gap-2.5 text-sm">
              {t.done ? (
                <CheckCircle2 className="h-4 w-4 text-leaf" aria-hidden />
              ) : (
                <Circle className="h-4 w-4 text-white/30" aria-hidden />
              )}
              <span className={t.done ? 'text-white' : 'text-white/55'}>{t.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
