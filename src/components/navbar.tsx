"use client";

import { Backpack, Compass, Megaphone, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { AuroraText } from "./ui/aurora-text";
import { Button } from "./ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "./ui/button-group";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";
import { ShineBorder } from "./ui/shine-border";

export function Navbar() {
  return (
    <div className="fixed inset-x-0 top-4 z-10 flex items-center justify-center">
      <div className="relative container mx-auto flex items-center gap-4 rounded-lg bg-white/40 p-4 backdrop-blur-2xl">
        <ShineBorder
          shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
          borderWidth={2}
        />
        <div className="grid w-full grid-cols-3 items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tighter">
            <AuroraText colors={["#3b82f6", "#e11d48"]}>Pogotownik</AuroraText>
          </h1>

          <div>
            <ButtonGroup className="w-full [--radius:9999rem]">
              <ButtonGroup className="w-full">
                <InputGroup className="bg-white">
                  <InputGroupAddon>
                    <Search />
                  </InputGroupAddon>
                  <InputGroupInput placeholder={"Dokąd się wybierasz?"} />
                </InputGroup>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline" size="icon">
                  <Compass />
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </div>

          <div className="flex justify-end">
            <ButtonGroup>
              <Button variant="white">
                <Megaphone /> Report
              </Button>
              <Button variant="white">
                <Backpack /> Plecak
              </Button>
              <ButtonGroupSeparator />
              <Button size="icon" asChild variant="white">
                <SidebarTrigger />
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
