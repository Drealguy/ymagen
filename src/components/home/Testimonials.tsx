import Image from "next/image";
import { VISIBLE_TESTIMONIALS, type Testimonial } from "@/lib/testimonials";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";
import { BlurText } from "@/components/ui/BlurText";

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  return (
    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 font-heading text-base font-semibold text-brand-700 ring-1 ring-ink-200 sm:h-14 sm:w-14">
      {testimonial.photo ? (
        <Image src={testimonial.photo} alt="" fill sizes="3.5rem" className="object-cover" />
      ) : (
        initials(testimonial.name)
      )}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 text-brand-500">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={`h-4 w-4 ${i < rating ? "" : "opacity-25"}`}>
          <path
            fill="currentColor"
            d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z"
          />
        </svg>
      ))}
      <span className="ml-1.5 text-sm font-medium text-ink-950">{rating.toFixed(1)}</span>
    </div>
  );
}

function Person({ testimonial, size }: { testimonial: Testimonial; size: "lg" | "sm" }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar testimonial={testimonial} />
      <div>
        <p className={`font-heading font-medium tracking-[-0.02em] text-ink-950 ${size === "lg" ? "text-lg sm:text-xl" : "text-base"}`}>
          {testimonial.name}
        </p>
        <p className="text-sm text-ink-500">
          {testimonial.role}, {testimonial.company}
        </p>
      </div>
    </div>
  );
}

/**
 * Two card shapes alternate down each column, as in the reference: person
 * first with the quote below, or quote first with the person below.
 */
function Card({ testimonial, personFirst }: { testimonial: Testimonial; personFirst: boolean }) {
  const quote = (
    <div>
      {testimonial.rating && <Stars rating={testimonial.rating} />}
      <p
        className={`font-heading text-lg font-medium leading-snug tracking-[-0.02em] text-ink-950 sm:text-xl ${
          testimonial.rating ? "mt-4" : ""
        }`}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </div>
  );

  return (
    <li className="pb-4 sm:pb-5">
      <div className="relative flex flex-col gap-10 rounded-card border border-ink-200/70 bg-surface p-6 shadow-[0_18px_40px_-32px_rgba(11,13,16,0.35)] sm:p-8">
        {testimonial.placeholder && (
          <span className="-mb-8 self-end rounded-full border border-dashed border-ink-300 px-2.5 py-0.5 font-accent text-[11px] text-ink-500">
            Sample
          </span>
        )}
        {personFirst ? (
          <>
            <Person testimonial={testimonial} size="lg" />
            {quote}
          </>
        ) : (
          <>
            {quote}
            <Person testimonial={testimonial} size="sm" />
          </>
        )}
      </div>
    </li>
  );
}

/** Each column holds every testimonial, rotated so neighbours start differently. */
function column(list: Testimonial[], offset: number) {
  const filled = list.length >= 4 ? list : Array.from({ length: 4 }, (_, i) => list[i % list.length]);
  const shift = offset % filled.length;
  return [...filled.slice(shift), ...filled.slice(0, shift)];
}

const COLUMNS = [
  { offset: 0, reverse: false, duration: 52, className: "" },
  { offset: 1, reverse: true, duration: 60, className: "hidden md:block" },
  { offset: 2, reverse: false, duration: 56, className: "hidden lg:block" },
];

/** Renders nothing until there is real feedback to show (samples appear in dev only). */
export function Testimonials() {
  const testimonials = VISIBLE_TESTIMONIALS;
  if (testimonials.length === 0) return null;

  return (
    <section aria-labelledby="testimonials-heading" className="py-6 sm:py-8">
      <Container>
        <div className="overflow-hidden rounded-panel bg-panel px-5 pt-16 sm:px-10 sm:pt-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Badge>Testimonials</Badge>
                <BlurText
                  id="testimonials-heading"
                  className="mt-5 max-w-xl font-heading text-title font-semibold text-ink-950"
                >
                  What our clients value
                </BlurText>
              </div>
              <p className="max-w-sm font-lead text-lead text-ink-500 lg:text-right">
                In their own words: what changed for their business after working with Ymagen.
              </p>
            </div>

            {/* One readable list for assistive tech; the moving columns are decorative. */}
            <ul className="sr-only">
              {testimonials.map((t, i) => (
                <li key={i}>
                  <figure>
                    <blockquote>{t.quote}</blockquote>
                    <figcaption>
                      {t.name}, {t.role}, {t.company}
                      {t.rating ? `. Rated ${t.rating} out of 5.` : ""}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid h-[38rem] gap-4 sm:mt-16 sm:h-[44rem] sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
              {COLUMNS.map((col) => (
                <Marquee
                  key={col.offset}
                  axis="y"
                  fade
                  reverse={col.reverse}
                  duration={col.duration}
                  className={col.className}
                >
                  {column(testimonials, col.offset).map((t, i) => (
                    <Card key={i} testimonial={t} personFirst={(i + col.offset) % 2 === 0} />
                  ))}
                </Marquee>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
