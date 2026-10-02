/** Faint vertical guides at the quarter lines of a panel. Decorative only. */
export function ColumnGuides() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
      {[25, 50, 75].map((left) => (
        <span key={left} className="absolute inset-y-0 w-px bg-white/80" style={{ left: `${left}%` }} />
      ))}
    </div>
  );
}
