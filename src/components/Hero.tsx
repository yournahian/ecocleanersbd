import { ArrowRight, BadgePercent, Camera, ShieldCheck, UserCheck, Baby } from 'lucide-react'
import { motion } from 'framer-motion'

const BADGES = [
  { icon: Baby, label: '100% Kid & Pet Safe' },
  { icon: UserCheck, label: 'Background-Checked Staff' },
  { icon: Camera, label: 'Live Body-Cam Feed' },
  { icon: BadgePercent, label: '15% Off First Service' },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-sage pt-28 sm:pt-32">
      {/* Decorative leaf field */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-leaf/15 blur-3xl" />
        <div className="absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-forest/10 blur-3xl" />
        <svg className="absolute right-0 top-0 h-full w-1/2 opacity-[0.07]" viewBox="0 0 400 400" fill="none">
          {Array.from({ length: 9 }).map((_, i) => (
            <path
              key={i}
              d={`M${40 + i * 40} 400 C ${120 + i * 30} 260, ${200 + i * 20} 180, ${380} ${20 + i * 24}`}
              stroke="#14532D"
              strokeWidth="1.5"
            />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-forest/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-forest shadow-card">
            <ShieldCheck className="h-4 w-4 text-leaf-600" aria-hidden />
            Dhaka's eco-friendly residential cleaning
          </span>

          <h1 className="font-display mt-5 text-balance text-4xl font-extrabold leading-[1.05] text-forest sm:text-6xl">
            Spotless Homes. <span className="text-leaf-600">Zero Toxic Chemicals.</span> Live Body-Cam Safety.
          </h1>

          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
            Non-toxic cleaning for busy families, working couples and bachelors across Dhaka. Background-checked cleaners wear a live
            body camera, so you can watch your home being cared for from your phone.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#builder" className="btn-primary !min-h-[52px] !px-7 !text-base">
              Build Your Custom Plan
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <a href="#packages" className="btn-ghost !min-h-[52px] !px-7 !text-base">
              View Ready Packages
            </a>
          </div>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="glass flex items-center gap-3 rounded-2xl border border-white/80 p-3.5 shadow-card"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-forest text-leaf">
                <Icon className="h-[18px] w-[18px]" aria-hidden />
              </span>
              <span className="font-display text-[13px] font-bold leading-tight text-forest sm:text-sm">{label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
