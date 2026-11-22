import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'

const LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#packages', label: 'Ready Packages' },
  { href: '#builder', label: 'Build Your Plan' },
  { href: '#safety', label: 'Safety & Eco' },
  { href: '#areas', label: 'Areas' },
]

export function Navbar({ onBook }: { onBook: () => void }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`glass fixed inset-x-0 top-0 z-40 border-b transition-shadow duration-300 ${
        scrolled ? 'border-forest/10 shadow-card' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" aria-label="Eco Cleaners BD home" className="rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-leaf">
          <Logo />
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-slate-600 transition hover:bg-sage hover:text-forest"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="btn-primary !min-h-[40px] !px-5" onClick={onBook}>
            Book Now
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-forest transition hover:bg-sage lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-forest/10 bg-white/95 px-4 pb-4 pt-2 lg:hidden" aria-label="Mobile">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center rounded-xl px-3 text-sm font-medium text-slate-700 hover:bg-sage hover:text-forest"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
