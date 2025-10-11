import { LayersMap } from "@/components/map";
import { Layer } from "@/lib/enums";
import { getAirQuality } from "@/lib/services/smog";

export default async function Home() {
  const [
    airQuality,
    // ...
    // eslint-disable-next-line unicorn/no-single-promise-in-promise-methods
  ] = await Promise.all([
    getAirQuality(),
    // ...
  ]);
  return (
    <LayersMap
      locations={{
        [Layer.Smog]: airQuality,
        [Layer.Fires]: [],
        [Layer.Floods]: [],
        [Layer.Shelters]: [],
        [Layer.AEDs]: [],
      }}
    />
  );
}
