import Image from "next/image";
import { Background } from "@/components/Background";
import { Countdown } from "@/components/Countdown";
import { NotifySection } from "@/components/NotifySection";

export default function Home() {
  return (
    <>
      <Background />

      <main className="relative flex min-h-dvh flex-col items-center justify-center px-5 py-16 sm:px-6 sm:py-20">
        <div className="w-full max-w-2xl text-center">
          {/* Badge */}
          <div className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 py-1.5 pl-1.5 pr-3.5 backdrop-blur-sm">
            <Image
              src="/logo.png"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] rounded-full bg-white/95 p-0.5"
            />
            <span className="text-xs font-medium tracking-tight text-ink-300 sm:text-[13px]">
              Ymagen
              <span className="mx-1.5 text-ink-700">&middot;</span>
              Under maintenance
            </span>
          </div>

          {/* Headline */}
          <h1 className="animate-rise mt-7 font-heading text-[2.6rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:mt-8 sm:text-6xl md:text-7xl">
            <span className="block text-white">We&rsquo;ll be</span>
            <span className="block text-ink-500">back shortly</span>
          </h1>

          <p className="animate-rise mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink-300 sm:mt-6 sm:text-base">
            Ymagen is offline for a short while as we roll out some updates.
            Leave your WhatsApp number and we&rsquo;ll message you the moment
            we&rsquo;re back.
          </p>

          <div className="animate-rise mx-auto mt-9 w-full max-w-md sm:mt-11">
            <Countdown />
          </div>

          <div className="animate-rise mt-8 sm:mt-10">
            <NotifySection />
          </div>
        </div>

        <footer className="mt-14 text-xs text-ink-300/70 sm:mt-16">
          &copy; {new Date().getFullYear()} Ymagen
        </footer>
      </main>
    </>
  );
}
