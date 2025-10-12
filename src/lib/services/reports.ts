"use server";

import db from "@/db";
import type { reportFormValues } from "@/types/forms";

import { reportsTable } from "../../../drizzle/schema";

export async function addReport(data: reportFormValues) {
  await db.insert(reportsTable).values({
    reportEventType: data.reportEventType,
    description: data.description,
    lat: data.lat,
    lng: data.lng,
  });
  return { success: true, message: "Report added successfully." };
}
