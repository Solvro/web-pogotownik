"use server";

import { SERVICE_API_URLS } from "@/config/constants";
import type { Coordinates, LayerLocation } from "@/types/app";

import { fetchQuery } from "../api";
import { Layer } from "../enums";
import { parseFireCSV } from "../helpers/csv";
import { getClosestPoints } from "../helpers/geography";

export async function fetchFireData() {
  const key = process.env.NASA_FIRMS_MAP_KEY ?? "";

  // approx poland borders
  const dataSource = "VIIRS_NOAA20_NRT";
  const areaBorders = {
    west: "12",
    south: "49",
    east: "24.5",
    north: "55.9",
  };
  const rangeDays = 1;
  const currentDate = new Date().toISOString().split("T")[0];

  const url = [
    SERVICE_API_URLS[Layer.Fires].satelliteData,
    key,
    dataSource,
    [
      areaBorders.west,
      areaBorders.south,
      areaBorders.east,
      areaBorders.north,
    ].join(","),
    String(rangeDays),
    currentDate,
  ].join("/");

  const data = await fetchQuery<string>(
    url,
    {
      next: {
        revalidate: 7 * 24 * 60 * 60, // 1 week
      },
    },
    false,
  );

  const parsedCsv = parseFireCSV(data);

  const fireReports = [];

  for (const item of parsedCsv) {
    const frp = item.frp as number;
    const minFRP = 0;
    const maxFRP = 10;

    let intensity = 1 + ((frp - minFRP) * (5 - 1)) / (maxFRP - minFRP);
    intensity = Math.round(Math.max(1, Math.min(5, intensity)));

    fireReports.push({
      lat: item.latitude as number,
      lng: item.longitude as number,
      intensity,
      reportedAt: new Date(item.acq_date as string),
      // bright_ti4: item.bright_ti4 as number,
      // scan: item.scan as number,
      // track: item.track as number,
      // acq_date: ,
      // acq_time: item.acq_time as number,
      // satellite: item.satellite as string,
      // instrument: item.instrument as string,
      // confidence: item.confidence as string,
      // version: item.version as string,
      // bright_ti5: item.bright_ti5 as number,
      // frp: item.frp as number,
      // daynight: item.daynight as string,
    });
  }
  return fireReports;
}

export async function getFireReports(
  point: Coordinates,
  count?: number,
): Promise<LayerLocation<Layer.Fires>[]> {
  const reports = await fetchFireData();
  const closestReport = getClosestPoints(point, reports, count);
  return closestReport.map((report) => ({
    lat: report.lat,
    lng: report.lng,
    meta: {
      intensity: report.intensity,
      reportedAt: report.reportedAt,
    },
  }));
}
