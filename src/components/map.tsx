"use client";

import GoogleMapReact from "google-map-react";
import { useEffect } from "react";

import {
  DEFAULT_MAP_ZOOM,
  MAX_MAP_ZOOM,
  SKS_COORDINATES,
} from "@/config/constants";
import { LAYER_ICONS } from "@/config/icons";
import { env } from "@/env";
import { useClustering } from "@/hooks/use-clustering";
import { useMap } from "@/hooks/use-map";
import type { Layer } from "@/lib/enums";
import { calculateDistance } from "@/lib/helpers/geography";
import { getCurrentLocation } from "@/lib/helpers/geolocation";
import { LAYER_FORMATTERS } from "@/lib/layer-formatters";
import type { LabelledMetadata } from "@/types/app";

import { ClusterMarker } from "./cluster-marker";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter } from "./ui/dialog";
import { Spinner } from "./ui/spinner";

function LayerDialog<T extends Layer>({
  dialogData,
}: {
  dialogData: LabelledMetadata<T> | null;
}) {
  if (dialogData == null) {
    return null;
  }
  const { icon } = LAYER_ICONS[dialogData.layer];
  const formatter = LAYER_FORMATTERS[dialogData.layer];
  const { dialog } = formatter(icon, dialogData.metadata);
  return dialog;
}

export function LayersMap() {
  const {
    center,
    setCenter,
    zoom,
    setZoom,
    bounds,
    setBounds,
    setDistance,
    openDialog,
    setOpenDialog,
    dialogData,
    isLoading,
    setIsLoading,
    locations,
  } = useMap();

  const { clusters, supercluster } = useClustering(locations, zoom, bounds, {
    radius: zoom < 12 ? 50 : 30,
    maxZoom: 16,
  });

  useEffect(() => {
    async function centerMap() {
      setIsLoading(true);
      try {
        const location = await getCurrentLocation();
        setCenter(location);
      } catch (error) {
        console.error("Error getting current location:", error);
      } finally {
        setIsLoading(false);
      }
    }
    void centerMap();
  }, [setCenter, setIsLoading]);

  return (
    <div className="absolute inset-0 h-screen w-screen">
      {isLoading ? (
        <div className="fixed inset-0 z-10 m-auto size-fit">
          <div className="flex size-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
            <Spinner className="size-6 stroke-3 text-blue-800" />
          </div>
        </div>
      ) : null}
      <GoogleMapReact
        bootstrapURLKeys={{ key: env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
        defaultCenter={SKS_COORDINATES}
        defaultZoom={DEFAULT_MAP_ZOOM}
        options={{ fullscreenControl: false }}
        center={center}
        onChange={(event_) => {
          setCenter(event_.center);
          setDistance(calculateDistance(event_.zoom));
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
        zoom={zoom}
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
                  if (cluster.id == null || typeof cluster.id !== "number") {
                    console.error("Cluster has no ID");
                    return;
                  }
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    MAX_MAP_ZOOM,
                  );
                  const clusterLeaves = supercluster.getLeaves(
                    cluster.id,
                    Infinity,
                  );
                  if (clusterLeaves.length === 0) {
                    return;
                  }
                  const firstClusterCoordinates =
                    clusterLeaves[0].geometry.coordinates;
                  let [minLng, minLat] = firstClusterCoordinates;
                  let [maxLng, maxLat] = firstClusterCoordinates;

                  for (const leaf of clusterLeaves) {
                    const [leafLng, leafLat] = leaf.geometry.coordinates;
                    minLat = Math.min(minLat, leafLat);
                    maxLat = Math.max(maxLat, leafLat);
                    minLng = Math.min(minLng, leafLng);
                    maxLng = Math.max(maxLng, leafLng);
                  }

                  const [centerLng, centerLat] = cluster.geometry.coordinates;
                  setCenter({ lat: centerLat, lng: centerLng });
                  setZoom(expansionZoom);

                  // Update bounds and distance for the new zoom level
                  setBounds({
                    nw: { lat: maxLat, lng: minLng },
                    se: { lat: minLat, lng: maxLng },
                  });
                  setDistance(calculateDistance(expansionZoom));
                }}
              />
            );
          }

          const { layerLocation } = cluster.properties;
          const uniqueId =
            "id" in layerLocation.meta
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
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <LayerDialog dialogData={dialogData} />
          <DialogFooter>
            <DialogClose asChild>
              <Button>Ok</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
