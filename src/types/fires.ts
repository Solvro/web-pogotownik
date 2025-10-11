import type { Coordinates } from "./app";

export interface FireReport {
  coordinates: Coordinates;
  intensity: number;
  reportedAt: Date;
}
