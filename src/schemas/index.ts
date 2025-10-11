import { z } from "zod";

import { Layer } from "@/lib/enums";

// Zod schema for validating enabled layers from cookies
export const EnabledLayersSchema = z.object({
  [Layer.Smog]: z.boolean(),
  [Layer.Fires]: z.boolean(),
  [Layer.Floods]: z.boolean(),
  [Layer.Shelters]: z.boolean(),
  [Layer.AEDs]: z.boolean(),
});
