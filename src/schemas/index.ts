import { z } from "zod";

import { reportEventType } from "@/config/constants";
import { Layer } from "@/lib/enums";

export const reportSchema = z.object({
  reportEventType: z.enum(reportEventType.map((event) => event.value)),
  description: z
    .string()
    .max(500, "Opis powinien zawierać nie więcej niż 500 znaków"),
  lat: z
    .number()
    .refine((value) => value !== 0, { message: "Wybierz lokalizację" }),
  lng: z
    .number()
    .refine((value) => value !== 0, { message: "Wybierz lokalizację" }),
});

/** Zod schema for validating enabled layers from cookies */
export const EnabledLayersSchema = z.object({
  [Layer.Smog]: z.boolean(),
  [Layer.Fires]: z.boolean(),
  [Layer.Floods]: z.boolean(),
  [Layer.Shelters]: z.boolean(),
  [Layer.AEDs]: z.boolean(),
  [Layer.Reports]: z.boolean(),
});
