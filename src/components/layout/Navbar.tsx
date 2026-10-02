"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CONTACT, CONTACT_HREF, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS, WHATSAPP_URL } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { setScrollLocked } from "./SmoothScroll";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-5 w-5">
      {open ? (
        <path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      ) : (
        <path d="M3 7h14M3 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      )}
    </svg>
  );
}

const menuButton =
  "flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 bg-surface text-ink-950 lg:hidden";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  // While the full-screen menu is open: lock page scroll, move focus into it,
  // close on Escape, and close if the viewport grows into the desktop nav.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    setScrollLocked(true);
    closeRef.current?.focus();

    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => desktop.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);

    const opener = openRef.current;
    return () => {
      document.body.style.overflow = overflow;
      setScrollLocked(false);
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
      opener?.focus();
    };
  }, [open]);

  return (
    <header className="relative z-20">
      <Container className="flex h-20 items-center justify-between gap-6 sm:h-[5.5rem]">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`rounded-full px-4 py-2 text-[15px] tracking-[-0.01em] transition-colors ${
                      active ? "bg-ink-100 text-ink-950" : "text-ink-600 hover:text-ink-950"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={CONTACT_HREF}>Let&rsquo;s Talk</Button>
          </div>
          <button
            ref={openRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Open menu"
            className={menuButton}
          >
            <MenuIcon open={false} />
          </button>
        </div>
      </Container>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          // Any link tapped inside the menu (page links or the CTA) closes it.
          onClick={(event) => {
            if ((event.target as HTMLElement).closest("a")) setOpen(false);
          }}
          data-lenis-prevent
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-surface lg:hidden"
        >
          <Container className="flex h-20 shrink-0 items-center justify-between sm:h-[5.5rem]">
            <Logo />
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close menu" className={menuButton}>
              <MenuIcon open />
            </button>
          </Container>

          <Container className="flex flex-1 flex-col justify-between pb-8 pt-6">
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_LINKS.map((link, i) => {
                  const active = isActive(pathname, link.href);
                  return (
                    <li
                      key={link.href}
                      className="animate-rise border-b border-ink-100"
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className="flex items-baseline gap-4 py-4"
                      >
                        <span className="font-accent text-sm text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                        <span
                          className={`font-heading text-[2rem] font-semibold leading-none tracking-[-0.04em] sm:text-[2.5rem] ${
                            active ? "text-brand-500" : "text-ink-950"
                          }`}
                        >
                          {link.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="animate-rise mt-10 [animation-delay:300ms]">
              <Button href={CONTACT_HREF} size="lg" className="w-full">
                Let&rsquo;s Talk
              </Button>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-500">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink-950">
                  WhatsApp {CONTACT.whatsapp}
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-ink-950">
                  @{INSTAGRAM_HANDLE}
                </a>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
