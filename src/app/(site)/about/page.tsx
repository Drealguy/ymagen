import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Approach } from "@/components/about/Approach";
import { Team } from "@/components/about/Team";
import { Services } from "@/components/home/Services";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Ymagen is a growth-focused digital marketing agency helping Nigerian businesses attract customers, generate leads and increase sales.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main>
      <h1 className="sr-only">About Ymagen</h1>
      <Approach />
      <Services />
      <Team />
      <WhyChooseUs />
    </main>
  );
}
