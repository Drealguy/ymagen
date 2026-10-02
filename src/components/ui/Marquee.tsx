/**
 * Endless strip. Content is rendered twice and the track slides by half its
 * length, so the loop is seamless. Decorative: pair it with a screen-reader
 * version of the same content where the content matters.
 */
export function Marquee({
  children,
  axis = "x",
  reverse = false,
  duration,
  fade = false,
  className = "",
}: {
  children: React.ReactNode;
  axis?: "x" | "y";
  reverse?: boolean;
  /** Seconds for one full loop. Defaults to the token's duration. */
  duration?: number;
  fade?: boolean;
  className?: string;
}) {
  const horizontal = axis === "x";
  const mask = horizontal
    ? "[mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    : "[mask-image:linear-gradient(to_bottom,transparent,#000_10%,#000_90%,transparent)]";

  return (
    <div aria-hidden="true" className={`group relative overflow-hidden ${horizontal ? "w-full" : "h-full"} ${fade ? mask : ""} ${className}`}>
      <div
        className={`flex group-hover:[animation-play-state:paused] ${
          horizontal ? "w-max animate-marquee" : "flex-col animate-marquee-y"
        }`}
        style={{
          animationDirection: reverse ? "reverse" : undefined,
          animationDuration: duration ? `${duration}s` : undefined,
        }}
      >
        {[0, 1].map((copy) => (
          <ul key={copy} className={`flex shrink-0 ${horizontal ? "items-center" : "flex-col"}`}>
            {children}
          </ul>
        ))}
      </div>
    </div>
  );
}
