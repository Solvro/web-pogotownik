"use client";

import { Compass } from "lucide-react";
import { toast } from "sonner";

import { DEFAULT_MAP_ZOOM } from "@/config/constants";
import { useMap } from "@/hooks/use-map";
import type { Coordinates } from "@/types/app";

import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function NavCenterLocation() {
  const { setCenter, setZoom } = useMap();

  function handleCenterLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCenter(coordinates);
        setZoom(DEFAULT_MAP_ZOOM);
      },
      (error) => {
        toast.error("Nie udało się pobrać lokalizacji");
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 },
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon" onClick={handleCenterLocation}>
          <Compass />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Wycentruj mapę</TooltipContent>
    </Tooltip>
  );
}
