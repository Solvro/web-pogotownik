"use client";

import { useState } from "react";
import type { ReactNode } from "react";

import { MapContext } from "@/hooks/use-map";

import { Layer } from "./enums";

export function MapContextProvider({ children }: { children: ReactNode }) {
  const [enabledLayers, setEnabledLayers] = useState<Record<Layer, boolean>>({
    [Layer.Smog]: false,
    [Layer.Fires]: false,
    [Layer.Floods]: false,
    [Layer.Shelters]: false,
    [Layer.AEDs]: false,
  });

  function toggleLayer(layer: Layer) {
    setEnabledLayers((previous) => ({
      ...previous,
      [layer]: !previous[layer],
    }));
  }

  return (
    <MapContext.Provider value={{ enabledLayers, toggleLayer }}>
      {children}
    </MapContext.Provider>
  );
}
