"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import HeroImageDark from "@/../public/hero_dark.png";
import HeroImageLight from "@/../public/hero_light.png";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";

export default function SplashScreen() {
  return (
    <main className="mx-auto flex-1 overflow-hidden">
      <section
        id="hero"
        className="relative mx-auto mt-44 max-w-7xl px-6 text-center md:px-8"
      >
        <h1 className="font-cal animate-fade-in -translate-y-4 py-6 text-4xl leading-none font-medium tracking-normal text-balance opacity-0 [--animation-delay:200ms] md:text-6xl">
          <span className="text-primary font-extrabold">Pogotownik</span>
          <span className="bg-linear-to-br from-black from-30% to-black/40 bg-clip-text text-transparent dark:from-white dark:to-white/40">
            {" "}
            – twój przewodnik,
            <br className="hidden md:block" /> zawsze w pogotowiu.
          </span>
        </h1>
        <p className="animate-fade-in mb-12 flex -translate-y-4 flex-col text-lg tracking-tight text-balance text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl">
          <span>Wszystko dotyczące bezpieczeństwa</span>{" "}
          <span>masz w zasięgu ręki</span>
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button size={"lg"} asChild>
            <Link href="/map">
              Rozpocznij
              <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="animate-fade-up relative mt-32 mb-24 opacity-0 [--animation-delay:400ms] perspective-[2000px] after:absolute after:inset-0 after:z-20 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]">
          <div className="bg-opacity-[0.01] before:animate-image-glow border-background/10 rounded-xl border before:absolute before:top-0 before:bottom-1/2 before:left-0 before:h-full before:w-full before:bg-[linear-gradient(to_bottom,hsl(var(--primary)),hsl(var(--primary)),transparent_40%)] before:opacity-0 before:filter-[blur(180px)]">
            <BorderBeam colorFrom="hsl(var(--primary))" />
            <Image
              src={HeroImageLight}
              alt="Aplikacja pogotownik - mapa"
              className="relative block h-full w-full rounded-[inherit] border object-contain dark:hidden"
            />
            <Image
              src={HeroImageDark}
              alt="Aplikacja pogotownik - mapa"
              className="relative hidden h-full w-full rounded-[inherit] border object-contain dark:block"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
