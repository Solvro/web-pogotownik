"use client";

import {
  ChevronDown,
  Drone,
  Flame,
  Lightbulb,
  Megaphone,
  MessageSquareWarning,
  SquareActivity,
  Warehouse,
  Waves,
  Wind,
  Zap,
} from "lucide-react";
import React, { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

export function MapLegend() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-6 z-20 flex w-xs max-w-xs min-w-xs flex-col rounded-lg bg-white/30 p-4 pt-2 shadow-lg backdrop-blur-md transition-[bottom]",
        !open && "-bottom-108",
      )}
    >
      <div className="mx-1 flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-medium text-black">
          <h3>Legenda</h3>
          <Lightbulb className="size-4" />
        </div>

        <Button
          size={"icon"}
          variant="ghost"
          onClick={() => {
            setOpen(!open);
          }}
        >
          <ChevronDown
            className={cn("size-4 transition-transform", !open && "rotate-180")}
          />
        </Button>
      </div>

      <div className="mt-1 rounded-lg bg-white px-3">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger>Schrony</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-green-600 bg-green-100/50 backdrop-blur-md">
                  <Warehouse className="size-3 text-green-500" />
                </div>
                <p className="text-xs">
                  {" "}
                  - MDS (Miejsce doraźnego schronienia)
                </p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-blue-600 bg-blue-100/50 backdrop-blur-md">
                  <Warehouse className="size-3 text-blue-500" />
                </div>
                <p className="text-xs"> - U (ukrycie)</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-rose-600 bg-rose-100/50 backdrop-blur-md">
                  <Warehouse className="size-3 text-rose-500" />
                </div>
                <p className="text-xs"> - S (schron)</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Jakość powietrza</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-green-600 bg-green-100/50 backdrop-blur-md">
                  <Wind className="size-3 text-green-500" />
                </div>
                <p className="text-xs"> - Bardzo dobra</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-yellow-600 bg-yellow-100/50 backdrop-blur-md">
                  <Wind className="size-3 text-yellow-500" />
                </div>
                <p className="text-xs"> - Dobra</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-orange-600 bg-orange-100/50 backdrop-blur-md">
                  <Wind className="size-3 text-orange-500" />
                </div>
                <p className="text-xs"> - Umiarkowana</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-red-600 bg-red-100/50 backdrop-blur-md">
                  <Wind className="size-3 text-red-500" />
                </div>
                <p className="text-xs"> - Dostateczna</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-purple-600 bg-purple-100/50 backdrop-blur-md">
                  <Wind className="size-3 text-purple-500" />
                </div>
                <p className="text-xs"> - Zła</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Pożary</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-yellow-600 bg-yellow-100/50 backdrop-blur-md">
                  <Flame className="size-3 text-yellow-500" />
                </div>
                <p className="text-xs"> - Mały (do 1 ha)</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-orange-600 bg-orange-100/50 backdrop-blur-md">
                  <Flame className="size-3 text-orange-500" />
                </div>
                <p className="text-xs"> - Umiarkowany (1-5 ha)</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-red-600 bg-red-100/50 backdrop-blur-md">
                  <Flame className="size-3 text-red-500" />
                </div>
                <p className="text-xs"> - Duży (powyżej 5 ha)</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger>Poziom wody</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-blue-400 bg-blue-100/50 backdrop-blur-md">
                  <Waves className="size-3 text-blue-400" />
                </div>
                <p className="text-xs"> - Tendencja wzrostowa</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-blue-600 bg-blue-100/50 backdrop-blur-md">
                  <Waves className="size-3 text-blue-600" />
                </div>
                <p className="text-xs"> - Ponad normę</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-blue-800 bg-blue-100/50 backdrop-blur-md">
                  <Waves className="size-3 text-blue-800" />
                </div>
                <p className="text-xs"> - Stan alarmowy</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-5">
            <AccordionTrigger>Defibrylatory (AED)</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-rose-600 bg-rose-100/50 backdrop-blur-md">
                  <SquareActivity className="size-3 text-rose-500" />
                </div>
                <p className="text-xs"> - Defibrylator do użytku publicznego</p>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-6">
            <AccordionTrigger>Zgłoszenia</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-purple-600 bg-purple-100/50 backdrop-blur-md">
                  <Drone className="size-3 text-purple-500" />
                </div>
                <p className="text-xs"> - Dron</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-purple-600 bg-purple-100/50 backdrop-blur-md">
                  <Zap className="size-3 text-purple-500" />
                </div>
                <p className="text-xs"> - Brak energii</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-purple-600 bg-purple-100/50 backdrop-blur-md">
                  <Megaphone className="size-3 text-purple-500" />
                </div>
                <p className="text-xs"> - Protest</p>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex size-5 items-center justify-center rounded-full border border-purple-600 bg-purple-100/50 backdrop-blur-md">
                  <MessageSquareWarning className="size-3 text-purple-500" />
                </div>
                <p className="text-xs"> - Inne</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
