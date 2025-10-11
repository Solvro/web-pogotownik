import { SERVICE_API_URLS } from "@/config/constants";
import type {
  AirQualityIndexResponse,
  AirQualityMeasuringStationFindAllResponse,
  SanitizedAirQualityIndex,
  SanitizedAirQualityMeasuringStation,
} from "@/types/smog";

import { fetchQuery } from "../api";
import { Layer } from "../enums";
import { deserializeNullableDate } from "../helpers/transformations";

async function getAllSmogStations(): Promise<
  SanitizedAirQualityMeasuringStation[]
> {
  const data = await fetchQuery<AirQualityMeasuringStationFindAllResponse>(
    SERVICE_API_URLS[Layer.Smog].stations,
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

async function getAirQualityAtStation(
  stationId: number,
): Promise<SanitizedAirQualityIndex> {
  const url = `${SERVICE_API_URLS[Layer.Smog].airQuality}/${String(stationId)}`;
  const data = await fetchQuery<AirQualityIndexResponse>(url, {
    next: {
      revalidate: 60, // 1 minute
    },
  });
  const indexData = data.AqIndex;
  return {
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
}

export async function getAirQuality(): Promise<
  {
    station: SanitizedAirQualityMeasuringStation;
    airQuality: SanitizedAirQualityIndex;
  }[]
> {
  const stations = await getAllSmogStations();
  const stationsWithAirQuality = await Promise.all(
    stations.map(async (station) => ({
      station,
      airQuality: await getAirQualityAtStation(station.id),
    })),
  );
  return stationsWithAirQuality;
}
