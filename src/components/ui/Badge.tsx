/** Eyebrow pill that sits above section headings. Set in the accent face. */
export function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-ink-200 bg-surface px-3 py-1.5 font-accent text-[11.5px] tracking-[-0.005em] text-ink-950 sm:gap-2.5 sm:px-3.5 sm:text-[13px] ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
      {children}
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-brand-500" />
    </span>
  );
}
