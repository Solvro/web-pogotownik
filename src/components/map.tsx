"use client";

import GoogleMapReact from "google-map-react";

import { SKS_COORDINATES } from "@/config/constants";
import { env } from "@/env";
import { useMap } from "@/hooks/use-map";
import type { Layer } from "@/lib/enums";
import { typedEntries } from "@/lib/helpers/typescript";
import type { LayerLocation, SynchronousReactNode } from "@/types/app";

import { Marker } from "./marker";

export function LayersMap({
  locations,
}: {
  locations: { [L in Layer]: LayerLocation<L>[] };
}) {
  const { enabledLayers } = useMap();

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
      >
        {typedEntries(enabledLayers).reduce<SynchronousReactNode[]>(
          (markers, [layer, isEnabled]) => {
            if (isEnabled) {
              markers.push(
                ...locations[layer].map(({ lat, lng, meta }) => (
                  <Marker
                    layer={layer}
                    key={`${layer}-marker-${String(lat)}-${String(lng)}}`}
                    lat={lat}
                    lng={lng}
                    meta={meta}
                  />
                )),
              );
            }
            return markers;
          },
          [],
        )}
      </GoogleMapReact>
    </div>
  );
}
