import { Layer } from "@/lib/enums";
import { getAirQuality } from "@/lib/services/smog";
import type { Coordinates, LayerFetchFunction } from "@/types/app";

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
};

export const EARTH_RADIUS_KM = 6371;

export const LAYER_FETCH_FUNCTIONS: { [L in Layer]: LayerFetchFunction<L> } = {
  [Layer.Smog]: getAirQuality,
  [Layer.Fires]: () => [],
  [Layer.Floods]: () => [],
  [Layer.Shelters]: () => [],
  [Layer.AEDs]: () => [],
};
