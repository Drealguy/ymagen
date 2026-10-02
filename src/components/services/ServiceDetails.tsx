import { SERVICES } from "@/lib/services";
import { Container } from "@/components/ui/Container";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { BlurText } from "@/components/ui/BlurText";

const number = (i: number) => String(i + 1).padStart(2, "0");

/** One card per service, all the same shape. Anchor targets for /services#slug. */
export function ServiceDetails() {
  return (
    <section aria-label="Our services" className="py-12 sm:py-16">
      <Container>
        <ol className="mx-auto flex max-w-6xl flex-col gap-4 sm:gap-6">
          {SERVICES.map((service, i) => (
            <li key={service.slug} id={service.slug} className="scroll-mt-6">
              <article className="grid gap-2 rounded-panel border border-ink-200/70 bg-panel p-2 sm:p-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
                <div className="flex aspect-[16/10] items-center justify-center rounded-card bg-surface lg:aspect-auto lg:min-h-[24rem]">
                  <ServiceIcon slug={service.slug} className="h-32 w-32 sm:h-44 sm:w-44" />
                </div>

                <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-12">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-brand-100 bg-brand-50">
                      <ServiceIcon slug={service.slug} className="h-8 w-8" />
                    </span>
                    <span className="font-accent text-base text-ink-950">{`${number(i)}//`}</span>
                  </div>

                  <BlurText className="mt-8 font-heading text-title font-semibold text-ink-950 lg:mt-10">{service.name}</BlurText>
                  <p className="mt-4 max-w-lg font-lead text-lead text-ink-500">{service.summary}</p>

                  <ul className="mt-6 flex flex-col gap-3">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px] text-ink-950 sm:text-base">
                        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
