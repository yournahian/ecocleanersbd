import { Leaf } from 'lucide-react'

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-forest text-leaf shadow-card">
        <Leaf className="h-5 w-5" strokeWidth={2.5} aria-hidden />
      </span>
      <span className={`font-display text-lg font-extrabold ${light ? 'text-white' : 'text-forest'}`}>
        Eco Cleaners <span className="text-leaf-600">BD</span>
      </span>
    </span>
  )
}
