import { SERVICES } from "@/lib/services";
import { CONTACT_HREF } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ColumnGuides } from "@/components/ui/ColumnGuides";
import { Container } from "@/components/ui/Container";
import { BlurText } from "@/components/ui/BlurText";

const number = (i: number) => String(i + 1).padStart(2, "0");

export function ServicesHero() {
  return (
    <section aria-labelledby="services-page-heading">
      <Container>
        <div className="relative overflow-hidden rounded-panel bg-panel px-5 py-16 sm:px-10 sm:py-24 lg:py-28">
          <ColumnGuides />

          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <Badge className="animate-rise">Services</Badge>
            <BlurText
              as="h1"
              id="services-page-heading"
              className="mt-6 text-balance font-heading text-display font-semibold text-ink-950"
            >
              Marketing services built around <span className="text-brand-500">growth</span>
            </BlurText>
            <p className="animate-rise mt-6 max-w-2xl font-lead text-lead text-ink-500 [animation-delay:120ms]">
              Every service we offer has one job: helping your business attract customers, turn them
              into leads and increase sales. We start with strategy, then use the right tools to
              carry it out.
            </p>

            <div className="animate-rise mt-9 flex w-full flex-col items-center justify-center gap-3 [animation-delay:180ms] sm:w-auto sm:flex-row sm:gap-4">
              <Button href={CONTACT_HREF} size="lg" className="w-full sm:w-auto">
                Let&rsquo;s Talk
              </Button>
              <Button href="#how-we-work" variant="secondary" size="lg" className="w-full sm:w-auto">
                How we work
              </Button>
            </div>

            <nav aria-label="Jump to a service" className="animate-rise mt-12 [animation-delay:240ms] sm:mt-14">
              <ul className="flex flex-wrap justify-center gap-2">
                {SERVICES.map((service, i) => (
                  <li key={service.slug}>
                    <a
                      href={`#${service.slug}`}
                      className="inline-flex items-center gap-2 rounded-full border border-ink-200 bg-surface px-4 py-2 text-sm text-ink-700 transition-colors hover:border-brand-500 hover:text-ink-950"
                    >
                      <span className="font-accent text-xs text-brand-600">{number(i)}</span>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </section>
  );
}
