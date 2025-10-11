"use server";

import type { LayerFetchFunction } from "@/types/app";
import type { SheltersResponse } from "@/types/shelters";

import { fetchQuery } from "../api";
import type { Layer } from "../enums";

export const getShelters: LayerFetchFunction<Layer.Shelters> = async (
  { lat, lng },
  options,
) => {
  const data = await fetchQuery<SheltersResponse>(
    `https://services-eu1.arcgis.com/HE4WRthd9CIPj0R8/arcgis/rest/services/schrony_csv/FeatureServer/0/query?where=1%3D1&geometryType=esriGeometryPoint&geometry=${lng.toString()},${lat.toString()}&inSR=4326&distance=${options?.distance.toString() ?? "500"}&units=esriSRUnit_Meter&outFields=*&f=json`,
    {
      next: {
        revalidate: 7 * 24 * 60 * 60, // 1 week
      },
    },
  );

  return data.features.map((feature) => ({
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
};
