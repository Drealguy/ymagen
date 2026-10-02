import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Faq } from "@/components/services/Faq";
import { Process } from "@/components/services/Process";
import { ServiceDetails } from "@/components/services/ServiceDetails";
import { ServicesHero } from "@/components/services/ServicesHero";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Strategy, paid advertising, social media management, branding, website design and email marketing, built to help Nigerian businesses attract customers and increase sales.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServiceDetails />
      <Process />
      <Faq />
    </main>
  );
}
