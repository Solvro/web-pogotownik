import type { LucideProps } from "lucide-react";
import type { ElementType, ReactNode, RefAttributes } from "react";

import type { Layer } from "@/lib/enums";

import type { AirQualityData } from "./smog";

export interface Coordinates {
  lat: number;
  lng: number;
}

export type SynchronousReactNode = Exclude<ReactNode, Promise<ReactNode>>;

export interface LayerMetadata {
  [Layer.Smog]: AirQualityData;
  [Layer.Fires]: null;
  [Layer.Floods]: null;
  [Layer.Shelters]: null;
  [Layer.AEDs]: null;
}

export type LayerLocation<L extends Layer> = Coordinates & {
  meta: LayerMetadata[L];
};

export type IconElementType = ElementType<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;
