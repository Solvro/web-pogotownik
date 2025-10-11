import { EARTH_RADIUS_KM } from "@/config/constants";
import type { Coordinates } from "@/types/app";

/** Returns the distance between the points in kilometres. */
function haversineDistance(a: Coordinates, b: Coordinates): number {
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;

  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
}

/** Returns the first few closest points to the target.
 * @param target The target coordinates.
 * @param points The list of points to search from.
 * @param count The number of closest points to return. Default is 10.
 * @returns An array of the closest points with their distances.
 */
export function getClosestPoints<T extends Coordinates>(
  target: Coordinates,
  points: T[],
  count = 10,
): (T & { distance: number })[] {
  return points
    .map((point) => ({
      ...point,
      distance: haversineDistance(target, point),
    }))
    .toSorted((a, b) => a.distance - b.distance)
    .slice(0, count);
}
