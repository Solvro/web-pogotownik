import { Layer } from "@/lib/enums";
import type { Coordinates } from "@/types/app";

export const SKS_COORDINATES: Coordinates = {
  lat: 51.108_912_865_073_506,
  lng: 17.056_914_550_627_265,
};

export const SERVICE_API_URLS = {
  [Layer.Smog]: {
    stations: "https://api.gios.gov.pl/pjp-api/v1/rest/station/findAll",
    airQuality: "https://api.gios.gov.pl/pjp-api/v1/rest/aqindex/getIndex",
  },
};
