"use client";

import type { ReactNode } from "react";

import { Toggle } from "@/components/ui/toggle";
import { useMap } from "@/hooks/use-map";
import type { Layer } from "@/lib/enums";

export function LayerToggle({
  layer,
  icon,
}: {
  layer: Layer;
  icon: ReactNode;
}) {
  const { enabledLayers, toggleLayer } = useMap();
  return (
    <Toggle
      variant="outline"
      className="w-full justify-start py-4"
      pressed={enabledLayers[layer]}
      onPressedChange={() => {
        toggleLayer(layer);
      }}
    >
      {icon}
      <span>{layer}</span>
    </Toggle>
  );
}
