"use client";

/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";
import Image from "next/image";

import HeroImage from "@/../public/hero.png";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Particles } from "@/components/magicui/particles";
import { Button } from "@/components/ui/button";

export default function SplashScreen() {
  return (
    <main className="mx-auto flex-1 overflow-hidden">
      <section
        id="hero"
        className="relative mx-auto mt-44 max-w-[80rem] px-6 text-center md:px-8"
      >
        <h1 className="font-cal animate-fade-in translate-y-[-1rem] bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl leading-none font-medium tracking-normal text-balance text-transparent opacity-0 [--animation-delay:200ms] sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40">
          tw<span className="text-primary">IST</span> to najlepszy sposób
          <br className="hidden md:block" /> na znalezienie pracy.
        </h1>
        <p className="animate-fade-in mb-12 translate-y-[-1rem] text-lg tracking-tight text-balance text-gray-400 opacity-0 [--animation-delay:400ms] md:text-xl">
          Automatycznie wyszukuj nalepsze oferty.
          <br className="hidden md:block" />
          Jako pracownik i jako pracodawca.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Button className="text-primary font-cal">
            <span className="translate-y-[1px]">Rozpocznij</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="animate-fade-up relative mt-[8rem] opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-20 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)]">
          <div className="bg-opacity-[0.01] before:animate-image-glow rounded-xl border border-white/10 bg-white before:absolute before:top-0 before:bottom-1/2 before:left-0 before:h-full before:w-full before:[background-image:linear-gradient(to_bottom,hsl(var(--primary)),hsl(var(--primary)),transparent_40%)] before:opacity-0 before:[filter:blur(180px)]">
            <BorderBeam colorFrom="hsl(var(--primary))" />
            <Image
              src={HeroImage}
              alt="Hero Image"
              className="relative h-full w-full rounded-[inherit] border object-contain"
            />
          </div>
        </div>
      </section>
      <section
        id="clients"
        className="mx-auto max-w-[80rem] px-6 text-center md:px-8"
      >
        <div className="py-14">
          <div className="mx-auto max-w-screen-xl px-4 md:px-8">
            <h2 className="text-center text-sm font-semibold text-gray-600">
              NASI KLIENCI PRCUJĄ W M. IN. W TYCH POTĘŻNYCH FIRMACH (😎):
            </h2>
            <div className="mt-6">
              <ul className="[&amp;_path]:fill-white flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
                <li>
                  <img
                    alt="Google"
                    src="https://cdn.magicui.design/companies/Google.svg"
                    className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
                <li>
                  <img
                    alt="Microsoft"
                    src="https://cdn.magicui.design/companies/Microsoft.svg"
                    className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
                <li>
                  <img
                    alt="GitHub"
                    src="https://cdn.magicui.design/companies/GitHub.svg"
                    className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
                <li>
                  <img
                    alt="Uber"
                    src="https://cdn.magicui.design/companies/Uber.svg"
                    className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
                <li>
                  <img
                    alt="Notion"
                    src="https://cdn.magicui.design/companies/Notion.svg"
                    className="h-8 w-28 px-2 dark:brightness-0 dark:invert"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="after:bg-background pointer-events-none relative -z-[2] mx-auto my-[-18.8rem] h-[50rem] overflow-hidden [mask-image:radial-gradient(ellipse_at_center_center,#000,transparent_50%)] [--color:hsl(var(--primary))] before:absolute before:inset-0 before:h-full before:w-full before:[background-image:radial-gradient(circle_at_bottom_center,var(--color),transparent_70%)] before:opacity-40 after:absolute after:top-1/2 after:-left-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[50%] after:border-t after:border-[hsl(var(--border))]"></div>
      <Particles
        className="animate-fade-up absolute inset-0 -z-10 opacity-0 [--animation-delay:400ms]"
        quantity={40}
        ease={40}
        color={"#fff"}
        refresh
      />
    </main>
  );
}
