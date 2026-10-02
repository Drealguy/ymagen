import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { CONTACT, CONTACT_HREF, LEGAL_LINKS, NAV_LINKS, SOCIAL_LINKS, WHATSAPP_URL } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SOCIAL_ICONS } from "@/components/ui/SocialIcons";
import { CtaBanner } from "./CtaBanner";
import { NewsletterForm } from "./NewsletterForm";

/** Dashed rule with "+" marks at both ends, as in the reference. */
function Rule() {
  return (
    <div aria-hidden="true" className="relative border-t border-dashed border-white/10">
      <span className="absolute -left-1.5 -top-[7px] text-xs leading-none text-white/25">+</span>
      <span className="absolute -right-1.5 -top-[7px] text-xs leading-none text-white/25">+</span>
    </div>
  );
}

function Column({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h2 className="font-heading text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3 text-[15px] text-white/60">{children}</ul>
    </div>
  );
}

const linkClass = "transition-colors hover:text-white";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 bg-ink-950 pt-6 text-white sm:mt-8 sm:pt-8">
      <Container>
        <CtaBanner />

        <div className="mt-20 sm:mt-28">
          <Rule />
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 sm:py-16 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Logo tone="light" />
            <p className="mt-4 max-w-sm font-lead text-lead text-white/60">
              Marketing that grows your business. Stop guessing, start growing.
            </p>
            <p className="mt-8 text-sm text-white/50">Practical marketing ideas, straight to your inbox.</p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>

          <Column title="Pages">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Services">
            {SERVICES.map((service) => (
              <li key={service.slug}>
                <Link href={`/services#${service.slug}`} className={linkClass}>
                  {service.name}
                </Link>
              </li>
            ))}
          </Column>

          <Column title="Contact" className="col-span-2 md:col-span-1">
            {CONTACT.email && (
              <li>
                <a href={`mailto:${CONTACT.email}`} className={linkClass}>
                  {CONTACT.email}
                </a>
              </li>
            )}
            {CONTACT.phone && (
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className={linkClass}>
                  Call {CONTACT.phone}
                </a>
              </li>
            )}
            <li>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                WhatsApp {CONTACT.whatsapp}
              </a>
            </li>
            <li>
              <Link href={CONTACT_HREF} className={linkClass}>
                Let&rsquo;s Talk
              </Link>
            </li>
            <li className="mt-2 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.icon];
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ymagen on ${social.label}`}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] text-white transition hover:bg-brand-500"
                  >
                    <Icon />
                  </a>
                );
              })}
            </li>
          </Column>
        </div>

        <Rule />

        <div className="flex flex-col gap-4 py-8 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Ymagen. All rights reserved.</p>
          <ul className="flex gap-8">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
