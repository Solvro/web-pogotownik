"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";

import { DEFAULT_MAP_ZOOM, SKS_COORDINATES } from "@/config/constants";
import { MapContext } from "@/hooks/use-map";
import type { LayerFetchFunction } from "@/types/app";

import { Layer } from "./enums";
import {
  getEnabledLayersFromCookie,
  saveEnabledLayersToCookie,
} from "./helpers/cookies";
import { typedEntries } from "./helpers/typescript";
import { getAedsInDistance } from "./services/aed";
import { getFireReports } from "./services/fires";
import { getFloodWarnings } from "./services/floods";
import { getAllReports } from "./services/reports";
import { getShelters } from "./services/shelters";
import { getAirQuality } from "./services/smog";

export const LAYER_FETCH_FUNCTIONS: { [L in Layer]: LayerFetchFunction<L> } = {
  [Layer.Smog]: getAirQuality,
  [Layer.Fires]: getFireReports,
  [Layer.Floods]: getFloodWarnings,
  [Layer.Shelters]: getShelters,
  [Layer.AEDs]: getAedsInDistance,
  [Layer.Reports]: getAllReports,
};

export function MapContextProvider({ children }: { children: ReactNode }) {
  const [center, setCenter] = useState(SKS_COORDINATES);
  const [bounds, setBounds] = useState<{
    nw: { lat: number; lng: number };
    se: { lat: number; lng: number };
  } | null>(null);
  const [distance, setDistance] = useState(100);
  const [zoom, setZoom] = useState(DEFAULT_MAP_ZOOM);
  const [enabledLayers, setEnabledLayers] = useState(() =>
    getEnabledLayersFromCookie(),
  );

  async function fetchLocations() {
    const layersToFetch = typedEntries(enabledLayers).filter(
      ([_layer, enabled]) => enabled,
    );
    const locations = await Promise.all(
      layersToFetch.map(async ([layer]) => {
        const fetchFunction = LAYER_FETCH_FUNCTIONS[layer];

        // Adjust distance based on zoom level for better performance
        let adjustedDistance = distance;
        if (zoom < 10) {
          // At lower zoom levels, reduce the search radius significantly
          adjustedDistance = Math.min(distance, 1000);
        } else if (zoom < 13) {
          // At medium zoom levels, use moderate radius
          adjustedDistance = Math.min(distance, 5000);
        }

        const result = await fetchFunction(center, {
          distance: adjustedDistance,
        });

        return result.map((location) => ({ ...location, layer }));
      }),
    );

    return locations.flat();
  }

  const query = useQuery({
    queryKey: ["map", "locations", center, enabledLayers, zoom, distance],
    queryFn: fetchLocations,
    refetchOnMount: true,
    staleTime: zoom < 10 ? 30_000 : 10_000, // Keep data fresh longer at lower zoom levels
  });

  function toggleLayer(layer: Layer) {
    setEnabledLayers((previous) => {
      const newEnabledLayers = {
        ...previous,
        [layer]: !previous[layer],
      };
      saveEnabledLayersToCookie(newEnabledLayers);
      return newEnabledLayers;
    });
  }

  return (
    <MapContext.Provider
      value={{
        enabledLayers,
        toggleLayer,
        center,
        setCenter,
        zoom,
        setZoom,
        bounds,
        setBounds,
        distance,
        setDistance,
        locations: query.data ?? [],
        isLoading: query.isLoading,
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
