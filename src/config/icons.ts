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

export const LAYER_ICONS: Record<
  Layer,
  { icon: IconElementType; description: string }
> = {
  [Layer.Shelters]: {
    icon: Warehouse,
    description: "Gdzie można się schronić w pobliżu?",
  },
  [Layer.Smog]: {
    icon: Wind,
    description: "Sprawdź, jaka jest jakość powietrza w Twojej okolicy",
  },
  [Layer.Fires]: {
    icon: Flame,
    description: "Obszary objęte intensywnymi pożarami",
  },
  [Layer.Floods]: {
    icon: Waves,
    description: "Okolice zagrożone powodzią lub zalaniem",
  },
  [Layer.AEDs]: {
    icon: SquareActivity,
    description: "Zlokalizuj najbliższy defibrylator",
  },
  [Layer.Reports]: {
    icon: MessageSquareWarning,
    description: "Incydenty zgłoszone przez użytkowników",
  },
};

export const USER_REPORT_ICONS: Partial<
  Record<UserReport["reportEventType"], IconElementType>
> = {
  drone: Drone,
  no_energy: Zap,
  protest: Megaphone,
};
