import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { JoinForm } from "@/components/careers/JoinForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  title: "Join the team",
  description:
    "Love helping businesses grow? Tell us about your skills and experience and apply to join the Ymagen team.",
  path: "/join-the-team",
});

export default function JoinTheTeamPage() {
  return (
    <main>
      <h1 className="sr-only">Join the Ymagen team</h1>
      <Container>
        <JoinForm />
      </Container>
    </main>
  );
}
