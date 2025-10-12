import { Layer } from "@/lib/enums";
import type { Coordinates, EnabledLayers } from "@/types/app";

export const SKS_COORDINATES: Coordinates = {
  lat: 51.108_912_865_073_506,
  lng: 17.056_914_550_627_265,
};

export const SERVICE_API_URLS = {
  [Layer.Smog]: {
    stations:
      "https://api.gios.gov.pl/pjp-api/v1/rest/station/findAll?size=1000",
    airQuality: "https://api.gios.gov.pl/pjp-api/v1/rest/aqindex/getIndex",
  },
  [Layer.Fires]: {
    satelliteData: "https://firms.modaps.eosdis.nasa.gov/api/area/csv",
  },
  [Layer.Floods]: {
    stations: "https://danepubliczne.imgw.pl/api/data/hydro/",
  },
};

export const EARTH_RADIUS_KM = 6371;

export const DEFAULT_MAP_ZOOM = 14;
export const MAX_MAP_ZOOM = 20;
export const ENABLED_LAYERS_COOKIE_NAME = "pogotownik_enabled_layers";

export const DEFAULT_ENABLED_LAYERS: EnabledLayers = {
  [Layer.Smog]: false,
  [Layer.Fires]: false,
  [Layer.Floods]: false,
  [Layer.Shelters]: false,
  [Layer.AEDs]: false,
  [Layer.Reports]: false,
};

export const reportEventType = [
  { label: "Dron", value: "drone" },
  { label: "Protest", value: "protest" },
  { label: "Brak prądu", value: "no_energy" },
  { label: "Inne", value: "other" },
] as const;
