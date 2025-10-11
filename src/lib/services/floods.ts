"use server";

import { SERVICE_API_URLS } from "@/config/constants";
import type { Coordinates, LayerLocation } from "@/types/app";
import type { StationData } from "@/types/floods";

import { fetchQuery } from "../api";
import { Layer } from "../enums";
import { getClosestPoints } from "../helpers/geography";

export async function fetchStationsWithWarnings() {
  const data = await fetchQuery<StationData[]>(
    SERVICE_API_URLS[Layer.Floods].stations,
    {
      next: {
        revalidate: 7 * 24 * 60 * 60, // 1 week
      },
    },
  );

  return data
    .map((station) => {
      const przeplyw = Number.parseFloat(station.przelyw);
      const stan = Number.parseFloat(station.stan_wody);
      const ratio = przeplyw / stan;

      const levels = [1, 5, 10];
      const warningLevel = levels.filter(
        (threshold) => ratio > threshold,
      ).length;

      return {
        lat: station.lat,
        lng: station.lon,
        warningLevel,
        reportedAt: station.stan_wody_data_pomiaru
          ? new Date(station.stan_wody_data_pomiaru.replace(" ", "T"))
          : null,
      };
    })
    .filter((station) => {
      return station.warningLevel > 0;
    });
}

export async function getFloodWarnings(
  point: Coordinates,
): Promise<LayerLocation<Layer.Floods>[]> {
  const floods = await fetchStationsWithWarnings();
  const closestFloods = getClosestPoints(point, floods);
  return closestFloods.map((flood) => ({
    lat: flood.lat,
    lng: flood.lng,
    meta: {
      warningLevel: flood.warningLevel,
      reportedAt: flood.reportedAt,
    },
  }));
}
