import {
  Drone,
  Flame,
  Megaphone,
  MessageSquareWarning,
  SquareActivity,
  Warehouse,
  Waves,
  Wind,
  Zap,
} from "lucide-react";

import { Layer } from "@/lib/enums";
import type { IconElementType } from "@/types/app";
import type { UserReport } from "@/types/reports";

export const LAYER_ICONS: Record<Layer, IconElementType> = {
  [Layer.Shelters]: Warehouse,
  [Layer.Smog]: Wind,
  [Layer.Fires]: Flame,
  [Layer.Floods]: Waves,
  [Layer.AEDs]: SquareActivity,
  [Layer.Reports]: MessageSquareWarning,
};

export const USER_REPORT_ICONS: Partial<
  Record<UserReport["reportEventType"], IconElementType>
> = {
  drone: Drone,
  no_energy: Zap,
  protest: Megaphone,
};
