"use server";

import { SERVICE_CONFIG } from "@/config/constants";
import type { LayerFetchFunction } from "@/types/app";
import type { SheltersResponse } from "@/types/shelters";

import { fetchQuery } from "../api";
import { Layer } from "../enums";

export const getShelters: LayerFetchFunction<Layer.Shelters> = async (
  { lat, lng },
  options,
) => {
  const data = await fetchQuery<SheltersResponse>(
    `${SERVICE_CONFIG[Layer.Shelters].url}&geometry=${lng.toString()},${lat.toString()}&distance=${options?.distance.toString() ?? "500"}`,
    {
      next: {
        revalidate: 7 * 24 * 60 * 60, // 1 week
      },
    },
  );

  const shelters = data.features.map((feature) => ({
    lat: feature.attributes.y,
    lng: feature.attributes.x,
    meta: {
      id: feature.attributes.ObjectID,
      address: feature.attributes.Adres,
      capacity: feature.attributes.Pojemnoś_,
      area: feature.attributes.Powierzchn,
      type: feature.attributes.Rodzaj_inw,
      buildingType: feature.attributes.Rodzaj_obi,
      purpose: feature.attributes.Przeznacze,
    },
  }));

  // Remove duplicates based on ObjectID and coordinates
  const seen = new Set<string>();
  return shelters.filter((shelter) => {
    const key = `${String(shelter.meta.id)}-${shelter.lat.toFixed(6)}-${shelter.lng.toFixed(6)}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
