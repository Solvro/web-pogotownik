import { Flame, SquareActivity, Warehouse, Waves, Wind } from "lucide-react";

import { Layer } from "@/lib/enums";
import type { IconElementType } from "@/types/app";

export const LAYER_ICONS: Record<Layer, IconElementType> = {
  [Layer.Shelters]: Warehouse,
  [Layer.Smog]: Wind,
  [Layer.Fires]: Flame,
  [Layer.Floods]: Waves,
  [Layer.AEDs]: SquareActivity,
};
