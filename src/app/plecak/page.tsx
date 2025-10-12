"use client";

import { Check, InfoIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import CapyImage from "@/../public/capybara.png";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

export default function BackpackPage() {
  const [packedItems, setPackedItems] = useState(0);
  const { width, height } = useWindowSize();
  const totalItems = BACKPACK_ITEMS.length;

  const donePacking = packedItems === totalItems;

  return (
    <div className="container mx-auto flex h-screen flex-col pt-28">
      <div className="flex items-center gap-10">
        <h1 className="min-w-max -translate-y-1 text-3xl font-bold">
          Plecak bezpieczeństwa
        </h1>
        <div className="flex w-full items-center gap-3">
          <Progress
            value={(packedItems / totalItems) * 100}
            indicatorClassName={cn(donePacking && "bg-emerald-500")}
          />
          <span
            className={cn(
              "min-w-max rounded-full bg-blue-500 px-2 py-1.5 text-xs font-bold text-white",
              {
                "bg-emerald-500": donePacking,
              },
            )}
          >
            {packedItems} / {totalItems} spakowane
          </span>
        </div>
      </div>
      {donePacking ? null : (
        <Alert
          variant="default"
          className="mt-6 max-w-3xl border-blue-600 bg-blue-50"
        >
          <InfoIcon />
          <AlertTitle className="text-lg font-semibold text-blue-600">
            Dlaczego warto mieć przygotowany plecak?
          </AlertTitle>
          <AlertDescription>
            <p>
              Przygotowany plecak może uratować życie w sytuacjach kryzysowych.
              W nim powinny znaleźć się niezbędne rzeczy, które pomogą przetrwać
              pierwsze 72 godziny po ewakuacji lub w sytuacji awaryjnej.
            </p>
          </AlertDescription>
        </Alert>
      )}

      {donePacking ? (
        <Confetti className="!z-10" width={width} height={height} />
      ) : null}

      <div className="grid flex-1 grid-cols-3">
        {donePacking ? (
          <div className="col-span-2 flex items-center justify-center">
            <div className="flex h-[80%] w-full max-w-2xl flex-col items-center justify-center rounded-xl bg-blue-100/40">
              <Check className="size-20 text-emerald-500" />
              <h2 className="mt-6 text-2xl font-bold">Gotowe!</h2>
              <p className="mt-2 max-w-sm text-center text-lg">
                Twój plecak jest w pełni spakowany i gotowy na każdą sytuację.
              </p>
            </div>
          </div>
        ) : (
          <ul className="col-span-2 my-8 grid grid-cols-2 gap-2">
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
        )}

        <div className="flex flex-col items-center justify-center">
          {donePacking ? (
            <Image
              src={CapyImage}
              alt="photo"
              width={559}
              height={512}
              className={"scale-x-[-1] rounded-xl"}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
