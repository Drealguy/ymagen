import Image from "next/image";
import { CLIENT_LOGOS } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Marquee } from "@/components/ui/Marquee";

export function ClientLogos() {
  const names = [...new Set(CLIENT_LOGOS.map((logo) => logo.name))];

  return (
    <section aria-labelledby="clients-heading" className="py-12 sm:py-16">
      <Container className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-0">
        <h2
          id="clients-heading"
          className="max-w-[16rem] text-center text-[15px] leading-snug tracking-[-0.01em] text-ink-500 md:shrink-0 md:pr-10 md:text-left"
        >
          Businesses we&rsquo;ve helped attract customers and grow
        </h2>

        <span aria-hidden="true" className="hidden h-16 w-px bg-ink-200 md:block" />

        {/* Screen readers get the real client list once; the strip itself is decorative. */}
        <ul className="sr-only">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>

        <Marquee fade className="md:ml-10 md:max-w-[44rem]">
          {CLIENT_LOGOS.map((logo, i) => (
            <li key={i} className="px-7 sm:px-9">
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                className="h-9 w-auto opacity-80 brightness-0 transition duration-300 hover:opacity-100 hover:brightness-100 sm:h-10"
              />
            </li>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
