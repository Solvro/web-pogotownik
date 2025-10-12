"use client";

import { Backpack, Megaphone } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { NavSearch } from "./nav-search";
import { ReportDialog } from "./report-form/report-dialog";
import { AuroraText } from "./ui/aurora-text";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";

export function Navbar() {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="fixed inset-x-0 top-4 z-10 flex items-center justify-center">
      <div className="relative container mx-auto flex items-center gap-4 rounded-lg bg-white/40 p-4 shadow-lg backdrop-blur-lg">
        {/* <ShineBorder
          shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderWidth={2}
        /> */}
        <div className="grid w-full grid-cols-3 items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tighter">
            <Link href="/map">
              <AuroraText colors={["#3b82f6", "#e11d48"]}>
                Pogotownik
              </AuroraText>
            </Link>
          </h1>

          <div>
            <NavSearch />
          </div>

          <div className="flex justify-end">
            <ButtonGroup>
              {segment === "map" ? (
                <>
                  <Button size="icon" asChild variant="white">
                    <SidebarTrigger />
                  </Button>
                  <ButtonGroupSeparator />
                </>
              ) : null}
              <ReportDialog
                trigger={
                  <Button variant="white">
                    <Megaphone /> Report
                  </Button>
                }
              />
              <ButtonGroupSeparator />
              <Button variant="white" asChild>
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
