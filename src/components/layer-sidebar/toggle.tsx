"use client";

import type { ReactNode } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMap } from "@/hooks/use-map";
import type { Layer } from "@/lib/enums";
import { cn } from "@/lib/utils";
import type { SynchronousReactNode } from "@/types/helpers";

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
        "hover:bg-accent/50 flex items-start gap-3 rounded-lg border bg-white p-3",
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
          "dark:border-blue-700d border-blue-600 bg-blue-600 text-white dark:bg-blue-700":
            checked,
        })}
      />
      <div className="grid gap-1.5 font-normal">
        <div className="flex items-center justify-between">
          <p className="text-sm leading-none font-medium">{layer}</p>
          {icon}
        </div>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </Label>
  );
}
