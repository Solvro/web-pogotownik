import type { Layer } from "@/lib/enums";
import { cn } from "@/lib/utils";
import type { LabelledLayerLocation } from "@/types/app";

import { Marker } from "./marker";

interface ClusterMarkerProps {
  lat: number;
  lng: number;
  pointCount: number;
  points: {
    properties: {
      layerLocation: LabelledLayerLocation<Layer>;
    };
  }[];
  onClick?: () => void;
}

function getClusterSize(pointCount: number) {
  if (pointCount >= 100) {
    return "large";
  }
  if (pointCount >= 10) {
    return "medium";
  }
  return "small";
}

function getClusterStyles(size: "small" | "medium" | "large") {
  const baseStyles =
    "rounded-full border-2 border-white flex items-center justify-center text-white font-bold shadow-lg cursor-pointer hover:scale-110 transition-transform";

  switch (size) {
    case "small": {
      return cn(baseStyles, "bg-blue-500 w-8 h-8 text-xs");
    }
    case "medium": {
      return cn(baseStyles, "bg-blue-600 w-10 h-10 text-sm");
    }
    case "large": {
      return cn(baseStyles, "bg-blue-700 w-12 h-12 text-base");
    }
  }
}

export function ClusterMarker({
  pointCount,
  points,
  onClick,
}: ClusterMarkerProps) {
  // If it's just one point, render the original marker
  if (pointCount === 1 && points.length > 0) {
    const { layerLocation } = points[0].properties;
    return (
      <Marker
        layer={layerLocation.layer}
        lat={layerLocation.lat}
        lng={layerLocation.lng}
        meta={layerLocation.meta}
      />
    );
  }

  const size = getClusterSize(pointCount);
  const styles = getClusterStyles(size);

  return (
    <button type="button" className={styles} onClick={onClick}>
      {pointCount}
    </button>
  );
}
