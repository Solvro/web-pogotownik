"use client";

import { Backpack, Compass, Handshake, Info } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

import { Command, CommandInput } from "@/components/ui/command";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { Button } from "./ui/button";

function ListItem({
  title,
  children,
  href,
  ...props
}: ComponentPropsWithoutRef<"li"> & { href: Route }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function Navbar() {
  return (
    <NavigationMenu
      viewport={false}
      className="fixed top-6 right-0 left-0 z-10 mx-auto"
    >
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Pogotownik</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Command className="w-fit rounded-lg border shadow-md">
            <CommandInput placeholder="Dokąd się wybierasz?" />
          </Command>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Button variant="outline">
            <Compass />
          </Button>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Inne</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/" className="flex-row items-center gap-2">
                    <Backpack />
                    Plecak
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/" className="flex-row items-center gap-2">
                    <Handshake />
                    Polityka prywatności
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/" className="flex-row items-center gap-2">
                    <Info />O nas
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */}
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <SidebarTrigger />
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
