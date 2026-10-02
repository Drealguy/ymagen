import { Badge } from "@/components/ui/Badge";
import { Container } from "@/components/ui/Container";
import { Timeline, type TimelineItem } from "@/components/ui/Timeline";
import { timelineIconProps as iconProps } from "@/components/ui/timelineIcon";
import { BlurText } from "@/components/ui/BlurText";

const REASONS: TimelineItem[] = [
  {
    title: "Strategy before spend",
    body: "We plan around your goals, your audience and your numbers before a single naira goes into ads, so every campaign has a clear job to do.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="12" cy="12" r="1" />
      </svg>
    ),
  },
  {
    title: "One team, one system",
    body: "Strategy, ads, content, branding, web and email run together under one dedicated team, not six vendors pulling in different directions.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 3 8l9 5 9-5-9-5Z" />
        <path d="m3 12.5 9 5 9-5" />
        <path d="m3 17 9 5 9-5" />
      </svg>
    ),
  },
  {
    title: "Results you can read",
    body: "Clear reporting on leads, sales and cost per result, so you always know what your money did. No vanity metrics, no reports that say nothing.",
    icon: (
      <svg {...iconProps}>
        <path d="M4 20h16" />
        <path d="M7 16v-4" />
        <path d="M12 16V8" />
        <path d="M17 16V5" />
      </svg>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section aria-labelledby="why-heading" className="py-20 sm:py-28 lg:py-36">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Badge>Why choose us</Badge>
            <BlurText id="why-heading" className="mt-5 font-heading text-title font-semibold text-ink-950">
              Why businesses grow with Ymagen
            </BlurText>
            <p className="mt-5 max-w-xl font-lead text-lead text-ink-500">
              Marketing that is planned, joined up and measured, so you can see exactly where your
              growth is coming from.
            </p>
          </div>

          <div className="mt-16 sm:mt-20 lg:mt-24">
            <Timeline items={REASONS} />
          </div>
        </div>
      </Container>
    </section>
  );
}
