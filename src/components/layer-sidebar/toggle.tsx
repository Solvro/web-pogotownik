"use client";

import type { ReactNode } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMap } from "@/hooks/use-map";
import { Layer } from "@/lib/enums";
import { cn } from "@/lib/utils";
import type { SynchronousReactNode } from "@/types/helpers";

const ICON_COLORS = {
  [Layer.Smog]: "text-green-500",
  [Layer.AEDs]: "text-red-500",
  [Layer.Fires]: "text-orange-500",
  [Layer.Floods]: "text-blue-500",
  [Layer.Reports]: "text-purple-500",
  [Layer.Shelters]: "text-yellow-500",
};

export function LayerToggle({
  layer,
  icon,
  description,
}: {
  layer: Layer;
  icon: ReactNode;
  description: SynchronousReactNode;
}) {
  const { enabledLayers, toggleLayer } = useMap();
  const id = `toggle-${layer.replaceAll(/\s+/g, "-").toLowerCase()}`;
  const checked = enabledLayers[layer];
  return (
    <Label
      htmlFor={id}
      className={cn(
        "hover:bg-accent/75 bg-accent flex items-start gap-3 rounded-lg border p-3 transition",
        {
          "border-blue-600 bg-blue-50 dark:border-blue-900 dark:bg-blue-950":
            checked,
        },
      )}
    >
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={() => {
          toggleLayer(layer);
        }}
        className={cn({
          "border-blue-600 bg-blue-600 text-white dark:border-blue-700 dark:bg-blue-700":
            checked,
        })}
      />
      <div className="grid w-full gap-1.5 font-normal">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-sm leading-none font-medium">{layer}</h1>
          <div className={cn(ICON_COLORS[layer])}>{icon}</div>
        </div>
        <p className="text-muted-foreground text-xs text-balance">
          {description}
        </p>
      </div>
    </Label>
  );
}
