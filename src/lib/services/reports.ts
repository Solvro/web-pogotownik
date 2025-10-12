"use server";

import { reportsTable } from "@/../drizzle/schema";
import db from "@/db";
import type { LayerFetchFunction } from "@/types/app";
import type { ReportFormValues } from "@/types/forms";

import type { Layer } from "../enums";

export async function addReport(data: ReportFormValues) {
  await db.insert(reportsTable).values({
    reportEventType: data.reportEventType,
    description: data.description,
    lat: data.lat,
    lng: data.lng,
  });
  return { success: true, message: "Report added successfully." };
}

export const getAllReports: LayerFetchFunction<Layer.Reports> = async () => {
  const reports = await db.select().from(reportsTable);
  return reports.map(({ lat, lng, ...meta }) => ({ lat, lng, meta }));
};
