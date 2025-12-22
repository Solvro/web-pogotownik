import Link from "next/link";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { USER_REPORT_ICONS } from "@/config/icons";
import type { IconElementType, LayerMetadata } from "@/types/app";
import type { SynchronousReactNode } from "@/types/helpers";
import { getReportLabel } from "@/utils/get-report-label";

import { Layer } from "./enums";
import { conjugateNumeric } from "./helpers/polish";
import { cn } from "./utils";

const formatNullableString = (field: string | null | undefined) =>
  field == null || field.trim() === "" ? (
    <span className="text-foreground/50 italic">brak danych</span>
  ) : (
    field
  );

const formatNullableDate = (date: Date | string | null | undefined) =>
  date == null ? (
    formatNullableString(date)
  ) : (
    <span className="text-foreground/50">
      {new Date(date).toLocaleString()}
    </span>
  );

const getShelterColor = (meta: LayerMetadata[Layer.Shelters]) => ({
  "border-green-600 bg-green-100/50 text-green-500":
    meta.buildingType.includes("[3]"),
  "border-blue-600 bg-blue-100/50 text-blue-500":
    meta.buildingType.includes("[2]"),
  "border-red-600 bg-red-100/50 text-red-500":
    meta.buildingType.includes("[1]"),
});

const getFireColor = (meta: LayerMetadata[Layer.Fires]) => ({
  "border-yellow-400 bg-yellow-100/50 text-yellow-500": meta.intensity === 1,
  "border-orange-600 bg-orange-100/50 text-orange-500": meta.intensity === 2,
  "border-red-700 bg-red-100/50 text-red-500": meta.intensity >= 3,
});

const getFloodsColor = (meta: LayerMetadata[Layer.Floods]) => ({
  "border-blue-400 bg-blue-100/50 text-blue-400": meta.warningLevel === 1,
  "border-blue-600 bg-blue-100/50 text-blue-600": meta.warningLevel === 2,
  "border-blue-700 bg-blue-100/50 text-blue-700": meta.warningLevel >= 3,
});

const getAirQualityColor = (meta: LayerMetadata[Layer.Smog]) => ({
  "border-green-400 bg-green-100/50 text-green-500":
    meta.airQuality.overallValue < 1,
  "border-yellow-600 bg-yellow-100/50 text-yellow-500":
    meta.airQuality.overallValue >= 1 && meta.airQuality.overallValue < 2,
  "border-orange-700 bg-orange-100/50 text-orange-500":
    meta.airQuality.overallValue >= 2 && meta.airQuality.overallValue < 3,
  "border-red-700 bg-red-100/50 text-red-500":
    meta.airQuality.overallValue >= 3 && meta.airQuality.overallValue < 4,
  "border-purple-700 bg-purple-100/50 text-purple-500":
    meta.airQuality.overallValue >= 4,
});

