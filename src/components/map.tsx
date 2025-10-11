"use client";

import GoogleMapReact from "google-map-react";

import { SKS_COORDINATES } from "@/config/constants";
import { env } from "@/env";
import { useClustering } from "@/hooks/use-clustering";
import { useMap } from "@/hooks/use-map";

import { ClusterMarker } from "./cluster-marker";

export function LayersMap() {
  const {
    locations,
    setCenter,
    setBounds,
    setDistance,
    setZoom,
    zoom,
    bounds,
  } = useMap();

  // Use clustering for better performance
  const { clusters } = useClustering(locations, zoom, bounds, {
    radius: zoom < 12 ? 50 : 30, // Adjust cluster radius based on zoom
    maxZoom: 16,
  });

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
        {clusters.map((cluster) => {
          const [lng, lat] = cluster.geometry.coordinates;
          const { cluster: isCluster, point_count } = cluster.properties;

          if (isCluster) {
            return (
              <ClusterMarker
                key={`cluster-${String(cluster.id ?? `${String(lat)}-${String(lng)}`)}`}
                lat={lat}
                lng={lng}
                pointCount={point_count ?? 0}
                points={[]}
                onClick={() => {
                  // TODO: Implement zoom to cluster bounds
                }}
              />
            );
          }

          const { layerLocation } = cluster.properties;
          const uniqueId =
            layerLocation.meta != null && "id" in layerLocation.meta
              ? layerLocation.meta.id
              : `${String(lat)}-${String(lng)}`;

          return (
            <ClusterMarker
              key={`single-${layerLocation.layer}-${String(uniqueId)}`}
              lat={lat}
              lng={lng}
              pointCount={1}
              points={[
                cluster as {
                  properties: { layerLocation: typeof layerLocation };
                },
              ]}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}
