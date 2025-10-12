import type { InferSelectModel } from "drizzle-orm";

import type { defibrillatorsTable } from "@/../drizzle/schema";

export interface AEDsData {
  location: string;
  access: string | null;
  emergency: string;
  level: string | null;
  phone: string | null;
  emergencyPhone: string | null;
  openingHours: string | null;
  indoor: string | null;
  defibrillatorLocation: string;
}

export type Defibrillator = InferSelectModel<typeof defibrillatorsTable>;
export type DefibrillatorWithCoords = Defibrillator & {
  Longitude: number;
  Latitude: number;
};
