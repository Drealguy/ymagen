import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell us about your business and your goals, and let's build a marketing strategy that helps you grow.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <h1 className="sr-only">Contact Ymagen</h1>
      <Container>
        <ContactForm />
      </Container>
    </main>
  );
}
