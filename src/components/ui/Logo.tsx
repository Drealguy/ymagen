import Image from "next/image";
import Link from "next/link";

export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <Link href="/" aria-label="Ymagen home" className="inline-flex items-center gap-2">
      <Image src="/logo-mark.png" alt="" width={36} height={36} priority className="h-9 w-9" />
      <span
        className={`font-heading text-[1.6rem] font-semibold tracking-[-0.04em] ${
          tone === "dark" ? "text-ink-950" : "text-white"
        }`}
      >
        Ymagen
      </span>
    </Link>
  );
}
