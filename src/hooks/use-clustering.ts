"use client";

import { useMemo } from "react";
import Supercluster from "supercluster";

import type { Layer } from "@/lib/enums";
import type { LabelledLayerLocation } from "@/types/app";

interface ClusterPoint {
  type: "Feature";
  properties: {
    cluster: boolean;
    point_count?: number;
    layerLocation: LabelledLayerLocation<Layer>;
  };
  geometry: {
    type: "Point";
    coordinates: [number, number];
  };
}

interface ClusterOptions {
  radius: number;
  maxZoom: number;
  minZoom: number;
  extent: number;
  nodeSize: number;
}

const DEFAULT_CLUSTER_OPTIONS: ClusterOptions = {
  radius: 40,
  maxZoom: 16,
  minZoom: 0,
  extent: 512,
  nodeSize: 64,
};

export function useClustering(
  locations: LabelledLayerLocation<Layer>[],
  zoom: number,
  bounds: {
    nw: { lat: number; lng: number };
    se: { lat: number; lng: number };
  } | null,
  options: Partial<ClusterOptions> = {},
) {
  const clusterOptions = useMemo(() => {
    // Adjust clustering parameters based on zoom level
    const baseOptions = { ...DEFAULT_CLUSTER_OPTIONS, ...options };

    if (zoom < 10) {
      // More aggressive clustering at lower zoom levels
      return { ...baseOptions, radius: 60, maxZoom: 12 };
    } else if (zoom < 14) {
      // Moderate clustering at medium zoom levels
      return { ...baseOptions, radius: 40, maxZoom: 16 };
    } else {
      // Less clustering at higher zoom levels
      return { ...baseOptions, radius: 25, maxZoom: 18 };
    }
  }, [options, zoom]);

  const supercluster = useMemo(() => {
    const cluster = new Supercluster<ClusterPoint["properties"]>(
      clusterOptions,
    );

    // Convert locations to GeoJSON points
    const points: ClusterPoint[] = locations.map((location) => ({
      type: "Feature",
      properties: {
        cluster: false,
        layerLocation: location,
      },
      geometry: {
        type: "Point",
        coordinates: [location.lng, location.lat],
      },
    }));

    cluster.load(points);
    return cluster;
  }, [locations, clusterOptions]);

  const clusters = useMemo(() => {
    if (bounds == null) {
      return [];
    }

    // Get clusters for current viewport
    let viewportClusters = supercluster.getClusters(
      [bounds.nw.lng, bounds.se.lat, bounds.se.lng, bounds.nw.lat],
      Math.floor(zoom),
    );

    // Limit the number of clusters/markers shown for performance
    const maxMarkers = zoom < 10 ? 100 : zoom < 13 ? 300 : 1000;
    if (viewportClusters.length > maxMarkers) {
      viewportClusters = viewportClusters.slice(0, maxMarkers);
    }

    return viewportClusters;
  }, [supercluster, bounds, zoom]);

  return { clusters, supercluster };
}
