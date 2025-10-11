import type { ReactNode } from "react";

import { LAYER_ICONS } from "@/config/icons";
import { Layer } from "@/lib/enums";
import type {
  IconElementType,
  LayerLocation,
  LayerMetadata,
} from "@/types/app";

const LAYER_FORMATTERS: Partial<{
  [L in Layer]: (meta: LayerMetadata[L]) => ReactNode;
}> = {
  [Layer.Smog]: (meta) => <div>Jakość powietrza: {meta.airQuality.value}</div>,
};

export function Marker<T extends Layer>({
  layer,
  meta,
}: { layer: T } & LayerLocation<T>) {
  const Icon: IconElementType = LAYER_ICONS[layer];
  const formatter = LAYER_FORMATTERS[layer];
  return (
    <div className="z-[200]">
      <Icon />
      {formatter?.(meta)}
    </div>
  );
}
