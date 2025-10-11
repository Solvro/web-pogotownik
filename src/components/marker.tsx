import { LAYER_ICONS } from "@/config/icons";
import type { Layer } from "@/lib/enums";
import type { MarkerProps } from "@/types/app";

export function Marker({ layer }: { layer: Layer } & MarkerProps) {
  const Icon = LAYER_ICONS[layer];
  return (
    <div>
      <Icon />
    </div>
  );
}
