import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarClock, Check, MessageCircle, X } from 'lucide-react'
import { toast } from 'sonner'
import { AREAS, BRAND, type Area } from '@/data/catalog'
import { formatBDT, quoteLines, type BookingRequest } from '@/lib/pricing'

export interface BookingState {
  id: number
  request: BookingRequest | null
  area?: Area
}

const TIME_SLOTS = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
const ONE_TIME = [
  { id: 'regular', label: 'One-time Regular Cleaning', note: '৳1,200–৳4,800' },
  { id: 'deep', label: 'One-time Deep Cleaning', note: '৳5,000–৳12,000' },
  { id: 'help', label: 'Help me choose a plan', note: 'Free call back' },
] as const

const PHONE_RE = /^(?:\+?88)?01[3-9]\d{8}$/
const STORAGE_KEY = 'eco-cleaners-bookings'

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function requestTitle(request: BookingRequest | null, oneTime: string): string {
  if (!request) return ONE_TIME.find((o) => o.id === oneTime)?.label ?? 'Booking'
  return request.type === 'package' ? `${request.pack.name} package` : 'Custom plan'
}

function requestLines(request: BookingRequest | null, oneTime: string): string[] {
  if (!request) return [ONE_TIME.find((o) => o.id === oneTime)?.label ?? 'Booking']
  if (request.type === 'package') {
    const { pack } = request
    return [`${pack.name}: ${formatBDT(pack.price)} / month`, pack.audience, pack.scope, ...pack.features]
  }
  return quoteLines(request.quote)
}

