"use client";

import { createContext, useContext } from "react";

import type { Layer } from "@/lib/enums";
import type { Coordinates, LabelledLayerLocation } from "@/types/app";

export interface MapContextValue {
  enabledLayers: Record<Layer, boolean>;
  toggleLayer: (layer: Layer) => void;
  center: Coordinates;
  setCenter: (center: Coordinates) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  locations: LabelledLayerLocation<Layer>[];
}

export const MapContext = createContext<MapContextValue | undefined>(undefined);

export function useMap() {
  const context = useContext(MapContext);
  if (context == null) {
    throw new Error("useMap must be used within a MapContextProvider");
  }
  return context;
}
