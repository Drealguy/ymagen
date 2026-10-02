import { PROCESS } from "@/lib/process";
import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { timelineIconProps as iconProps } from "@/components/ui/timelineIcon";
import { BlurText } from "@/components/ui/BlurText";

/** One line icon per stage, drawn on the same 24px grid as the other timeline icons. */
const ICONS: Record<string, React.ReactNode> = {
  Discover: (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.4-4.4" />
    </svg>
  ),
  Strategy: (
    <svg {...iconProps}>
      <path d="M9 4 3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5L9 4Z" />
      <path d="M9 4v13.5M15 6.5V20" />
    </svg>
  ),
  Execute: (
    <svg {...iconProps}>
      <path d="M13 3 5 13.5h6.5L10.5 21 19 10.5h-6.5L13 3Z" />
    </svg>
  ),
  Optimize: (
    <svg {...iconProps}>
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
  ),
  Scale: (
    <svg {...iconProps}>
      <path d="m3 17 6-6 4 4 8-8" />
      <path d="M15 7h6v6" />
    </svg>
  ),
};

const STEPS: TimelineItem[] = PROCESS.map((step, i) => ({
  title: step.name,
  body: step.summary,
  eyebrow: `Step ${String(i + 1).padStart(2, "0")}`,
  icon: ICONS[step.name],
}));

export function Process() {
  return (
    <section id="how-we-work" aria-labelledby="process-heading" className="scroll-mt-6 py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Badge>How we work</Badge>
            <BlurText id="process-heading" className="mt-5 text-balance font-heading text-title font-semibold text-ink-950">
              Five steps from guessing to <span className="text-brand-500">growing</span>
            </BlurText>
            <p className="mt-5 max-w-xl font-lead text-lead text-ink-500">
              The same process sits behind every service, so nothing is left to chance.
            </p>
          </div>

          <div className="mt-16 sm:mt-20 lg:mt-24">
            <Timeline items={STEPS} />
          </div>
        </div>
      </Container>
    </section>
  );
}
