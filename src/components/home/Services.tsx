import { SERVICES } from "@/lib/services";
import { CONTACT_HREF } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { BlurText } from "@/components/ui/BlurText";

const number = (i: number) => String(i + 1).padStart(2, "0");

function Check() {
  return (
    <span aria-hidden="true" className="grid h-4 w-4 shrink-0 place-items-center rounded-full border-[1.5px] border-brand-500 text-brand-500">
      <svg viewBox="0 0 16 16" fill="none" className="h-2.5 w-2.5">
        <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/**
 * Stacking cards: each card sticks a little lower than the one before, so as
 * the page scrolls they pile up with their top edges showing.
 */
export function Services() {
  return (
    <section id="services" aria-labelledby="services-heading" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Badge>Services</Badge>
          <BlurText id="services-heading" className="mt-5 font-heading text-title font-semibold text-ink-950">
            <span className="text-brand-500">Services</span> built around your growth
          </BlurText>
          <p className="mt-5 max-w-lg font-lead text-lead text-ink-500">
            Everything you need to attract the right customers, turn them into leads and grow your
            sales.
          </p>
        </div>

        <ol className="mx-auto mt-12 flex max-w-5xl flex-col gap-6 sm:mt-16 sm:gap-10">
          {SERVICES.map((service, i) => {
            const flip = i % 2 === 1;
            return (
              <li
                key={service.slug}
                id={service.slug}
                className="sticky"
                style={{ top: `calc(1rem + ${i * 0.875}rem)` }}
              >
                <article className="grid gap-2 rounded-panel border border-ink-200/70 bg-panel p-2 shadow-[0_-18px_40px_-30px_rgba(11,13,16,0.35)] md:grid-cols-2">
                  <div
                    className={`flex aspect-video items-center justify-center rounded-card bg-surface md:aspect-auto md:min-h-[22rem] ${
                      flip ? "md:order-last" : ""
                    }`}
                  >
                    <ServiceIcon slug={service.slug} className="h-28 w-28 sm:h-36 sm:w-36" />
                  </div>

                  <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10">
                    <span className="font-accent text-sm text-brand-600">{number(i)}</span>
                    <h3 className="mt-2 font-heading text-2xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-3xl">
                      {service.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-600">{service.summary}</p>
                    <ul className="mt-5 flex flex-col gap-2.5">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 text-sm text-ink-700">
                          <Check />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button href={CONTACT_HREF} className="mt-7 self-start">
                      Let&rsquo;s Talk
                    </Button>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
