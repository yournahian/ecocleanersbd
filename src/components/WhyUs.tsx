import { Camera, FlaskConical, GraduationCap, Leaf, ShieldCheck, Droplets, Sparkles, Wind, Play } from 'lucide-react'
import { useState } from 'react'

const FEATURES = [
  {
    icon: FlaskConical,
    title: 'Non-Toxic Products',
    text: 'Zero harsh acids and zero bleach. Safe for kids, the elderly and pets from the first wipe.',
  },
  {
    icon: Camera,
    title: 'Live Body-Cam Monitoring',
    text: 'Every cleaner wears a body camera. Watch your cleaning live from your phone, wherever you are.',
  },
  {
    icon: GraduationCap,
    title: 'Trained Local Staff',
    text: 'Background-checked, uniformed and trained Dhaka locals who follow a clear cleaning checklist.',
  },
]

const INGREDIENTS = [
  { icon: Droplets, name: 'Neutral-pH floor cleaners', note: 'Gentle on tiles, marble and little feet.' },
  { icon: Sparkles, name: 'Baking soda', note: 'Lifts grime and neutralises odour.' },
  { icon: Wind, name: 'White vinegar', note: 'Cuts limescale and bathroom film.' },
  { icon: Leaf, name: 'Certified organic cleaners', note: 'Plant-based and fragrance-light.' },
]

export function WhyUs() {
  const [playing, setPlaying] = useState(false)

  // Replace this with your actual YouTube video ID or hosted video URL
  const YOUTUBE_ID = 'dQw4w9WgXcQ' // 👈 swap in your real demo video ID
  return (
    <>
      <section id="services" className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="eyebrow">Why Eco Cleaners BD</p>
            <h2 className="section-title mt-3">Clean you can see. Safe you can trust.</h2>
            <p className="mt-4 max-w-xl text-pretty text-slate-600">
              Most cleaning services ask you to take their word for it. We built transparency and safety into every visit.
            </p>

            <ul className="mt-8 space-y-4">
              {FEATURES.map(({ icon: Icon, title, text }) => (
                <li
                  key={title}
                  className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-leaf/50 hover:shadow-lift"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sage text-forest transition group-hover:bg-forest group-hover:text-leaf">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-bold text-forest">{title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600">{text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mx-auto w-full max-w-md lg:max-w-none">
            {/* Demo Video */}
            <div className="relative overflow-hidden rounded-3xl bg-forest shadow-lift">
              {playing ? (
                <iframe
                  className="aspect-video w-full"
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                  title="Eco Cleaners BD – demo video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group relative flex aspect-video w-full items-center justify-center bg-forest"
                  aria-label="Play demo video"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-forest via-forest/80 to-leaf/40" />

                  {/* Animated leaf background blobs */}
                  <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-leaf/20 blur-2xl" />
                    <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-leaf/10 blur-2xl" />
                  </div>

                  {/* Text content */}
                  <div className="relative z-10 flex flex-col items-center gap-5 px-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-display text-xs font-bold uppercase tracking-widest text-leaf">
                        Watch how it works
                      </span>
                      <p className="font-display text-xl font-extrabold text-white sm:text-2xl">
                        Live body-cam. Eco products.<br />Your home, fully transparent.
                      </p>
                    </div>

                    {/* Play button */}
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-lift transition duration-300 group-hover:scale-110 group-hover:bg-leaf">
                      <Play className="h-6 w-6 translate-x-0.5 text-forest" aria-hidden fill="currentColor" />
                    </span>

                    <span className="text-xs text-white/60">2 min demo</span>
                  </div>
                </button>
              )}
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              See a real Eco Cleaners BD visit — from arrival to sparkling finish.
            </p>
          </div>
        </div>
      </section>

      <section id="safety" className="bg-forest py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-display text-xs font-bold uppercase text-leaf" style={{ letterSpacing: '0.1em' }}>
                Safety & Eco
              </p>
              <h2 className="font-display mt-3 max-w-xl text-balance text-3xl font-extrabold sm:text-4xl" style={{ letterSpacing: '-0.03em' }}>
                What we clean with, and what we never use.
              </h2>
            </div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
              <ShieldCheck className="h-4 w-4 text-leaf" aria-hidden />
              Safe for kids, elderly and pets
            </span>
          </div>

          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {INGREDIENTS.map(({ icon: Icon, name, note }) => (
              <li key={name} className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:bg-white/10">
                <Icon className="h-6 w-6 text-leaf" aria-hidden />
                <h3 className="font-display mt-4 text-base font-bold">{name}</h3>
                <p className="mt-1 text-sm text-white/65">{note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
