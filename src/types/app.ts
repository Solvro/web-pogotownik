import type { LucideProps } from "lucide-react";
import type { ElementType, RefAttributes } from "react";

import type { Layer } from "@/lib/enums";

import type { FiresData } from "./fires";
import type { Promisish } from "./helpers";
import type { AirQualityData } from "./smog";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LayerMetadata {
  [Layer.Smog]: AirQualityData;
  [Layer.Fires]: FiresData;
  [Layer.Floods]: null;
  [Layer.Shelters]: null;
  [Layer.AEDs]: null;
}

export interface LayerLocation<L extends Layer> extends Coordinates {
  meta: LayerMetadata[L];
}

export interface LabelledLayerLocation<L extends Layer>
  extends LayerLocation<L> {
  layer: L;
}

export type IconElementType = ElementType<
  Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
>;

export type LayerFetchFunction<L extends Layer> = (
  center: Coordinates,
) => Promisish<LayerLocation<L>[]>;
