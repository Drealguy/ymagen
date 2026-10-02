import { FAQS } from "@/lib/faq";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { BlurText } from "@/components/ui/BlurText";

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="text-center lg:text-left">
            <Badge>FAQ</Badge>
            <BlurText id="faq-heading" className="mt-5 text-balance font-heading text-title font-semibold text-ink-950">
              Answers to your <span className="text-brand-500">marketing</span> questions
            </BlurText>
            <p className="mx-auto mt-5 max-w-md font-lead text-lead text-ink-500 lg:mx-0">
              Can&rsquo;t find what you&rsquo;re looking for? Ask us on WhatsApp or start a
              conversation on our contact page.
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {FAQS.map((faq, i) => (
              <details
                key={faq.question}
                open={i === 0}
                className="group rounded-card border border-ink-200 bg-surface px-5 transition-colors open:border-brand-500 sm:px-6"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-heading text-lg font-semibold tracking-[-0.02em] text-ink-950 sm:text-xl [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-panel text-ink-950 transition-transform duration-200 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white"
                  >
                    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                      <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 pr-10 text-[15px] leading-relaxed text-ink-500 sm:text-base">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
