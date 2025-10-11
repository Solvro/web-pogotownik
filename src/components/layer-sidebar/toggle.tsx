"use client";

import type { ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

import { useMap } from "@/hooks/use-map";
import type { Layer } from "@/lib/enums";

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export function LayerToggle({
  layer,
  icon,
}: {
  layer: Layer;
  icon: ReactNode;
}) {
  const { enabledLayers, toggleLayer } = useMap();
  const id = `toggle-${layer.replaceAll(/\s+/g, "-").toLowerCase()}`;
  return (
    <Label
      htmlFor={id}
      className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border bg-white p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
    >
      <Checkbox
        id={id}
        checked={enabledLayers[layer]}
        onCheckedChange={() => {
          toggleLayer(layer);
        }}
        className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
      />
      <div className="grid gap-1.5 font-normal">
        <div className="flex items-center justify-between">
          <p className="text-sm leading-none font-medium">{layer}</p>
          {isValidElement(icon)
            ? cloneElement(icon as React.ReactElement<{ className?: string }>, {
                className:
                  `w-4 h-4 ${(icon as React.ReactElement<{ className?: string }>).props.className ?? ""}`.trim(),
              })
            : icon}
        </div>
        <p className="text-muted-foreground text-sm">
          You can enable or disable notifications at any time.
        </p>
      </div>
    </Label>
  );
}
