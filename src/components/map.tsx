"use client";

import GoogleMapReact from "google-map-react";

import { SKS_COORDINATES } from "@/config/constants";
import { env } from "@/env";
import { useMap } from "@/hooks/use-map";

import { Marker } from "./marker";

export function LayersMap() {
  const { locations, setCenter, setBounds, setDistance, setZoom } = useMap();

  const defaultProps = {
    center: SKS_COORDINATES,
    zoom: 14,
  };

  return (
    <div className="absolute inset-0 h-screen w-screen">
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={{ fullscreenControl: false }}
        onChange={(event_) => {
          setCenter(event_.center);
          setDistance((40_000 / 2 ** event_.zoom) * 2 * 1000);
          setBounds({ nw: event_.bounds.nw, se: event_.bounds.se });
        }}
        onZoomAnimationEnd={(newZoom) => {
          if (typeof newZoom !== "number") {
            console.error(
              "Unknown zoom argument type",
              typeof newZoom,
              newZoom,
            );
          }
          setZoom(newZoom as number);
        }}
      >
        {locations.map(({ layer, lat, lng, meta }) => (
          <Marker
            layer={layer}
            key={`${layer}-marker-${String(lat)}-${String(lng)}}`}
            lat={lat}
            lng={lng}
            meta={meta}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
