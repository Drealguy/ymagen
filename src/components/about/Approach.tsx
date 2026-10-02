import { Badge } from "@/components/ui/Badge";
import { ColumnGuides } from "@/components/ui/ColumnGuides";
import { Container } from "@/components/ui/Container";
import { ScrollRevealText } from "@/components/ui/ScrollRevealText";

export function Approach() {
  return (
    <section aria-labelledby="approach-heading">
      <Container>
        <div className="relative overflow-hidden rounded-panel bg-panel px-5 py-16 sm:px-10 sm:py-24 lg:py-32">
          <ColumnGuides />

          <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
            <Badge>About Ymagen</Badge>
            <h2
              id="approach-heading"
              className="mt-5 max-w-[50rem] text-balance font-heading text-statement font-medium text-ink-950"
            >
              <ScrollRevealText
                segments={[
                  {
                    text: "Ymagen is a digital marketing agency for Nigerian small and growing businesses. We help you ",
                  },
                  {
                    text: "attract more customers, generate qualified leads and increase sales",
                    highlight: true,
                  },
                  { text: "." },
                ]}
              />
            </h2>

            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-500 sm:mt-10 sm:text-base">
              We don&rsquo;t sell posts, ads or websites on their own. We build marketing systems
              where strategy, advertising, social media, branding, your website and email all work
              together, so you can stop guessing and start growing.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
