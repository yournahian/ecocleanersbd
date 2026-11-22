export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src="/logo.png"
        alt="Eco Cleaners BD logo"
        className="h-10 w-10 object-contain drop-shadow-sm"
        width={40}
        height={40}
      />
      <span className={`font-display text-lg font-extrabold ${light ? 'text-white' : 'text-forest'}`}>
        Eco Cleaners <span className={light ? 'text-leaf' : 'text-leaf-600'}>BD</span>
      </span>
    </span>
  )
}
