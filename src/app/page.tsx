import { LayersMap } from "@/components/map";
import { Layer } from "@/lib/enums";

export default function Home() {
  return (
    <LayersMap
      locations={{
        [Layer.Smog]: [],
        [Layer.Fires]: [],
        [Layer.Floods]: [],
        [Layer.Shelters]: [],
        [Layer.AEDs]: [],
      }}
    />
  );
}
