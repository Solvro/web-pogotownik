import { LAYER_ICONS, USER_REPORT_ICONS } from "@/config/icons";
import { useMap } from "@/hooks/use-map";
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
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          meta.airQuality.overallValue < 1 &&
            "border-green-400 bg-green-100/50 text-green-500",
          meta.airQuality.overallValue >= 1 &&
            meta.airQuality.overallValue < 2 &&
            "border-yellow-600 bg-yellow-100/50 text-yellow-500",
          meta.airQuality.overallValue >= 2 &&
            meta.airQuality.overallValue < 3 &&
            "border-orange-700 bg-orange-100/50 text-orange-500",
          meta.airQuality.overallValue >= 3 &&
            meta.airQuality.overallValue < 4 &&
            "border-red-700 bg-red-100/50 text-red-500",
          meta.airQuality.overallValue >= 4 &&
            "border-purple-700 bg-purple-100/50 text-purple-500",
        )}
      >
        <Icon className={"size-4"} />
      </div>
    ),
    tooltip: <div>Jakość powietrza: {meta.airQuality.overallCategoryName}</div>,
  }),
  [Layer.Fires]: (Icon, meta) => ({
    marker: (
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          meta.intensity === 1 &&
            "border-yellow-400 bg-yellow-100/50 text-yellow-500",
          meta.intensity === 2 &&
            "border-orange-600 bg-orange-100/50 text-orange-500",
          meta.intensity >= 3 && "border-red-700 bg-red-100/50 text-red-500",
        )}
      >
        <Icon className={"size-4"} />
      </div>
    ),
    tooltip: <div>Wielkość pożaru: {meta.intensity}</div>,
  }),
  [Layer.Floods]: (Icon, meta) => ({
    marker: (
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          meta.warningLevel === 1 &&
            "border-blue-400 bg-blue-100/50 text-blue-400",
          meta.warningLevel === 2 &&
            "border-blue-600 bg-blue-100/50 text-blue-600",
          meta.warningLevel >= 3 &&
            "border-blue-700 bg-blue-100/50 text-blue-700",
        )}
      >
        <Icon className={"size-4"} />
      </div>
    ),
    tooltip: <div>Stopień zagrożenia: {meta.warningLevel}</div>,
  }),
  [Layer.Shelters]: (Icon, meta) => ({
    marker: (
      <div
        className={cn(
          "flex size-6 items-center justify-center rounded-full border backdrop-blur-md",
          meta.buildingType.includes("[3]") &&
            "border-green-600 bg-green-100/50 text-green-500",
          meta.buildingType.includes("[2]") &&
            "border-blue-600 bg-blue-100/50 text-blue-500",
          meta.buildingType.includes("[1]") &&
            "border-red-600 bg-red-100/50 text-red-500",
        )}
      >
        <Icon className={"size-4"} />
      </div>
    ),
    tooltip: null,
  }),
  [Layer.AEDs]: (Icon) => ({
    marker: (
      <div className="flex size-6 items-center justify-center rounded-full border border-rose-600 bg-rose-100/50 backdrop-blur-md">
        <Icon className={cn("size-4 text-rose-500")} />
      </div>
    ),
    tooltip: null,
  }),
  [Layer.Reports]: (DefaultIcon, meta) => {
    const Icon = USER_REPORT_ICONS[meta.reportEventType] ?? DefaultIcon;
    return {
      marker: (
        <div className="flex size-6 items-center justify-center rounded-full border border-purple-600 bg-purple-100/50 backdrop-blur-md">
          <Icon className={cn("size-4 text-purple-500")} />
        </div>
      ),
      tooltip: <div>Opis zgłoszenia: {meta.description}</div>,
    };
  },
};

export function Marker<T extends Layer>({
  layer,
  meta,
}: { layer: T } & LayerLocation<T>) {
  const { setOpenDialog, setMetadata } = useMap();

  const formatter = LAYER_FORMATTERS[layer];
  const { icon } = LAYER_ICONS[layer];
  const { marker } = formatter(icon, meta);
  return (
    // <Tooltip>
    //   <TooltipTrigger>{marker}</TooltipTrigger>
    //   <TooltipContent>{tooltip}</TooltipContent>
    // </Tooltip>
    <button
      onClick={() => {
        setOpenDialog(true);
        setMetadata(JSON.stringify(meta, null, 2));
      }}
    >
      {marker}
    </button>
  );
}
