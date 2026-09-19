import Image from "next/image";

/**
 * Ambient backdrop.
 *
 * The glow asset is composited with `mix-blend-screen`: its dark regions are
 * near-black, so screen blending renders them as pure canvas and only the glow
 * itself survives. That removes any visible seam between the bitmap and the
 * page background at every viewport size, without a mask or gradient fade.
 *
 * The arc is pushed partly below the fold on purpose. At full strength its core
 * sits directly behind the form and footer and destroys their contrast, so only
 * the upper falloff stays on screen — reading as light rising from the bottom
 * edge while the content band stays near-black, as in the reference.
 *
 * The image keeps its intrinsic aspect ratio at all breakpoints (scaled past
 * 100% width on small screens rather than cropped) so the arc never degrades
 * into a flat wash of colour on a narrow phone.
 */
export function Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-canvas"
    >
      {/* Edge arcs, echoing the reference composition */}
      <div className="absolute -left-56 top-[22%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(16,134,197,0.42),transparent_62%)] blur-3xl md:-left-40" />
      <div className="absolute -right-56 top-[30%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(56,169,232,0.34),transparent_62%)] blur-3xl md:-right-40" />

      {/* Primary arc */}
      <Image
        src="/background.png"
        alt=""
        width={735}
        height={475}
        priority
        sizes="(max-width: 640px) 200vw, (max-width: 1024px) 150vw, 115vw"
        className="absolute bottom-0 left-1/2 w-[200%] max-w-none -translate-x-1/2 translate-y-[43%] opacity-90 mix-blend-screen select-none sm:w-[150%] sm:translate-y-[41%] lg:w-[115%]"
      />

      {/* Scrim: protects contrast across the whole content band */}
      <div className="absolute inset-0 bg-[radial-gradient(78%_58%_at_50%_44%,rgba(3,6,11,0.94),rgba(3,6,11,0.72)_52%,rgba(3,6,11,0.28)_74%,transparent_88%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-canvas via-canvas/75 to-transparent" />
      {/* Seats the footer, which otherwise lands on the brightest part of the arc */}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-canvas/80 via-canvas/30 to-transparent" />
    </div>
  );
}
