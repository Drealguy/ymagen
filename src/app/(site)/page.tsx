import { CaseStudies } from "@/components/home/CaseStudies";
import { ClientLogos } from "@/components/home/ClientLogos";
import { Comparison } from "@/components/home/Comparison";
import { Hero } from "@/components/home/Hero";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { jsonLd, organizationJsonLd } from "@/lib/seo";
import { INSTAGRAM_URL, SITE_URL } from "@/lib/site";

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(organizationJsonLd({ url: SITE_URL, instagram: INSTAGRAM_URL, phone: "+2349166560652" })),
        }}
      />
      <Hero />
      <ClientLogos />
      <Services />
      <WhyChooseUs />
      <CaseStudies />
      <Comparison />
      <Testimonials />
    </main>
  );
}
