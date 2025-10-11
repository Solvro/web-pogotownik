import { LAYER_ICONS } from "@/config/icons";
import { Layer } from "@/lib/enums";
import { cn } from "@/lib/utils";
import type {
  IconElementType,
  LayerLocation,
  LayerMetadata,
} from "@/types/app";
import type { SynchronousReactNode } from "@/types/helpers";

const LAYER_FORMATTERS: {
  [L in Layer]: (
    icon: IconElementType,
    meta: LayerMetadata[L],
  ) => {
    marker: SynchronousReactNode;
    tooltip: SynchronousReactNode;
  };
} = {
  [Layer.Smog]: (Icon, meta) => ({
    marker: (
      <div>
        <Icon
          className={cn(
            // TODO: zmień kolory/rozmiary
            meta.airQuality.overallValue < 1
              ? "text-green-500"
              : meta.airQuality.overallValue < 2
                ? "text-yellow-500"
                : meta.airQuality.overallValue < 3
                  ? "text-orange-500"
                  : meta.airQuality.overallValue < 4
                    ? "text-red-500"
                    : "text-neutral-500",
          )}
        />
      </div>
    ),
    tooltip: <div>Jakość powietrza: {meta.airQuality.overallCategoryName}</div>,
  }),
  [Layer.Fires]: (Icon, meta) => ({
    marker: (
      <div>
        <Icon
          className={cn(
            meta.intensity === 1 && "text-yellow-500",
            meta.intensity === 2 && "text-orange-500",
            meta.intensity >= 3 && "text-red-500",
          )}
        />
      </div>
    ),
    tooltip: <div>Wielkość pożaru: {meta.intensity}</div>,
  }),
  [Layer.Floods]: (Icon) => ({
    marker: (
      <div>
        <Icon /> Powódź
      </div>
    ),
    tooltip: null,
  }),
  [Layer.Shelters]: (Icon, meta) => ({
    marker: (
      <div>
        <Icon
          className={cn(
            "size-3",
            meta.buildingType.includes("[3]") && "text-green-500",
            meta.buildingType.includes("[2]") && "text-blue-500",
            meta.buildingType.includes("[1]") && "text-red-500",
          )}
        />
      </div>
    ),
    tooltip: null,
  }),
  [Layer.AEDs]: (Icon) => ({
    marker: (
      <div>
        <Icon /> Defibrylator
      </div>
    ),
    tooltip: null,
  }),
};

export function Marker<T extends Layer>({
  layer,
  meta,
}: { layer: T } & LayerLocation<T>) {
  const formatter = LAYER_FORMATTERS[layer];
  const { marker } = formatter(LAYER_ICONS[layer], meta);
  // (
  //   <Tooltip>
  //     <TooltipTrigger>{marker}</TooltipTrigger>
  //     <TooltipContent>{tooltip}</TooltipContent>
  //   </Tooltip>
  // )
  return marker;
}
