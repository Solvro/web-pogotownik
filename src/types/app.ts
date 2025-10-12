import type { LucideProps } from "lucide-react";
import type { ElementType, RefAttributes } from "react";
// eslint-disable-next-line import/no-named-as-default
import type z from "zod";

import type { Layer } from "@/lib/enums";
import type { EnabledLayersSchema } from "@/schemas";

import type { AEDsData } from "./aeds";
import type { FiresData } from "./fires";
import type { FloodsData } from "./floods";
import type { Promisish } from "./helpers";
import type { UserReportMetadata } from "./reports";
import type { SheltersData } from "./shelters";
import type { AirQualityData } from "./smog";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LayerMetadata {
  [Layer.Smog]: AirQualityData;
  [Layer.Fires]: FiresData;
  [Layer.Floods]: FloodsData;
  [Layer.Shelters]: SheltersData;
  [Layer.AEDs]: AEDsData;
  [Layer.Reports]: UserReportMetadata;
}

export interface LayerOptions {
  [Layer.Smog]: { count?: number };
  [Layer.Fires]: { distance?: number };
  [Layer.Floods]: { distance?: number };
  [Layer.Shelters]: { distance: number };
  [Layer.AEDs]: { distance: number };
  [Layer.Reports]: { distance?: number };
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
  options?: LayerOptions[L],
) => Promisish<LayerLocation<L>[]>;

export type LayerBoundsFetchFunction<L extends Layer> = (bounds: {
  nw: Coordinates;
  se: Coordinates;
}) => Promisish<LayerLocation<L>[]>;

export type EnabledLayers = z.infer<typeof EnabledLayersSchema>;
