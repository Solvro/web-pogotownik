"use client";

import { Backpack, Megaphone } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useWindowScroll } from "react-use";

import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

import { ModeToggle } from "./mode-toggle";
import { NavSearch } from "./nav-search";
import { ReportDialog } from "./report-form/report-dialog";
import { AuroraText } from "./ui/aurora-text";
import { Button } from "./ui/button";
import { ButtonGroup } from "./ui/button-group";

export function Navbar() {
  const segment = useSelectedLayoutSegment();
  const isMapPage = segment === "map";
  const scroll = useWindowScroll();
  const sidebar = useSidebar();

  return (
    <div className="fixed inset-x-0 top-4 z-10 flex items-center justify-center px-2 sm:px-4">
      <div
        className={cn(
          "bg-background/40 dark:bg-background/50 dark:border-border/50 relative container mx-auto flex items-center gap-4 rounded-2xl p-4 shadow-lg backdrop-blur-lg duration-300 dark:border",
          !isMapPage && scroll.y === 0 && "shadow-transparent",
        )}
      >
        <div className="grid w-full grid-cols-[1fr_auto] items-center gap-3 md:grid-cols-[1fr_auto_1fr]">
          <h1 className="hidden text-2xl font-bold tracking-tighter md:flex">
            <Link href="/map">
              <AuroraText colors={["#3b82f6", "#e11d48"]}>
                Pogotownik
              </AuroraText>
            </Link>
          </h1>

          <NavSearch />
          {isMapPage ? (
            <Button variant="outline" asChild>
              <SidebarTrigger className="px-4! sm:hidden" />
            </Button>
          ) : null}
          <div className="hidden justify-end sm:flex">
            <ButtonGroup>
              {isMapPage ? (
                <Button
                  size="icon"
                  asChild
                  variant="solid"
                  tooltip={`${sidebar.open ? "Ukryj" : "Pokaż"} warstwy`}
                >
                  <SidebarTrigger side="right" />
                </Button>
              ) : null}
              <ModeToggle />
              <ReportDialog
                trigger={
                  <Button variant="solid">
                    <Megaphone /> Zgłoś
                  </Button>
                }
              />
              <Button variant="solid" asChild>
                <Link href="/plecak">
                  <Backpack /> Plecak
                </Link>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
