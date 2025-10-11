"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { ReactNode } from "react";

import { SKS_COORDINATES } from "@/config/constants";
import { MapContext } from "@/hooks/use-map";
import type { LayerFetchFunction } from "@/types/app";

import { Layer } from "./enums";
import { typedEntries } from "./helpers/typescript";
import { getAirQuality } from "./services/smog";

export const LAYER_FETCH_FUNCTIONS: { [L in Layer]: LayerFetchFunction<L> } = {
  [Layer.Smog]: getAirQuality,
  [Layer.Fires]: () => [],
  [Layer.Floods]: () => [],
  [Layer.Shelters]: () => [],
  [Layer.AEDs]: () => [],
};

export function MapContextProvider({ children }: { children: ReactNode }) {
  const [center, setCenter] = useState(SKS_COORDINATES);
  const [zoom, setZoom] = useState(2);
  const [enabledLayers, setEnabledLayers] = useState<Record<Layer, boolean>>({
    [Layer.Smog]: true,
    [Layer.Fires]: false,
    [Layer.Floods]: false,
    [Layer.Shelters]: false,
    [Layer.AEDs]: false,
  });

  async function fetchLocations() {
    const layersToFetch = typedEntries(enabledLayers).filter(
      ([_layer, enabled]) => enabled,
    );
    const locations = await Promise.all(
      layersToFetch.map(async ([layer]) => {
        const fetchFunction = LAYER_FETCH_FUNCTIONS[layer];
        const result = await fetchFunction(center);
        return result.map((location) => ({ ...location, layer }));
      }),
    );
    return locations.flat();
  }

  const query = useQuery({
    queryKey: ["map", "locations", center, enabledLayers],
    queryFn: fetchLocations,
    refetchOnMount: true,
  });

  function toggleLayer(layer: Layer) {
    setEnabledLayers((previous) => ({
      ...previous,
      [layer]: !previous[layer],
    }));
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
        locations: query.data ?? [],
      }}
    >
      {children}
    </MapContext.Provider>
  );
}
