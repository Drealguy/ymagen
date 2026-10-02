import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, type CaseStudy } from "@/lib/case-studies";
import { CONTACT_HREF } from "@/lib/site";
import { ArrowUpRight } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { BlurText } from "@/components/ui/BlurText";

const GRID = 4;
const isDev = process.env.NODE_ENV === "development";

type Slot =
  | { kind: "study"; study: CaseStudy }
  | { kind: "sample"; index: number }
  | { kind: "invite" };

/**
 * Real work first. In development the grid is padded with clearly marked
 * samples so the layout can be reviewed; in production an odd count gets one
 * honest "your business could be next" card instead. No invented clients.
 */
function slots(): Slot[] {
  const real: Slot[] = CASE_STUDIES.slice(0, GRID).map((study) => ({ kind: "study", study }));
  if (isDev) {
    const samples = Array.from({ length: GRID - real.length }, (_, index) => ({ kind: "sample", index }) as Slot);
    return [...real, ...samples];
  }
  return real.length % 2 === 1 ? [...real, { kind: "invite" }] : real;
}

const frame = "rounded-panel bg-surface p-2 shadow-[0_24px_50px_-40px_rgba(11,13,16,0.4)]";
const caption = "mt-3 flex items-center justify-between gap-4 rounded-card bg-surface px-5 py-4 sm:px-6";

function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <Link href={`/case-studies#${study.slug}`} className="group block">
      <div className={frame}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-ink-100">
          <Image
            src={study.cover.src}
            alt={study.cover.alt}
            fill
            sizes="(min-width: 768px) 32rem, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
      </div>
      <div className={caption}>
        <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-2xl">{study.client}</h3>
        <span className="shrink-0 text-sm text-ink-500 sm:text-base">{study.service}</span>
      </div>
    </Link>
  );
}

function SampleCard({ index }: { index: number }) {
  return (
    <div aria-hidden="true">
      <div className={frame}>
        <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-card bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-6">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,#fff_1.5px,transparent_1.6px)] [background-size:22px_22px]" />
          <span className="relative self-start rounded-full border border-dashed border-white/50 px-2.5 py-0.5 font-accent text-[11px] text-white/80">
            Sample, dev only
          </span>
          <span className="relative font-accent text-sm text-brand-100">{String(index + 2).padStart(2, "0")}</span>
        </div>
      </div>
      <div className={caption}>
        <span className="font-heading text-xl font-semibold tracking-[-0.03em] text-ink-400 sm:text-2xl">Client name</span>
        <span className="text-sm text-ink-400 sm:text-base">Service</span>
      </div>
    </div>
  );
}

function InviteCard() {
  return (
    <Link href={CONTACT_HREF} className="group block">
      <div className={frame}>
        <div className="relative flex aspect-[4/3] flex-col items-start justify-end overflow-hidden rounded-card bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-6 sm:p-8">
          <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle,#fff_1.5px,transparent_1.6px)] [background-size:22px_22px]" />
          <p className="relative max-w-xs font-heading text-3xl font-semibold tracking-[-0.035em] text-white sm:text-4xl">
            Your business could be next.
          </p>
        </div>
      </div>
      <div className={caption}>
        <span className="font-heading text-xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-2xl">Let&rsquo;s Talk</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white transition-transform duration-200 group-hover:rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

export function CaseStudies() {
  return (
    <section aria-labelledby="case-studies-heading" className="py-6 sm:py-8">
      <Container>
        <div className="rounded-panel bg-panel px-4 py-16 sm:px-8 sm:py-24 lg:py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Badge>Case studies</Badge>
            <BlurText id="case-studies-heading" className="mt-5 text-balance font-heading text-title font-semibold text-ink-950">
              Work that drives business <span className="text-brand-500">growth</span>
            </BlurText>
            <p className="mt-5 max-w-md font-lead text-lead text-ink-500">
              See how we help Nigerian businesses build stronger brands and win more customers.
            </p>
          </div>

          <ul className="mx-auto mt-12 grid max-w-5xl gap-6 sm:mt-16 md:grid-cols-2 md:gap-x-6 md:gap-y-10">
            {slots().map((slot, i) => (
              <li key={i}>
                {slot.kind === "study" && <StudyCard study={slot.study} />}
                {slot.kind === "sample" && <SampleCard index={slot.index} />}
                {slot.kind === "invite" && <InviteCard />}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
