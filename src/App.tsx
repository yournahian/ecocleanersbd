import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { Area, Pack } from '@/data/catalog'
import type { Quote } from '@/lib/pricing'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { WhyUs } from '@/components/WhyUs'
import { Packages } from '@/components/Packages'
import { PlanBuilder } from '@/components/PlanBuilder'
import { Areas } from '@/components/Areas'
import { Footer } from '@/components/Footer'
import { BookingModal, type BookingState } from '@/components/BookingModal'

export default function App() {
  const [booking, setBooking] = useState<BookingState | null>(null)

  const open = (request: BookingState['request'], area?: Area) =>
    setBooking({ id: Date.now(), request, area })
  const close = useCallback(() => setBooking(null), [])

  return (
    <div id="top" className="min-h-dvh bg-white">
      <Navbar onBook={() => open(null)} />
      <main>
        <Hero />
        <WhyUs />
        <Packages onSelect={(pack: Pack) => open({ type: 'package', pack })} />
        <PlanBuilder onBook={(quote: Quote) => open({ type: 'custom', quote })} />
        <Areas onBook={(area) => open(null, area)} />
      </main>
      <Footer />

      <AnimatePresence>{booking && <BookingModal key={booking.id} state={booking} onClose={close} />}</AnimatePresence>
    </div>
  )
}
