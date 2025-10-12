import Cookies from "js-cookie";

import {
  DEFAULT_ENABLED_LAYERS,
  ENABLED_LAYERS_COOKIE_NAME,
} from "@/config/constants";
import { EnabledLayersSchema } from "@/schemas";
import type { EnabledLayers } from "@/types/app";

export function getEnabledLayersFromCookie(): EnabledLayers {
  if (typeof window === "undefined") {
    // Server-side rendering fallback
    return DEFAULT_ENABLED_LAYERS;
  }

  try {
    const cookieValue = Cookies.get(ENABLED_LAYERS_COOKIE_NAME);

    if (cookieValue == null || cookieValue === "") {
      return DEFAULT_ENABLED_LAYERS;
    }

    const parsed: unknown = JSON.parse(cookieValue);
    const validated = EnabledLayersSchema.parse(parsed);
    return validated;
  } catch {
    // console.error("Failed to parse enabled layers from cookie:", error);
    return DEFAULT_ENABLED_LAYERS;
  }
}

export function saveEnabledLayersToCookie(enabledLayers: EnabledLayers): void {
  if (typeof window === "undefined") {
    // Skip on server-side
    return;
  }

  try {
    Cookies.set(ENABLED_LAYERS_COOKIE_NAME, JSON.stringify(enabledLayers), {
      expires: 365, // 1 year
      path: "/",
      sameSite: "lax",
    });
  } catch (error) {
    console.error("Failed to save enabled layers to cookie:", error);
  }
}
