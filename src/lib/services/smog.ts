"use server";

import { SERVICE_CONFIG } from "@/config/constants";
import type { LayerFetchFunction } from "@/types/app";
import type {
  AirQualityIndexResponse,
  AirQualityMeasuringStationFindAllResponse,
  SanitizedAirQualityIndex,
  SanitizedAirQualityMeasuringStation,
} from "@/types/smog";

import { fetchQuery } from "../api";
import { Layer } from "../enums";
import { getClosestPoints } from "../helpers/geography";
import {
  arrayAverage,
  deserializeNullableDate,
} from "../helpers/transformations";

const VALUE_CATEGORY_NAMES = [
  "Bardzo dobra",
  "Dobra",
  "Umiarkowana",
  "Dostateczna",
  "Zła",
];

let _allSmogStations: Promise<SanitizedAirQualityMeasuringStation[]> | null =
  null;

async function fetchAllSmogStations(): Promise<
  SanitizedAirQualityMeasuringStation[]
> {
  const data = await fetchQuery<AirQualityMeasuringStationFindAllResponse>(
    SERVICE_CONFIG[Layer.Smog].stationsUrl,
    {
      next: {
        revalidate: 7 * 24 * 60 * 60, // 1 week
      },
    },
  );
  return data["Lista stacji pomiarowych"].map((station) => ({
    id: station["Identyfikator stacji"],
    code: station["Kod stacji"],
    name: station["Nazwa stacji"],
    lat: Number.parseFloat(station["WGS84 φ N"]),
    lng: Number.parseFloat(station["WGS84 λ E"]),
    address: {
      street: station.Ulica,
      city: station["Nazwa miasta"],
      commune: station.Gmina,
      district: station.Powiat,
      province: station.Województwo,
    },
  }));
}

function calculateOverallQuality(
  data: Omit<SanitizedAirQualityIndex, "overallValue" | "overallCategoryName">,
) {
  const allValues = [
    data.value,
    data.so2.value,
    data.no2.value,
    data.pm10.value,
    data.pm25.value,
    data.o3.value,
  ];
  const values = allValues.filter((value) => value != null);
  const average = arrayAverage(values);
  return average;
}

async function getAllSmogStations(): Promise<
  SanitizedAirQualityMeasuringStation[]
> {
  if (_allSmogStations != null) {
    return _allSmogStations;
  }
  _allSmogStations = fetchAllSmogStations();
  return _allSmogStations;
}
async function getAirQualityAtStation(
  stationId: number,
): Promise<SanitizedAirQualityIndex> {
  const url = `${SERVICE_CONFIG[Layer.Smog].airQualityUrl}/${String(stationId)}`;
  const data = await fetchQuery<AirQualityIndexResponse>(url, {
    next: {
      revalidate: 60, // 1 minute
    },
  });
  const indexData = data.AqIndex;
  const sanitized = {
    calculatedAt: new Date(indexData["Data wykonania obliczeń indeksu"]),
    value: indexData["Wartość indeksu"],
    categoryName: indexData["Nazwa kategorii indeksu"],
    so2: {
      calculatedAt: deserializeNullableDate(
        indexData["Data wykonania obliczeń indeksu dla wskaźnika SO2"],
      ),
      value: indexData["Wartość indeksu dla wskaźnika SO2"],
      categoryName: indexData["Nazwa kategorii indeksu dla wskażnika SO2"],
    },
    no2: {
      calculatedAt: deserializeNullableDate(
        indexData["Data wykonania obliczeń indeksu dla wskaźnika NO2"],
      ),
      value: indexData["Wartość indeksu dla wskaźnika NO2"],
      categoryName: indexData["Nazwa kategorii indeksu dla wskażnika NO2"],
    },
    pm10: {
      calculatedAt: deserializeNullableDate(
        indexData["Data wykonania obliczeń indeksu dla wskaźnika PM10"],
      ),
      value: indexData["Wartość indeksu dla wskaźnika PM10"],
      categoryName: indexData["Nazwa kategorii indeksu dla wskażnika PM10"],
    },
    pm25: {
      calculatedAt: deserializeNullableDate(
        indexData["Data wykonania obliczeń indeksu dla wskaźnika PM2.5"],
      ),
      value: indexData["Wartość indeksu dla wskaźnika PM2.5"],
      categoryName: indexData["Nazwa kategorii indeksu dla wskażnika PM2.5"],
    },
    o3: {
      calculatedAt: deserializeNullableDate(
        indexData["Data wykonania obliczeń indeksu dla wskaźnika O3"],
      ),
      value: indexData["Wartość indeksu dla wskaźnika O3"],
      categoryName: indexData["Nazwa kategorii indeksu dla wskażnika O3"],
    },
  };
  const overallValue = calculateOverallQuality(sanitized);
  const overallCategoryName =
    VALUE_CATEGORY_NAMES[overallValue] ?? "Brak danych";
  return {
    ...sanitized,
    overallValue,
    overallCategoryName,
  };
}

/** Gets the air quality data based for the specified point based on the `count` nearest measurement stations. */
export const getAirQuality: LayerFetchFunction<Layer.Smog> = async (
  point,
  options,
) => {
  const stations = await getAllSmogStations();
  const closestStations = getClosestPoints(point, stations, options?.count);
  const quality = await Promise.all(
    closestStations.map(async (station) => ({
      lat: station.lat,
      lng: station.lng,
      meta: {
        station,
        airQuality: await getAirQualityAtStation(station.id),
      },
    })),
  );
  return quality.filter(
    (entry) => !Number.isNaN(entry.meta.airQuality.overallValue),
  );
};
