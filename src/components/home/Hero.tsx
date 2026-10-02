import { CONTACT_HREF } from "@/lib/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ColumnGuides } from "@/components/ui/ColumnGuides";
import { Container } from "@/components/ui/Container";
import { HeroVideo } from "./HeroVideo";
import { NairaPill } from "./NairaPill";
import { BlurText } from "@/components/ui/BlurText";

const chip = "rounded-md px-1.5 py-px box-decoration-clone";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <Container>
        <div className="relative overflow-hidden rounded-panel bg-panel px-2 pb-2 sm:px-2.5 sm:pb-2.5">
          <ColumnGuides />

          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-3 pt-16 text-center sm:pt-24 lg:pt-28">
            <Badge className="animate-rise">Growth partner for Nigerian businesses</Badge>

            <BlurText
              as="h1"
              id="hero-heading"
              className="mt-6 font-heading text-display font-semibold text-ink-950 sm:mt-8"
            >
              What if every <NairaPill /> naira
              <br className="hidden sm:block" /> knew exactly where to go?
            </BlurText>

            <p className="animate-rise mt-6 max-w-[42rem] text-balance font-lead text-lead text-ink-500 [animation-delay:120ms] sm:mt-7">
              We build marketing systems that help Nigerian businesses attract{" "}
              <span className={`${chip} bg-brand-100 text-brand-700`}>qualified leads,</span>{" "}
              <span className={`${chip} bg-surface text-ink-950`}>increase sales,</span> and{" "}
              <span className={`${chip} bg-brand-500 text-white`}>grow</span> with confidence.
            </p>

            <div className="animate-rise mt-9 flex w-full flex-col items-center justify-center gap-3 [animation-delay:180ms] sm:mt-10 sm:w-auto sm:flex-row sm:gap-4">
              <Button href={CONTACT_HREF} size="lg" className="w-full sm:w-auto">
                Let&rsquo;s Talk
              </Button>
              <Button href="/services" variant="secondary" size="lg" className="w-full sm:w-auto">
                See Our Services
              </Button>
            </div>
          </div>

          <div className="animate-rise relative mt-14 h-[22rem] overflow-hidden rounded-card bg-brand-900 [animation-delay:240ms] sm:mt-20 sm:h-[32rem] lg:h-[42rem]">
            <HeroVideo src="/videos/hero.mp4" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
