import { Facebook, Instagram, Mail, MessageCircle, Phone } from 'lucide-react'
import { AREAS, BRAND } from '@/data/catalog'
import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-ink pb-24 pt-16 text-white sm:pb-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="font-display mt-4 text-lg font-bold text-leaf">{BRAND.slogan}</p>
          <p className="mt-2 max-w-sm text-sm text-white/60">
            Eco-friendly residential cleaning for Dhaka homes, with live body-cam transparency.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eco Cleaners BD on Facebook"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-leaf hover:text-forest"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Eco Cleaners BD on Instagram"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-leaf hover:text-forest"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={`https://wa.me/${BRAND.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message Eco Cleaners BD on WhatsApp"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-leaf hover:text-forest"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase text-white/50" style={{ letterSpacing: '0.1em' }}>
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-leaf" aria-hidden />
              <span className="tabular">{BRAND.phoneDisplay}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-leaf" aria-hidden />
              {BRAND.email}
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase text-white/50" style={{ letterSpacing: '0.1em' }}>
            We serve
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {AREAS.map((a) => (
              <li key={a}>{a}, Dhaka</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-white/10 px-4 pt-6 text-xs text-white/50 sm:px-6">
        © 2026 Eco Cleaners BD. All rights reserved.
      </div>
    </footer>
  )
}
