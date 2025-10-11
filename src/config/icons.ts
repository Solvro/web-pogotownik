import { Flame, SquareActivity, Warehouse, Waves, Wind } from "lucide-react";
import type { ElementType } from "react";

import { Layer } from "@/lib/enums";

export const LAYER_ICONS: Record<Layer, ElementType> = {
  [Layer.Smog]: Wind,
  [Layer.Fires]: Flame,
  [Layer.Floods]: Waves,
  [Layer.Shelters]: Warehouse,
  [Layer.AEDs]: SquareActivity,
};
