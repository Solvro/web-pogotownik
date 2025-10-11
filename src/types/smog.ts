import type { JsonLdResponse } from "./json-ld";

/** Represents a single measurement station */
interface AirQualityMeasuringStation {
  /** Station ID */
  "Identyfikator stacji": number;

  /** Station code (unique short ID) */
  "Kod stacji": string;

  /** Station name */
  "Nazwa stacji": string;

  /** Latitude (WGS84 φ N) */
  "WGS84 φ N": string;

  /** Longitude (WGS84 λ E) */
  "WGS84 λ E": string;

  /** City identifier */
  "Identyfikator miasta": number;

  /** City name */
  "Nazwa miasta": string;

  /** Commune (gmina) */
  Gmina: string;

  /** District (powiat) */
  Powiat: string;

  /** Province / voivodeship (województwo) */
  Województwo: string;

  /** Street address (may be null) */
  Ulica: string | null;
}

/** Root response for GET /pjp-api/v1/rest/station/findAll */
export interface AirQualityMeasuringStationFindAllResponse
  extends JsonLdResponse {
  /** JSON-LD context definitions */
  "@context": {
    "Lista stacji pomiarów": { "@id": string };
    links: string;
    totalPages: string;
  };

  /** List of measurement stations */
  "Lista stacji pomiarowych": AirQualityMeasuringStation[];
}

/** Represents the Polish Air Quality Index (PIJP) data for a measuring station */
interface AirQualityMeasuringStationIndex {
  /** Station identifier */
  "Identyfikator stacji pomiarowej": number;

  /** Date and time when the index was calculated */
  "Data wykonania obliczeń indeksu": string;

  /** Overall air quality index value (0–5 or null if unavailable) */
  "Wartość indeksu": number | null;

  /** Overall index category name (e.g. "Bardzo dobry", "Zły") */
  "Nazwa kategorii indeksu": string | null;

  /** Source data timestamp for the overall index */
  "Data danych źródłowych, z których policzono wartość indeksu dla wskaźnika st":
    | string
    | null;

  /** === SO₂ (Sulfur Dioxide) Sub-index === */
  "Data wykonania obliczeń indeksu dla wskaźnika SO2": string | null;
  "Wartość indeksu dla wskaźnika SO2": number | null;
  "Nazwa kategorii indeksu dla wskażnika SO2": string | null;
  "Data danych źródłowych, z których policzono wartość indeksu dla wskaźnika SO2":
    | string
    | null;

  /** === NO₂ (Nitrogen Dioxide) Sub-index === */
  "Data wykonania obliczeń indeksu dla wskaźnika NO2": string | null;
  "Wartość indeksu dla wskaźnika NO2": number | null;
  "Nazwa kategorii indeksu dla wskażnika NO2": string | null;
  "Data danych źródłowych, z których policzono wartość indeksu dla wskaźnika NO2":
    | string
    | null;

  /** === PM10 Sub-index === */
  "Data wykonania obliczeń indeksu dla wskaźnika PM10": string | null;
  "Wartość indeksu dla wskaźnika PM10": number | null;
  "Nazwa kategorii indeksu dla wskażnika PM10": string | null;
  "Data danych źródłowych, z których policzono wartość indeksu dla wskaźnika PM10":
    | string
    | null;

  /** === PM2.5 Sub-index === */
  "Data wykonania obliczeń indeksu dla wskaźnika PM2.5": string | null;
  "Wartość indeksu dla wskaźnika PM2.5": number | null;
  "Nazwa kategorii indeksu dla wskażnika PM2.5": string | null;
  "Data danych źródłowych, z których policzono wartość indeksu dla wskaźnika PM2.5":
    | string
    | null;

  /** === O₃ (Ozone) Sub-index === */
  "Data wykonania obliczeń indeksu dla wskaźnika O3": string | null;
  "Wartość indeksu dla wskaźnika O3": number | null;
  "Nazwa kategorii indeksu dla wskażnika O3": string | null;
  "Data danych źródłowych, z których policzono wartość indeksu dla wskaźnika O3":
    | string
    | null;

  /** Whether the overall index is active/valid for the station */
  "Status indeksu ogólnego dla stacji pomiarowej": boolean;

  /** Code of the critical pollutant that determined the overall index */
  "Kod zanieczyszczenia krytycznego": string | null;
}

/** Root response for GET /pjp-api/v1/rest/aqindex/getIndex/{stationId} */
export interface AirQualityIndexResponse extends JsonLdResponse {
  /** JSON-LD context definitions */
  "@context": Record<string, string | Record<string, unknown>>;

  /** Air quality index details for the measuring station */
  AqIndex: AirQualityMeasuringStationIndex;
}

export interface SanitizedAirQualityMeasuringStation {
  id: number;
  code: string;
  name: string;
  lat: number;
  lng: number;
  address: {
    street: string | null;
    city: string;
    commune: string;
    district: string;
    province: string;
  };
}

interface IndexMetadata {
  calculatedAt: Date | null;
  value: number | null;
  categoryName: string | null;
}

export interface SanitizedAirQualityIndex extends IndexMetadata {
  so2: IndexMetadata;
  no2: IndexMetadata;
  pm10: IndexMetadata;
  pm25: IndexMetadata;
  o3: IndexMetadata;
}

export interface AirQualityData {
  station: SanitizedAirQualityMeasuringStation;
  airQuality: SanitizedAirQualityIndex;
}