export function BookingModal({ state, onClose }: { state: BookingState; onClose: () => void }) {
  const { request } = state
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [area, setArea] = useState<Area | ''>(state.area ?? '')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [oneTime, setOneTime] = useState<(typeof ONE_TIME)[number]['id']>('help')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const dialogRef = useRef<HTMLDivElement>(null)
  const firstRef = useRef<HTMLInputElement>(null)
  const min = useMemo(() => todayISO(), [])

  // Lock scroll, close on Escape, trap focus.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    firstRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !dialogRef.current) return
      const items = dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, a[href], [tabindex]:not([tabindex="-1"])')
      const list = Array.from(items).filter((el) => !el.hasAttribute('disabled'))
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const validate = () => {
    const next: Record<string, string> = {}
    if (name.trim().length < 2) next.name = 'Enter your full name.'
    if (!PHONE_RE.test(phone.replace(/[\s-]/g, ''))) next.phone = 'Enter a valid Bangladesh mobile number, e.g. 01712345678.'
    if (!area) next.area = 'Choose your area.'
    if (!date) next.date = 'Pick a preferred date.'
    else if (date < min) next.date = 'Pick today or a later date.'
    if (!time) next.time = 'Pick a preferred time.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const buildMessage = () =>
    [
      `Hello ${BRAND.name}, I would like to book: ${requestTitle(request, oneTime)}.`,
      '',
      ...requestLines(request, oneTime),
      '',
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Area: ${area}`,
      `Preferred: ${date} at ${time}`,
    ].join('\n')

  const save = () => {
    try {
      const prev = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as unknown[]
      prev.push({ at: new Date().toISOString(), title: requestTitle(request, oneTime), name: name.trim(), phone: phone.trim(), area, date, time })
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prev))
    } catch {
      // Storage unavailable; booking still confirmed in the UI.
    }
  }

  const confirm = () => {
    if (!validate()) return
    save()
    toast.success('Booking received', {
      description: `Thanks ${name.trim().split(' ')[0]}! We will call you to confirm ${date} at ${time} in ${area}.`,
    })
    onClose()
  }

  const whatsapp = () => {
    if (!validate()) return
    save()
    const url = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(buildMessage())}`
    window.open(url, '_blank', 'noopener,noreferrer')
    toast.success('Opening WhatsApp', { description: 'Send the pre-filled message to confirm your booking.' })
    onClose()
  }

  const err = (k: string) => (errors[k] ? <p className="mt-1 text-xs font-medium text-red-600">{errors[k]}</p> : null)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24 }}
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        className="flex max-h-[94dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-lift sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 id="booking-title" className="font-display text-xl font-extrabold text-forest">
              Book your cleaning
            </h2>
            <p className="text-xs text-slate-500">{requestTitle(request, oneTime)}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking"
            className="grid h-11 w-11 place-items-center rounded-full text-slate-500 transition hover:bg-sage hover:text-forest"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid flex-1 gap-6 overflow-y-auto p-5 sm:grid-cols-[1fr_1fr] sm:p-6">
          {/* Summary */}
          <div className="order-2 sm:order-1">
            <div className="rounded-2xl bg-sage p-4">
              <p className="eyebrow">{request ? 'Your selection' : 'Service'}</p>
              {request ? (
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {requestLines(request, oneTime).map((l, i, all) => {
                    const last = i === all.length - 1 && request.type === 'custom'
                    return (
                      <li
                        key={`${l}-${i}`}
                        className={`tabular flex gap-2 ${last ? 'font-display border-t border-forest/15 pt-3 text-base font-extrabold text-forest' : ''}`}
                      >
                        {!last && <Check className="mt-0.5 h-4 w-4 shrink-0 text-leaf-600" aria-hidden />}
                        <span>{l}</span>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <fieldset className="mt-3 space-y-2">
                  <legend className="sr-only">Service type</legend>
                  {ONE_TIME.map((o) => (
                    <label
                      key={o.id}
                      className={`flex min-h-[44px] cursor-pointer items-center justify-between gap-3 rounded-xl border bg-white px-3 py-2 text-sm transition ${
                        oneTime === o.id ? 'border-forest ring-1 ring-forest' : 'border-slate-200 hover:border-leaf/60'
                      }`}
                    >
                      <span className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="onetime"
                          checked={oneTime === o.id}
                          onChange={() => setOneTime(o.id)}
                          className="accent-[#14532D]"
                        />
                        <span className="font-semibold text-forest">{o.label}</span>
                      </span>
                      <span className="tabular text-xs text-slate-500">{o.note}</span>
                    </label>
                  ))}
                </fieldset>
              )}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              No online payment. Our team confirms the schedule by phone. Your 15% first-service discount is applied at confirmation.
            </p>
          </div>

          {/* Form */}
          <form
            className="order-1 space-y-4 sm:order-2"
            noValidate
            onSubmit={(e) => {
              e.preventDefault()
              confirm()
            }}
          >
            <div>
              <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold text-forest">
                Full name
              </label>
              <input id="bk-name" ref={firstRef} className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Your name" />
              {err('name')}
            </div>
            <div>
              <label htmlFor="bk-phone" className="mb-1.5 block text-sm font-semibold text-forest">
                Phone number
              </label>
              <input
                id="bk-phone"
                className="input"
                type="tel"
                inputMode="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="01XXXXXXXXX"
              />
              {err('phone')}
            </div>
            <div>
              <label htmlFor="bk-area" className="mb-1.5 block text-sm font-semibold text-forest">
                Dhaka area
              </label>
              <select id="bk-area" className="input" value={area} onChange={(e) => setArea(e.target.value as Area | '')}>
                <option value="">Select your area</option>
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
              {err('area')}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="bk-date" className="mb-1.5 block text-sm font-semibold text-forest">
                  Preferred date
                </label>
                <input id="bk-date" className="input" type="date" min={min} value={date} onChange={(e) => setDate(e.target.value)} />
                {err('date')}
              </div>
              <div>
                <label htmlFor="bk-time" className="mb-1.5 block text-sm font-semibold text-forest">
                  Preferred time
                </label>
                <select id="bk-time" className="input" value={time} onChange={(e) => setTime(e.target.value)}>
                  <option value="">Select time</option>
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                {err('time')}
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button type="submit" className="btn-primary w-full !min-h-[52px]">
                <CalendarClock className="h-4 w-4" aria-hidden />
                Confirm Booking
              </button>
              <button
                type="button"
                onClick={whatsapp}
                className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-leaf px-6 font-display text-sm font-bold text-forest transition duration-200 hover:-translate-y-0.5 hover:bg-leaf-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Send via WhatsApp
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}
