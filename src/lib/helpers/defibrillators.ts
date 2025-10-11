import type {
  DefibrillatorFeature,
  DefibrillatorInsert,
} from "@/types/defibrillators";

/**
 * Converts GeoJSON coordinates to PostGIS geography point format
 * @param coordinates - Array of [longitude, latitude]
 * @returns PostGIS point string format
 */
export function coordinatesToPostGIS(coordinates: [number, number]): string {
  const [longitude, latitude] = coordinates;
  return `POINT(${longitude.toString()} ${latitude.toString()})`;
}

/**
 * Converts PostGIS geography point to GeoJSON coordinates
 * @param point - PostGIS point string like "POINT(lng lat)"
 * @returns Array of [longitude, latitude]
 */
export function postGISToCoordinates(point: string): [number, number] {
  const regex = /POINT\(([+-]?\d*\.?\d+)\s+([+-]?\d*\.?\d+)\)/;
  const match = regex.exec(point);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (match?.[1] === undefined || match[2] === undefined) {
    throw new Error(`Invalid PostGIS point format: ${point}`);
  }
  return [Number.parseFloat(match[1]), Number.parseFloat(match[2])];
}

/**
 * Transforms a GeoJSON defibrillator feature to database insert format
 * @param feature - GeoJSON feature from the API
 * @returns Database insert object
 */
export function transformDefibrillatorFeature(
  feature: DefibrillatorFeature,
): DefibrillatorInsert {
  const { properties, geometry } = feature;

  return {
    osmId: properties["@osm_id"].toString(),
    osmType: properties["@osm_type"],
    osmVersion: properties["@osm_version"],
    location: coordinatesToPostGIS(geometry.coordinates),
    access: properties.access,
    indoor: properties.indoor,
    emergency: properties.emergency,
    phone: properties.phone,
    openingHours: properties.opening_hours,
    emergencyPhone: properties["emergency:phone"],
    defibrillatorLocation: properties["defibrillator:location"],
    defibrillatorLocationPl: properties["defibrillator:location:pl"],
    defibrillatorLocationEn: properties["defibrillator:location:en"],
    level: properties.level,
    checkDate: properties.check_date,
  };
}

/**
 * Transforms multiple GeoJSON features to database insert format
 * @param features - Array of GeoJSON features
 * @returns Array of database insert objects
 */
export function transformDefibrillatorFeatures(
  features: DefibrillatorFeature[],
): DefibrillatorInsert[] {
  return features.map((feature) => transformDefibrillatorFeature(feature));
}
