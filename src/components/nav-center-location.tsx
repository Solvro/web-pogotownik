"use client";

import { LocateFixed } from "lucide-react";
import { toast } from "sonner";

import { DEFAULT_MAP_ZOOM } from "@/config/constants";
import { useMap } from "@/hooks/use-map";
import { getCurrentLocation } from "@/lib/helpers/geolocation";

import { Button } from "./ui/button";

export function NavCenterLocation() {
  const { setCenter, setZoom, setIsLoading } = useMap();

  async function handleCenterLocation() {
    try {
      const location = await getCurrentLocation();
      setCenter(location);
      setZoom(DEFAULT_MAP_ZOOM);
    } catch (error) {
      toast.error("Nie udało się pobrać lokalizacji");
      console.error("Error getting location:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={handleCenterLocation}
      tooltip="Wycentruj mapę"
    >
      <LocateFixed />
    </Button>
  );
}
