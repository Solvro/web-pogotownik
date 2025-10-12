import GoogleMapReact from "google-map-react";
import { MapPin } from "lucide-react";
import { useState } from "react";

import { SKS_COORDINATES } from "@/config/constants";
import { env } from "@/env";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export function CoordsPicker({
  open,
  onOpenChange,
  onSelect,
  initialLat,
  initialLng,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
}) {
  const [selectedCoords, setSelectedCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(
    initialLat != null && initialLng != null
      ? { lat: initialLat, lng: initialLng }
      : null,
  );

  function handleMapClick(event: GoogleMapReact.ClickEventValue) {
    setSelectedCoords({ lat: event.lat, lng: event.lng });
  }

  function handleConfirm() {
    if (selectedCoords != null) {
      onSelect(selectedCoords.lat, selectedCoords.lng);
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[600px] max-w-4xl flex-col">
        <DialogHeader>
          <DialogTitle>Wybierz lokalizację na mapie</DialogTitle>
          <DialogDescription>
            Kliknij na mapie, aby wybrać współrzędne zdarzenia
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex-1 overflow-hidden rounded-lg border">
          <GoogleMapReact
            bootstrapURLKeys={{ key: env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
            defaultCenter={
              initialLat != null && initialLng != null
                ? { lat: initialLat, lng: initialLng }
                : SKS_COORDINATES
            }
            defaultZoom={14}
            onClick={handleMapClick}
            options={{
              fullscreenControl: false,
              zoomControl: true,
            }}
          >
            {selectedCoords == null ? null : (
              <Marker lat={selectedCoords.lat} lng={selectedCoords.lng} />
            )}
          </GoogleMapReact>
        </div>

        {selectedCoords == null ? null : (
          <div className="text-muted-foreground text-sm">
            Wybrane współrzędne: {selectedCoords.lat.toFixed(6)},{" "}
            {selectedCoords.lng.toFixed(6)}
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Anuluj
          </Button>
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={selectedCoords == null}
          >
            Potwierdź lokalizację
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function Marker({ lat, lng }: { lat: number; lng: number }) {
  return (
    <div className="size-8 -translate-x-1/2 -translate-y-full">
      <MapPin
        className="h-full w-full text-red-500 drop-shadow-lg"
        fill="currentColor"
      />
    </div>
  );
}
