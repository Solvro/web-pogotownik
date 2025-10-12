"use server";

import type { InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";

import db from "@/db";
import type { LayerFetchFunction } from "@/types/app";

import type { defibrillatorsTable } from "../../../drizzle/schema";
import type { Layer } from "../enums";

type Defibrillator = InferSelectModel<typeof defibrillatorsTable>;
type DefibrillatorWithCoords = Defibrillator & {
  Longitude: number;
  Latitude: number;
};

export const getAedsInDistance: LayerFetchFunction<Layer.AEDs> = async (
  center,
  options,
) => {
  const result = (await db.execute(
    sql`
      SELECT *,
        ST_X(location::geometry) AS "Longitude",
        ST_Y(location::geometry) AS "Latitude"
      FROM defibrillators
      WHERE ST_DWithin(
        location,
        ST_SetSRID(ST_MakePoint(${center.lng}, ${center.lat}), 4326)::geography,
        ${options?.distance}
      )
    `,
  )) as { rows: DefibrillatorWithCoords[] };

  return result.rows.map((aed) => {
    const lng = aed.Longitude;
    const lat = aed.Latitude;
    const defibrillatorLocation =
      aed.defibrillatorLocation ??
      aed.defibrillatorLocationPl ??
      aed.defibrillatorLocationEn ??
      "Nieznana lokalizacja";

    return {
      lat,
      lng,
      meta: {
        location: aed.location,
        access: aed.access,
        emergency: aed.emergency,
        level: aed.level,
        phone: aed.phone,
        emergencyPhone: aed.emergencyPhone,
        openingHours: aed.openingHours,
        indoor: aed.indoor,
        defibrillatorLocation,
      },
    };
  });
};