export const LAYER_FORMATTERS: {
  [L in Layer]: (
    icon: IconElementType,
    meta: LayerMetadata[L],
  ) => {
    marker: SynchronousReactNode;
    dialog: SynchronousReactNode;
  };
} = {
  [Layer.Smog]: (Icon, meta) => ({
    marker: (
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          getAirQualityColor(meta),
        )}
      >
        <Icon className="size-4" />
      </div>
    ),
    dialog: (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={cn(getAirQualityColor(meta), "bg-transparent")} />{" "}
            Stacja badawcza #{meta.station.id}
          </DialogTitle>
          <DialogDescription>
            {meta.station.address.street}, {meta.station.address.city}, woj.{" "}
            {meta.station.address.province.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <div>Jakość powietrza: {meta.airQuality.overallCategoryName}</div>
          <div>
            Wartość wskaźnika NO<span>2</span>:{" "}
            {formatNullableString(meta.airQuality.no2.categoryName)}
          </div>
          <div>
            Wartość wskaźnika SO<span>2</span>:{" "}
            {formatNullableString(meta.airQuality.so2.categoryName)}
          </div>
          <div>
            Wartość wskaźnika PM10:{" "}
            {formatNullableString(meta.airQuality.pm10.categoryName)}
          </div>
          <div>
            Wartość wskaźnika PM25:{" "}
            {formatNullableString(meta.airQuality.pm25.categoryName)}
          </div>
          <div>
            Wartość wskaźnika O<span>3</span>:{" "}
            {formatNullableString(meta.airQuality.o3.categoryName)}
          </div>
        </div>
        {meta.airQuality.calculatedAt == null ? null : (
          <div>
            Data wykonania pomiarów:{" "}
            {formatNullableDate(meta.airQuality.calculatedAt)}
          </div>
        )}
      </>
    ),
  }),
  [Layer.Fires]: (Icon, meta) => ({
    marker: (
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          getFireColor(meta),
        )}
      >
        <Icon className={"size-4"} />
      </div>
    ),
    dialog: (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={cn(getFireColor(meta), "bg-transparent")} /> Pożar
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <div>Wielkość pożaru: {meta.intensity}</div>
          <div>Zgłoszono: {formatNullableDate(meta.reportedAt)}</div>
        </div>
      </>
    ),
  }),
  [Layer.Floods]: (Icon, meta) => ({
    marker: (
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          getFloodsColor(meta),
        )}
      >
        <Icon className={"size-4"} />
      </div>
    ),
    dialog: (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={cn(getFloodsColor(meta), "bg-transparent")} />{" "}
            Poziom wody
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-1">
          <div>Stopień zagrożenia: {meta.warningLevel}</div>
          {meta.reportedAt == null ? null : (
            <div>Data zgłoszenia: {formatNullableDate(meta.reportedAt)}</div>
          )}
        </div>
      </>
    ),
  }),
  [Layer.Shelters]: (Icon, meta) => ({
    marker: (
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          getShelterColor(meta),
        )}
      >
        <Icon className={"size-4"} />
      </div>
    ),
    dialog: (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className={cn(getShelterColor(meta), "bg-transparent")} />{" "}
            Schron #{meta.id}
          </DialogTitle>
          <DialogDescription>
            Rodzaj schronu: {meta.buildingType}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <div>
            Pojemność:{" "}
            {conjugateNumeric(meta.capacity, "os", "oba", "oby", "ób")}
          </div>
          {meta.address == null ? null : (
            <div className="flex items-center gap-2">
              Adres: <address>{meta.address}</address>
            </div>
          )}
          <div>Przeznaczenie: {meta.purpose}</div>
          <div>Źródło: {meta.type}</div>
        </div>
      </>
    ),
  }),
  [Layer.AEDs]: (Icon, meta) => ({
    marker: (
      <div className="flex size-6 items-center justify-center rounded-full border border-rose-600 bg-rose-100/50 backdrop-blur-md">
        <Icon className={cn("size-4 text-rose-500")} />
      </div>
    ),
    dialog: (
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="text-rose-500" /> Defibrylator
          </DialogTitle>
          <DialogDescription>{meta.defibrillatorLocation}</DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          <div>
            Dostęp: {meta.access === "private" ? "prywatny" : "publiczny"}
          </div>
          <div>
            Lokalizacja:{" "}
            {meta.level == null || meta.level === "0"
              ? "Parter"
              : `Poziom ${meta.level}`}
            , {meta.indoor === "yes" ? "w środku" : "na zewnątrz"}
          </div>
          {meta.openingHours == null ? null : (
            <div>Godziny otwarcia: {meta.openingHours}</div>
          )}
          {meta.emergencyPhone == null ? null : (
            <div>
              Telefon kontaktowy:{" "}
              <Link href={`tel:${meta.emergencyPhone}`}>
                {meta.emergencyPhone}
              </Link>
            </div>
          )}
        </div>
      </>
    ),
  }),
  [Layer.Reports]: (DefaultIcon, meta) => {
    const Icon = USER_REPORT_ICONS[meta.reportEventType] ?? DefaultIcon;
    return {
      marker: (
        <div className="flex size-6 items-center justify-center rounded-full border border-purple-600 bg-purple-100/50 backdrop-blur-md">
          <Icon className={cn("size-4 text-purple-500")} />
        </div>
      ),
      dialog: (
        <>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Icon className={cn("text-purple-500")} />
              Zgłoszenie użytkownika
            </DialogTitle>
            <DialogDescription>
              Rodzaj zgłoszenia: {getReportLabel(meta.reportEventType)}
            </DialogDescription>
          </DialogHeader>
          <div>Opis zgłoszenia: {formatNullableString(meta.description)}</div>
        </>
      ),
    };
  },
};
