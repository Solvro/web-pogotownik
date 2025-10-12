import { LAYER_ICONS } from "@/config/icons";
import { useMap } from "@/hooks/use-map";
import type { Layer } from "@/lib/enums";
import { LAYER_FORMATTERS } from "@/lib/layer-formatters";
import type { LayerLocation } from "@/types/app";

export function Marker<T extends Layer>({
  layer,
  meta,
}: { layer: T } & LayerLocation<T>) {
  const { setOpenDialog, setDialogData } = useMap();

  const formatter = LAYER_FORMATTERS[layer];
  const { icon } = LAYER_ICONS[layer];
  const { marker } = formatter(icon, meta);
  return (
    <button
      onClick={() => {
        setOpenDialog(true);
        setDialogData({ layer, metadata: meta });
      }}
    >
      {marker}
    </button>
  );
}
