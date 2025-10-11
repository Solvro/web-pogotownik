"use client";

import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const BACKPACK_ITEMS = [
  "Radio na baterie lub korbkę",
  "Latarka i zapasowe baterie",
  "Najpotrzebniejsze dokumenty osobiste",
  "Zapalniczka lub zapałki",
  "Maski oddechowe/ochronne",
  "Mapa z lokalnymi drogami, kompas, busola, GPS",
  "Otwieracz do puszek",
  "Posiłki na 2 dni",
  "Nóż, ołówek i notes",
  "Komplet sztućców",
  "Kurtka przeciwdeszczowa",
  "Apteczka pierwszej pomocy",
  "Śpiwór",
  "Worki na śmieci",
  "Ciepłe ubrania na zmianę",
  "Mydło i żel do dezynfekcji",
  "Kombinerki, łom, narzędzie wielofunkcyjne",
  "Gotówka w niewielkich nominałach",
  "Woda (minimum 3 litry na osobę)",
  "Butelka filtrująca z nowym filtrem",
  "Gumy, sznurki, opaska zaciskowa",
  "Telefon komórkowy z ładowarką przenośną",
];

export function BackpackList() {
  const [packedItems, setPackedItems] = useState(0);
  const { width, height } = useWindowSize();
  const totalItems = BACKPACK_ITEMS.length;

  const showConfetti = packedItems === totalItems;

  return (
    <>
      {showConfetti ? (
        <Confetti className="!z-10" width={width} height={height} />
      ) : null}
      <ul className="my-8 grid grid-cols-2 gap-2">
        {BACKPACK_ITEMS.map((item) => (
          <li key={item}>
            <Label>
              <Checkbox
                className="mb-2"
                onCheckedChange={(checked) => {
                  setPackedItems(
                    (previous) =>
                      previous +
                      (checked === "indeterminate" ? 0 : checked ? 1 : -1),
                  );
                }}
              />
              {item}
            </Label>
          </li>
        ))}
      </ul>
      <Progress
        value={(packedItems / totalItems) * 100}
        indicatorClassName={cn(showConfetti && "bg-green-500")}
      />
    </>
  );
}
