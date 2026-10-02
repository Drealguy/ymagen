import { CONTACT_HREF } from "@/lib/site";
import { VISIBLE_TEAM } from "@/lib/team";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BlurText } from "@/components/ui/BlurText";
import { TeamRoster } from "./TeamRoster";

/** Renders nothing until there is a real team to show (samples appear in dev only). */
export function Team() {
  if (VISIBLE_TEAM.length === 0) return null;

  return (
    <section aria-labelledby="team-heading" className="py-20 sm:py-28 lg:py-32">
      <Container>
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Badge>Our team</Badge>
            <BlurText id="team-heading" className="mt-5 text-balance font-heading text-title font-semibold text-ink-950">
              The <span className="text-brand-500">people</span> behind the work
            </BlurText>
            <p className="mt-5 max-w-md font-lead text-lead text-ink-500">
              The team behind the strategy, campaigns and results for every client.
            </p>
          </div>

          <div className="mt-12 sm:mt-16">
            <TeamRoster team={VISIBLE_TEAM} />
          </div>

          <div className="mt-10 lg:ml-[calc(37.5%+2.5rem)]">
            <p className="max-w-lg text-[15px] leading-relaxed text-ink-500 sm:text-base">
              Every client works with people who care about their growth, from the first strategy
              session to the results report.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={CONTACT_HREF}>Talk to Our Team</Button>
              <Button href="/join-the-team" variant="secondary">
                Join the team
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
